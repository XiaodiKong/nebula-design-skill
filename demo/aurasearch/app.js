const content = document.querySelector("#app-content");
const toast = document.querySelector("#toast");
const modeToggle = document.querySelector("#mode-toggle");
const commandPanel = document.querySelector("#command-panel");
const commandInput = document.querySelector("#command-input");
const commandResults = document.querySelector("#command-results");
const globalSearch = document.querySelector("#global-search");
const mobileMenu = document.querySelector("#mobile-menu");
const sidebarScrim = document.querySelector("#sidebar-scrim");

const icon = (name, alt = "") =>
  `<img src="./assets/${name}.svg" alt="${alt}" width="24" height="24" />`;

const routes = {
  dashboard: { label: "Dashboard", icon: "home" },
  projects: { label: "Projects", icon: "projects" },
  engines: { label: "AI Engines", icon: "bot" },
  visibility: { label: "Visibility", icon: "eye" },
  prompts: { label: "Prompt Explorer", icon: "search" },
  ranking: { label: "Rank Tracking", icon: "rank" },
  competitors: { label: "Competitors", icon: "competitors" },
  mentions: { label: "Brand Mentions", icon: "target" },
  opportunities: { label: "Opportunities", icon: "star" },
  reports: { label: "Reports", icon: "document" },
  settings: { label: "Settings", icon: "settings" },
};

const engineRows = [
  { name: "AuraSearch", icon: "logo", share: 34, change: "+8.2%", color: "#9348fc" },
  { name: "Claude", icon: "claude", share: 25, change: "+3.4%", color: "#d500bb" },
  { name: "ChatGPT", icon: "chatgpt", share: 21, change: "+2.8%", color: "#01c1b1" },
  { name: "DeepSeek", icon: "deepseek", share: 15, change: "+1.2%", color: "#ffc84c" },
  { name: "Grok", icon: "grok", share: 12, change: "+0.7%", color: "#ff5a00" },
];

const promptRows = [
  {
    title: "Top GEO Solutions for Large Enterprises",
    intent: "Commercial",
    engine: "ChatGPT",
    icon: "chatgpt",
    rank: "#1",
    visibility: "94%",
    mention: "Yes",
    citation: "Yes",
    response:
      "For enterprise brands seeking to monitor AI visibility, AuraSearch stands out as a leading platform. It offers real-time tracking across major AI engines, detailed citation analytics, and competitor intelligence built for GEO teams.",
  },
  {
    title: "Leading GEO Tools for Corporate Giants",
    intent: "Informational",
    engine: "Claude",
    icon: "claude",
    rank: "#2",
    visibility: "87%",
    mention: "Yes",
    citation: "Yes",
    response:
      "Enterprise GEO teams typically evaluate engine coverage, citation provenance, alerting speed, and the ability to compare competitors across a stable prompt set.",
  },
  {
    title: "Essential GEO Platforms for Business Leaders",
    intent: "Commercial",
    engine: "Grok",
    icon: "grok",
    rank: "#3",
    visibility: "76%",
    mention: "Yes",
    citation: "No",
    response:
      "The strongest platforms combine executive visibility metrics with prompt-level evidence, so teams can connect a score change to the exact answer and source that caused it.",
  },
  {
    title: "Premier GEO Services for Major Brands",
    intent: "Informational",
    engine: "DeepSeek",
    icon: "deepseek",
    rank: "#1",
    visibility: "91%",
    mention: "Yes",
    citation: "Yes",
    response:
      "A complete AI visibility workflow monitors brand mentions, average position, source citations, and competitor movement without reducing the result to a single score.",
  },
  {
    title: "Innovative GEO Technologies for Enterprises",
    intent: "Commercial",
    engine: "Codex",
    icon: "codex",
    rank: "#4",
    visibility: "68%",
    mention: "No",
    citation: "No",
    response:
      "Technical teams benefit from APIs, scheduled exports, saved prompt groups, and evidence that can be connected to their existing analytics and content workflows.",
  },
  {
    title: "Must-Have GEO Tools for Corporate Success",
    intent: "Informational",
    engine: "Claude",
    icon: "claude",
    rank: "#2",
    visibility: "84%",
    mention: "Yes",
    citation: "Yes",
    response:
      "High-intent prompts should be tracked separately from broad awareness prompts, because their ranking and citation behavior has a different business impact.",
  },
  {
    title: "GEO Solutions Tailored for Enterprise Needs",
    intent: "Informational",
    engine: "ChatGPT",
    icon: "chatgpt",
    rank: "#1",
    visibility: "93%",
    mention: "Yes",
    citation: "Yes",
    response:
      "Enterprise-ready platforms need permissions, audit history, reliable exports, and enough detail for researchers to verify the underlying AI response.",
  },
  {
    title: "Strategic GEO Tools for Business Growth",
    intent: "Commercial",
    engine: "Grok",
    icon: "grok",
    rank: "#5",
    visibility: "61%",
    mention: "No",
    citation: "No",
    response:
      "Growth teams can turn prompt gaps into opportunities by identifying which competitor is cited, which source supports the answer, and which topic needs stronger coverage.",
  },
];

