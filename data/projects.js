// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
  { date: '2026-04-03', task: 'T1 Headlines: Experiments page live (docs/experiments/index.html) — 8 suggestion cards auto-generated from analysis findings, Export PNG button added. Mann-Whitney tests added for sports/biz subtopic comparisons; politics rigor warning suppressed when n=0. SmartNews "Here\'s" finding downgraded to directional throughout (tile, table, callout, practical guidance). Build report fully clean: 6 ✓ checks, 3 informational engagement-outlier warnings (Tarrow source data issue).', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'Gary Tools: Charlotte Home Buyers Guide stress-test complete. Tool caught stale FY2025 tax rate ($966.20 vs correct $985.40) that human editor missed. Revaluation timing and causal chain framing flagged correctly. Gary reported results to Chris.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-03', task: 'Gary Tools: Pierce inserted into email chain with 4 questions for Gary (confidence scoring methodology, severity calibration by content type, article-level vs claim-level output, reproducibility across runs). Sara Vallone looped in via Slack to define editorial parameters — awaiting her response.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-03', task: 'PRD V0.3 delivered to Chris Palo. Includes full four-pipeline model (T1 automated, T2 app-based, T3 canonical/repackaging, T4 Discover), CSA ideal end state, system requirements for all pipeline stages, Content Graph (deferred per Chris), and Operations Layer. Sara Vallone input still needed for writer/editor experience section.', project: '#9 PRD Revisions' },
  { date: '2026-04-03', task: 'Content standards routing annotations added to §1 of General Guidelines: AGENT-AUDIENCE tags (general-style, headline, seo, human-only). General style doc sent to Susannah Locke to upload as CSA admin. H1 enforcement (PGS-135) pending Susannah prompt-level fix.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-03', task: '2 additional personas received from Sara Vallone. All 5 personas sent to Susannah Locke to pin for all National accounts (Discover Browser already saved; PGS-133 tickets 4 additional). Apple News + Smart News personas still pending Sara → Andy review.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-03', task: 'CSA core section drafted for PRD: input signals, personas/formats/keywords governing generation, output standards, ideal end state, feedback loop, "control room" model.', project: '#9 PRD Revisions' },
  { date: '2026-04-03', task: 'Mode 1 vs Mode 2 fully understood and documented. Mode determined by workflow entry point (URL import = Mode 1 Publication Ready; Research Draft = Mode 2 expanded). National team not treated differently. No further investigation needed.', project: '#13 System Prompts / Mode 1 & Mode 2' },
  { date: '2026-04-01', task: 'P6 cluster alignment meeting complete. Cluster tagging strategy settled. Variant linking and full schema enablement now in product/dev team\'s hands.', project: '#6 Content Cluster / Tagging Taxonomy' },
  { date: '2026-04-01', task: 'T1 analysis complete: 8 findings live (incl. ANP bottom-performer analysis), 4-tile playbook, weekly ANP cadence from Tarrow established. Sarah Price request fulfilled.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-02', task: '5 personas codified in csa-content-standards (v1.3.6) and forwarded to Susannah Locke to pin for all National CSA accounts: Discover Browser, Curious Optimizer, Wonder-Driven Science Enthusiast, Curious Explorer, Watercooler Insider. Sara Vallone confirmed. Apple News + Smart News personas pending — Sara drafting, Andy to review before use.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-02', task: '5 new T1 headline findings added via exhaustive cross-platform analysis (8→13 total): MSN Formula Divergence, Formula × Topic Interaction, SmartNews Cross-Platform Formula Trap, Notification Outcome Language, Notification Send-Time. March Tarrow data ingested. Playbook expanded to 5 tiles (added MSN Formula tile). Sarah Price confirmed she has the site link and is reviewing.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-01', task: '3 target audience personas consolidated from CSA data and passed to Sara Vallone to refine and/or pair with additional ones for codification in CSA.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-01', task: 'Gary Tools: Gary Kirwan shared claims validation reports (US Weekly, Women\'s World). Chris Palo confirmed integration direction and provided operational requirements (error tracking, corrections, override reporting chain). API key + endpoint docs still pending from Gary.', project: '#10 Gary Tools Integration' },
  { date: '2026-03-31', task: 'Canonical ID = Cluster ID confirmed by Chris, Sara Vallone, and Susannah. CSA articles are siblings (not parent/child). Variant linking dev request logged.', project: '#6 Content Cluster / Tagging Taxonomy' },
  { date: '2026-03-31', task: 'PGS-95 Google Discover Explainer format confirmed LIVE. AI disclaimer removal decided: manual Q step, not automatic (PGS-114 logged). Editable notes field confirmed functional.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-03-31', task: 'MSN full-year 2025 + SmartNews 2026 category columns fully wired into analysis pipeline. Both Tarrow data items now complete.', project: '#3 T1 Headlines Analysis' },
];


