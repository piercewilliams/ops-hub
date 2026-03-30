// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
  { date: '2026-03-30', task: 'United Robots inbound approved by Eric Nelson — P12 moved from HOLD to active. Goal: use CSA to capture 50% revenue share currently going to United Robots via automated alert stories.', project: '#12 United Robots Inbound Pipeline' },
  { date: '2026-03-30', task: 'BitBucket access in hand — IT created account, Amanda Hamilton added to CSA project same day. P8 (CSA Mapping) unblocked.', project: '#1 Platform Access & Training' },
  { date: '2026-03-30', task: 'Snowflake access granted (role: growth_and_strategy_role, warehouse: growth_and_strategy_role_wh). Login issue being remedied by IT.', project: '#1 Platform Access & Training' },
  { date: '2026-03-30', task: 'Attended CSA dev standup — met Rajiv Pant, Marcelo Freitas, Oliver Felix, Patrick Al Khouri, Victor Suarez, Daury Caba, Emil Penalo + team; now have direct contacts for Amplitude p-tagging fix and GitHub access', project: '#1 Platform Access & Training' },
  { date: '2026-03-30', task: 'Attended PGS-82 UX design sprint — cluster risk approach decided (worst-pair score); Susannah + Efren own checkbox placement, Marcelo owns score display + variant controls', project: 'Content Diff Tool (PGS-82)' },
  { date: '2026-03-29', task: 'Ops-hub automated sync deployed — 3x daily, push auth via PAT, live sync status pill on dashboard', project: 'ops-hub' },
  { date: '2026-03-28', task: 'WordPress full access confirmed', project: '#1 Platform Access & Training' },
  { date: '2026-03-28', task: 'csa-dashboard v3.28.26 shipped with 18-check diagnostic tool (csa.diagnose())', project: '#2 Dashboard Instrumentation' },
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
      { name: 'Snowflake / Sigma', status: 'pending', note: 'Snowflake access granted 2026-03-30 (role: growth_and_strategy_role, warehouse: growth_and_strategy_role_wh) — login issue being remedied. Sigma viewer access also granted 2026-03-30. API credentials (OAuth2 for dashboard adapter) still needed from Chad/IT.' },
      { name: 'CUE', status: 'done', note: 'Access in hand.' },
      { name: 'WordPress', status: 'done', note: 'Full access as of 2026-03-28.' },
      { name: 'Google Sheets API', status: 'pending', note: 'No OAuth — read-only key only. Lowest barrier. Do first.' },
      { name: 'Amplitude', status: 'pending', note: 'IT request sent 2026-03-30 — awaiting provisioning to correct Amplitude group. Note: CSA eng team has a separate p-tagging bug (CUE/WP tag format mismatch) affecting data quality; that is their fix, not a Pierce action item.' },
      { name: 'Marfeel', status: 'pending', note: 'IT request sent 2026-03-30 — IT to facilitate with account manager. Also ask: why was Apple filter removed from main interface (Mar 2026)? Sarah Price\'s custom dashboard is now the only accurate Apple view.' },
      { name: 'Gary API', status: 'pending', note: 'Gary Kirwan to deliver API endpoint docs + McClatchy API key. Blocks Project 10.' },
      { name: 'SemRush', status: 'pending', note: 'IT request sent 2026-03-30 — awaiting access via McClatchy license.' },
      { name: 'MAIA', status: 'done', note: 'Access in hand.' },
      { name: 'BitBucket', status: 'done', note: 'Account created by IT. Added to CSA project by Amanda Hamilton 2026-03-30.' },
    ],
    blockers: [
      'Snowflake login issues being remedied by IT; Sigma access still pending',
      'Amplitude, SemRush, Marfeel access still pending IT response',
      'Gary API key not yet delivered by Gary Kirwan',
    ],
    nextActions: [
      'Resolve Snowflake login issue with IT, then get Chad walkthrough of growth_and_strategy_role data',
      'Gary Kirwan messaged 2026-03-30 — awaiting reply on API docs + key delivery',
      'Await IT response on Amplitude, SemRush, Marfeel access (requested 2026-03-30)',
    ],
    dependsOn: [],
  },

  // ── TIER 2 ────────────────────────────────────────────────────────────────

  'p8-mapping': {
    id: 'p8-mapping', num: '8', tier: 2, type: 'project', status: 'in-progress',
    name: 'Rajiv CSA Mapping',
    owner: 'Pierce',
    description: 'Use BitBucket access to map CSA transformations. Note: per 2026-03-30 Chris meeting, Pierce assessed this as not urgent — he already has a sufficient working understanding of the CSA for PRD drafting purposes. This is a "nice to have" depth exercise, not a blocker. No longer a prerequisite for P9 PRD.',
    blockers: [],
    nextActions: [
      'Lower priority — do not block PRD work on this',
      'Map CSA transformations opportunistically as BitBucket access allows',
      'Document Mode 1 and Mode 2 behavior (coordinate with P13)',
      'Note: PGS-94 (Establish National team as a Configuration in CSA) is in code review — review once access is in hand',
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
      'Write desired target audiences for National team and test in CSA (action item from standup 2026-03-30)',
      'Coordinate with Oliver Felix on PGS-97 (Fetch Target Audience Definitions — IN PROGRESS) — eng side is building the infrastructure as Pierce writes the audiences',
      'Get system prompts doc access',
      'Study Mode 1 vs Mode 2 behavior and downstream implications',
      'Add findings to Susannah alignment meeting agenda (see agenda doc)',
      'Coordinate with P8 (CSA mapping) — these are complementary investigations',
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
      'Gary Kirwan messaged 2026-03-30 — get API access first, then set up a demo/deep dive with Gary directly',
      'Chris: "If you need to dive in with Gary, feel free to reach out — he\'ll make time and show you how it works"',
      'Explore NON-SEO elements of Gary\'s toolkit — Chris emphasized it\'s not just SEO (e.g. author personal element; Sara Vallone is interested in this)',
      'Do not wait for SEO team review on non-SEO modules — only the SEO-related ones have politics',
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
    description: 'CURRENT #1 PRIORITY (Chris Palo, 2026-03-30). Revise the current PRD ("Content Graph & Operations Layer V3 Breakout" from Rajiv\'s team) into a complete, coherent document. Three-part task: (1) cull what\'s stale or no longer useful, (2) write the missing CSA core section — what the CSA is, what it should ultimately do, how input signals govern generation, what the ideal output looks like, (3) integrate — show how Content Graph and Operations Layer connect to and serve the CSA. The dev team lacks a clear picture of the CSA\'s own ideal end state. Draft due end of week (2026-04-03).',
    status_detail: 'Draft due 2026-04-03. Working with Claude. Source material: existing PRD, Chris\'s "control room" model from 1:1, Pierce\'s understanding from standups + PGS-82 + codebase access.',
    blockers: [],
    nextActions: [
      'Block calendar time — target end-of-week draft (2026-04-03)',
      'Work with Claude to draft CSA core section: input signals, how personas/formats/keywords govern generation from the start, output standards, ideal end state, feedback loop',
      'Cull PRD of what\'s stale or out of scope — Chris: not precious, strike what doesn\'t fit',
      'Reframe Content Graph and Operations Layer sections to show how they serve the CSA, not just what they are',
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
      'Schedule alignment meeting: Pierce + Chris + Sara + Susannah',
      'Confirm agenda with Susannah — doc linked below',
      'Reply to Susannah: CSA Research Draft is right entry point, but hold building until meeting',
      'Digest Chris\'s cluster performance sheet before meeting (informs schema decisions)',
      'Study content graph doc (informs meeting)',
      'Do NOT build before meeting — risk of throwaway work',
    ],
    dependsOn: ['p1-access'],
    links: [
      { label: 'Alignment meeting agenda doc', url: 'https://docs.google.com/document/d/1MtVlBJeh_k9X7dnrpRmEQ9jefrbdWwY2/edit' },
      { label: 'Chris cluster performance sheet', url: 'https://docs.google.com/spreadsheets/d/1VGMbJUV2u9QjUpk0QxMdHeNf9sTumEeR/edit' },
    ],
  },

  // ── TIER 4 ────────────────────────────────────────────────────────────────

  'p7-tracker': {
    id: 'p7-tracker', num: '7', tier: 4, type: 'project', status: 'hold',
    name: 'Vallone Tracker / CMS Automation',
    owner: 'Pierce (dev) · Sara Vallone (stakeholder)',
    description: 'Automate Sara Vallone\'s content governance Google Sheet. DEPRIORITIZED per Chris Palo 2026-03-30: "It\'s a monster. Let it fall on the wayside for now. Focus on the CSA." Long-term, CMS architecture (CSA sitting above both CMSs with a data layer) will make this tracker obsolete anyway. Do not build until PRD defines the right architecture.',
    blockers: [
      'DEPRIORITIZED by Chris — not a current focus',
      'Alignment meeting (Project 6) must happen first — schema must be agreed before building',
      'No Cluster ID field in CUE or WordPress yet',
      'CMS architecture (long-term) may replace the need for this entirely',
    ],
    nextActions: [
      'No action until PRD (P9) defines long-term CMS architecture',
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

  'p2-dashboard': {
    id: 'p2-dashboard', num: '2', tier: 4, type: 'project', status: 'in-progress',
    name: 'Dashboard Instrumentation',
    owner: 'Pierce',
    description: 'Activate live data ingestion layer in csa-dashboard. Four adapters built in ingest.js, awaiting credentials. Google Sheets is unblocked and recommended first. Amplitude blocked by p-tagging issue — do not activate. Define "CSA uptime/production stats" with Chris.',
    adapters: [
      { name: 'Google Sheets', status: 'ready', note: 'No OAuth — just API key. Do first. Gives manual entry path for any metric.' },
      { name: 'Sigma', status: 'pending-creds', note: 'Provides Stories/week, batting average. Needs OAuth2 credentials.' },
      { name: 'Marfeel', status: 'pending-creds', note: 'Provides Discover rate, batting average. Needs API key + account manager URL.' },
      { name: 'Amplitude', status: 'pending', note: 'Pending access provisioning. CSA eng team has a separate p-tagging bug (their fix, not Pierce\'s action). Once access is granted, data quality depends on that fix resolving.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials (needs Snowflake/Sigma access from P1)',
      'Marfeel API key (needs outreach from P1)',
      'Amplitude access pending provisioning — confirm which group/path with IT or Chad',
      'Need to define "CSA uptime and production stats" with Chris (cadence, format, audience)',
    ],
    nextActions: [
      'Enable Google Sheets API + get read-only key → activate Sheets adapter NOW',
      'Get Amplitude API access — confirm provisioning path with IT or Chad',
      'Schedule definition meeting with Chris: what is "CSA uptime and production stats"?',
      'Get Sigma credentials once access lands → activate Sigma adapter',
      'Get Marfeel API key → activate Marfeel adapter',
    ],
    dependsOn: ['p1-access'],
  },

  'p3-headlines': {
    id: 'p3-headlines', num: '3', tier: 4, type: 'project', status: 'in-progress',
    name: 'T1 Headlines Analysis (Price)',
    owner: 'Pierce · Sarah Price',
    description: '9 live findings on Apple News, SmartNews, MSN headline performance. Monthly cadence pipeline ready. Tarrow maintains source sheet (updated monthly). Base analysis done. O&O/Amplitude layer (Chris Palo request) is a separate sub-workstream requiring Amplitude access — do not block core work on it.',
    blockers: [
      'MSN full-year 2025 re-export pending from Tarrow (unlocks Finding 5 platform separation)',
      'SmartNews 2026 category columns pending from Tarrow (unlocks Finding 3 for 2026)',
      'O&O/Amplitude layer blocked by Amplitude access (Project 1) — treat as separate workstream',
    ],
    nextActions: [
      'Share live site with Sarah Price for stakeholder alignment',
      'Share SmartNews entertainment over-index findings → distribution team',
      'Share "What to know" Featured rate findings → editorial leads',
      'Chase Tarrow for MSN full-year 2025 re-export',
      'Chase Tarrow for SmartNews 2026 category columns',
      'O&O layer: once Amplitude access lands, layer in pageview data per design doc',
    ],
    dependsOn: ['p1-access'],
  },

  'p4-governance': {
    id: 'p4-governance', num: '4', tier: 4, type: 'project', status: 'in-progress',
    name: 'Article Format + Persona + Keyword Governance',
    owner: 'Pierce · Sara Vallone · Susannah Locke · Sarah Price',
    description: 'Compile high-performing persona names; send controlled set to Susannah to pin in National accounts. Consolidate TH/TH B2C variants with Sara and Sarah Price. Finalize list before testing begins. CSA now stores metadata on article configurations (formats, personas, keywords) as of 2026-03-30 — features are in code review. Pairwise testing approach confirmed: ~3 formats × 3 personas = ~9 tests. Start with Discover and Trend Hunterland (6 personas: 3 each).',
    status_detail: 'In progress. Susannah persona texts not forthcoming — path forward is Sara Vallone drafting 6-7 new personas (Apple News, Smart News, MSN versions). Current Smart News and Apple personas are ineffective. New personas to be submitted to "Andy" for review.',
    blockers: [
      'Sara Vallone has not yet drafted new personas (Apple News, Smart News, MSN)',
      'Full governance structure needs cluster context from Project 6',
    ],
    nextActions: [
      'Sara Vallone: draft 6-7 new personas (Apple News, Smart News, MSN versions)',
      'Submit new Apple News + MSN personas to Andy for review',
      'Allison and Lauren to own specific personas (financial services/wellness; DIY/gardening)',
      'Pierce: update CSA content standards doc once Sara drafts personas; codify into system',
      'Consolidate TH/TH B2C variants with Sara Vallone and Sarah Price',
      'Finalize persona list and send to Susannah to pin in National accounts',
      'Build testing schedule (after controlled set is in use — see Project 5)',
      'Test Google Discover Explainer Content Format on CSA staging (https://staging.trendhunteragents.ai/csa) — Susannah to notify when site issues resolved (had loading problems 2026-03-30). Sara Vallone was also asked to test. Provide feedback.',
      'Note: CSA eng is actively building National team formats/audiences — PGS-95 (Google Discover Explainer format), PGS-96 (Discover Browser saved audience), PGS-104 (keywords input field on Research Draft) all in progress or code review as of 2026-03-30.',
    ],
    dependsOn: ['p6-taxonomy'],
  },

  // ── TIER 5 ────────────────────────────────────────────────────────────────

  'p35-narrative': {
    id: 'p35-narrative', num: '3.5', tier: 5, type: 'project', status: 'not-started',
    name: 'Content Analysis / Narrative Dashboard (Price)',
    owner: 'Pierce · Sarah Price',
    description: 'Formalize content testing narrative and build ongoing monitoring layer with Sarah Price. Chris\'s directive: own content testing internally (rq-content-learning-loop). Builds on T1 headline findings. Distinct from the headline analysis itself — this is the ongoing monitoring layer and testing narrative.',
    blockers: [
      'Project 3 (T1 Headlines) must be shared with Sarah Price and findings consolidated first',
    ],
    nextActions: [
      'Complete T1 stakeholder share (Project 3)',
      'Meet with Sarah Price: define monitoring format, cadence, and what goes into the narrative',
    ],
    dependsOn: ['p3-headlines'],
  },

  'p5-testing': {
    id: 'p5-testing', num: '5', tier: 5, type: 'project', status: 'not-started',
    name: 'Personas & Formats Testing / Optimization',
    owner: 'Pierce',
    description: 'Run controlled experiments to identify top-performing personas and formats once governance (P4) standardizes the controlled set and cluster tags (P7) enable proper measurement by cluster. Testing approach confirmed: pairwise, keep small (~3 formats × 3 personas = ~9 tests), avoid contamination. Start with Discover and Trend Hunterland (6 personas: 3 each). Cannot run valid experiments without both P4 and P7.',
    blockers: [
      'Project 4 (governance) must finalize controlled set first',
      'Project 7 (Vallone Tracker) must activate cluster tags to enable measurement',
    ],
    nextActions: [
      'Complete Projects 4 and 7 first',
      'Design pairwise testing schedule with Sarah Price (3 formats × 3 personas = ~9 tests)',
      'Start with Discover and Trend Hunterland, 3 personas each',
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
      'PRD revisions (Project 9) must define what recipes mean in current product direction',
      'Persona governance (Project 4) must define the controlled format/persona set',
    ],
    nextActions: [
      'Complete Projects 9 and 4 first',
      'Schedule scoping meeting with Chris to define what "recipes" means operationally',
    ],
    dependsOn: ['p9-prd', 'p4-governance'],
  },

  // ── HOLD ──────────────────────────────────────────────────────────────────

  'p12-unitedrobots': {
    id: 'p12-unitedrobots', num: '12', tier: 4, type: 'project', status: 'in-progress',
    name: 'United Robots Inbound Pipeline',
    owner: 'Pierce · Sara Vallone · Sarah Price',
    description: 'Use CSA to capture the 50% revenue share currently going to United Robots. Eric Nelson gave green light 2026-03-30 to bring this work inbound. Scope: scrape public alert feeds (weather, Amber Alerts, Silver Alerts, DOT closures), generate small factual stories with disclaimer, human-in-the-loop monitoring required. Sara Vallone\'s team can wrap additional content around successful alert topics. Sarah Price to review performance of existing automated stories for baseline.',
    blockers: [
      'Working group not yet defined — need to identify who owns monitoring + editorial review',
      'Alert scraping scope not finalized (which feeds, which markets)',
    ],
    nextActions: [
      'Map United Robots alerts pipeline in PRD — add as P9 input',
      'Discuss alert scraping approach + scope with Sara Vallone',
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

};