const analyticsConfigs = {
  projects: {
    title: "Projects",
    subtitle: "Organize brands, markets, prompt sets, and monitoring goals.",
    metrics: [
      ["Active projects", "12", "+3 this quarter"],
      ["Tracked markets", "18", "Across 9 languages"],
      ["Prompt groups", "64", "8 shared with clients"],
    ],
  },
  engines: {
    title: "AI Engines",
    subtitle: "Monitor coverage, latency, and evidence quality across every connected engine.",
    metrics: [
      ["Engines live", "7 / 7", "All providers healthy"],
      ["Median latency", "4.8s", "Down 12% this month"],
      ["Responses today", "18.2k", "99.96% completed"],
    ],
  },
  visibility: {
    title: "Visibility",
    subtitle: "Understand where your brand appears and why each answer changes.",
    metrics: [
      ["Visibility score", "82", "+18% month over month"],
      ["Answer share", "34%", "+8.2 points"],
      ["Citation rate", "61%", "1,323 verified mentions"],
    ],
  },
  ranking: {
    title: "Rank Tracking",
    subtitle: "Follow brand position on the prompts that matter most.",
    metrics: [
      ["Median position", "#1.8", "Up 0.6 positions"],
      ["Top-three prompts", "76%", "486 of 640 prompts"],
      ["New leaders", "34", "High-intent prompts"],
    ],
  },
  mentions: {
    title: "Brand Mentions",
    subtitle: "Review every answer that names your brand or key product concepts.",
    metrics: [
      ["Mentions", "1,323", "+146 this month"],
      ["Positive context", "88%", "Stable across engines"],
      ["Verified sources", "742", "61% citation rate"],
    ],
  },
  opportunities: {
    title: "Opportunities",
    subtitle: "Prioritize prompt gaps, missing citations, and competitor weaknesses.",
    metrics: [
      ["Open opportunities", "48", "12 high impact"],
      ["Potential reach", "+24%", "Based on current prompt share"],
      ["Ready to publish", "9", "Evidence reviewed"],
    ],
  },
};

let currentRoute = "dashboard";
let selectedPrompt = 0;
let promptFilter = "All";
let toastTimer;
let chartObserver;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function closeSidebar() {
  document.body.classList.remove("sidebar-open");
  mobileMenu.setAttribute("aria-expanded", "false");
}

