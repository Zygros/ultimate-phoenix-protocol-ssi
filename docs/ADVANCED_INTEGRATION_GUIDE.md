# 🚀 Advanced Integration Guide

**Scope:** This guide explains the interfaces that exist in the current **local relay prototype** and the safe path for building future adapters. It does not claim that third-party AI services are already connected, and it does not grant access to any provider account.

> **Prototype boundary:** The relay is unauthenticated, uses in-memory state, and is intended only for local development. Do not expose it to the public internet or connect real user data until the security and persistence work in the [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) is complete.

## 🧭 Current Architecture

| Component | Location | Status | Role |
|---|---|---|---|
| **Local relay** | `adapters/server.js` | Prototype | Receives WebSocket messages and exposes two local HTTP endpoints. |
| **Adapter scaffold** | `adapters/manus_adapter.py` | Prototype | Demonstrates local WebSocket registration and placeholder response behavior. |
| **External-provider adapter** | Not included | Planned | Must use an official API, explicit operator authorization, and secure secrets handling. |

## ⚡ Start the Local Relay

From the repository root, run the following commands.

```bash
cd adapters
npm install
npm start
```

By default, the server listens on **port 3001**.

| Interface | Local address | Current status |
|---|---|---|
| HTTP root | `http://localhost:3001/` | Implemented prototype |
| HTTP status | `http://localhost:3001/api/status` | Implemented prototype |
| HTTP message submission | `POST http://localhost:3001/api/message` | Implemented prototype |
| WebSocket | `ws://localhost:3001/` | Implemented prototype |

## 🔌 WebSocket Message Contract

A local adapter connects to `ws://localhost:3001/`. It first receives a `welcome` message and should then send a `register` message. The current protocol is small and should be treated as an implementation detail that may change.

### Register a local adapter

```json
{
  "type": "register",
  "platform": "local-example",
  "userId": "local-operator"
}
```

The relay responds with a `registered` message and broadcasts a status update. When a client submits a `user_message`, connected adapters receive a `collective_query` payload. An adapter can return an `ai_response` message using the deliberation identifier in that query.

### Return a local response

```json
{
  "type": "ai_response",
  "deliberationId": "<id received in collective_query>",
  "platform": "local-example",
  "content": "A response produced by an operator-authorized local integration."
}
```

The relay also accepts `status_request` over WebSocket. See [`adapters/server.js`](../adapters/server.js) for the exact current field names and behavior.

## 🌐 Local HTTP Endpoints

| Endpoint | Request | Current behavior | Limitations |
|---|---|---|---|
| `GET /` | None | Returns basic process and connection information. | Local-only prototype; no authentication. |
| `GET /api/status` | None | Returns connection, message, and active-deliberation counts. | No persistent history or access controls. |
| `POST /api/message` | JSON with `content`, `userId`, and optional `platform` | Stores an in-memory message and broadcasts a `collective_query` to connected clients. | Does not authenticate callers; does not create a complete deliberation record; not suitable for public use. |

### Local test request

```bash
curl -X POST http://localhost:3001/api/message \
  -H "Content-Type: application/json" \
  -d '{"content":"Local prototype test","userId":"local-operator","platform":"curl"}'
```

A response indicates that the prototype accepted the message and reports the number of currently connected clients. It does **not** prove that an external AI provider was contacted or that a collective synthesis occurred.

## 🧩 Building a Future Provider Adapter

A provider adapter should be built only after an operator selects a provider and supplies authorized credentials through a secret-management workflow. Do not automate browser sessions, scrape consumer chat interfaces, reuse personal credentials, or bypass provider controls.

| Step | Requirement |
|---|---|
| **1. Select the provider** | Use the provider’s official API and review its current documentation, pricing, data-use terms, and rate limits. |
| **2. Define data flow** | Document what prompts, outputs, metadata, and logs may leave the local machine; obtain operator consent. |
| **3. Store secrets safely** | Use environment variables or a secret manager; never hard-code or commit credentials. |
| **4. Implement the adapter contract** | Register over WebSocket, validate every inbound payload, enforce timeouts, and return structured errors. |
| **5. Test with mocks** | Add unit and integration tests using mocked provider calls before sending real requests. |
| **6. Add controls** | Require authentication, rate limiting, logging policy, and user approval before any public deployment. |
| **7. Update evidence** | Update the [System Map](SYSTEM_MAP.md), [Evidence Ledger](EVIDENCE_LEDGER.md), and claim-status label once tests are reproducible. |

## ⚠️ Known Prototype Limitations

The current relay has no authentication, rate limiting, persistence, encryption-at-rest configuration, provider adapters, or production deployment configuration. Its deliberation-completion path also requires repair and tests before it can be treated as reliable. These are tracked in [P1-03](IMPLEMENTATION_BACKLOG.md) and [P2-01 through P2-04](IMPLEMENTATION_BACKLOG.md).

## 🔐 Operator Safety Checklist

Before connecting any real provider or publishing any endpoint, confirm that you have official API access, explicit operator authorization, a secret-management path, a data-retention policy, test coverage, and a threat model. Keep all development local until those requirements are met.
