# Implementation Backlog

**Goal:** Move the Ultimate Phoenix Protocol SSI from a collection of archive material and local prototypes toward a reproducible, secure, and evidence-led public release.

## Priority 0: Credibility and Reproducibility

| ID | Work item | Current gap | Acceptance criteria |
|---|---|---|---|
| P0-01 | Adopt claim-status labels across public materials | The prior README and portal combined conceptual, financial, and implementation claims without a consistent status system. | README, portal, and new docs use the labels from [Claim-Status Standard](CLAIM_STATUS.md). |
| P0-02 | Maintain the evidence ledger | Sources and implementation claims need one canonical record. | Every new high-level claim links to a source, a code path, or a verification receipt. |
| P0-03 | Correct command and API documentation | Existing docs can drift from the actual project structure and server behavior. | Every command in the documentation is run locally in a clean environment or marked as untested/planned. |
| P0-04 | Secret-scanning and release review | Tokens and private data must never reach public repositories. | Add CI secret scanning and a release checklist; rotate any credential previously shared in an unsafe channel. |
| P0-05 | Publish a source release | Git history alone does not provide a complete reproducibility record. | Tagged release, source archive SHA-256, build log, and changelog entry. |

## Priority 1: Prototype Quality

| ID | Work item | Current gap | Acceptance criteria |
|---|---|---|---|
| P1-01 | Formalize the protocol registry | Protocol metadata is embedded in source and lacks standard fields. | JSON schema validates `id`, `layer`, `status`, `description`, `dependencies`, `evidence`, and `nextAction`. |
| P1-02 | Improve the SSI CLI | The CLI returns template text and uses memory only for the process lifetime. | Add command parsing, structured JSON output, optional local log storage, error handling, and unit tests. |
| P1-03 | Expand relay completion coverage | Local completion logic now covers zero-recipient completion, registered-adapter response completion, and duplicate-response rejection; timeout and disconnect paths still need coverage. | Tests cover registration, query broadcast, response collection, timeout, disconnect, synthesis behavior, and error paths. |
| P1-04 | Add storage policy | The relay uses in-memory state only; permanent storage and privacy rules are undefined. | Document data-retention policy and implement an opt-in local persistence adapter. |
| P1-05 | Add observability | Operators need meaningful runtime feedback. | Health endpoint, structured logs, diagnostics command, and no-secret telemetry policy. |

## Priority 2: Safe Integrations

| ID | Work item | Current gap | Acceptance criteria |
|---|---|---|---|
| P2-01 | Provider adapter contract | No standard agreement exists for how an external AI adapter declares capability and consent. | Versioned adapter interface with supported-provider, credential, data-flow, and error-boundary documentation. |
| P2-02 | Official API adapters | External providers are not automatically available from the local prototype. | Each adapter uses documented official APIs, operator-supplied credentials, and tests with mocked transport. |
| P2-03 | Authentication and access control | A public relay cannot safely operate without access controls. | Token/OAuth authentication, origin policy, rate limiting, audit logs, and threat model. |
| P2-04 | Deployment configuration | Multi-cloud deployment claims need real, reproducible infrastructure. | Dockerfile, environment template, host-specific guide, and deployment smoke test. |

## Priority 3: Preservation and Research

| ID | Work item | Current gap | Acceptance criteria |
|---|---|---|---|
| P3-01 | Archive-manifest expansion | The v2.1.0 manifest now records key artifact hashes; source dates and claim-status fields are not yet machine-readable for every archived item. | Machine-readable manifest with file paths, SHA-256 values, source dates, and claim statuses. |
| P3-02 | Optional timestamping workflow | Any anchor claim needs a transparent, repeatable method. | Script or documented manual workflow that creates a timestamp receipt and verification guide. |
| P3-03 | Formalize mathematical models | φ/κ statements are architectural ideas rather than fully specified scientific claims. | A separate technical note defines variables, domains, assumptions, theorems/hypotheses, and validation procedure. |
| P3-04 | Evaluate the cognitive cascade | The 12-layer framework needs observable criteria. | Benchmark plan, test prompts, scoring rubric, baseline comparison, limitations, and results. |

## Operating Cadence

A practical release sequence is to complete all P0 items first, publish a tagged evidence-led release, then complete P1 prototype quality work before exposing any network endpoint to the public internet. P2 work should be performed only after the user chooses specific providers and supplies authorized credentials through secure configuration. P3 is ongoing research and preservation work; results should be added to the evidence ledger rather than asserted in advance.

## Contribution Rule

Every pull request should identify which component layer it changes—Implemented, Prototype, Planned, Conceptual, or Evidence—and update the System Map and Evidence Ledger when the public status changes.