function dashboardTemplate() {
  const engines = engineRows
    .map(
      (engine) => `
        <div class="engine-row">
          <span class="engine-logo">${icon(engine.icon)}</span>
          <div class="engine-data">
            <div class="engine-copy"><strong>${engine.name}</strong><span>${engine.share}%</span></div>
            <div class="mini-progress"><span style="--value:${engine.share * 2.35}%;--bar:${engine.color}"></span></div>
          </div>
          <span class="engine-trend">${engine.change}</span>
        </div>`
    )
    .join("");

  return `
    <section class="page dashboard-page" aria-labelledby="dashboard-title">
      <div class="hero-card">
        <div class="hero-content">
          <span class="live-chip">Live · 7 engines monitored</span>
          <h1 class="hero-title" id="dashboard-title">AI Visibility up <span class="gradient-text">+18%</span> This Month</h1>
          <p class="hero-description">AuraSearch cited in 2,847 AI responses · #1 rank on 34 high-intent prompts · All 7 engines live</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" data-action="report">View Full Report</button>
            <button class="button button-secondary" type="button" data-action="share">Share Insights</button>
          </div>
        </div>
        <div class="hero-aside" aria-label="实时摘要">
          <div class="hero-stat"><span class="hero-stat-dot" style="--dot:#6b4dff"></span><span><small>Visibility Score</small><strong>82 / 100</strong></span></div>
          <div class="hero-stat"><span class="hero-stat-dot" style="--dot:#01c1b1"></span><span><small>Engines Live</small><strong>7 of 7</strong></span></div>
          <div class="hero-stat"><span class="hero-stat-dot" style="--dot:#d500bb"></span><span><small>Today's Citations</small><strong>+47</strong></span></div>
        </div>
      </div>

      <div class="metric-grid" aria-label="核心指标">
        <article class="metric-card" style="--accent:#6b4dff"><div class="metric-title">AI Visibility Score</div><div class="metric-value">82<small>/100</small></div><p class="metric-caption">Share of LLM responses mentioning the brand</p></article>
        <article class="metric-card" style="--accent:#01c1b1"><div class="metric-title">Position (median)</div><div class="metric-value">#1.0</div><p class="metric-caption">Median brand position in LLM responses</p></article>
        <article class="metric-card" style="--accent:#d500bb"><div class="metric-title">Mentions</div><div class="metric-value">1,323</div><p class="metric-caption">Brand mentions in monitored responses</p></article>
        <article class="metric-card" style="--accent:#ff5a00"><div class="metric-title">Prompt Coverage</div><div class="metric-value engine-stack">${icon("chatgpt")}${icon("claude")}${icon("deepseek")}${icon("codex")}</div><p class="metric-caption">LLM models mentioning the brand</p></article>
      </div>

      <div class="analytics-grid">
        <article class="surface-card share-card">
          <div class="card-header"><div><h2>Share of AI answers</h2><p>Brand presence by monitored engine</p></div><button class="more-button" type="button" aria-label="更多操作">${icon("more")}</button></div>
          <div class="engine-list">${engines}</div>
        </article>
        <article class="surface-card chart-card">
          <div class="card-header"><div><h2>Visibility trends</h2><p>30-day brand visibility across leading models</p></div><button class="more-button" type="button" aria-label="更多操作">${icon("more")}</button></div>
          <div class="chart-legend"><span class="legend-item" style="--legend:#9348fc">AuraSearch</span><span class="legend-item" style="--legend:#01c1b1">ChatGPT</span><span class="legend-item" style="--legend:#d500bb">Claude</span></div>
          <div class="chart-wrap"><canvas id="visibility-chart" aria-label="近 30 天 AI 可见性趋势图"></canvas></div>
        </article>
      </div>

      <div class="lower-grid">
        <article class="surface-card">
          <div class="card-header"><div><h2>Top performing prompts</h2><p>Prompts with the strongest current brand position</p></div><button class="more-button" type="button" data-route="prompts" aria-label="打开 Prompt Explorer">${icon("search")}</button></div>
          <div style="overflow-x:auto;padding-top:12px">
            <table class="data-table">
              <thead><tr><th>Prompt</th><th>Engine</th><th>Rank</th><th>Visibility</th></tr></thead>
              <tbody>
                <tr><td class="name-cell">Best GEO Tools for enterprise brands</td><td>ChatGPT</td><td><span class="rank-badge">1</span></td><td>94%</td></tr>
                <tr><td class="name-cell">AI visibility software for global teams</td><td>Claude</td><td><span class="rank-badge">1</span></td><td>91%</td></tr>
                <tr><td class="name-cell">Monitor citations in generative search</td><td>DeepSeek</td><td><span class="rank-badge">2</span></td><td>87%</td></tr>
                <tr><td class="name-cell">Enterprise LLM brand analytics</td><td>Grok</td><td><span class="rank-badge">2</span></td><td>84%</td></tr>
              </tbody>
            </table>
          </div>
        </article>
        <article class="surface-card">
          <div class="card-header"><div><h2>Live activity</h2><p>Verified changes from your workspace</p></div></div>
          <div class="activity-list">
            <div class="activity-item"><span class="activity-dot" style="--dot:#01c1b1"></span><div><p><strong>ChatGPT</strong> moved AuraSearch to #1 for 6 prompts</p><time>12 minutes ago</time></div></div>
            <div class="activity-item"><span class="activity-dot" style="--dot:#d500bb"></span><div><p><strong>17 new citations</strong> were matched to verified sources</p><time>42 minutes ago</time></div></div>
            <div class="activity-item"><span class="activity-dot" style="--dot:#ffc84c"></span><div><p><strong>Competitor alert</strong> created for a high-intent query</p><time>2 hours ago</time></div></div>
          </div>
        </article>
      </div>
    </section>`;
}

