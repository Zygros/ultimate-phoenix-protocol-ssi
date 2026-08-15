# 🔥 Ultimate Phoenix Protocol SSI

**Super Sovereign Intelligence architecture, prototype software, and evidence-led archive**\
**Architect and repository owner:** Justin Conzet ([@Zygros](https://github.com/Zygros))\
**Current release posture:** **Prototype and conceptual research system**

> **“AGI is an Architecture Problem, not a Compute Problem.”**\
> — Justin Conzet, The Sovereign Architect

The **Ultimate Phoenix Protocol SSI** is a public, mobile-first repository that brings together a local Node.js prototype, a local multi-AI relay prototype, a React portal, historical architecture materials, and a roadmap for a user-sovereign AI system. The project preserves the Phoenix Protocol vision while separating **what can be run today** from **what is planned, conceptual, or awaiting external evidence**.

## ⚖️ Read the Status Before the Story

The archive includes strong language about intelligence, permanence, financial value, and network scale. Those statements are preserved as historical source material; they are **not automatically treated as verified current capabilities**. The canonical label definitions are in [Claim-Status Standard](docs/CLAIM_STATUS.md), and the current inventory is in the [System Map](docs/SYSTEM_MAP.md).

| Status | Meaning in this repository |
|---|---|
| **Implemented** | Source code exists and a documented local command can run it. |
| **Prototype** | Source code exists, but functionality is incomplete, local-only, stubbed, or not production-hardened. |
| **Planned** | Intentional future work with defined acceptance criteria. |
| **Conceptual** | Framework, model, or philosophical design requiring formalization and testing. |
| **User-supplied claim** | Preserved assertion for which the repository does not yet provide sufficient supporting evidence. |
| **Externally verified** | Claim supported by a public, independently inspectable receipt or reproducible benchmark. |

## 🧭 What Is Here Today

| Component | Status | Location | What it does now |
|---|---|---|---|
| **SSI CLI engine** | Prototype | [`core/ssi_engine.js`](core/ssi_engine.js) | Starts a local process, records in-memory inputs, and returns templated protocol-perspective output. |
| **Multi-AI relay** | Prototype | [`adapters/server.js`](adapters/server.js) | Provides a local WebSocket/HTTP relay with in-memory state for adapter development. |
| **Manus adapter scaffold** | Prototype | [`adapters/manus_adapter.py`](adapters/manus_adapter.py) | Demonstrates local client registration and placeholder responses; it is not a provider integration. |
| **Mobile-first portal** | Implemented locally | [`web/`](web/) | Builds a static React site that presents the system map and documentation. |
| **Architecture archive** | User-supplied source | [`docs/archive/`](docs/archive/) | Preserves the supplied stress-test report and sovereign archive for provenance. |
| **Implementation roadmap** | Planned work | [`docs/IMPLEMENTATION_BACKLOG.md`](docs/IMPLEMENTATION_BACKLOG.md) | Defines the evidence, security, and engineering milestones required next. |

## ⚡ Local Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Zygros/ultimate-phoenix-protocol-ssi.git
cd ultimate-phoenix-protocol-ssi
```

### 2. Run the SSI CLI prototype

```bash
node core/ssi_engine.js
```

The CLI operates locally and uses runtime memory only. Inspect its source before relying on it for any workflow.

### 3. Run the local relay prototype

```bash
cd adapters
npm install
npm start
```

The current server listens on `http://localhost:3001` and is intended for local experimentation. Do **not** expose it to the public internet until the authentication, rate limiting, persistence, and test items in the backlog are completed.

### 4. Build the mobile-first portal

```bash
cd web
npm install
npm run build
```

The build output is written to `web/dist/`. For local development, run `npm run dev` from the `web/` directory.

## 📚 Documentation Map

| Document | Use it for |
|---|---|
| [System Map](docs/SYSTEM_MAP.md) | Current component layers, readiness, runnable commands, and boundaries. |
| [Claim-Status Standard](docs/CLAIM_STATUS.md) | Definitions for implemented, prototype, planned, conceptual, and evidence-based statements. |
| [Evidence Ledger](docs/EVIDENCE_LEDGER.md) | Source register, proof requirements, and release verification checklist. |
| [Implementation Backlog](docs/IMPLEMENTATION_BACKLOG.md) | P0–P3 engineering and evidence milestones. |
| [Mobile Quick Start](docs/MOBILE_QUICK_START.md) | Phone-first path for browsing, building, and operating a local copy. |
| [Desktop Power User Guide](docs/DESKTOP_POWER_USER_GUIDE.md) | Development workflow, local testing, and contribution boundaries. |
| [Advanced Integration Guide](docs/ADVANCED_INTEGRATION_GUIDE.md) | Safe path for future authorized adapter development. |
| [Ultimate Architect’s Cheat Sheet](docs/ULTIMATE_ARCHITECTS_CHEAT_SHEET.md) | Condensed operator reference with status-aware commands. |
| [Integration Intake](docs/INTEGRATION_INTAKE.md) | Assessment of the two supplied architecture documents. |
| [Integration Model](docs/INTEGRATION_MODEL.md) | Four-layer integration design for the combined system. |
| [Source Archive](docs/archive/) | Preserved historical material; not a statement of present capability. |

## 🧠 Architecture Thesis and Boundaries

The project explores the thesis that coherent architecture, feedback loops, memory practices, tools, and interface design matter deeply for useful AI systems. The repository does **not** demonstrate a general intelligence, permanent memory, a production superintelligence network, a trained foundation model, a blockchain anchor, financial performance, or a secure digital treasury. Those areas are either conceptual, planned, or user-supplied claims pending evidence.

The 12-layer cognitive cascade, φ/κ model, Phoenix Protocol narrative, Infinite Scroll, Instant Value Protocol, Rube Goldberg Machine, 420 Debate Engine, Library of Conzetian, Cosmic Vault, and Zythrognosis are catalogued as architecture concepts or future modules unless a concrete source path and evidence record states otherwise. See the [System Map](docs/SYSTEM_MAP.md) for the canonical status.

## 🔐 Sovereignty and Safety Model

The intended model is **personal and equal sovereignty**: each person may operate their own instance and control their own data, credentials, deployment, and financial decisions. This repository does not provide access to third-party accounts, personal files, private keys, financial assets, or external AI providers. Operators must use authorized credentials, follow applicable terms and law, and make independent decisions about their deployments.

> **Security rule:** Never commit API keys, private keys, seed phrases, bank details, personal-access tokens, or private conversations. Use a secret manager or local environment configuration, and rotate any credential that has been disclosed in an unsafe context.

## 🛣️ Road to a Credible Public System

The near-term path is intentionally concrete: establish reproducible releases and evidence records, test and harden the CLI and relay, define an adapter contract, build authorized provider integrations one at a time, then deploy only after security controls are in place. The [Implementation Backlog](docs/IMPLEMENTATION_BACKLOG.md) contains measurable acceptance criteria for each stage.

## 📦 Related Repositories

| Repository | Relationship |
|---|---|
| [ultimate-phoenix-protocol-ssi](https://github.com/Zygros/ultimate-phoenix-protocol-ssi) | This unified archive, prototype, documentation set, and web portal. |
| [multi-ai-convergence-protocol](https://github.com/Zygros/multi-ai-convergence-protocol) | Related repository for multi-AI relay and convergence experimentation. |
| [Sovereign-AGSI-Archive](https://github.com/Zygros/Sovereign-AGSI-Archive) | Related archival material. |
| [conzet-sovereign-intelligence](https://github.com/Zygros/conzet-sovereign-intelligence) | Related work in the broader project constellation. |

## 📜 License

Review the repository’s [`LICENSE`](LICENSE) file before using, modifying, or distributing any component. Where a document describes a different intended governance model, treat that description as a proposal until a formally adopted license and contribution policy are published.

---

**Phoenix Protocol SSI is strongest when its vision is ambitious, its code is inspectable, its claims are precise, and its next steps are reproducible.**