export const TIERS = [
  { id: 1, name: 'Foundation',       desc: 'Unblocks everything downstream' },
  { id: 2, name: 'Understanding',    desc: 'Parallel investigative work — feeds strategy & PRD' },
  { id: 3, name: 'Strategy & Schema',desc: 'Decisions that govern the build phase' },
  { id: 4, name: 'Build',            desc: 'Active implementation — unblocks once Tier 3 resolves' },
  { id: 5, name: 'Optimize & Extend',desc: 'Experimentation and extension — requires Tier 4 outputs' },
  { id: 0, name: 'Hold',             desc: 'Waiting on external decision — do not start' },
];

export const PROJECTS = {

  // ── TIER 1 ────────────────────────────────────────────────────────────────

  'p1-access': {
    id: 'p1-access', num: '1', tier: 1, type: 'project', status: 'in-progress',
    name: 'Platform Access & Training',
    owner: 'Pierce',
    description: 'API access and onboarding for all platforms the team uses. Determines architecture for Projects 2 and 7. Gary API key unlocks Project 10.',
    systems: [
      { name: 'Snowflake / Sigma', status: 'pending', note: 'Snowflake login resolved by IT. Next: schedule Chad Bruton walkthrough of growth_and_strategy_role data. Sigma viewer access granted 2026-03-30. API credentials (OAuth2 for dashboard adapter) still needed from Chad/IT.' },
      { name: 'CUE', status: 'done', note: 'Access in hand.' },
      { name: 'WordPress', status: 'done', note: 'Full access as of 2026-03-28.' },
      { name: 'Google Sheets API', status: 'done', note: 'Manual metrics bridge in place via data/manual-metrics.js + seedMetrics() in csa-dashboard — no API key needed for current use.' },
      { name: 'Amplitude', status: 'pending', note: 'IT claimed access granted 2026-03-31 — still inaccessible. Pierce replied; awaiting IT follow-up. CSA eng team has a separate p-tagging bug (CUE/WP tag format mismatch) — their fix, not a Pierce action item.' },
      { name: 'Marfeel', status: 'pending', note: 'IT claimed access granted 2026-03-31 — still inaccessible (no account, dashboard, or API). Pierce replied; awaiting IT follow-up. Also ask: why was Apple filter removed from main interface (Mar 2026)? Sarah Price\'s custom dashboard is now the only accurate Apple view.' },
      { name: 'Gary API', status: 'pending', note: 'Gary Kirwan to deliver API endpoint docs + McClatchy API key. Blocks Project 10.' },
      { name: 'SemRush', status: 'pending', note: 'IT claimed access granted 2026-03-31 — still inaccessible. Pierce escalated directly to SEMrush team 2026-04-03; awaiting reply.' },
      { name: 'MAIA', status: 'done', note: 'Access in hand.' },
      { name: 'BitBucket', status: 'done', note: 'Account created by IT. Added to CSA project by Amanda Hamilton 2026-03-30.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials still pending from Chad/IT',
      'IT claimed access granted 2026-03-31 — Amplitude, SemRush, Marfeel still inaccessible. Pierce replied; awaiting IT follow-up.',
      'Gary API key not yet delivered by Gary Kirwan',
    ],
    nextActions: [
      'Schedule Chad Bruton walkthrough of growth_and_strategy_role Snowflake data (login resolved)',
      'Awaiting IT follow-up — IT claimed access granted (2026-03-31) but Amplitude, SemRush, Marfeel still inaccessible. Pierce replied.',
      'Gary Kirwan: follow-up sent 2026-04-03 (second ask) — still no API key or endpoint docs',
    ],
    dependsOn: [],
  },

  // ── TIER 2 ────────────────────────────────────────────────────────────────

  'p8-mapping': {
    id: 'p8-mapping', num: '8', tier: 2, type: 'project', status: 'in-progress',
    name: 'Rajiv CSA Mapping',
    owner: 'Pierce',
    description: 'Use BitBucket access to map CSA transformations. Per 2026-03-30 Chris meeting: not urgent — Pierce already has sufficient working understanding for PRD drafting. This is a depth exercise, not a blocker. No longer a prerequisite for P9.',
    blockers: [],
    nextActions: [
      'Lower priority — do not block PRD work on this',
      'Map CSA transformations opportunistically as BitBucket access allows',
      'Document CSA transformation behavior — Mode 1 (URL import) vs Mode 2 (Research Draft) now understood; no further P13 coordination needed',
    ],
    dependsOn: ['p1-access'],
  },

  'p10-gary': {
    id: 'p10-gary', num: '10', tier: 2, type: 'project', status: 'blocked',
    name: 'Gary Tools Integration',
    owner: 'Pierce (lead) · Susannah Locke (integration lead) · Chris Palo (stakeholder)',
    description: 'ACTIVE EVALUATION — PARAMETER DEFINITION IN PROGRESS. Gary has run 3 reports (Duggar legal, Women\'s World health, Charlotte Home Buyers Guide). Charlotte stress-test complete: tool caught stale FY2025 tax rate ($966.20 vs correct $985.40) that human editor missed. Chris directed Pierce + Sara Vallone to define editorial parameters (verdict types: TRUE/FALSE/MISLEADING/INSUFFICIENT_EVIDENCE/OVERGENERALIZED); Pierce to own, bring to Chris for review. Acceptance tracking = system quality signal (compare: retraction rates). Primary use case: claims validation / factual accuracy post-CSA, before editor\'s desk. NOT primarily an SEO play. Blocked: McClatchy API key status unclear (Gary may be running on his end).',
    blockers: [
      'McClatchy API key status unclear — Gary appears to be running tests; confirm whether our key is active',
      '4 open questions sent to Gary 2026-04-03: confidence scoring methodology, severity calibration by content type, article-level vs claim-level output, reproducibility across runs',
      'Sara Vallone parameter-definition session pending — Slack sent 2026-04-03, awaiting reply',
    ],
    nextActions: [
      'Await Gary\'s responses to 4 questions (confidence, severity calibration, article-level output, reproducibility)',
      'Run Sara Vallone parameter-definition session — use 3 existing reports as working examples; arrive with draft threshold recommendation',
      'Draft parameters document for Chris review once Sara session complete',
      'Confirm McClatchy API key status with Gary',
      'Build integration spec per Chris\'s operational requirements: editor correction + override, error rate tracking by article/author/content type, override reporting (Pierce + Vallone + Chris initially; shrinks to Vallone once confident)',
      'Define source trustworthiness management process — Pierce owns list',
      'Do not wait for SEO team review on non-SEO modules',
    ],
    dependsOn: ['p1-access'],
    contacts: [
      { name: 'Gary Kirwan', email: 'gary@kirwandigital.com', role: 'Tool developer' },
      { name: 'Jim Robinson', role: 'Internal SEO; designed internal SEO tool; has novelty concern about Gary' },
      { name: 'Stephanie Zandecki', role: 'Internal SEO; reviewing Gary\'s toolkit' },
    ],
  },

  // ── TIER 3 ────────────────────────────────────────────────────────────────

  'p9-prd': {
    id: 'p9-prd', num: '9', tier: 3, type: 'project', status: 'complete',
    name: 'PRD Revisions',
    owner: 'Pierce',
    description: 'COMPLETE. PRD V0.3 delivered to Chris Palo 2026-04-03. Full four-pipeline model (T1 automated, T2 app-based, T3 canonical/repackaging, T4 Discover), CSA ideal end state, system requirements for all pipeline stages, Content Graph (deferred per Chris), Operations Layer. One open item: Sara Vallone input needed for writer/editor experience section. Waiting on Chris + Sara feedback.',
    blockers: [],
    nextActions: [
      'Await Chris + Sara Vallone feedback on V0.3',
      'Get Sara Vallone input for "What it means for writers and editors" section (placeholder in current draft)',
    ],
    dependsOn: [],
  },

  'p6-taxonomy': {
    id: 'p6-taxonomy', num: '6', tier: 3, type: 'project', status: 'in-progress',
    name: 'Content Cluster / Tagging Taxonomy',
    owner: 'Pierce · Susannah Locke · Chris Palo · Sara Vallone',
    description: 'Cluster tagging strategy SETTLED as of 2026-04-01 alignment meeting. Canonical ID = Cluster ID (session ID linking sibling variants). CSA articles are SIBLINGS. Full schema enablement and variant linking dev work now in the product/dev team\'s hands. PGS-40 remains ON HOLD in Jira pending dev queue. Pierce\'s role: stakeholder/monitor until dev delivers.',
    alignmentAgendaItems: [
      '(RESOLVED 2026-03-31) Canonical ID = Cluster ID confirmed; articles are siblings not parent/child; variant linking dev request logged.',
      '(RESOLVED 2026-04-01) Full cluster tagging strategy settled in alignment meeting.',
    ],
    blockers: [],
    nextActions: [
      'Monitor dev progress on variant linking and Cluster ID field implementation (PGS-40)',
      'No Pierce action items — strategy decided 2026-04-01, dev team owns execution',
    ],
    dependsOn: ['p1-access'],
    links: [
      { label: 'Alignment meeting agenda doc', url: 'https://docs.google.com/document/d/1MtVlBJeh_k9X7dnrpRmEQ9jefrbdWwY2/edit' },
      { label: 'Chris cluster performance sheet', url: 'https://docs.google.com/spreadsheets/d/1VGMbJUV2u9QjUpk0QxMdHeNf9sTumEeR/edit' },
    ],
  },

  // ── TIER 4 ────────────────────────────────────────────────────────────────

  'p2-dashboard': {
    id: 'p2-dashboard', num: '2', tier: 4, type: 'project', status: 'in-progress',
    name: 'Dashboard Instrumentation',
    owner: 'Pierce',
    description: 'Activate live data ingestion layer in csa-dashboard. Manual metrics bridge live via manual-metrics.js + seedMetrics(). Three live adapters (Sigma, Marfeel, Amplitude) still awaiting credentials. Amplitude blocked by p-tagging issue — do not activate. CSA uptime/production stats defined — data in hand, ready to populate.',
    adapters: [
      { name: 'Google Sheets (manual)', status: 'done', note: 'Manual metrics bridge live via data/manual-metrics.js + seedMetrics() — no API key needed. Edit that file to update numbers.' },
      { name: 'Sigma', status: 'pending-creds', note: 'Provides Stories/week, batting average. Needs OAuth2 credentials.' },
      { name: 'Marfeel', status: 'pending-creds', note: 'Provides Discover rate, batting average. Needs API key + account manager URL.' },
      { name: 'Amplitude', status: 'pending', note: 'Pending access provisioning. CSA eng team has a separate p-tagging bug (their fix, not Pierce\'s action). Once access is granted, data quality depends on that fix resolving.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials (needs Snowflake/Sigma access from P1)',
      'Marfeel API key (needs outreach from P1)',
      'Amplitude access pending provisioning + p-tagging fix (CUE/WP tag format mismatch) by eng team',
    ],
    nextActions: [
      'Populate CSA uptime/production stats into manual-metrics.js — data in hand',
      'Get Sigma credentials once access lands → activate Sigma adapter',
      'Get Marfeel API key → activate Marfeel adapter',
    ],
    dependsOn: ['p1-access'],
  },

  'p3-headlines': {
    id: 'p3-headlines', num: '3', tier: 4, type: 'project', status: 'in-progress',
    name: 'T1 Headlines Analysis (Price)',
    owner: 'Pierce · Sarah Price',
    description: 'Phase 2 active — 13 findings live, 5-tile playbook, experiments page live. March Tarrow data ingested 2026-04-02; exhaustive cross-platform analysis complete. Full ANP data pipeline (420K rows, weekly drops from Tarrow). Findings (original 8): Featured Targeting, Push Notifications, Platform Topic Inversion, Views vs. Engagement, Formula Trends, Featuring Reaches Non-Subscribers, Topic Predicts Featuring, ANP Bottom-Performer Analysis. Added 2026-04-02 (5 new): MSN Formula Divergence, Formula × Topic Interaction, SmartNews Cross-Platform Formula Trap, Notification Outcome Language, Notification Send-Time. Playbook: Featured Targeting, Push Notifications, Section Tagging, Local vs. National, MSN Formula. Experiments page (docs/experiments/index.html): 8 suggestion cards auto-generated, Export PNG button. Build report clean: 6 ✓ checks, 3 informational engagement-outlier warnings (Tarrow source data — active time values up to 23,496s, capped at 600s). Ongoing monitoring cadence (monthly Tarrow + weekly ANP). O&O/Amplitude layer is a separate sub-workstream requiring Amplitude access.',
    blockers: [
      'O&O/Amplitude layer blocked by Amplitude access (P1) — treat as separate workstream, do not block core work',
    ],
    nextActions: [
      'Meeting with Sarah Price 2026-04-04 — Apple headlines + TEO API through SEMrush + Sigma dashboard context',
      'Notify Tarrow: active time outliers in source Excel (values up to 23,496s — likely milliseconds stored as seconds); pipeline caps at 600s but source data needs fixing',
      'Downgrade WTK/SmartNews site prose from "significant" to "directional" — held pending human resolution (_SN_FORMULA_DATA shows WTK at p=3.0e-6 in a different run, conflicting with p=0.046)',
      'ANP March drop — Tarrow adding to Drive folder; drop into anp_data/ when it arrives',
      'O&O layer: once Amplitude access lands, layer in pageview data per design doc',
    ],
    dependsOn: ['p1-access'],
  },

  'p4-governance': {
    id: 'p4-governance', num: '4', tier: 4, type: 'project', status: 'in-progress',
    name: 'Article Format + Persona + Keyword Governance',
    owner: 'Pierce · Sara Vallone · Susannah Locke · Sarah Price',
    description: '5 personas sent to Susannah Locke to pin for all National accounts (2026-04-03): Discover Browser (already saved), + 4 additional ticketed in PGS-133. Content standards routing annotations live in §1: AGENT-AUDIENCE tags (general-style, headline, seo, human-only) enable CSA to grep rule sets by type. General style doc sent to Susannah to upload as CSA admin. H1 headline enforcement (80–100 chars) ticketed PGS-135. Apple News + Smart News personas pending Andy review (Sara Vallone drafting). Pairwise testing approach confirmed: ~3 formats × 3 personas = ~9 tests.',
    status_detail: 'In progress. All 5 National team personas sent to Susannah 2026-04-03. PGS-133 (4 additional target audiences) selected for dev. PGS-134 (Everything to Know + FAQ/Service Journalism formats) selected for dev. PGS-135 (H1 headline 80–100 char enforcement) selected for dev. Apple News + Smart News personas still pending — Sara drafting, Andy reviews before use.',
    blockers: [
      'Apple News + Smart News personas pending — Sara Vallone drafting; Andy to review before forwarding',
      'H1 headline enforcement (PGS-135) pending Susannah prompt-level fix',
    ],
    nextActions: [
      'Await Sara Vallone\'s Apple News + Smart News personas (Andy review gates use)',
      'Once Andy-approved: codify Apple News + Smart News personas into csa-content-standards; send to Susannah to pin for National accounts',
      'Extend AGENT-AUDIENCE routing annotations beyond §1 to full guidance doc (pending Susannah confirmation it works)',
      'Consolidate TH/TH B2C variants with Sara Vallone and Sarah Price',
    ],
    dependsOn: ['p6-taxonomy'],
  },

  'p12-unitedrobots': {
    id: 'p12-unitedrobots', num: '12', tier: 4, type: 'project', status: 'in-progress',
    name: 'United Robots Inbound Pipeline',
    owner: 'Pierce · Sara Vallone · Sarah Price',
    description: 'Use CSA to capture the 50% revenue share currently going to United Robots. Eric Nelson gave green light 2026-03-30. Scope: scrape public alert feeds (weather, Amber Alerts, Silver Alerts, DOT closures), generate small factual stories with disclaimer, human-in-the-loop monitoring required. Sara Vallone\'s team can wrap additional content around successful alert topics.',
    blockers: [
      'Working group not yet defined — need to identify who owns monitoring + editorial review',
      'Alert scraping scope not finalized (which feeds, which markets)',
    ],
    nextActions: [
      'Map United Robots alerts pipeline with Sara Vallone — T1 pipeline scope defined in PRD V0.3',
      'Sarah Price: review performance of existing United Robots automated stories (baseline)',
      'Define human-in-the-loop monitoring system and working group',
      'Identify which alert types to start with (weather, Amber, Silver, DOT)',
    ],
    dependsOn: ['p1-access'],
    contacts: [
      { name: 'Eric Nelson', role: 'Approved inbound initiative 2026-03-30' },
      { name: 'Sara Vallone', role: 'Content wrapping + pipeline coordination' },
      { name: 'Sarah Price', role: 'Reviewing performance of existing automated stories' },
    ],
    links: [
      { label: 'Sac Bee example 1', url: 'https://www.sacbee.com/news/article315177773.html' },
      { label: 'Kansas City example', url: 'https://www.kansascity.com/news/article315178360.html' },
      { label: 'Sac Bee example 2', url: 'https://www.sacbee.com/news/article315180459.html' },
    ],
  },

  // ── TIER 4 HOLD ───────────────────────────────────────────────────────────

  'p7-tracker': {
    id: 'p7-tracker', num: '7', tier: 4, type: 'project', status: 'hold',
    name: 'Vallone Tracker / CMS Automation',
    owner: 'Pierce (dev) · Sara Vallone (stakeholder)',
    description: 'Automate Sara Vallone\'s content governance Google Sheet — who published what, under which persona/format/cluster, and how it performed. Deprioritized by Chris Palo 2026-03-30. HOWEVER: the four Jira prerequisites below are actively being built. When they land, the tracker becomes low-effort to realize and would be auto-populated rather than manual. The same infra that enables CMS push/pull and cluster tagging essentially builds the tracker\'s data layer for free.',
    blockers: [
      'HOLD pending four Jira prerequisites: (1) Cluster ID field in CUE + WP (P6 dev / PGS-40), (2) Send-to-CUE functional (rq-send-to-cue), (3) Send-to-WP functional (rq-send-to-wp), (4) PGS-80 analytics live (draft-to-publish ratio + export event tracking)',
      'Chris deprioritized 2026-03-30 — revisit once prerequisites land and bring to Chris with updated scope',
    ],
    nextActions: [
      'Monitor Jira for: PGS-40 (tagging taxonomy), Send-to-CUE, Send-to-WP, PGS-80 analytics',
      'When all four prerequisites are fulfilled: scope tracker build and bring revised proposal to Chris — the manual work will be dramatically reduced by the infra already in place',
    ],
    dependsOn: ['p6-taxonomy', 'p1-access'],
    contacts: [
      { name: 'Sara Vallone', role: 'Content team lead; owns the tracker sheet' },
      { name: 'Chad Bruton', role: 'Data/analytics; owns Snowflake + Sigma; key architecture guide' },
      { name: 'Kathryn Sheplavy (Kat)', role: 'Data/CSA; investigating Q field options in CUE for cluster tagging' },
      { name: 'Regina', role: 'WordPress contact — needed for WordPress integration' },
    ],
  },

  // ── TIER 5 ────────────────────────────────────────────────────────────────

  'p35-narrative': {
    id: 'p35-narrative', num: '3.5', tier: 5, type: 'project', status: 'not-started',
    name: 'Content Analysis / Narrative Dashboard (Price)',
    owner: 'Pierce · Sarah Price',
    description: 'Formalize content testing narrative and build ongoing monitoring layer with Sarah Price. Chris\'s directive: own content testing internally (rq-content-learning-loop). Builds on T1 headline findings. Distinct from the headline analysis itself — this is the ongoing monitoring layer and testing narrative.',
    blockers: [
      'P3 (T1 Headlines) must be shared with Sarah Price and findings consolidated first',
    ],
    nextActions: [
      'Complete T1 stakeholder share with Sarah Price (P3)',
      'Meet with Sarah Price: define monitoring format, cadence, and what goes into the narrative',
    ],
    dependsOn: ['p3-headlines'],
  },

  'p5-testing': {
    id: 'p5-testing', num: '5', tier: 5, type: 'project', status: 'not-started',
    name: 'Personas & Formats Testing / Optimization',
    owner: 'Pierce',
    description: 'Run controlled experiments to identify top-performing personas and formats once governance (P4) standardizes the controlled set and cluster tags (P7) enable proper measurement by cluster. Testing approach confirmed: pairwise, keep small (~3 formats × 3 personas = ~9 tests). Start with Discover and Trend Hunterland (6 personas: 3 each).',
    blockers: [
      'P4 (governance) must finalize controlled set first',
      'P7 (Vallone Tracker) must activate cluster tags to enable measurement',
    ],
    nextActions: [
      'Complete P4 and P7 first',
      'Design pairwise testing schedule with Sarah Price (3 formats × 3 personas = ~9 tests)',
      'Define what "winning" means per format/persona before running experiments',
    ],
    dependsOn: ['p4-governance', 'p7-tracker'],
  },

  'p11-recipes': {
    id: 'p11-recipes', num: '11', tier: 5, type: 'project', status: 'not-started',
    name: 'Recipes',
    owner: 'Pierce',
    description: 'Define how to prep/scope "recipes" — the template/keyword/persona/outlet/timing framework Chris is after. What a recipe is, how it\'s structured, and how it integrates into the CSA workflow. Definition unclear until PRD and persona governance are squared away.',
    blockers: [
      'P4 persona governance must finalize the controlled format/persona set (P9 PRD complete — recipes concept defined as T3 pipeline layer)',
    ],
    nextActions: [
      'Complete P4 first',
      'Schedule scoping meeting with Chris to define what "recipes" means operationally',
    ],
    dependsOn: ['p9-prd', 'p4-governance'],
  },

};
