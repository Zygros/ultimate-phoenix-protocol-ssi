const assert = require('node:assert/strict');
const test = require('node:test');
const WebSocket = require('ws');
const { createRelay } = require('../server');

function createClient(port) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}`);
    const queued = [];
    const waiters = [];

    function deliver(message) {
      const matchingIndex = waiters.findIndex((waiter) => waiter.predicate(message));
      if (matchingIndex >= 0) {
        const [{ resolve: resolveWaiter, timer }] = waiters.splice(matchingIndex, 1);
        clearTimeout(timer);
        resolveWaiter(message);
      } else {
        queued.push(message);
      }
    }

    ws.on('message', (data) => {
      deliver(JSON.parse(data.toString()));
    });

    ws.once('open', () => {
      resolve({
        ws,
        send(payload) {
          ws.send(JSON.stringify(payload));
        },
        waitFor(predicate, timeoutMs = 1_500) {
          const queuedIndex = queued.findIndex(predicate);
          if (queuedIndex >= 0) {
            return Promise.resolve(queued.splice(queuedIndex, 1)[0]);
          }

          return new Promise((resolveWaiter, rejectWaiter) => {
            const timer = setTimeout(() => {
              const waiterIndex = waiters.findIndex((waiter) => waiter.resolve === resolveWaiter);
              if (waiterIndex >= 0) waiters.splice(waiterIndex, 1);
              rejectWaiter(new Error('Timed out waiting for expected WebSocket message.'));
            }, timeoutMs);
            waiters.push({ predicate, resolve: resolveWaiter, timer });
          });
        },
        close() {
          return new Promise((resolveClose) => {
            if (ws.readyState === WebSocket.CLOSED) return resolveClose();
            ws.once('close', resolveClose);
            ws.close();
          });
        }
      });
    });

    ws.once('error', reject);
  });
}

async function withRelay(run, options = {}) {
  const relay = createRelay({
    port: 0,
    host: '127.0.0.1',
    deliberationTimeoutMs: 250,
    ...options
  });
  const { port } = await relay.start();
  try {
    await run(port, relay);
  } finally {
    await relay.stop();
  }
}

test('reports a local-prototype status over HTTP', async () => {
  await withRelay(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/api/status`);
    assert.equal(response.status, 200);

    const status = await response.json();
    assert.equal(status.status, 'local-prototype');
    assert.equal(status.totalConnections, 0);
    assert.equal(status.activeDeliberations, 0);
    assert.match(status.limitations.join(' '), /No authentication/);
  });
});

test('completes a zero-recipient HTTP message without leaving an active deliberation', async () => {
  await withRelay(async (port) => {
    const response = await fetch(`http://127.0.0.1:${port}/api/message`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: 'local zero-recipient test', userId: 'operator' })
    });

    assert.equal(response.status, 202);
    const submitted = await response.json();
    assert.equal(submitted.recipients, 0);
    assert.equal(submitted.status, 'complete');

    const statusResponse = await fetch(`http://127.0.0.1:${port}/api/status`);
    const status = await statusResponse.json();
    assert.equal(status.totalMessages, 1);
    assert.equal(status.activeDeliberations, 0);
  });
});

test('aggregates one registered adapter response and completes the deliberation', async () => {
  await withRelay(async (port) => {
    const requester = await createClient(port);
    const adapter = await createClient(port);

    try {
      await requester.waitFor((message) => message.type === 'welcome');
      await adapter.waitFor((message) => message.type === 'welcome');

      adapter.send({ type: 'register', platform: 'local-test-adapter', userId: 'operator' });
      const registration = await adapter.waitFor((message) => message.type === 'registered');
      assert.equal(registration.platform, 'local-test-adapter');

      requester.send({
        type: 'user_message',
        content: 'Test local relay completion.',
        userId: 'operator',
        conversationId: 'test-conversation'
      });

      const acknowledgement = await requester.waitFor((message) => message.type === 'message_received');
      assert.equal(acknowledgement.requiredResponses, 1);

      const query = await adapter.waitFor((message) => message.type === 'collective_query');
      assert.equal(query.deliberationId, acknowledgement.deliberationId);
      assert.equal(query.requiredResponses, 1);

      adapter.send({
        type: 'ai_response',
        deliberationId: query.deliberationId,
        content: 'Local adapter response.'
      });

      const result = await requester.waitFor((message) => message.type === 'collective_response');
      assert.equal(result.deliberationId, query.deliberationId);
      assert.equal(result.responses.length, 1);
      assert.equal(result.responses[0].platform, 'local-test-adapter');
      assert.equal(result.synthesis.completionReason, 'all_expected_responses_received');
      assert.match(result.synthesis.consensus, /no model reasoning/i);
    } finally {
      await Promise.all([requester.close(), adapter.close()]);
    }
  });
});

test('rejects duplicate responses from the same adapter', async () => {
  await withRelay(async (port, relay) => {
    const requester = await createClient(port);
    const adapter = await createClient(port);

    try {
      await requester.waitFor((message) => message.type === 'welcome');
      await adapter.waitFor((message) => message.type === 'welcome');
      adapter.send({ type: 'register', platform: 'local-test-adapter', userId: 'operator' });
      await adapter.waitFor((message) => message.type === 'registered');

      requester.send({ type: 'user_message', content: 'Test duplicate response.', userId: 'operator' });
      const acknowledgement = await requester.waitFor((message) => message.type === 'message_received');
      const query = await adapter.waitFor((message) => message.type === 'collective_query');

      adapter.send({ type: 'ai_response', deliberationId: query.deliberationId, content: 'First response.' });
      await requester.waitFor((message) => message.type === 'collective_response');

      adapter.send({ type: 'ai_response', deliberationId: acknowledgement.deliberationId, content: 'Duplicate response.' });
      const error = await adapter.waitFor((message) => message.type === 'error');
      assert.match(error.error, /already complete/);
      assert.equal(relay.getStatus().activeDeliberations, 0);
    } finally {
      await Promise.all([requester.close(), adapter.close()]);
    }
  });
});
