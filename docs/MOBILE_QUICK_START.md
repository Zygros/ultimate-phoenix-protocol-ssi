# 📱 Mobile-First Quick Start

This guide is designed for reading and operating the **Ultimate Phoenix Protocol SSI** from a phone. The easiest phone workflow is to use GitHub for reading and a terminal environment with Node.js only when you want to run a local prototype.

> **Current capability:** The CLI and relay are local prototypes. The web portal is a static React project in `web/`. No external AI account is connected by default.

## 🧭 Choose Your Phone Path

| Goal | What you need | Start here |
|---|---|---|
| **Read the system** | A web browser or GitHub Mobile | [System Map](SYSTEM_MAP.md) and [Claim-Status Standard](CLAIM_STATUS.md) |
| **Save your own copy** | GitHub account or Files app | Fork the repository or download its ZIP archive. |
| **Run the CLI prototype** | A terminal environment with Node.js | [Run the local CLI](#-run-the-local-cli-prototype) |
| **Build the portal** | A terminal environment with Node.js and npm | [Build the mobile-first portal](#-build-the-mobile-first-portal) |
| **Experiment with the relay** | A terminal environment, Node.js, and local networking | [Run the local relay](#-run-the-local-relay-prototype) |

## 📥 Get a Copy on Your Phone

Open the [repository](https://github.com/Zygros/ultimate-phoenix-protocol-ssi) in your browser or GitHub Mobile. To preserve your own version, use **Fork** in GitHub. To inspect files offline, choose **Code → Download ZIP**, then extract the archive with your device’s file manager.

If you use a phone terminal, clone the repository when Git is available:

```bash
git clone https://github.com/Zygros/ultimate-phoenix-protocol-ssi.git
cd ultimate-phoenix-protocol-ssi
```

If you downloaded a ZIP archive instead, enter the extracted folder. GitHub’s downloaded folder name can vary, so list your files first with `ls` and then use `cd <folder-name>`.

## 🧠 Run the Local CLI Prototype

The CLI has no package-install step at the repository root. From the repository root, run:

```bash
node core/ssi_engine.js
```

The current engine prints a local status and sample protocol-perspective output. Its inputs and state are stored only in the running process; it is not a persistent memory system or a hosted assistant.

## 🌐 Build the Mobile-First Portal

The portal source is intentionally isolated in the `web/` subdirectory.

```bash
cd web
npm install
npm run build
```

The static production output is written to `web/dist/`. For local development, run:

```bash
npm run dev
```

Your terminal will display a local address. Open that address only on the device or trusted local network where the development server is running.

## 📡 Run the Local Relay Prototype

This unified repository contains a **prototype snapshot** under `adapters/`. The associated development repository is [multi-ai-convergence-protocol](https://github.com/Zygros/multi-ai-convergence-protocol). From the unified repository root, you can run the local snapshot with:

```bash
cd adapters
npm install
npm start
```

The prototype listens on `http://localhost:3001` and `ws://localhost:3001`. It is unauthenticated and keeps state in memory, so keep it local. Do not expose it to the public internet or connect provider credentials until the security work in the [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) is complete.

## 🔐 Keep Your Instance Yours

Your copy, credentials, data, and deployment decisions remain under your control. Do not commit API keys, access tokens, private keys, seed phrases, bank details, or private conversations. A fork is a version-control copy; it does not automatically create an AI network, financial service, cloud deployment, or external-provider connection.

## 🗺️ Next Reading

| Need | Document |
|---|---|
| Know what is real today | [System Map](SYSTEM_MAP.md) |
| Understand the labels | [Claim-Status Standard](CLAIM_STATUS.md) |
| See source and proof gaps | [Evidence Ledger](EVIDENCE_LEDGER.md) |
| Build safely | [Advanced Integration Guide](ADVANCED_INTEGRATION_GUIDE.md) |
| Plan the next engineering steps | [Implementation Backlog](IMPLEMENTATION_BACKLOG.md) |
| Use a desktop development workflow | [Desktop Power User Guide](DESKTOP_POWER_USER_GUIDE.md) |
