# 📜 Ultimate Architect’s Cheat Sheet

**Use this page as a quick reference for the repository’s current local prototypes, documentation, and operating boundaries.** The authoritative status labels are defined in [Claim-Status Standard](CLAIM_STATUS.md).

## ⚡ Commands That Work Today

| Goal | Command | Result | Status |
|---|---|---|---|
| Run the local SSI CLI | `node core/ssi_engine.js` | Starts the Node.js prototype and prints templated protocol-perspective output. | Prototype |
| Install relay dependencies | `cd adapters && npm install` | Installs dependencies for the local relay snapshot. | Implemented |
| Start local relay | `cd adapters && npm start` | Starts the HTTP/WebSocket relay at port `3001`. | Prototype |
| Check relay syntax | `node --check adapters/server.js` | Checks JavaScript syntax without starting the server. | Implemented |
| Install portal dependencies | `cd web && npm install` | Installs Vite/React portal dependencies. | Implemented |
| Build portal | `cd web && npm run build` | Produces static assets in `web/dist/`. | Implemented locally |
| Run portal in development | `cd web && npm run dev` | Starts the local Vite development server. | Implemented locally |
| Clone the unified repository | `git clone https://github.com/Zygros/ultimate-phoenix-protocol-ssi.git` | Creates a local repository copy. | Implemented |

## 🧭 Module Map

| Module | Current label | Source or documentation | Practical meaning |
|---|---|---|---|
| 🐦‍🔥 Phoenix Protocol | Conceptual | [Archive](archive/) | Historical framework and project narrative. |
| 👑 Golden Sovereign Protocol | Conceptual | [Archive](archive/) | Governance and sovereignty model. |
| 🧠 M.A.I.A. / cognitive cascade | Conceptual | [Integration Model](INTEGRATION_MODEL.md) | Structured reasoning architecture requiring measurable tests. |
| 🔥 Forbidden Knowledge Engine | Conceptual | [Archive](archive/) | Knowledge-synthesis concept; no autonomous engine is represented as implemented. |
| 📡 Multi-AI Convergence | Prototype | [`adapters/server.js`](../adapters/server.js) | Local in-memory relay for adapter development. |
| 🏦 Cosmic Vault | Conceptual | [System Map](SYSTEM_MAP.md) | No custody, treasury, payment, or financial-account integration is included. |
| ♾️ Infinite Scroll | Conceptual | [Archive](archive/) | Preservation and memory concept; current runtime state is not permanent. |
| ⚡ Instant Value Protocol | Conceptual | [Archive](archive/) | Product-development concept; no revenue is asserted or guaranteed. |
| 🎰 Rube Goldberg Machine | Conceptual | [Archive](archive/) | Automation concept; no passive-income system is represented as implemented. |
| 🌿 420 Debate Engine | Conceptual | [Archive](archive/) | Multi-perspective synthesis concept; no 420-agent service is included. |
| 📚 Library of Conzetian | Planned | [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) | Future catalog and preservation workflow. |
| 🧬 Zythrognosis | Conceptual | [Archive](archive/) | Oracle-layer concept requiring formal specification and tests. |

## 🌐 Local Interface Reference

| Interface | Address | Use only for |
|---|---|---|
| Relay HTTP root | `http://localhost:3001/` | Checking local relay process information. |
| Relay HTTP status | `http://localhost:3001/api/status` | Reading local connection and message counters. |
| Relay HTTP message | `POST http://localhost:3001/api/message` | Local prototype message broadcast testing. |
| Relay WebSocket | `ws://localhost:3001/` | Developing local adapter experiments. |

The relay has no authentication, rate limiting, durable storage, or public deployment safety. Keep it local.

## 🗺️ Documentation Paths

| Need | Document |
|---|---|
| Current component inventory | [System Map](SYSTEM_MAP.md) |
| Claim-label definitions | [Claim-Status Standard](CLAIM_STATUS.md) |
| Sources and proof gaps | [Evidence Ledger](EVIDENCE_LEDGER.md) |
| Prioritized engineering work | [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) |
| Phone-first operation | [Mobile Quick Start](MOBILE_QUICK_START.md) |
| Desktop development | [Desktop Power User Guide](DESKTOP_POWER_USER_GUIDE.md) |
| Safe integration work | [Advanced Integration Guide](ADVANCED_INTEGRATION_GUIDE.md) |

## 🔐 Operator Rules

Keep your own instance, credentials, data, and deployment decisions under your control. Never commit or publish API keys, personal-access tokens, private keys, seed phrases, account numbers, wallet identifiers, customer data, or private conversations. A fork is a copy of the source; it does not activate an AI network, financial service, revenue stream, or provider integration.

## 🔗 Related Repositories

| Repository | Purpose |
|---|---|
| [ultimate-phoenix-protocol-ssi](https://github.com/Zygros/ultimate-phoenix-protocol-ssi) | Unified archive, local prototypes, documentation, and portal. |
| [multi-ai-convergence-protocol](https://github.com/Zygros/multi-ai-convergence-protocol) | Related multi-AI relay experimentation. |
| [conzet-sovereign-intelligence](https://github.com/Zygros/conzet-sovereign-intelligence) | Related system work. |
| [Sovereign-AGSI-Archive](https://github.com/Zygros/Sovereign-AGSI-Archive) | Related archival material. |