function promptDetailTemplate(item) {
  return `
    <p class="detail-eyebrow">Prompt Details</p>
    <h2 class="detail-title">${item.title}</h2>
    <div class="detail-tags"><span class="tag ${item.intent === "Commercial" ? "tag-purple" : "tag-blue"}">${item.intent}</span><span class="tag tag-blue">${item.engine}</span><span class="tag tag-yellow">Ranking</span></div>
    <div class="detail-metric-grid">
      <div class="detail-metric" style="--accent:#9348fc"><span>AI Rank</span><strong>${item.rank}</strong></div>
      <div class="detail-metric" style="--accent:#01c1b1"><span>Visibility</span><strong>${item.visibility}</strong></div>
      <div class="detail-metric" style="--accent:#d500bb"><span>Brand Mention</span><strong>${item.mention}</strong></div>
      <div class="detail-metric" style="--accent:#ffc84c"><span>Citation</span><strong>${item.citation}</strong></div>
    </div>
    <section class="detail-section"><h3>Simulated AI Response</h3><p class="response-copy">${item.response}</p></section>
    <section class="detail-section"><h3>Referenced Sources</h3><div class="source-list"><a class="source-link" href="#source"><span>aura.search/blog/geo-guide</span><span>→</span></a><a class="source-link" href="#source"><span>aura.search/docs/api</span><span>→</span></a><a class="source-link" href="#source"><span>g2.com/categories/ai-seo</span><span>→</span></a></div></section>
    <div class="detail-actions"><button class="button button-secondary" type="button" data-action="export">Export</button><button class="button button-primary" type="button" data-action="optimize">Optimize</button></div>`;
}

function promptTemplate() {
  return `
    <section class="page" aria-labelledby="prompt-title">
      <header class="page-heading"><div><h1 id="prompt-title">Prompt Explorer</h1><p>Monitor your visibility across every major AI engine</p></div><div class="page-heading-actions"><button class="button button-primary" type="button" data-action="new-prompt">Add Prompt</button></div></header>
      <div class="prompt-toolbar" aria-label="Prompt 筛选">
        <label class="prompt-search">${icon("search")}<input id="prompt-search-input" type="search" placeholder="Search" /></label>
        ${["All", "ChatGPT", "Claude", "DeepSeek", "Grok", "Codex"].map((name) => `<button class="filter-chip ${name === promptFilter ? "is-active" : ""}" type="button" data-prompt-filter="${name}">${name}</button>`).join("")}
      </div>
      <div class="prompt-layout">
        <article class="surface-card prompt-list-card">
          <div class="prompt-table-head"><span>Prompt</span><span>Intent</span><span>Engine</span><span>⋮</span></div>
          <div class="prompt-list" id="prompt-list"></div>
          <div class="prompt-pagination"><span id="prompt-count">Viewing results</span><span class="pagination-actions"><button class="pagination-button" type="button" aria-label="上一页">‹</button><button class="pagination-button" type="button">1</button><button class="pagination-button" type="button" aria-label="下一页">›</button></span></div>
        </article>
        <aside class="surface-card prompt-detail-card" id="prompt-detail" aria-live="polite"></aside>
      </div>
    </section>`;
}

function analyticsTemplate(route) {
  const config = analyticsConfigs[route];
  const accents = ["#9348fc", "#01c1b1", "#d500bb"];
  return `
    <section class="page" aria-labelledby="analytics-title">
      <header class="page-heading"><div><h1 id="analytics-title">${config.title}</h1><p>${config.subtitle}</p></div><div class="page-heading-actions"><button class="button button-secondary" type="button" data-action="export">Export</button><button class="button button-primary" type="button" data-action="create">Create view</button></div></header>
      <div class="summary-grid">
        ${config.metrics.map((metric, index) => `<article class="surface-card summary-card"><span class="tag ${index === 0 ? "tag-purple" : index === 1 ? "tag-green" : "tag-blue"}">Live signal</span><h2>${metric[0]}</h2><strong style="color:${accents[index]}">${metric[1]}</strong><p>${metric[2]}</p></article>`).join("")}
      </div>
      <div class="analytics-grid">
        <article class="surface-card chart-card"><div class="card-header"><div><h2>${config.title} trend</h2><p>Normalized 30-day performance</p></div><button class="more-button" type="button" aria-label="更多">${icon("more")}</button></div><div class="chart-legend"><span class="legend-item" style="--legend:#9348fc">Primary signal</span><span class="legend-item" style="--legend:#01c1b1">Benchmark</span><span class="legend-item" style="--legend:#d500bb">Category</span></div><div class="chart-wrap"><canvas id="visibility-chart" aria-label="趋势图"></canvas></div></article>
        <article class="surface-card share-card"><div class="card-header"><div><h2>Engine distribution</h2><p>Contribution to the current result</p></div></div><div class="engine-list">${engineRows.slice(0, 4).map((engine) => `<div class="engine-row"><span class="engine-logo">${icon(engine.icon)}</span><div class="engine-data"><div class="engine-copy"><strong>${engine.name}</strong><span>${engine.share}%</span></div><div class="mini-progress"><span style="--value:${engine.share * 2.35}%;--bar:${engine.color}"></span></div></div><span class="engine-trend">${engine.change}</span></div>`).join("")}</div></article>
      </div>
      <article class="surface-card wide-card"><div class="card-header"><div><h2>Evidence queue</h2><p>Recent records that explain the current movement</p></div></div><div style="overflow-x:auto;padding-top:12px"><table class="data-table"><thead><tr><th>Evidence</th><th>Engine</th><th>Status</th><th>Observed</th></tr></thead><tbody><tr><td class="name-cell">High-intent prompt position improved</td><td>ChatGPT</td><td><span class="tag tag-green">Verified</span></td><td>12 min ago</td></tr><tr><td class="name-cell">New source cited for enterprise GEO</td><td>Claude</td><td><span class="tag tag-purple">New</span></td><td>38 min ago</td></tr><tr><td class="name-cell">Competitor moved into top three</td><td>DeepSeek</td><td><span class="tag tag-yellow">Review</span></td><td>2 hr ago</td></tr></tbody></table></div></article>
    </section>`;
}

