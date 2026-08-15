# 💻 Desktop Power User Guide

This guide is for operators who want to inspect, build, and extend the **current local prototypes** in the Ultimate Phoenix Protocol SSI repository. It explains what can run now and identifies the boundary between the unified archive and future external-provider integrations.

> **Current posture:** The project contains a local CLI prototype, a local relay prototype, a static web portal, research documentation, and an evidence backlog. It does not provide a hosted AI network, financial service, trained model, or automatic provider access.

## 🧰 Prerequisites

| Tool | Needed for | Verify |
|---|---|---|
| **Git** | Cloning and contributing | `git --version` |
| **Node.js 20+** | CLI, relay, and web portal | `node --version` |
| **npm** | Relay and portal dependencies | `npm --version` |
| **Python 3** | Inspecting or extending the adapter scaffold | `python3 --version` |

## 📥 Clone the Repository

```bash
git clone https://github.com/Zygros/ultimate-phoenix-protocol-ssi.git
cd ultimate-phoenix-protocol-ssi
```

Before installing packages or running services, review [System Map](SYSTEM_MAP.md), [Claim-Status Standard](CLAIM_STATUS.md), and the relevant source file. The repository root does not need `npm install` to run the current CLI.

## 🧠 Run the Local CLI Prototype

```bash
node core/ssi_engine.js
```

The CLI loads a small hard-coded protocol registry and returns templated protocol-perspective output. Its state is in process memory and disappears when the process exits. It is an inspectable starting point, not a persistent agent or general intelligence service.

## 🌐 Build and Develop the Web Portal

The Vite/React portal lives in the `web/` subdirectory.

```bash
cd web
npm install
npm run build
```

For live development:

```bash
npm run dev
```

The production output is generated in `web/dist/`. Review the portal’s data model before changing any status labels: each public card should link to code, documentation, evidence, or an explicit future-work item.

## 📡 Run the Local Relay Prototype

The unified repository contains a snapshot under `adapters/`. The related project is [Zygros/multi-ai-convergence-protocol](https://github.com/Zygros/multi-ai-convergence-protocol); use its repository when you are working specifically on relay development.

```bash
cd adapters
npm install
npm start
```

The current local relay binds to port `3001`. The source exposes `GET /`, `GET /api/status`, `POST /api/message`, and a WebSocket endpoint at `ws://localhost:3001/`. It is unauthenticated and in-memory. Keep it on your workstation and do not make it publicly reachable.

## 🧩 Extend an Adapter Safely

Use [`adapters/manus_adapter.py`](../adapters/manus_adapter.py) only as a local protocol scaffold. It currently returns placeholder output; it does not connect to an external AI service. Any provider adapter must use an official API, operator-authorized credentials, explicit data-flow documentation, mocked tests, and environment-based secret configuration.

| Do | Do not |
|---|---|
| Use documented official APIs and service accounts that the operator controls. | Scrape consumer chat websites, automate browser sessions, or bypass provider controls. |
| Keep keys in a secret manager or local `.env` file excluded from Git. | Commit tokens, private keys, seed phrases, customer data, or personal conversations. |
| Add authentication, rate limits, tests, and a threat model before deployment. | Publish the current relay to the public internet. |
| Update the system map and evidence ledger after changes. | Present a concept, projection, or historical claim as implemented without reproducible evidence. |

## 🧪 Recommended Local Verification

Run the following checks after changing relevant components.

```bash
# CLI smoke test
node core/ssi_engine.js

# Relay syntax check
node --check adapters/server.js

# Portal production build
cd web && npm run build
```

If you change the relay, manually test registration, a user message, a response, disconnect behavior, and the completion/timeout path. The existing deliberation-completion path is a known prototype gap and should be fixed with automated tests before it is relied upon.

## 🛣️ Contribution Path

For documentation and portal updates, maintain the standards in [Claim-Status Standard](CLAIM_STATUS.md). For code changes, start with a small, reproducible issue from [Implementation Backlog](IMPLEMENTATION_BACKLOG.md), include a test or smoke-test command, and update [Evidence Ledger](EVIDENCE_LEDGER.md) if the public claim status changes.

## 🔐 Operator Responsibility

You control your own fork, deployment, data, credentials, and financial decisions. The repository supplies software and documentation—not financial custody, income guarantees, legal advice, provider authorization, or control over any other person’s instance.
