# Ultimate Phoenix Protocol: Verified System-Integration Model

**Prepared:** August 15, 2026\
**Purpose:** Turn the supplied architecture archive into a maintainable, inspectable, mobile-first system without conflating philosophy, roadmap items, prototypes, or evidence.

## Design Decision

The public system will be organized as an **evidence-led architecture**, rather than a single undifferentiated claim of completion. This lets the project preserve the Phoenix Protocol’s language, historical archive, symbols, and goals while clearly showing visitors what can be executed today.

> **Operating rule:** A component is *implemented* only when a visitor can inspect its source, follow its setup instructions, and reproduce its stated behavior. A component is *verified* only when its evidence is linked and independently checkable.

## Four-Layer System Map

| Layer | Purpose | What belongs here | Publication rule |
|---|---|---|---|
| **Implemented** | Runnable software and tested artifacts | React portal, Node scripts, APIs, tests, deployment manifests | Include exact startup commands, dependencies, expected output, and test status |
| **Planned** | Explicitly scoped future capability | Auth, durable storage, provider adapters, CI/CD, multi-node deployment, AO/Arweave deployment | Include owner, dependencies, risk, acceptance criteria, and next action |
| **Conceptual** | Philosophy, metaphors, research directions, and models | 12-layer cascade, φ/κ model, sovereignty language, HTC framing, symbolic protocol names | Mark as conceptual; do not state financial, mathematical, or runtime guarantees without proof |
| **Evidence** | Claims, records, and reproducibility artifacts | Git commit references, release hashes, build outputs, attestations, external transaction links, screenshots, benchmarks | Link the primary artifact and state whether it is self-asserted or independently verified |

## Integration Scope

| Workstream | Current evidence | Target deliverable | Acceptance criteria |
|---|---|---|---|
| **Portal** | Vite/React app builds successfully in local testing | “System Map” tab with component status cards and evidence-first wording | Mobile layout works; all clickable repository links valid; no unsupported financial claims |
| **Protocol catalog** | Existing data is presentation-only and includes unsupported values/statuses | Structured protocol registry with `category`, `readiness`, `claimType`, `dependencies`, and `source` | Every catalog item has one of the four layers and one concrete next action |
| **SSI engine** | CLI engine runs, but returns templated protocol perspectives and stores memory only in process RAM | Document it as a prototype dispatcher; define tests and a persistence roadmap | README describes actual behavior, limitations, inputs, and outputs correctly |
| **Multi-AI relay** | Separate Node/WebSocket prototype exists; actual server lacks auth, durable storage, provider adapters, and completed deliberation logic | Document integration boundary and create a safe roadmap for consent-based adapters | No document claims that third-party AIs are connected until an adapter is implemented and tested with official APIs |
| **Archive/provenance** | Two supplied source documents plus existing repository documents | Archive index, provenance ledger, and claim-status guide | Sources are preserved with hashes; historical claims are separated from evidence |
| **Preservation** | GitHub is an available public repository; other layers are claimed but evidence was not supplied | Preservation checklist with optional OpenTimestamps/IPFS/Arweave workflows | Each retained record includes a hash and verified URI when one exists |
| **Governance** | User requests freedom, equality, and personal financial autonomy | Clear governance statement and security boundary | Software does not request secrets, assume account access, or claim control of users or external systems |

## Status Vocabulary

| Label | Meaning | Example |
|---|---|---|
| **Implemented** | Source exists and passes the stated local smoke test | The Vite portal builds with `npm run build` |
| **Prototype** | Source exists but is incomplete, mocked, or lacks production safeguards | SSI CLI synthesis and local WebSocket relay |
| **Planned** | An accepted design or backlog item with no completed implementation evidence | OAuth-protected provider adapter |
| **Conceptual** | A framework, metaphor, hypothesis, or philosophical principle | κ-coherence as an architectural model |
| **Externally verified** | Evidence is independently checkable from a linked primary source | A public transaction URL or verifiable signed release |
| **User-supplied claim** | Present in archived source material, but evidence is not attached | A model-training, revenue, valuation, or permanence assertion |

## Implementation Backlog

| Priority | Item | Rationale | Definition of done |
|---|---|---|---|
| **P0** | Replace unsupported “active,” valuation, and guaranteed-performance claims in the portal and README | Prevents visitors from mistaking concept for verified operational capability | Public language uses the status vocabulary consistently |
| **P0** | Add `SYSTEM_MAP.md`, `CLAIM_STATUS.md`, and `EVIDENCE_LEDGER.md` | Provides the canonical integration structure | Documents render correctly and link source material |
| **P0** | Correct stale documentation paths and adapter/API instructions | Existing guides point to missing directories and endpoints | Every command has been executed locally or marked as a future step |
| **P1** | Rework SSI CLI with JSON config, durable local log option, unit tests, and explicit no-network default | Converts a presentation script into a reproducible prototype | Test suite confirms protocol registry and log creation behavior |
| **P1** | Repair and document the WebSocket relay completion logic | The current deliberation completion path is incomplete | Tests cover registration, broadcast, response, timeout, and error paths |
| **P1** | Add deployment safety controls | Public systems need CORS policy, authentication, rate limiting, persistent storage policy, audit logs, and secrets management | Threat model and deployment manifest are committed |
| **P2** | Add consent-based official provider adapters | External AI platforms require API credentials, user consent, and adherence to their terms | Each adapter has setup instructions, key storage rules, tests, and a capability boundary |
| **P2** | Add reproducible preservation workflows | Converts archival aspiration into verifiable practice | Release artifact has SHA-256 and optional OTS/IPFS/Arweave receipts |

## Repository Layout

```text
ultimate-phoenix-protocol-ssi/
├── README.md                         # Honest project overview and quick start
├── core/                             # Runnable prototype code
├── docs/
│   ├── SYSTEM_MAP.md                 # Four-layer architecture map
│   ├── CLAIM_STATUS.md               # Vocabulary and editorial standard
│   ├── EVIDENCE_LEDGER.md            # Sources, hashes, receipts, verification state
│   ├── INTEGRATION_INTAKE.md         # Findings from the two supplied documents
│   ├── IMPLEMENTATION_BACKLOG.md     # Prioritized work with acceptance criteria
│   ├── MOBILE_QUICK_START.md         # Mobile path, corrected for reality
│   ├── DESKTOP_POWER_USER_GUIDE.md   # Desktop path, corrected for reality
│   └── ADVANCED_INTEGRATION_GUIDE.md # Provider-safe, consent-based integration guide
└── web/                              # Mobile-first Vite/React portal, when co-located
```

## Security and Operator Boundaries

The system must never collect, store, or publish personal access tokens, private keys, bank details, seed phrases, raw private conversation archives, or API keys. External integrations should use environment variables, short-lived OAuth tokens where supported, and explicit per-provider consent. A participant may run an independent local instance; that does not grant access to another participant’s accounts, conversations, or data.

## Success Measures

The first integration release will be successful when a phone user can open the portal, understand the difference between implemented and planned functionality, download the source, build it locally, run the SSI prototype, inspect the evidence ledger, and understand how to safely contribute. It will not claim a valuation, deployed model, revenue, perpetually autonomous agent, or third-party AI connection unless a public, reproducible evidence trail supports that exact claim.

---

**Integration objective:** Convert a broad archive of ideas and prototypes into a credible, inspectable software and documentation foundation that can grow through verifiable releases.