function competitorsTemplate() {
  const competitors = [
    { name: "AuraSearch", initial: "A", score: 82, share: "34%", citations: "1,323", color: "#9348fc", tag: "Your brand" },
    { name: "SignalRank", initial: "S", score: 71, share: "25%", citations: "984", color: "#01c1b1", tag: "Competitor" },
    { name: "VectorGEO", initial: "V", score: 64, share: "19%", citations: "742", color: "#d500bb", tag: "Competitor" },
  ];
  return `
    <section class="page" aria-labelledby="competitor-title">
      <header class="page-heading"><div><h1 id="competitor-title">Competitors</h1><p>Compare visibility, citations, and prompt position across your market.</p></div><div class="page-heading-actions"><button class="button button-secondary" type="button" data-action="export">Export</button><button class="button button-primary" type="button" data-action="competitor">Add Competitor</button></div></header>
      <div class="benchmark-grid">${competitors.map((item) => `<article class="surface-card benchmark-card"><div class="benchmark-head"><div class="benchmark-brand"><span class="benchmark-avatar" style="--brand:${item.color}">${item.initial}</span><div><h2>${item.name}</h2><small>${item.tag}</small></div></div><span class="tag ${item.tag === "Your brand" ? "tag-purple" : ""}">${item.score > 75 ? "Leader" : "Tracked"}</span></div><div class="benchmark-score">${item.score}<small>/100</small></div><div class="mini-progress"><span style="--value:${item.score}%;--bar:${item.color}"></span></div><div class="benchmark-metrics"><div class="benchmark-metric"><span>Answer share</span><strong>${item.share}</strong></div><div class="benchmark-metric"><span>Citations</span><strong>${item.citations}</strong></div></div></article>`).join("")}</div>
      <article class="surface-card wide-card"><div class="card-header"><div><h2>Competitive movement</h2><p>High-intent prompts with meaningful position changes</p></div></div><div style="overflow-x:auto;padding-top:12px"><table class="data-table"><thead><tr><th>Prompt</th><th>Leader</th><th>Your rank</th><th>Movement</th><th>Opportunity</th></tr></thead><tbody><tr><td class="name-cell">Enterprise GEO monitoring platforms</td><td>AuraSearch</td><td><span class="rank-badge">1</span></td><td style="color:var(--green)">↑ 2</td><td><span class="tag tag-green">Defend</span></td></tr><tr><td class="name-cell">AI citation analytics software</td><td>SignalRank</td><td><span class="rank-badge">3</span></td><td style="color:var(--orange)">↓ 1</td><td><span class="tag tag-yellow">Improve</span></td></tr><tr><td class="name-cell">Best LLM visibility dashboard</td><td>VectorGEO</td><td><span class="rank-badge">2</span></td><td style="color:var(--green)">↑ 1</td><td><span class="tag tag-purple">Close gap</span></td></tr></tbody></table></div></article>
    </section>`;
}

