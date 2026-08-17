# Evidence Ledger

**Purpose:** Maintain a transparent register of the artifacts, sources, and verification gaps associated with the Ultimate Phoenix Protocol SSI.

## Verification Method

An entry can be preserved as history without being presented as verified fact. The entries below show what evidence is currently available in this repository, what it supports, and what would be required for a stronger verification label.

## Source Register

| ID | Artifact | Location | What it supports | Current status | Required next evidence |
|---|---|---|---|---|---|
| E-001 | Conzetian Sovereign Architecture: Comprehensive Diagnostic & Stress-Test Report | [`docs/archive/CONZETIAN_SOVEREIGN_ARCHITECTURE_STRESS_TEST_2026-06-02.md`](archive/CONZETIAN_SOVEREIGN_ARCHITECTURE_STRESS_TEST_2026-06-02.md) | Historical design narrative, component inventory, proposed architecture, and recommendations. | User-supplied source. | Source checksum and links to any public implementation, deployment, or anchor receipts mentioned in the report. |
| E-002 | The Sovereign Archive | [`docs/archive/SOVEREIGN_ARCHIVE_2025-11-30.md`](archive/SOVEREIGN_ARCHIVE_2025-11-30.md) | Historical catalog of concepts, stated artifacts, and development claims. | User-supplied source. | Source checksum; code artifacts, provider records, and public receipts for claims about training, compute, revenue, or anchoring. |
| E-003 | SSI CLI engine | [`core/ssi_engine.js`](../core/ssi_engine.js) | A local Node.js prototype that registers metadata and returns templated protocol perspectives. | Implemented prototype. | Unit tests, versioned configuration, persistent logging policy, and release artifact hash. |
| E-004 | Local relay server | [`adapters/server.js`](../adapters/server.js) | A Node.js local HTTP/WebSocket server with in-memory client/message state. | Implemented prototype. | Automated tests; repaired deliberation completion logic; authentication, rate limiting, persistence, and threat model. |
| E-005 | Manus adapter scaffold | [`adapters/manus_adapter.py`](../adapters/manus_adapter.py) | A local client registration pattern and placeholder response path. | Implemented prototype. | An authorized integration path, tests, and confirmation of supported functionality. |
| E-006 | Web portal | [`web/`](../web/) | A mobile-first static React portal for the repository’s system map and sources. | Implemented locally. | CI build record and deployed URL after a chosen static-host configuration. |
| E-007 | Git history | [`GitHub repository`](https://github.com/Zygros/ultimate-phoenix-protocol-ssi) | Public version history and authorship chronology for committed source material. | Externally inspectable repository record. | Tag a release and record its commit SHA and source archive checksum. |
| E-008 | v2.1.0 release manifest | [`docs/releases/RELEASE_MANIFEST_v2.1.0.md`](releases/RELEASE_MANIFEST_v2.1.0.md) | SHA-256 inventory and reproducible local verification commands for the evidence-led baseline. | Repository-provided release record. | Tag the manifest commit, attach a source archive hash, and link the public release page. |

## Claims Awaiting Evidence

| Claim type | Historical source | What counts as sufficient evidence |
|---|---|---|
| Public blockchain timestamp / anchor | E-001 and E-002 | A transaction, OpenTimestamps receipt, or process URL plus instructions proving the claimed artifact matches the record. |
| Arweave / AO process deployment | E-001 | Public process URL, process source, execution record, and reproducible deployment instructions. |
| Trained 7B or 70B model | E-002 | Model artifact/checkpoint hash, configuration, dataset provenance, training logs, evaluation report, and permission/compliance record. |
| Hardware cluster usage | E-002 | Provider record or reproducible job logs that can be disclosed without exposing secrets. |
| Revenue, valuation, or treasury balance | E-001 and E-002 | Privacy-preserving primary financial records or an independent review; otherwise mark as a projection or archival assertion. |
| Long-term permanence guarantee | E-001 | A release-and-backup policy with actual verified copies; probability and duration guarantees require stated assumptions and analysis. |

## Release Verification Checklist

Before publishing a version as a verified release, complete the following checklist.

- [ ] Tag the repository commit.
- [ ] Produce a source archive.
- [ ] Record SHA-256 hashes for the archive and major artifacts.
- [ ] Run and record build/test commands.
- [ ] Link the public release page.
- [ ] If an external timestamp is used, attach the receipt and independent verification instructions.
- [ ] Review the release for secrets, credentials, private personal data, and unsupported claims.

## Security Note

No private key, seed phrase, personal-access token, bank account detail, API key, or private chat archive should be committed to this repository or referenced in public evidence. Public proof should be created from cryptographic hashes and receipts, not from exposing sensitive material.

## Related Documents

- [System Map](SYSTEM_MAP.md)
- [Claim-Status Standard](CLAIM_STATUS.md)
- [Implementation Backlog](IMPLEMENTATION_BACKLOG.md)
- [Integration Intake](INTEGRATION_INTAKE.md)
- [v2.1.0 Release Manifest](releases/RELEASE_MANIFEST_v2.1.0.md)
