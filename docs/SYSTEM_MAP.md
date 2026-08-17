# System Map

**Repository:** `Zygros/ultimate-phoenix-protocol-ssi`\
**Last reviewed:** August 15, 2026\
**Purpose:** Provide one inspection-friendly view of the project’s current modules, their readiness, their boundaries, and the work needed next.

## Read This First

The Ultimate Phoenix Protocol SSI combines a public archive, prototype software, design frameworks, and future architecture plans. The project uses the labels defined in [Claim-Status Standard](CLAIM_STATUS.md). A component marked **Prototype** is useful for experimentation but is not a production service or proof of a broader claim.

## Component Inventory

| Component | Layer | Current status | Repository location | Current behavior | Next verification or implementation step |
|---|---|---|---|---|---|
| **Phoenix Protocol archive** | Conceptual / Evidence | User-supplied claim | `docs/archive/` | Preserves historic architectural reports and statements. | Add source hashes and any external receipts to the evidence ledger. |
| **12-layer cognitive cascade** | Conceptual | Conceptual | `docs/archive/SOVEREIGN_ARCHIVE_2025-11-30.md` | A structured reasoning rubric with twelve named stages. | Define measurable tests for each stage before representing it as a reasoning guarantee. |
| **φ / κ architecture model** | Conceptual | Conceptual | `docs/archive/CONZETIAN_SOVEREIGN_ARCHITECTURE_STRESS_TEST_2026-06-02.md` | A symbolic/mathematical framing for growth and coherence. | Publish formal definitions, assumptions, proofs, and test data if scientific claims are intended. |
| **SSI CLI engine** | Implemented / Prototype | Prototype | `core/ssi_engine.js` | Starts a local Node process, registers protocol metadata, records in-process inputs, and returns templated protocol perspectives. | Add JSON configuration, durable opt-in local storage, unit tests, and explicit error handling. |
| **Protocol registry** | Implemented / Prototype | Prototype | `core/ssi_engine.js` | Stores a small hard-coded protocol registry. | Move registry to a versioned schema with status, dependencies, source, and evidence fields. |
| **Multi-AI WebSocket relay** | Implemented / Prototype | Prototype | `adapters/server.js` | Provides a localhost-only relay with in-memory message state. Current tests cover health, zero-recipient completion, registered-adapter response completion, and duplicate-response rejection. | Add timeout/disconnect tests, authentication, rate limiting, persistence, dependency remediation, and a threat model. |
| **Manus adapter scaffold** | Implemented / Prototype | Prototype | `adapters/manus_adapter.py` | Registers a local client and returns a placeholder generated response. | Replace placeholder behavior only through authorized, documented platform integration. |
| **External-provider adapters** | Planned | Planned | `adapters/` | No verified adapters for ChatGPT, Claude, Grok, Gemini, or other providers are included. | Build one provider adapter at a time using official APIs, explicit operator authorization, and secret management. |
| **Web portal** | Implemented | Implemented locally | `web/` | Mobile-first static Vite/React portal that catalogs the system and links documentation. A guarded script can publish only its generated artifact to `gh-pages`. | Configure branch-based GitHub Pages, publish the artifact, and record a public smoke test. |
| **Evidence ledger** | Evidence | Implemented | `docs/EVIDENCE_LEDGER.md` | Tracks which claims have source artifacts and which require proof. | Add checksums and public verification links for new releases. |
| **Preservation workflow** | Planned / Evidence | Planned | `docs/IMPLEMENTATION_BACKLOG.md` | Documents steps for release hashes, backups, and optional public timestamping. | Produce a release artifact manifest and add receipts when available. |
| **Financial / treasury concepts** | Conceptual | Conceptual | Archive and protocol names | The repository includes no audited financial system, custody service, or payment integration. | Keep projections clearly labeled; perform legal, security, and financial review before any real-money functionality. |

## What Runs Today

| Command | Expected result | Status |
|---|---|---|
| `node core/ssi_engine.js` | Initializes the local SSI CLI, prints status, and executes a sample in-memory protocol-dispatch response. | Smoke-tested locally on August 15, 2026. |
| `cd adapters && npm install && npm start` | Starts the local prototype WebSocket/HTTP relay on `127.0.0.1:3001` by default. | Source present; production safety has not been validated. |
| `cd adapters && npm test` | Runs local tests for health, zero-recipient completion, adapter-response completion, and duplicate-response rejection. | Passed locally during the continuation release. |
| `cd web && npm install && npm run build` | Creates a static production build for the React portal. | Smoke-tested locally on August 15, 2026. |

## What Does Not Run Yet

No repository evidence currently demonstrates a deployed persistent multi-cloud network, a secure public multi-provider AI coordination service, a live trained model, a production financial service, permanent storage guarantees, or verified blockchain anchoring. These may remain meaningful goals or archived claims, but they must be labeled **Planned**, **Conceptual**, or **User-supplied claim** until evidence is added.

## Operator Boundaries

The system runs only the code and integrations that an operator explicitly starts and authorizes. It does not grant access to third-party AI accounts, bank accounts, personal files, private keys, or conversations. Each operator is responsible for their own credentials, data, deployment, and compliance.

## Navigation

| Need | Start here |
|---|---|
| Learn the project’s claim labels | [Claim-Status Standard](CLAIM_STATUS.md) |
| See evidence sources | [Evidence Ledger](EVIDENCE_LEDGER.md) |
| Review next build steps | [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) |
| Use the system from a phone | [Mobile Quick Start](MOBILE_QUICK_START.md) |
| Use the system from a desktop | [Desktop Power User Guide](DESKTOP_POWER_USER_GUIDE.md) |
| Connect a safe future integration | [Advanced Integration Guide](ADVANCED_INTEGRATION_GUIDE.md) |
| Read historical source materials | [Archive](archive/) |