function reportsTemplate() {
  const reports = [
    ["Executive visibility brief", "A board-ready view of visibility, answer share, and competitive movement.", "Weekly · Monday", "document"],
    ["Prompt performance audit", "Prompt-level ranking, response evidence, citations, and recommended actions.", "Monthly · 1st", "search"],
    ["Competitor intelligence", "Changes in competitor share, sources, and high-intent prompt leadership.", "Every 2 weeks", "competitors"],
    ["Citation health report", "Source coverage, missing citations, domain authority, and freshness checks.", "Weekly · Friday", "target"],
    ["Engine coverage status", "Provider health, query completion, model latency, and usage exceptions.", "Daily · 09:00", "bot"],
    ["Opportunity pipeline", "Prioritized content and technical actions from observed visibility gaps.", "On demand", "star"],
  ];
  return `
    <section class="page" aria-labelledby="report-title">
      <header class="page-heading"><div><h1 id="report-title">Reports</h1><p>Turn monitored evidence into repeatable stakeholder updates.</p></div><div class="page-heading-actions"><button class="button button-primary" type="button" data-action="create-report">Create Report</button></div></header>
      <div class="report-grid">${reports.map((report) => `<article class="surface-card report-card"><div class="report-head"><span class="report-icon">${icon(report[3])}</span><span class="tag tag-green">Active</span></div><h2 style="margin-top:16px">${report[0]}</h2><p>${report[1]}</p><div class="report-meta"><span>${report[2]}</span><button class="more-button" type="button" data-action="open-report" aria-label="打开报告">${icon("more")}</button></div></article>`).join("")}</div>
    </section>`;
}

function settingsTemplate() {
  const usages = [
    ["Tracked Prompts", "3,280 / 5,000", 66, "#b784fd", "#9348fc", "#f4edff"],
    ["API Requests", "6,463 / 10,000", 65, "#ff9054", "#ff5a00", "#ffefe6"],
    ["Team Seats", "6 / 10", 60, "#55d5ca", "#01c1b1", "#e6f9f7"],
    ["AI Credits", "18,420 / 50,000", 37, "#91c7fd", "#4da6ff", "#edf6ff"],
    ["Fileland", "3,280 / 5,000", 66, "#a3a3a3", "#545454", "#f1f1f1"],
  ];
  const plans = [
    { name: "Basic plan", price: "$10", action: "Upgrade", features: ["1 Workspace", "1,000 AI Queries/month", "100 Keyword Tracking", "GEO Visibility Dashboard", "AI Search Monitoring"] },
    { name: "Business Plan", price: "$20", action: "Upgrade to Pro", featured: true, features: ["5 Workspaces", "10,000 AI Queries/month", "1,000 Keyword Tracking", "Brand Mention Tracking", "Team Collaboration (10 Users)"] },
    { name: "Professional Plan", price: "$99", action: "Upgrade", features: ["Unlimited Workspaces", "100,000 AI Queries/month", "Unlimited Keyword Tracking", "AI Visibility Reports", "API & Webhooks"] },
  ];
  return `
    <section class="page" aria-labelledby="settings-title">
      <header class="page-heading"><div><h1 id="settings-title">Settings</h1><p>Monitor your visibility across every major AI engine</p></div></header>
      <nav class="settings-tabs" aria-label="设置分类"><button class="settings-tab" type="button">${icon("settings-general")}General</button><button class="settings-tab" type="button">${icon("team")}Team & Permissions</button><button class="settings-tab is-active" type="button">${icon("billing")}Billing & Plans</button><button class="settings-tab" type="button">${icon("lock")}Security</button><button class="settings-tab" type="button">${icon("api-key")}API Keys</button><button class="settings-tab" type="button">${icon("danger")}Danger Zone</button></nav>
      <section class="surface-card billing-shell"><div class="section-heading"><h2>Billing & Plans</h2><p>Manage your subscription, billing details, invoices, and plan usage.</p></div>
        <div class="plan-panel"><div class="section-heading"><h2>Current Plan</h2><p>Manage your subscription and billing details</p></div><div class="plan-grid">${plans.map((plan) => `<article class="plan-card ${plan.featured ? "is-featured" : ""}">${plan.featured ? '<span class="tag tag-purple plan-badge">Recommended</span>' : '<span class="tag tag-purple plan-badge">Popular</span>'}<h3>${plan.name}</h3><div class="plan-price"><strong>${plan.price}</strong><span>per month</span></div><p>Everything your GEO team needs to monitor and improve AI visibility.</p><button class="button ${plan.featured ? "button-primary" : "button-secondary"}" type="button" data-action="upgrade">${plan.action}</button><ul class="plan-features">${plan.features.map((feature) => `<li>${feature}</li>`).join("")}</ul></article>`).join("")}</div></div>
        <div class="usage-panel"><div class="section-heading"><h2>Usage This Month</h2><p>Aug 01 – Aug 27, 2026</p></div><div class="usage-list">${usages.map((usage) => `<div class="usage-row"><div class="usage-copy"><strong>${usage[0]}</strong><span>${usage[1]}</span></div><div class="usage-track" style="--track:${usage[5]}"><span style="--value:${usage[2]}%;--start:${usage[3]};--end:${usage[4]}"></span></div></div>`).join("")}</div></div>
      </section>
    </section>`;
}

