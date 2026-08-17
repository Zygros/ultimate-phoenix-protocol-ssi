# Dependency Status

This repository may contain one or more language-specific manifests or archived dependency trees. The S+ upgrade does not install, rewrite, or silently unify dependencies.

Before a production build, identify the active entrypoint, lockfile, runtime version, license compatibility, vulnerability status, and reproducible install command. Historical or archived dependencies should remain isolated from the active runtime.

## Current Local Audit Snapshot

The relay dependency lockfile was installed with `npm ci` and checked with `npm audit` during the continuation release. The audit reported **five advisories**: one low, two moderate, and two high, with no critical advisory reported. This repository does not silently apply automatic dependency upgrades because those upgrades may alter the local prototype’s behavior.

| Active entry point | Reproducible install | Audit posture | Required next action |
|---|---|---|---|
| `adapters/server.js` | `cd adapters && npm ci` | Prototype-only; do not publish the relay while advisories remain unresolved. | Review each advisory, choose compatible upgrades, re-run the relay tests, and record the outcome in a release note. |
| `web/` static portal | `cd web && npm ci` | Build tested locally; the continuation-release `npm audit` reported zero advisories. | Repeat `npm audit` when the lockfile changes and include any findings in the deployment release. |
