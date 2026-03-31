// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
  { date: '2026-03-31', task: 'T1 site reworked incorporating Sarah Price feedback; full backlog data from Tarrow wired in; weekly Monday drop cadence established. Running new analysis.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-03-31', task: 'CSA uptime and production stats defined — Pierce has data in hand; can populate dashboard metrics now.', project: '#2 Dashboard Instrumentation' },
  { date: '2026-03-31', task: 'Snowflake login issue resolved by IT. Next step: Chad Bruton walkthrough of growth_and_strategy_role data.', project: '#1 Platform Access & Training' },
  { date: '2026-03-31', task: 'T1 Headlines culled to 5 curated findings (renumbered 1–5) — removed 6 weak/predictable findings. Analysis complete; ready for Sarah Price handoff.', project: '#3 T1 Headlines Analysis' },
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
      { name: 'Amplitude', status: 'pending', note: 'IT request sent 2026-03-30 — awaiting provisioning to correct Amplitude group. Note: CSA eng team has a separate p-tagging bug (CUE/WP tag format mismatch) affecting data quality; that is their fix, not a Pierce action item.' },
      { name: 'Marfeel', status: 'pending', note: 'IT request sent 2026-03-30 — IT to facilitate with account manager. Also ask: why was Apple filter removed from main interface (Mar 2026)? Sarah Price\'s custom dashboard is now the only accurate Apple view.' },
      { name: 'Gary API', status: 'pending', note: 'Gary Kirwan to deliver API endpoint docs + McClatchy API key. Blocks Project 10.' },
      { name: 'SemRush', status: 'pending', note: 'IT request sent 2026-03-30 — awaiting access via McClatchy license.' },
      { name: 'MAIA', status: 'done', note: 'Access in hand.' },
      { name: 'BitBucket', status: 'done', note: 'Account created by IT. Added to CSA project by Amanda Hamilton 2026-03-30.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials still pending from Chad/IT',
      'Amplitude, SemRush, Marfeel access still pending IT response (requested 2026-03-30)',
      'Gary API key not yet delivered by Gary Kirwan',
    ],
    nextActions: [
      'Schedule Chad Bruton walkthrough of growth_and_strategy_role Snowflake data (login resolved)',
      'Await IT response on Amplitude, SemRush, Marfeel access',
      'Gary Kirwan messaged 2026-03-30 — awaiting reply on API docs + key delivery',
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
      'Document Mode 1 and Mode 2 behavior (coordinate with P13)',
    ],
    dependsOn: ['p1-access'],
  },

  'p13-sysprompts': {
    id: 'p13-sysprompts', num: '13', tier: 2, type: 'project', status: 'not-started',
    name: 'System Prompts / Mode 1 & Mode 2',
    owner: 'Pierce',
    description: 'Understand Mode 1 (Publication Ready) and Mode 2 (Intermediate/Expanded) in the System Prompts doc under Persona-Optimized Variant. Mode 2 is the known root cause of word count bloat. Feeds PRD revisions and the Susannah alignment meeting agenda.',
    blockers: [],
    nextActions: [
      'Write desired target audiences for National team and test in CSA — coordinate with Oliver Felix on PGS-97 (eng side building infrastructure in parallel)',
      'Get system prompts doc access',
      'Study Mode 1 vs Mode 2 behavior and downstream implications',
      'Add findings to Susannah alignment meeting agenda',
      'Coordinate with P8 (CSA mapping) — complementary investigations',
    ],
    dependsOn: [],
    links: [
      { label: 'Alignment meeting agenda', url: 'https://docs.google.com/document/d/1MtVlBJeh_k9X7dnrpRmEQ9jefrbdWwY2/edit' },
    ],
  },

  'p10-gary': {
    id: 'p10-gary', num: '10', tier: 2, type: 'project', status: 'blocked',
    name: 'Gary Tools Integration',
    owner: 'Pierce (lead) · Susannah Locke (integration lead) · Chris Palo (stakeholder)',
    description: 'Explore Gary\'s API toolkit (citation validation, internal linking, meta optimization, brand-fit audit). McClatchy has an API key. Integration point: post-CSA generation, before editor\'s desk. Chris wants "almost all, maybe all" modules. Gary is further along than any internal tool.',
    blockers: [
      'Gary API endpoint docs + API key not yet delivered (Gary Kirwan)',
      '5 open questions unresolved: McClatchy content indexed in Convex? Brand guide stored? brand_id scope (company vs. per-publication)? Cost model? Two-tier brand guideline handling?',
    ],
    nextActions: [
      'Awaiting Gary Kirwan reply (messaged 2026-03-30) — get API access first, then set up a demo/deep dive',
      'Explore NON-SEO elements of Gary\'s toolkit — Chris emphasized it\'s not just SEO; Sara Vallone interested in author personal element',
      'Do not wait for SEO team review on non-SEO modules',
      'Once key received: health → scrape → meta → structure → brand-readiness → citations → poll',
      'Discuss two-tier brand guideline approach with Chris (national vs. per-publication)',
      'Add non-SEO Gary elements to PRD scope',
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
    id: 'p9-prd', num: '9', tier: 3, type: 'project', status: 'in-progress',
    name: 'PRD Revisions',
    owner: 'Pierce',
    description: '#1 PRIORITY (Chris Palo, 2026-03-30). Revise the current PRD ("Content Graph & Operations Layer V3 Breakout") into a complete, coherent document. Three-part task: (1) cull what\'s stale, (2) write the missing CSA core section — what the CSA is, what it should ultimately do, how input signals govern generation, ideal output, feedback loop, (3) integrate — show how Content Graph and Operations Layer connect to the CSA. The dev team lacks a clear picture of the CSA\'s ideal end state. Draft due end of week (2026-04-03).',
    blockers: [],
    nextActions: [
      'Draft CSA core section: input signals, personas/formats/keywords governing generation, output standards, ideal end state, feedback loop, "control room" model',
      'Incorporate United Robots alerts pipeline as part of the auto-content tier',
      'Cull PRD of what\'s stale or out of scope — Chris: not precious, strike what doesn\'t fit',
      'Reframe Content Graph and Operations Layer sections to show how they serve the CSA',
      'Align draft with Chris and Sarah Price before sending to dev team',
    ],
    dependsOn: [],
  },

  'p6-taxonomy': {
    id: 'p6-taxonomy', num: '6', tier: 3, type: 'project', status: 'blocked',
    name: 'Content Cluster / Tagging Taxonomy',
    owner: 'Pierce · Susannah Locke · Chris Palo · Sara Vallone',
    description: 'Define cluster tagging schema: ClusterID | SubjectID | ArticleID | Platform | DistChannel | ArticleType | etc. Decide manual vs. automatic fields, ID format (e.g. CLU-2026-018), and entry point (CSA Research Draft page confirmed). Alignment meeting required before ANY building.',
    alignmentAgendaItems: [
      'Manual vs. auto fields: in this holistic view, do all want all manual fields at once, or fast-track Cluster ID only?',
      'Optional open cluster field on Research Draft page (Susannah\'s proposal)',
      'Automatic Subject ID — synonymous with Canonical Article ID?',
      'Call Target Audience "Persona" in schema?',
      'Mode 1 and Mode 2 under Persona-Optimized Variant (from P13)',
    ],
    blockers: [
      'Alignment meeting not yet scheduled (Pierce + Chris Palo + Sara Vallone + Susannah)',
      'No Cluster ID field exists in CUE or WordPress yet (Susannah investigating Q field options with Kathryn Sheplavy)',
      'Snowflake/Sigma access determines architecture (webhook vs. Snowflake→Sheet)',
      'PGS-40 (Define Tagging Taxonomy for CSA Output Tracking) is ON HOLD in Jira — confirms eng side is blocked pending alignment meeting',
    ],
    nextActions: [
      'Reply to Susannah: confirm CSA Research Draft is the right entry point; hold on building until alignment meeting (open-text field risks data inconsistency before schema is agreed)',
      'Schedule alignment meeting: Pierce + Chris + Sara + Susannah',
      'Digest Chris\'s cluster performance sheet before meeting',
      'Study content graph doc (informs meeting)',
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
    description: '5 curated findings (renumbered 1–5 as of 2026-03-31) on Apple News, SmartNews, MSN, and Yahoo headline performance. Site shared with Sarah Price; her feedback incorporated; site reworked to align more closely with her asks. Full backlog of data from Tarrow now wired in. Weekly Monday data drops from Tarrow established as ongoing cadence. Running new analysis now. O&O/Amplitude layer (Chris Palo request) is a separate sub-workstream requiring Amplitude access.',
    blockers: [
      'O&O/Amplitude layer blocked by Amplitude access (P1) — treat as separate workstream, do not block core work',
    ],
    nextActions: [
      'Run new analysis with reworked site + Tarrow backlog data — review output',
      'Share updated findings with Sarah Price for next feedback loop',
      'Share "What to know" Featured rate findings (Finding 1) → editorial leads',
      'Share SmartNews entertainment over-index findings → distribution team',
      'O&O layer: once Amplitude access lands, layer in pageview data per design doc',
    ],
    dependsOn: ['p1-access'],
  },

  'p4-governance': {
    id: 'p4-governance', num: '4', tier: 4, type: 'project', status: 'in-progress',
    name: 'Article Format + Persona + Keyword Governance',
    owner: 'Pierce · Sara Vallone · Susannah Locke · Sarah Price',
    description: 'Compile high-performing persona names; send controlled set to Susannah to pin in National accounts. Consolidate TH/TH B2C variants with Sara and Sarah Price. Finalize list before testing begins. CSA now stores metadata on article configurations (formats, personas, keywords) as of 2026-03-30 — features in code review. Pairwise testing approach confirmed: ~3 formats × 3 personas = ~9 tests. Start with Discover and Trend Hunterland (6 personas: 3 each).',
    status_detail: 'In progress. Susannah persona texts not forthcoming — path forward is Sara Vallone drafting 6-7 new personas (Apple News, Smart News, MSN versions). New personas to be submitted to "Andy" for review.',
    blockers: [
      'Sara Vallone has not yet drafted new personas (Apple News, Smart News, MSN)',
      'Full governance structure needs cluster context from P6',
    ],
    nextActions: [
      'Update CSA content standards doc once Sara Vallone drafts new personas — codify into system',
      'Sara Vallone: draft 6-7 new personas (Apple News, Smart News, MSN versions)',
      'Submit new Apple News + MSN personas to Andy for review',
      'Test Google Discover Explainer Content Format on CSA staging — Susannah to notify when loading issues resolved (PGS-95); Sara Vallone also asked to test',
      'Consolidate TH/TH B2C variants with Sara Vallone and Sarah Price',
      'Finalize persona list and send to Susannah to pin in National accounts',
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
      'Map United Robots alerts pipeline with Sara Vallone — add scope to PRD (P9 input)',
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
    description: 'Automate Sara Vallone\'s content governance Google Sheet. DEPRIORITIZED per Chris Palo 2026-03-30: "It\'s a monster. Let it fall on the wayside for now. Focus on the CSA." Long-term, CMS architecture (CSA sitting above both CMSs with a data layer) will make this tracker obsolete anyway.',
    blockers: [
      'DEPRIORITIZED by Chris — not a current focus',
      'P6 alignment meeting must happen first — schema must be agreed before building',
      'CMS architecture (long-term) may replace the need for this entirely',
    ],
    nextActions: [
      'No action until P9 PRD defines long-term CMS architecture',
      'Revisit only after P6 alignment meeting and P9 PRD draft complete',
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
      'P9 PRD must define what recipes mean in current product direction',
      'P4 persona governance must define the controlled format/persona set',
    ],
    nextActions: [
      'Complete P9 and P4 first',
      'Schedule scoping meeting with Chris to define what "recipes" means operationally',
    ],
    dependsOn: ['p9-prd', 'p4-governance'],
  },

};
