import { useMemo, useState } from 'react';
import './styles/App.css';
import { protocols, evidenceItems, stats } from './data/protocols';

const repositoryUrl = 'https://github.com/Zygros/ultimate-phoenix-protocol-ssi';

function repositoryLink(path) {
  return path.endsWith('/')
    ? `${repositoryUrl}/tree/main/${path.slice(0, -1)}`
    : `${repositoryUrl}/blob/main/${path}`;
}

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'system-map', label: '🧭 System Map' },
    { id: 'evidence', label: '🔎 Evidence' },
    { id: 'github', label: '💻 GitHub' }
  ];

  return (
    <div className="app">
      <header className="header">
        <div className="header-kicker">STATUS-AWARE REPOSITORY</div>
        <h1 className="header-title">🐦‍🔥 ULTIMATE PHOENIX PROTOCOL</h1>
        <p className="header-subtitle">Architecture, local prototypes, and an evidence-led archive</p>
      </header>

      <nav className="nav" aria-label="Portal navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="content">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'system-map' && <SystemMapTab protocols={protocols} />}
        {activeTab === 'evidence' && <EvidenceTab evidenceItems={evidenceItems} />}
        {activeTab === 'github' && <GitHubTab />}
      </main>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="tab-stack">
      <section className="card hero-card">
        <div className="eyebrow">⚖️ PUBLIC CAPABILITY BOUNDARY</div>
        <h2 className="card-title">Vision preserved. Claims made inspectable.</h2>
        <div className="card-content">
          <p>
            The Ultimate Phoenix Protocol SSI brings together a mobile-first portal, a local Node.js CLI prototype,
            a local multi-AI relay prototype, architecture documents, and a practical implementation roadmap.
          </p>
          <p>
            The central thesis—<strong>“AGI is an Architecture Problem, not a Compute Problem”</strong>—is presented
            here as an architectural research position. This portal does not claim that the repository proves AGI,
            persistent memory, financial performance, or a deployed superintelligence network.
          </p>
        </div>
        <a className="primary-link" href={repositoryLink('docs/CLAIM_STATUS.md')} target="_blank" rel="noreferrer">
          ⚖️ Read the claim-status standard
        </a>
      </section>

      <section className="card">
        <h2 className="card-title">📊 Current System Posture</h2>
        <div className="stats-grid">
          <Stat label="Implemented interface" value={stats.implemented} detail="Static portal" />
          <Stat label="Local prototypes" value={stats.prototypes} detail="CLI + relay" />
          <Stat label="Planned modules" value={stats.planned} detail="Backlog tracked" />
          <Stat label="Conceptual modules" value={stats.conceptual} detail="Need specification" />
          <Stat label="Archived sources" value={stats.archivedSources} detail="Preserved inputs" />
          <Stat label="Review date" value={stats.lastReview} detail="Repository integration" />
        </div>
        <div className="status-callout">
          <span className="status-label externally-verified">⚠️ Valuation</span>
          <span>{stats.valuationStatus}</span>
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">🛠️ What You Can Run Locally</h2>
        <div className="action-list">
          <ActionRow icon="⚙️" title="SSI CLI prototype" code="node core/ssi_engine.js" detail="Templated protocol output with in-process memory only." />
          <ActionRow icon="📡" title="Local relay prototype" code="cd adapters && npm install && npm start" detail="Unauthenticated relay at localhost:3001; do not expose it publicly." />
          <ActionRow icon="🖥️" title="Portal production build" code="cd web && npm install && npm run build" detail="Builds the status-aware React portal as static files." />
        </div>
      </section>

      <section className="card">
        <h2 className="card-title">🛣️ Next Build Moves</h2>
        <div className="card-content">
          <p>
            The near-term priority is not grander claims. It is a reproducible release, repaired relay completion logic,
            test coverage, safe provider-adapter contracts, and explicit evidence for every public capability statement.
          </p>
        </div>
        <a className="secondary-link" href={repositoryLink('docs/IMPLEMENTATION_BACKLOG.md')} target="_blank" rel="noreferrer">
          🧱 Open the implementation backlog →
        </a>
      </section>
    </div>
  );
}

