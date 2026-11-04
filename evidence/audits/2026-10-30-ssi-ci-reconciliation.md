# SSI Phoenix and JavaScript CI reconciliation — 2026-10-30

## Scope

Additive CI repair on the existing source-probe PR branch.

- PR: [#2](https://github.com/Zygros/ultimate-phoenix-protocol-ssi/pull/2)
- Branch: `conzetian/phoenix-audit-source-probe-2026-10-23`
- Verified code head: `a73626e61a699e8b5b363514bb88bbd989fb6dbe`
- PR remains open and unmerged.

## Findings

1. The Phoenix Audit Python source probe had a `find | grep -q` pipeline that could produce a false negative under `pipefail`. It now uses `find ... -print -quit | grep -q .`.
2. The root Node audit invoked Jest over `adapters/test/server.test.js`, but that suite uses Node's built-in `node:test` API. The runner mismatch caused the suite to be interpreted incorrectly.
3. The actual Node test project is `adapters/`, with its own `package.json` and lockfile. The audit now installs that project from its lockfile and runs its native test script.
4. The old JavaScript CI workflow ran `npm ci` at the repository root despite there being no root lockfile, and masked lint/test/build failures with `|| true`.
5. The credential-pattern scanner printed full matching lines. It now emits only matching file paths, excludes `node_modules`, and suppresses matching content.
6. The first workflow update accidentally omitted the non-wrapper Gradle fallback; that fallback has been restored in the final branch head.

## Changes implemented

- Phoenix Audit now runs the adapter package's own test command after `npm ci --prefix adapters`.
- The zero-recipient HTTP regression assertion includes the response body if it fails, while retaining the expected HTTP 202 and completed-state assertions.
- The JavaScript CI workflow uses Node 20 and 22, installs root dependencies without assuming a root lockfile, installs adapter dependencies from `adapters/package-lock.json`, and runs the four real adapter tests.
- Lint is skipped only when no root ESLint configuration exists; the skip is printed explicitly. Build is run only when a root build script exists.
- The secret-pattern scan lists paths only and does not print matched source lines.
- Go, Rust, Maven, Gradle wrapper, and non-wrapper Gradle detection remain present in Phoenix Audit.

## Source blob identities

| Path | Blob SHA |
|---|---|
| `.github/workflows/phoenix-audit.yml` | `2c7b910afa34baf5e28636d35f53d70a82cbfbb7` |
| `.github/workflows/javascript-ci.yml` | `9fcbd5a2094f2b8a929ab6730a10915ea5acf191` |
| `adapters/test/server.test.js` | `009be0a189d3d39957a368ff151574ea1f531ae9` |

## Verification

### Phoenix Audit

- [PR run 41114275668](https://github.com/Zygros/ultimate-phoenix-protocol-ssi/actions/runs/41114275668): **SUCCESS**.
- [Push run 41114264121](https://github.com/Zygros/ultimate-phoenix-protocol-ssi/actions/runs/41114264121): **SUCCESS**.
- Adapter Node test suite: **4 passed, 0 failed**.
- Python compile/audit and the path-only credential scan completed successfully.
- Go, Rust, and Java checks reported explicit absence of those project types; the Gradle fallback remains configured for repositories that contain a Gradle build.

### OmniNet JavaScript CI

- [PR run 41114275575](https://github.com/Zygros/ultimate-phoenix-protocol-ssi/actions/runs/41114275575): **SUCCESS**.
- Node 20: **4 passed, 0 failed**.
- Node 22: **4 passed, 0 failed**.
- Root ESLint was explicitly skipped because no root ESLint configuration exists. Root build was conditional on a build script.

## Remaining independent workflow failure

The separate legacy [CI/CD Workflow run 41114275622](https://github.com/Zygros/ultimate-phoenix-protocol-ssi/actions/runs/41114275622) remains **FAILURE**. Its Node 18 job stops at ESLint because no ESLint configuration exists; later tests, coverage, npm audit, Trivy, and Codecov steps were skipped. The Node 14 matrix job also failed before the substantive checks. This workflow has not been weakened or represented as passing.

## Evidence boundary

- The adapter's four local integration tests passed under Node's native test runner.
- The zero-recipient route now returns the expected 202 response and reaches completed state in the test.
- No server implementation change was required for this test-runner repair.
- This record does not claim production deployment, external anchoring, a security certification, or live multi-AI model execution.
