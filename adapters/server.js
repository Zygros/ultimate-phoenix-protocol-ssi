// 🔥 MULTI-AI CONVERGENCE RELAY — LOCAL PROTOTYPE
//
// This server is intentionally limited to local development. It aggregates messages
// from local WebSocket clients in memory; it does not authenticate users, contact AI
// providers, persist data, or produce model-generated synthesis.

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { randomUUID } = require('crypto');

const DEFAULT_PORT = 3001;
const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_DELIBERATION_TIMEOUT_MS = 30_000;
const MAX_CONTENT_LENGTH = 20_000;

function createRelay(options = {}) {
  const port = Number(options.port ?? process.env.PORT ?? DEFAULT_PORT);
  const host = options.host ?? process.env.HOST ?? DEFAULT_HOST;
  const deliberationTimeoutMs = Number(
    options.deliberationTimeoutMs ?? process.env.DELIBERATION_TIMEOUT_MS ?? DEFAULT_DELIBERATION_TIMEOUT_MS
  );

  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  // The relay is local-only by default. CORS headers are not needed for the
  // WebSocket test clients and should be replaced by a deliberate origin policy
  // before any network deployment.
  app.use(cors({ origin: false }));
  app.use(express.json({ limit: '64kb' }));

  const connectedAIs = new Map();
  const messageHistory = [];
  const deliberations = new Map();

  function now() {
    return new Date().toISOString();
  }

  function safeSend(ws, payload) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
      return true;
    }
    return false;
  }

  function sendError(ws, error) {
    safeSend(ws, { type: 'error', error });
  }

  function findAIBySocket(ws) {
    for (const ai of connectedAIs.values()) {
      if (ai.ws === ws) return ai;
    }
    return null;
  }

  function validateText(value, fieldName) {
    if (typeof value !== 'string' || !value.trim()) {
      throw new Error(`${fieldName} must be a non-empty string`);
    }
    return value.trim();
  }

  function validateContent(value) {
    const content = validateText(value, 'content');
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new Error(`content exceeds the ${MAX_CONTENT_LENGTH}-character local prototype limit`);
    }
    return content;
  }

  function serializeAI(ai) {
    return {
      id: ai.id,
      platform: ai.platform,
      connectedAt: ai.connectedAt
    };
  }

  function broadcastToAIs(payload, targets = connectedAIs.values()) {
    let sent = 0;
    for (const ai of targets) {
      if (safeSend(ai.ws, payload)) sent += 1;
    }
    return sent;
  }

  function broadcastStatus() {
    broadcastToAIs({
      type: 'status_update',
      connectedAIs: Array.from(connectedAIs.values()).map(serializeAI),
      totalConnections: connectedAIs.size,
      timestamp: now()
    });
  }

  function synthesizeResponses(deliberation, completionReason) {
    const responses = deliberation.responses;
    return {
      summary: `Local relay collected ${responses.length} of ${deliberation.requiredResponses} expected response(s).`,
      perspectives: responses.map((response) => ({
        source: response.platform,
        content: response.content
      })),
      consensus: 'Template aggregation only; no model reasoning or external provider synthesis was performed.',
      completionReason,
      timestamp: now()
    };
  }

  function completeDeliberation(deliberation, completionReason) {
    if (!deliberation || deliberation.status !== 'in_progress') return false;

    deliberation.status = 'complete';
    deliberation.completedAt = now();
    deliberation.completionReason = completionReason;
    clearTimeout(deliberation.timeoutHandle);
    deliberation.synthesis = synthesizeResponses(deliberation, completionReason);

    const payload = {
      type: 'collective_response',
      deliberationId: deliberation.id,
      synthesis: deliberation.synthesis,
      responses: deliberation.responses
    };

    broadcastToAIs(payload);
    safeSend(deliberation.requester, payload);
    return true;
  }

  function createDeliberation({ content, userId, conversationId, platform }, requester) {
    const message = {
      id: randomUUID(),
      timestamp: now(),
      type: 'user_message',
      content,
      userId,
      conversationId: conversationId || null,
      platform: platform || 'websocket'
    };
    messageHistory.push(message);

    const targets = Array.from(connectedAIs.values()).filter((ai) => ai.ws.readyState === WebSocket.OPEN);
    const deliberation = {
      id: randomUUID(),
      message,
      requester,
      recipientIds: new Set(targets.map((ai) => ai.id)),
      requiredResponses: targets.length,
      responses: [],
      startedAt: now(),
      status: 'in_progress',
      timeoutHandle: null
    };

    deliberations.set(deliberation.id, deliberation);

    if (deliberation.requiredResponses > 0) {
      deliberation.timeoutHandle = setTimeout(() => {
        completeDeliberation(deliberation, 'timeout');
      }, deliberationTimeoutMs);

      broadcastToAIs({
        type: 'collective_query',
        deliberationId: deliberation.id,
        message,
        requiredResponses: deliberation.requiredResponses
      }, targets);
    }

    return deliberation;
  }

  function sendAcknowledgement(ws, deliberation) {
    safeSend(ws, {
      type: 'message_received',
      messageId: deliberation.message.id,
      deliberationId: deliberation.id,
      status: deliberation.requiredResponses === 0 ? 'No registered local adapters were available.' : 'Broadcasting to local adapters.',
      requiredResponses: deliberation.requiredResponses
    });
  }

  function handleRegister(ws, message) {
    const platform = validateText(message.platform, 'platform');
    const userId = validateText(message.userId, 'userId');
    const existing = findAIBySocket(ws);

    if (existing) {
      existing.platform = platform;
      existing.userId = userId;
      existing.lastActivity = now();
      safeSend(ws, {
        type: 'registered',
        aiId: existing.id,
        platform: existing.platform,
        connectedAIs: Array.from(connectedAIs.values()).map(serializeAI)
      });
      return;
    }

    const ai = {
      id: randomUUID(),
      ws,
      platform,
      userId,
      connectedAt: now(),
      lastActivity: now()
    };
    connectedAIs.set(ai.id, ai);

    safeSend(ws, {
      type: 'registered',
      aiId: ai.id,
      platform: ai.platform,
      connectedAIs: Array.from(connectedAIs.values()).map(serializeAI)
    });
    broadcastStatus();
  }

  function handleUserMessage(ws, message) {
    const content = validateContent(message.content);
    const userId = validateText(message.userId, 'userId');
    const deliberation = createDeliberation({
      content,
      userId,
      conversationId: message.conversationId,
      platform: message.platform
    }, ws);

    sendAcknowledgement(ws, deliberation);
    if (deliberation.requiredResponses === 0) {
      completeDeliberation(deliberation, 'no_registered_adapters');
    }
  }

  function handleAIResponse(ws, message) {
    const ai = findAIBySocket(ws);
    if (!ai) {
      throw new Error('Only a registered local adapter may submit ai_response.');
    }

    const deliberationId = validateText(message.deliberationId, 'deliberationId');
    const content = validateContent(message.content);
    const deliberation = deliberations.get(deliberationId);

    if (!deliberation) {
      throw new Error('Deliberation not found.');
    }
    if (deliberation.status !== 'in_progress') {
      throw new Error('Deliberation is already complete.');
    }
    if (!deliberation.recipientIds.has(ai.id)) {
      throw new Error('This adapter was not selected for the deliberation.');
    }
    if (deliberation.responses.some((response) => response.aiId === ai.id)) {
      throw new Error('This adapter has already responded to the deliberation.');
    }

    ai.lastActivity = now();
    deliberation.responses.push({
      aiId: ai.id,
      platform: ai.platform,
      content,
      timestamp: now()
    });

    if (deliberation.responses.length >= deliberation.requiredResponses) {
      completeDeliberation(deliberation, 'all_expected_responses_received');
    }
  }

  function handleDisconnect(ws) {
    const ai = findAIBySocket(ws);
    if (!ai) return;

    connectedAIs.delete(ai.id);

    for (const deliberation of deliberations.values()) {
      if (deliberation.status !== 'in_progress' || !deliberation.recipientIds.has(ai.id)) continue;
      deliberation.recipientIds.delete(ai.id);
      deliberation.requiredResponses = deliberation.recipientIds.size;
      if (deliberation.responses.length >= deliberation.requiredResponses) {
        completeDeliberation(deliberation, 'adapter_disconnected');
      }
    }

    broadcastStatus();
  }

  function handleMessage(ws, message) {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
      throw new Error('Message must be a JSON object.');
    }

    switch (message.type) {
      case 'register':
        handleRegister(ws, message);
        break;
      case 'user_message':
        handleUserMessage(ws, message);
        break;
      case 'ai_response':
        handleAIResponse(ws, message);
        break;
      case 'status_request':
        safeSend(ws, getStatus());
        break;
      default:
        throw new Error('Unknown message type.');
    }
  }

  function getStatus() {
    return {
      type: 'status',
      status: 'local-prototype',
      connectedAIs: Array.from(connectedAIs.values()).map(serializeAI),
      totalConnections: connectedAIs.size,
      totalMessages: messageHistory.length,
      activeDeliberations: Array.from(deliberations.values()).filter((item) => item.status === 'in_progress').length,
      limitations: [
        'No authentication or authorization is implemented.',
        'All state is stored in process memory and is lost on restart.',
        'No external AI provider is connected by this relay.',
        'This relay is bound to localhost by default and is not production-ready.'
      ],
      timestamp: now()
    };
  }

  wss.on('connection', (ws) => {
    safeSend(ws, {
      type: 'welcome',
      message: 'Connected to the local Multi-AI Convergence Relay prototype.',
      timestamp: now()
    });

    ws.on('message', (rawData) => {
      try {
        const message = JSON.parse(rawData.toString());
        handleMessage(ws, message);
      } catch (error) {
        sendError(ws, error.message);
      }
    });

    ws.on('close', () => handleDisconnect(ws));
  });

  app.get('/', (_req, res) => {
    res.json({
      name: 'Multi-AI Convergence Relay',
      status: 'local-prototype',
      host,
      connectedAIs: connectedAIs.size,
      totalMessages: messageHistory.length,
      limitations: [
        'Local-only prototype',
        'No authentication',
        'No persistent storage',
        'No external AI provider integration'
      ]
    });
  });

  app.get('/api/status', (_req, res) => res.json(getStatus()));

  app.post('/api/message', (req, res, next) => {
    try {
      const content = validateContent(req.body?.content);
      const userId = validateText(req.body?.userId, 'userId');
      const deliberation = createDeliberation({
        content,
        userId,
        conversationId: req.body?.conversationId,
        platform: req.body?.platform || 'api'
      }, null);

      if (deliberation.requiredResponses === 0) {
        completeDeliberation(deliberation, 'no_registered_adapters');
      }

      res.status(202).json({
        messageId: deliberation.message.id,
        deliberationId: deliberation.id,
        status: deliberation.status,
        recipients: deliberation.requiredResponses
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _req, res, _next) => {
    res.status(400).json({ error: error.message });
  });

  function start() {
    return new Promise((resolve, reject) => {
      const onError = (error) => {
        server.off('listening', onListening);
        reject(error);
      };
      const onListening = () => {
        server.off('error', onError);
        const address = server.address();
        resolve({
          host: typeof address === 'object' && address ? address.address : host,
          port: typeof address === 'object' && address ? address.port : port
        });
      };
      server.once('error', onError);
      server.once('listening', onListening);
      server.listen(port, host);
    });
  }

  function stop() {
    for (const deliberation of deliberations.values()) {
      clearTimeout(deliberation.timeoutHandle);
    }
    return new Promise((resolve, reject) => {
      wss.close(() => {
        server.close((error) => (error ? reject(error) : resolve()));
      });
    });
  }

  return { app, server, start, stop, getStatus };
}

if (require.main === module) {
  const relay = createRelay();
  relay.start()
    .then(({ host, port }) => {
      console.log(`🔥 Multi-AI Convergence Relay local prototype listening at http://${host}:${port}`);
      console.log(`📡 WebSocket endpoint: ws://${host}:${port}`);
    })
    .catch((error) => {
      console.error('Failed to start local relay:', error.message);
      process.exitCode = 1;
    });
}

module.exports = { createRelay, DEFAULT_DELIBERATION_TIMEOUT_MS };