function SystemMapTab({ protocols }) {
  const [selectedLayer, setSelectedLayer] = useState('All');
  const layers = ['All', 'Implemented', 'Prototype', 'Planned', 'Conceptual'];
  const filteredProtocols = useMemo(
    () => protocols.filter((protocol) => selectedLayer === 'All' || protocol.layer === selectedLayer),
    [protocols, selectedLayer]
  );

  return (
    <div className="tab-stack">
      <section className="card">
        <div className="eyebrow">🧭 CANONICAL INVENTORY</div>
        <h2 className="card-title">System Map</h2>
        <div className="card-content">
          <p>
            Each card identifies the layer, readiness, claim type, and repository evidence location. A conceptual or
            planned entry is part of the architecture map, not a declaration that the capability exists today.
          </p>
        </div>
        <div className="filter-row" aria-label="Filter system map by layer">
          {layers.map((layer) => (
            <button
              key={layer}
              className={`filter-button ${selectedLayer === layer ? 'selected' : ''}`}
              type="button"
              onClick={() => setSelectedLayer(layer)}
            >
              {layer === 'All' ? '🗂️ All' : `${layerIcon(layer)} ${layer}`}
            </button>
          ))}
        </div>
      </section>

      <div className="protocol-list">
        {filteredProtocols.map((protocol) => (
          <article key={protocol.id} className={`protocol-item layer-${protocol.layer.toLowerCase()}`}>
            <div className="protocol-heading">
              <h3 className="protocol-name">{protocol.name}</h3>
              <StatusBadge label={protocol.layer} />
            </div>
            <div className="badge-row">
              <span className="meta-badge">🏷️ {protocol.category}</span>
              <span className="meta-badge">🧪 {protocol.readiness}</span>
              <span className="meta-badge claim-badge">🔎 {protocol.claimType}</span>
            </div>
            <p className="protocol-description">{protocol.description}</p>
            <a className="evidence-link" href={repositoryLink(protocol.evidence)} target="_blank" rel="noreferrer">
              🔗 Inspect evidence or source →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

function EvidenceTab({ evidenceItems }) {
  return (
    <div className="tab-stack">
      <section className="card">
        <div className="eyebrow">🔎 SOURCE REGISTER</div>
        <h2 className="card-title">Evidence Before Escalation</h2>
        <div className="card-content">
          <p>
            Historical material is preserved for provenance. A document may record an assertion without providing
            enough evidence to verify it. The Evidence Ledger defines what proof is needed for builds, model training,
            blockchain anchors, financial claims, security, and provider integrations.
          </p>
        </div>
        <a className="primary-link" href={repositoryLink('docs/EVIDENCE_LEDGER.md')} target="_blank" rel="noreferrer">
          🔎 Open the evidence ledger
        </a>
      </section>

      <div className="protocol-list">
        {evidenceItems.map((item) => (
          <article key={item.id} className="protocol-item evidence-item">
            <div className="protocol-heading">
              <h3 className="protocol-name">{item.name}</h3>
              <StatusBadge label={item.claimType} />
            </div>
            <div className="badge-row">
              <span className="meta-badge">🗂️ {item.source}</span>
            </div>
            <p className="protocol-description">{item.description}</p>
            <a className="evidence-link" href={repositoryLink(item.path)} target="_blank" rel="noreferrer">
              🔗 Open source record →
            </a>
          </article>
        ))}
      </div>

      <section className="card warning-card">
        <h2 className="card-title">🔐 Release Safety</h2>
        <div className="card-content">
          <p>
            Never place tokens, private keys, seed phrases, financial-account details, or private conversations in the
            public archive. Public verification should use source hashes and independent receipts rather than sensitive data.
          </p>
        </div>
      </section>
    </div>
  );
}

function GitHubTab() {
  const repos = [
    {
      name: 'ultimate-phoenix-protocol-ssi',
      url: repositoryUrl,
      description: 'Unified archive, local prototypes, system documentation, and this mobile-first portal.',
      status: 'Current integration target'
    },
    {
      name: 'multi-ai-convergence-protocol',
      url: 'https://github.com/Zygros/multi-ai-convergence-protocol',
      description: 'Related experimentation repository for local multi-AI relay development.',
      status: 'Related project'
    },
    {
      name: 'Sovereign-AGSI-Archive',
      url: 'https://github.com/Zygros/Sovereign-AGSI-Archive',
      description: 'Related archival material that should be interpreted using source and claim-status labels.',
      status: 'Related archive'
    },
    {
      name: 'conzet-sovereign-intelligence',
      url: 'https://github.com/Zygros/conzet-sovereign-intelligence',
      description: 'Related repository in the broader project constellation.',
      status: 'Related project'
    }
  ];

  return (
    <div className="tab-stack">
      <section className="card">
        <div className="eyebrow">💻 PUBLIC SOURCE</div>
        <h2 className="card-title">Repository Constellation</h2>
        <div className="card-content">
          <p>
            Use the unified repository as the current entry point. Related repositories are source collections or
            experiments, not evidence that every architecture concept has reached production readiness.
          </p>
        </div>
      </section>
      <div className="protocol-list">
        {repos.map((repo) => (
          <a key={repo.name} className="protocol-item repo-item" href={repo.url} target="_blank" rel="noreferrer">
            <div className="protocol-heading">
              <h3 className="protocol-name">📦 {repo.name}</h3>
              <span className="meta-badge">{repo.status}</span>
            </div>
            <p className="protocol-description">{repo.description}</p>
            <span className="evidence-link">🔗 Open repository →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ label }) {
  return <span className={`status-label ${slugify(label)}`}>{layerIcon(label)} {label}</span>;
}

function Stat({ label, value, detail }) {
  return (
    <div className="stat-item">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-detail">{detail}</div>
    </div>
  );
}

function ActionRow({ icon, title, code, detail }) {
  return (
    <div className="action-row">
      <div className="action-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <code>{code}</code>
        <p>{detail}</p>
      </div>
    </div>
  );
}

function slugify(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function layerIcon(layer) {
  const icons = {
    Implemented: '✅',
    Prototype: '🧪',
    Planned: '🧱',
    Conceptual: '💡',
    'User-supplied claim': '📌',
    'Externally verified': '🔗'
  };
  return icons[layer] || '🏷️';
}

export default App;
