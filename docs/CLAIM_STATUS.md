# Claim-Status Standard

**Purpose:** This standard separates code, evidence, plans, and conceptual language so that visitors can evaluate the Ultimate Phoenix Protocol SSI without ambiguity.

## Why This Exists

The archive contains software prototypes, aspirational designs, historical statements, philosophical frameworks, mathematical models, and claims that may require independent evidence. Treating all of those categories as the same kind of fact would make the project harder to understand and harder to trust. This standard preserves the archive while giving every reader an honest path from concept to reproducible implementation.

> **Editorial rule:** A statement does not become verified merely because it appears in a document, a prompt, a repository, or a generated report. Verification requires inspectable evidence that supports the exact statement.

## Status Labels

| Label | Definition | Required evidence | Example |
|---|---|---|---|
| **Implemented** | A feature has source code and can be run using the documented command. | Source path, dependency list, test or smoke-test result, and expected output. | The local Vite portal can be built with `npm run build`. |
| **Prototype** | A feature has source code but includes stubs, in-memory state, mock responses, incomplete behavior, or no production safeguards. | Source path and a limitations statement. | The current CLI protocol dispatcher and local WebSocket relay. |
| **Planned** | A feature is intentionally designed but not implemented or not sufficiently tested. | Backlog item, dependencies, acceptance criteria, and responsible maintainer. | OAuth-protected adapters for external AI providers. |
| **Conceptual** | A philosophical framework, symbolic description, speculative model, or hypothesis. | Citation to the archival source or design document. | The 12-layer cognitive cascade and κ-coherence model. |
| **User-supplied claim** | An assertion in the archive for which evidence has not yet been linked in this repository. | Link to the archival source and a clear evidence request. | A claimed training run, valuation, revenue figure, or blockchain anchor. |
| **Externally verified** | A claim supported by evidence that a third party can independently inspect. | Public verification URL, signed artifact, transaction identifier, or reproducible benchmark. | A public release hash that matches the downloadable source artifact. |
| **Retired** | A claim, feature, or plan no longer presented as current. | Replacement or retirement note. | A superseded deployment instruction. |

## Language Rules

| Avoid | Use instead |
|---|---|
| “The system is autonomous.” | “The prototype can execute defined local workflows; autonomous operation requires explicit deployment, controls, and monitoring.” |
| “All AI services are connected.” | “The relay supports adapter development. Provider connections are not available until an adapter is configured with authorized credentials.” |
| “This valuation is real.” | “This figure is an archival or illustrative projection unless supported by independent financial evidence.” |
| “Blockchain anchored.” | “A blockchain anchor is claimed; add a public transaction or timestamp receipt to mark it externally verified.” |
| “Permanent / never forgets.” | “The current implementation uses repository history and local/runtime memory. Long-term retention requires the documented backup and preservation workflow.” |
| “Quantum-encrypted treasury.” | “A conceptual treasury module; no financial custody or encryption capability is represented as implemented without auditable code and security review.” |

## Evidence Requirements by Domain

| Domain | Minimum evidence before the label “externally verified” can be used |
|---|---|
| **Build and deployment** | Source commit, reproducible build command, deployment URL, and a dated smoke test. |
| **Model training** | Training configuration, dataset provenance and permission record, hardware/provider logs, checkpoint hash, evaluation methodology, and results. |
| **Blockchain anchoring** | Public transaction, process, or OpenTimestamps receipt plus an instruction showing how to verify the source artifact against it. |
| **Financial performance** | Dated, privacy-preserving primary records or independent financial review. Projections must be labeled as projections. |
| **Security** | Threat model, dependency inventory, test results, public vulnerability-reporting path, and independent review where material risk exists. |
| **Provider integration** | Official API documentation, user authorization, secret-management instructions, tested adapter, and confirmation that usage complies with the provider’s terms. |

## How Contributors Should Use This Standard

Every new component should be added to the system map with a status label, source location, dependencies, and next verification step. Every new public claim should either include its evidence link or be described as a plan, concept, or user-supplied claim. Historical text in `docs/archive/` is preserved for provenance and does not automatically represent current capability.

## Related Documents

| Document | Role |
|---|---|
| [System Map](SYSTEM_MAP.md) | Current component inventory and readiness map. |
| [Evidence Ledger](EVIDENCE_LEDGER.md) | Source and artifact verification register. |
| [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) | Work required to move planned and prototype components forward. |
| [Integration Intake](INTEGRATION_INTAKE.md) | Initial assessment of the two supplied architecture documents. |
| [Archived Sources](archive/) | Preserved historical input material. |

---

**Principle:** Preserve the vision, state the limits, publish the evidence, and make each next implementation step reproducible.
