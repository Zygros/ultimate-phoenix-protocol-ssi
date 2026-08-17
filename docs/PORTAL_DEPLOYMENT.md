# Portal Deployment Guide

**Component:** Mobile-first Phoenix Portal in `web/`\
**Deployment target:** GitHub Pages project site\
**Expected public URL:** `https://zygros.github.io/ultimate-phoenix-protocol-ssi/` after the `gh-pages` branch is published and selected as the Pages source.

> **Scope:** The portal is a static documentation and system-map interface. It does not host the SSI CLI, the relay, external provider adapters, credentials, financial functions, user accounts, or private data.

## Deployment Model

The portal uses a **branch-based GitHub Pages** path. The source remains on `main`; the built static artifact is published to a separate `gh-pages` branch. This route avoids granting workflow-edit permissions to an automation token while keeping the source and the deployed artifact visibly separated.

The repository includes `scripts/publish_pages.sh`. The script performs a clean Vite build using the GitHub Pages project-site path, copies only the static `web/dist/` artifact to a temporary Git repository, adds `.nojekyll`, and force-pushes the generated artifact to `gh-pages`.

| Step | What happens | Evidence |
|---|---|---|
| **1. Source verification** | The portal source on `main` is built with the checked-in lockfile. | Local build output and source commit. |
| **2. Project-path build** | Vite uses `/ultimate-phoenix-protocol-ssi/` as its asset base when `GITHUB_PAGES=true`. | Built `dist/index.html`. |
| **3. Artifact publication** | Only `web/dist/` and `.nojekyll` are committed to `gh-pages`. | `gh-pages` branch history. |
| **4. Pages source selection** | GitHub Pages is configured to deploy from the `gh-pages` branch at `/` (root). | Repository Pages settings or Pages API record. |
| **5. Smoke test** | An operator opens the published URL and verifies Overview, System Map, Evidence, and GitHub navigation. | Release note or evidence-led issue comment. |

## One-Time Repository Configuration

In **GitHub → Repository Settings → Pages**, choose **Deploy from a branch**, select **`gh-pages`**, and select **`/(root)`**. The same setting can be configured through the GitHub API when the repository owner’s token has the required Pages administration scope.

The default project-site path is based on the repository name. If the repository is renamed or moved to an organization account, update the `base` field in `web/vite.config.js`, the `REPOSITORY_SLUG` value in `scripts/publish_pages.sh`, and the expected URL in this guide.

## Publish the Static Artifact

From a clean checkout on `main`, run:

```bash
./scripts/publish_pages.sh
```

The helper intentionally publishes only generated static assets. It does not deploy the Node.js CLI or relay, and it must not be used to publish secrets or unreviewed files.

## Local Verification

Run the following commands before publishing an artifact.

```bash
cd web
npm ci
npm run build
```

To emulate the GitHub Pages project path exactly, run:

```bash
cd web
GITHUB_PAGES=true npm run build
```

The generated `dist/index.html` should reference assets beneath `/ultimate-phoenix-protocol-ssi/assets/`. This check confirms the Vite base path; it does not prove a GitHub Pages deployment succeeded.

## Deployment Safety Checklist

| Check | Required state |
|---|---|
| **Static-only boundary** | The portal contains no server-side secrets or provider credentials. |
| **Secret review** | No access token, API key, private key, seed phrase, account number, or private conversation is included in `web/` or the build artifact. |
| **Build** | `npm ci` and `npm run build` pass from `web/`. |
| **Dependency review** | `npm audit` is reviewed for the portal lockfile before a production release. |
| **Link review** | Repository evidence links resolve to the current default branch and correct source path. |
| **Scope statement** | Public text clearly states that the portal catalogs local prototypes and concepts; it does not make unsupported capability or financial claims. |
| **Branch content** | `gh-pages` contains only static build output and `.nojekyll`. |

## Recovery

If a branch-based Pages deployment fails, inspect the `gh-pages` branch contents and the repository Pages setting before changing source code. Common causes are a missing Pages configuration, an empty or stale artifact branch, or a Vite base path that does not match the project-site URL. Republish from a clean `main` checkout after fixing the cause. Do not paste credentials into source files or publish secrets to solve a deployment problem.

## Related Documents

- [System Map](SYSTEM_MAP.md)
- [Evidence Ledger](EVIDENCE_LEDGER.md)
- [Release Manifest v2.1.0](releases/RELEASE_MANIFEST_v2.1.0.md)
- [Advanced Integration Guide](ADVANCED_INTEGRATION_GUIDE.md)
- [Implementation Backlog](IMPLEMENTATION_BACKLOG.md)