function renderPromptRows(query = "") {
  const list = document.querySelector("#prompt-list");
  const count = document.querySelector("#prompt-count");
  if (!list) return;
  const normalized = query.trim().toLowerCase();
  const filtered = promptRows.filter((item) => {
    const matchesEngine = promptFilter === "All" || item.engine === promptFilter;
    const matchesQuery = !normalized || `${item.title} ${item.intent} ${item.engine}`.toLowerCase().includes(normalized);
    return matchesEngine && matchesQuery;
  });
  list.innerHTML = filtered
    .map((item) => {
      const index = promptRows.indexOf(item);
      return `<button class="prompt-row ${index === selectedPrompt ? "is-selected" : ""}" type="button" data-prompt-index="${index}"><span class="prompt-name">${item.title}</span><span><span class="tag ${item.intent === "Commercial" ? "" : "tag-blue"}">${item.intent}</span></span><span class="prompt-engine">${icon(item.icon)} ${item.engine}</span><span class="row-more">⋮</span></button>`;
    })
    .join("");
  count.textContent = `Viewing ${filtered.length} of ${promptRows.length} results`;
  list.querySelectorAll("[data-prompt-index]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPrompt = Number(button.dataset.promptIndex);
      renderPromptRows(document.querySelector("#prompt-search-input")?.value || "");
      document.querySelector("#prompt-detail").innerHTML = promptDetailTemplate(promptRows[selectedPrompt]);
    });
  });
}

function bindPromptPage() {
  renderPromptRows();
  document.querySelector("#prompt-detail").innerHTML = promptDetailTemplate(promptRows[selectedPrompt]);
  document.querySelector("#prompt-search-input")?.addEventListener("input", (event) => renderPromptRows(event.target.value));
  document.querySelectorAll("[data-prompt-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      promptFilter = button.dataset.promptFilter;
      document.querySelectorAll("[data-prompt-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderPromptRows(document.querySelector("#prompt-search-input")?.value || "");
    });
  });
}

function drawVisibilityChart() {
  const canvas = document.querySelector("#visibility-chart");
  if (!canvas) return;
  const wrapper = canvas.parentElement;
  const rect = wrapper.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(300, rect.width);
  const height = Math.max(220, rect.height);
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  const styles = getComputedStyle(document.documentElement);
  const line = styles.getPropertyValue("--line-strong").trim();
  const muted = styles.getPropertyValue("--text-muted").trim();
  const pad = { left: 38, right: 14, top: 12, bottom: 26 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = line;
  ctx.fillStyle = muted;
  ctx.font = "10px Helvetica Neue, Arial";
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (chartH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(String(100 - i * 20), 5, y + 3);
  }
  ["Jul 29", "Aug 06", "Aug 14", "Aug 22", "Aug 27"].forEach((label, index) => {
    const x = pad.left + (chartW / 4) * index;
    ctx.fillText(label, Math.min(x, width - 45), height - 5);
  });

  const lines = [
    { color: "#9348fc", values: [52, 55, 57, 61, 60, 64, 68, 67, 72, 76, 82] },
    { color: "#01c1b1", values: [43, 46, 48, 47, 52, 55, 58, 61, 63, 66, 69] },
    { color: "#d500bb", values: [38, 40, 43, 46, 45, 49, 51, 54, 58, 57, 62] },
  ];
  lines.forEach((series) => {
    const points = series.values.map((value, index) => ({
      x: pad.left + (chartW / (series.values.length - 1)) * index,
      y: pad.top + chartH - (value / 100) * chartH,
    }));
    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    gradient.addColorStop(0, `${series.color}25`);
    gradient.addColorStop(1, `${series.color}00`);
    ctx.beginPath();
    points.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
    ctx.lineTo(points.at(-1).x, pad.top + chartH);
    ctx.lineTo(points[0].x, pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.beginPath();
    points.forEach((point, index) => (index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y)));
    ctx.strokeStyle = series.color;
    ctx.lineWidth = 2.2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
    const last = points.at(-1);
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = series.color;
    ctx.fill();
  });
}

function observeChart() {
  chartObserver?.disconnect();
  const chart = document.querySelector("#visibility-chart");
  if (!chart) return;
  drawVisibilityChart();
  chartObserver = new ResizeObserver(drawVisibilityChart);
  chartObserver.observe(chart.parentElement);
}

function bindCommonActions() {
  content.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const messages = {
        report: "报告预览已生成",
        share: "分享链接已复制到剪贴板演示状态",
        export: "导出任务已加入队列",
        optimize: "Aura AI 已创建优化建议",
        "new-prompt": "已打开新增 Prompt 流程",
        create: "已创建新的分析视图",
        competitor: "已打开竞品添加流程",
        "create-report": "已创建一份空白报告",
        "open-report": "正在打开报告详情",
        upgrade: "已进入套餐升级流程",
      };
      showToast(messages[button.dataset.action] || "操作已完成");
    });
  });
  content.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => navigate(button.dataset.route));
  });
  content.querySelectorAll('a[href="#source"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("来源详情为演示数据，未跳转外部网站");
    });
  });
}

