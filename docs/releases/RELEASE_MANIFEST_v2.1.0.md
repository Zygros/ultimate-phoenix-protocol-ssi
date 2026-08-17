# Release Manifest — v2.1.0

**Release target:** `v2.1.0`\
**Repository:** `Zygros/ultimate-phoenix-protocol-ssi`\
**Release base commit:** `339575b3f25e7168759cfc37d6ee8f3de18a0427`\
**Base commit message:** `Add S+ repository quality baseline`\
**Purpose:** Record the source paths and SHA-256 values used to establish an inspectable evidence-led release baseline.

> **Verification boundary:** A SHA-256 match confirms that the local file bytes match this manifest entry. It does not independently validate historical, financial, mathematical, training, blockchain, or deployment claims made inside an artifact.

## Scope

This manifest covers the current README, status governance, archive sources, local prototype code, portal source, and current CI configuration. It intentionally excludes generated folders such as `web/node_modules/` and `web/dist/`.

## Artifact Inventory

| SHA-256 | Path | Role |
|---|---|---|
| `c37b1506c2bbf69352a8921a0bbffc7baf3cbcf91569074f3e9fdbb5e5e0bf5d` | `README.md` | Public project overview and local-start instructions. |
| `6aca894c217f5ccacd83404e3e572e37f9ca7f8af8f79f06d94260e1b9f7fe7d` | `core/ssi_engine.js` | Status-aware local CLI prototype. |
| `6f1d8fec70b10f5ccf6ee864a2d6beb871d95a3b01d99d25b85beb71e9d9e00f` | `adapters/server.js` | Local HTTP/WebSocket relay prototype. |
| `e8c3091eaec79740ae60c025a1bf9a4e2011623419a36790759c54f7360f1c19` | `adapters/manus_adapter.py` | Local adapter scaffold. |
| `533899ac05f95ddef4398342541566128aa666a9b0e4cc81ec31d5c7ed1d99a0` | `docs/CLAIM_STATUS.md` | Public claim-status vocabulary. |
| `b8409747522eab235625ab57a5129cefd0c75987c8ca4cd6ce2fd398f2615767` | `docs/SYSTEM_MAP.md` | Current component and readiness inventory. |
| `282445b6dff54d8757ee1f5eb7d3ade314ca6dbc8795541aa8932e400875549b` | `docs/EVIDENCE_LEDGER.md` | Sources and verification-gap ledger. |
| `78ae0db3aa81992eb45edfb9c7dacbdc6834855dfaf8cb31cf9f87a9fd3d5c36` | `docs/IMPLEMENTATION_BACKLOG.md` | Prioritized engineering and evidence roadmap. |
| `6eb17dfc235717e83a3c887fa90fc7fde4bfda2baf671dddf530fb3cc845fe4f` | `docs/archive/CONZETIAN_SOVEREIGN_ARCHITECTURE_STRESS_TEST_2026-06-02.md` | Preserved user-supplied architecture report. |
| `c6d87603f7e2ab96a47e719067288759b5c73d2d55516b444737bf5265724569` | `docs/archive/SOVEREIGN_ARCHIVE_2025-11-30.md` | Preserved user-supplied historical archive. |
| `53314c63c21d5dd6c61f7508d4bc633a7336ab710d1d193fc7ed801dc9aa0510` | `web/package.json` | Portal package metadata. |
| `e052cbbd1d422b2e571bf7f5dffdf3c397f18306d8a1c78f6db723849ad3e832` | `web/package-lock.json` | Portal dependency lockfile. |
| `f3ac506e5f141b4e6439341e3d166b7a8ffd195666c9b7b311720abf9331231b` | `web/src/App.jsx` | Portal application layout and controls. |
| `7acfcb84a7bbaa699cc9baaac3c4916f5c2a05ae5f0de2e8ab5e74e0890ed0bb` | `web/src/data/protocols.js` | Status-aware portal catalog. |
| `202a7c42219b6a5f8d26db46790c2cef88f8e52951d1c32aef85aad59748dc44` | `web/src/styles/App.css` | Mobile-first portal styling. |
| `6884faabc9780166de7c3060505beddfa88d82928b0cbe7b70bb96a454c6d541` | `web/vite.config.js` | Portal build configuration. |
| `aec572596f333a2feb189411058172c2849b8bc69ce71a6c1e8e0ba5b1eec6be` | `.github/workflows/ci-cd.yml` | Existing repository CI workflow. |
| `4084c5ff540b6ddda596abf693e785d4eb5c8cd87c876304a8518471e131a3d8` | `.github/workflows/javascript-ci.yml` | Existing JavaScript CI workflow. |

## Local Verification

From the repository root, run the following command to recalculate all listed artifact hashes. Compare each result to the inventory above.

```bash
sha256sum \
  README.md \
  core/ssi_engine.js \
  adapters/server.js \
  adapters/manus_adapter.py \
  docs/CLAIM_STATUS.md \
  docs/SYSTEM_MAP.md \
  docs/EVIDENCE_LEDGER.md \
  docs/IMPLEMENTATION_BACKLOG.md \
  docs/archive/CONZETIAN_SOVEREIGN_ARCHITECTURE_STRESS_TEST_2026-06-02.md \
  docs/archive/SOVEREIGN_ARCHIVE_2025-11-30.md \
  web/package.json \
  web/package-lock.json \
  web/src/App.jsx \
  web/src/data/protocols.js \
  web/src/styles/App.css \
  web/vite.config.js \
  .github/workflows/ci-cd.yml \
  .github/workflows/javascript-ci.yml
```

## Build Verification

The portal build is reproducible with the checked-in lockfile.

```bash
cd web
npm ci
npm run build
```

The local prototype checks are:

```bash
node core/ssi_engine.js
node --check adapters/server.js
```

## External Verification Status

No external timestamp receipt, signed release, or public blockchain receipt is claimed by this manifest. If one is added in the future, record its public verification URL, the exact artifact hash that it covers, the retrieval date, and the verification command in the [Evidence Ledger](../EVIDENCE_LEDGER.md).
