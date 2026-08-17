# 📡 Multi-AI Convergence Relay — Local Prototype

This directory contains the **local relay prototype** used by the Ultimate Phoenix Protocol SSI. It is a small Node.js HTTP/WebSocket service for testing message registration, broadcast, response collection, and template aggregation between local clients.

> **Capability boundary:** This server does not connect to Manus, ChatGPT, Claude, Grok, Gemini, or any other provider by itself. It has no authentication, persistent storage, financial functionality, browser automation, model reasoning, or production deployment safeguards.

## Current Status

| Component | Status | Current behavior |
|---|---|---|
| **HTTP/WebSocket relay** | Prototype | Binds to `127.0.0.1:3001` by default and stores all state in process memory. |
| **Deliberation completion** | Prototype, locally tested | Completes on zero recipients, all expected local adapter responses, or timeout. |
| **Adapter scaffold** | Prototype | `manus_adapter.py` demonstrates the message shape but does not provide a live provider integration. |
| **Provider adapters** | Planned | Require official APIs, explicit operator authorization, secret handling, tests, and policy review. |

## Local Start

```bash
cd adapters
npm install
npm start
```

The process listens on the local loopback interface by default.

| Interface | Address | Use |
|---|---|---|
| HTTP root | `http://127.0.0.1:3001/` | Inspect local prototype status. |
| HTTP status | `http://127.0.0.1:3001/api/status` | Read local connections and active deliberation counts. |
| HTTP message | `POST http://127.0.0.1:3001/api/message` | Submit a local prototype message. |
| WebSocket | `ws://127.0.0.1:3001/` | Register and test a local adapter client. |

## Local Test Suite

```bash
cd adapters
npm test
```

The test suite currently covers HTTP status, zero-recipient completion, registered-adapter response completion, and duplicate-response rejection. It runs entirely against local loopback sockets.

## WebSocket Contract

After receiving `welcome`, a local client can register with the relay.

```json
{
  "type": "register",
  "platform": "local-example",
  "userId": "local-operator"
}
```

A registered adapter receives `collective_query` messages and may return one response for the specified `deliberationId`.

```json
{
  "type": "ai_response",
  "deliberationId": "<id from collective_query>",
  "content": "A local adapter response."
}
```

The relay returns `collective_response` only as a **template aggregation** of local responses. It does not synthesize content using a model or external service.

## Local HTTP Example

```bash
curl -X POST http://127.0.0.1:3001/api/message \
  -H "Content-Type: application/json" \
  -d '{"content":"Local relay test","userId":"local-operator","platform":"curl"}'
```

The response confirms local acceptance and the number of connected local adapters. It does not confirm that an external provider was contacted.

## Safety Boundaries

Keep this service local. Do not expose it to the public internet, add real credentials, or route private conversations through it until the security work is complete. The open work includes authentication, an explicit origin policy, rate limiting, durable opt-in storage, timeout/disconnect test coverage, dependency remediation, observability, and a threat model.

For the full system boundary and provider-integration path, read the [Advanced Integration Guide](../docs/ADVANCED_INTEGRATION_GUIDE.md), [System Map](../docs/SYSTEM_MAP.md), and [Implementation Backlog](../docs/IMPLEMENTATION_BACKLOG.md).