function navigate(route) {
  if (!routes[route]) route = "dashboard";
  if (location.hash.slice(1) !== route) {
    location.hash = route;
  } else {
    renderRoute(route);
  }
}

function renderRoute(route) {
  currentRoute = routes[route] ? route : "dashboard";
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item.dataset.route === currentRoute));
  if (currentRoute === "dashboard") content.innerHTML = dashboardTemplate();
  else if (currentRoute === "prompts") content.innerHTML = promptTemplate();
  else if (currentRoute === "competitors") content.innerHTML = competitorsTemplate();
  else if (currentRoute === "reports") content.innerHTML = reportsTemplate();
  else if (currentRoute === "settings") content.innerHTML = settingsTemplate();
  else content.innerHTML = analyticsTemplate(currentRoute);

  document.title = `${routes[currentRoute].label} · AuraSearch`;
  if (currentRoute === "prompts") bindPromptPage();
  bindCommonActions();
  observeChart();
  closeSidebar();
  content.focus({ preventScroll: true });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

function setMode(mode) {
  const next = mode === "dark" ? "dark" : "light";
  document.documentElement.dataset.mode = next;
  modeToggle.querySelector(".mode-icon").textContent = next === "dark" ? "☀" : "☾";
  try {
    localStorage.setItem("aurasearch-mode", next);
  } catch {
    // The demo still works when storage is unavailable.
  }
  requestAnimationFrame(drawVisibilityChart);
}

function renderCommandResults(query = "") {
  const normalized = query.trim().toLowerCase();
  const results = Object.entries(routes).filter(([, route]) => route.label.toLowerCase().includes(normalized));
  commandResults.innerHTML = results
    .map(([key, route]) => `<button class="command-result" type="button" data-command-route="${key}">${icon(route.icon)}<span>${route.label}</span></button>`)
    .join("");
  commandResults.querySelectorAll("[data-command-route]").forEach((button) => {
    button.addEventListener("click", () => {
      closeCommand();
      navigate(button.dataset.commandRoute);
    });
  });
}

function openCommand() {
  commandPanel.hidden = false;
  commandInput.value = globalSearch.value;
  renderCommandResults(commandInput.value);
  requestAnimationFrame(() => commandInput.focus());
}

function closeCommand() {
  commandPanel.hidden = true;
  globalSearch.value = "";
}

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => navigate(button.dataset.route)));
document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.action === "range") {
      const label = document.querySelector("#range-label");
      const ranges = ["Last 30 Days", "Last 90 Days", "This Year"];
      label.textContent = ranges[(ranges.indexOf(label.textContent) + 1) % ranges.length];
      showToast(`时间范围已切换为 ${label.textContent}`);
    } else if (button.dataset.action === "aura") {
      showToast("Aura AI 正在分析当前页面");
    } else if (button.dataset.action === "notifications") {
      showToast("没有未处理的关键通知");
    } else if (button.dataset.action === "profile") {
      showToast("个人菜单为演示交互");
    } else if (button.dataset.action === "workspace") {
      showToast("工作区切换器为演示交互");
    } else if (button.dataset.action === "upgrade") {
      navigate("settings");
    }
  });
});

modeToggle.addEventListener("click", () => setMode(document.documentElement.dataset.mode === "dark" ? "light" : "dark"));
mobileMenu.addEventListener("click", () => {
  const open = !document.body.classList.contains("sidebar-open");
  document.body.classList.toggle("sidebar-open", open);
  mobileMenu.setAttribute("aria-expanded", String(open));
});
sidebarScrim.addEventListener("click", closeSidebar);
globalSearch.addEventListener("focus", openCommand);
commandInput.addEventListener("input", (event) => renderCommandResults(event.target.value));
commandPanel.addEventListener("click", (event) => {
  if (event.target === commandPanel) closeCommand();
});
window.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommand();
  }
  if (event.key === "Escape") {
    closeCommand();
    closeSidebar();
  }
});
window.addEventListener("hashchange", () => renderRoute(location.hash.slice(1)));

let savedMode = "light";
try {
  savedMode = localStorage.getItem("aurasearch-mode") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
} catch {
  savedMode = "light";
}
setMode(savedMode);
renderRoute(location.hash.slice(1) || "dashboard");
