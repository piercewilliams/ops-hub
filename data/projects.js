// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
  // { date: '2026-03-29', task: 'Example: enabled Google Sheets API key', project: '#1 Platform Access' },
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
      { name: 'Snowflake / Sigma', status: 'pending', note: 'IT ticket sent 2026-03-26. Chad says: add to security group. Also need specific permissions to SEO data warehouse (Rocky Rhodes note).' },
      { name: 'CUE', status: 'done', note: 'Access in hand.' },
      { name: 'WordPress', status: 'done', note: 'Full access as of 2026-03-28.' },
      { name: 'Google Sheets API', status: 'pending', note: 'No OAuth — read-only key only. Lowest barrier. Do first.' },
      { name: 'Amplitude', status: 'blocked', note: 'Blocked by p-tagging issue (Cue/WP tag format incompatibility). Dev fix required. Attend standup to scope event names with Patrick/Dar now (forward-path work).' },
      { name: 'Marfeel', status: 'pending', note: 'Contact account manager for API key. Also ask: why was Apple filter removed from main interface (Mar 2026)? Sarah Price\'s custom dashboard is now the only accurate Apple view.' },
      { name: 'Gary API', status: 'pending', note: 'Gary Kirwan to deliver API endpoint docs + McClatchy API key. Blocks Project 10.' },
      { name: 'SemRush', status: 'pending', note: '' },
      { name: 'MAIA', status: 'pending', note: 'Generates research draft imported at CSA Step 1. Prerequisite for understanding AI-first workflow path. Schedule training.' },
      { name: 'Product/Dev GitHub', status: 'pending', note: 'Get access from Rajiv. Required for Project 8 (CSA mapping).' },
    ],
    blockers: [
      'Snowflake/Sigma security group ticket pending IT response (submitted 2026-03-26)',
      'Gary API key not yet delivered by Gary Kirwan',
      'Amplitude blocked by p-tagging dev issue — do not activate Amplitude adapter until dev resolves',
    ],
    nextActions: [
      'Enable Google Sheets API, get read-only key (do now — no OAuth)',
      'Follow up on Snowflake/Sigma security group ticket with IT + Chad',
      'Contact Marfeel account manager for API key; ask about Apple filter removal',
      'Attend dev standup — scope Amplitude event names with Patrick/Dar (forward-path for dashboard)',
      'Chase Gary Kirwan for API docs + key delivery',
      'Get GitHub access from Rajiv (unlocks Project 8)',
      'Schedule MAIA training',
    ],
    dependsOn: [],
  },

  // ── TIER 2 ────────────────────────────────────────────────────────────────

  'p8-mapping': {
    id: 'p8-mapping', num: '8', tier: 2, type: 'project', status: 'not-started',
    name: 'Rajiv CSA Mapping',
    owner: 'Pierce',
    description: 'Use GitHub access from Rajiv to map all CSA transformations in granular detail — every step, every reasoning chain, in order. Prerequisite for PRD revisions. Can run in parallel with Project 13.',
    blockers: [
      'Needs GitHub/product access from Rajiv (subset of Project 1)',
    ],
    nextActions: [
      'Get GitHub access from Rajiv',
      'Map all CSA transformations end-to-end',
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
      'Chase Gary Kirwan for API docs + key delivery',
      'Susannah reviewing API docs + Jim Robinson\'s materials — follow up on status',
      'Schedule scoping meeting with Chris Palo to prioritize modules',
      'Once key received: health → scrape → meta → structure → brand-readiness → citations → poll',
      'Discuss two-tier brand guideline approach with Chris (national vs. per-publication)',
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
    id: 'p9-prd', num: '9', tier: 3, type: 'project', status: 'not-started',
    name: 'PRD Revisions',
    owner: 'Pierce',
    description: 'Study and revise the PRD for the product team. Chris\'s ask: "Map them out now that we\'re two weeks in and more players are at the table (SEO folks). Documentation needs to be squared away." Needs CSA mapping and system prompt understanding as inputs. Gary findings also inform scope.',
    blockers: [
      'Project 8 (CSA Mapping) should complete first',
      'Project 13 (System Prompts) should complete first',
      'Gary tools exploration (Project 10) findings should inform PRD scope',
    ],
    nextActions: [
      'Complete Projects 8 and 13 first',
      'Review Gary tools findings',
      'Study PRD fresh (post-mapping) and annotate gaps/inaccuracies',
      'Revise and document for product team',
    ],
    dependsOn: ['p8-mapping', 'p13-sysprompts', 'p10-gary'],
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
    id: 'p7-tracker', num: '7', tier: 4, type: 'project', status: 'blocked',
    name: 'Vallone Tracker / CMS Automation',
    owner: 'Pierce (dev) · Sara Vallone (stakeholder)',
    description: 'Automate Sara Vallone\'s content governance Google Sheet. Currently: ~20-25 min manual entry per cluster. Scope: CUE + WordPress → Google Sheet. Eventually add pageview data via Snowflake/Sigma. No database — Google Sheet stays the hub.',
    blockers: [
      'Alignment meeting (Project 6) must happen first — schema must be agreed before building',
      'No Cluster ID field in CUE or WordPress yet',
      'Snowflake/Sigma access pending — determines architecture (webhook vs. Snowflake→Sheet)',
    ],
    nextActions: [
      'Complete Project 6 alignment meeting first',
      'Once Snowflake access lands: explore CUE data completeness in Snowflake (may skip webhook entirely)',
      'Get Chad\'s Sigma walkthrough — confirm CUE fields and pageview-to-URL linkage',
      'Note: Chad says Sigma can do all of this once cluster tags exist',
      'Confirm which CUE publications to scope (Sara\'s team only)',
      'Confirm author allowlist (names as they appear in CUE)',
      'WordPress → Google Sheet integration (access in hand, lower priority)',
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
      { name: 'Amplitude', status: 'blocked', note: 'BLOCKED — CMS p-tagging format incompatibility. Do not activate until dev resolves. Forward-path: scope event names at dev standup with Patrick/Dar.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials (needs Snowflake/Sigma access from P1)',
      'Marfeel API key (needs outreach from P1)',
      'Amplitude blocked by rq-p-tagging-issue (dev fix required)',
      'Need to define "CSA uptime and production stats" with Chris (cadence, format, audience)',
    ],
    nextActions: [
      'Enable Google Sheets API + get read-only key → activate Sheets adapter NOW',
      'Attend dev standup — scope Amplitude event names with Patrick/Dar',
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
    description: 'Compile high-performing persona names; send controlled set to Susannah to pin in National accounts. Consolidate TH/TH B2C variants with Sara and Sarah Price. Finalize list before testing begins. Longer-term: build testing schedule once controlled set is in use and cluster tags exist for measurement.',
    status_detail: 'In progress as of 2026-03-25: Pierce requested top 15 persona texts from Susannah. Awaiting receipt.',
    blockers: [
      'Awaiting top 15 persona texts from Susannah (requested 2026-03-25)',
      'Full governance structure needs cluster context from Project 6',
    ],
    nextActions: [
      'Receive persona texts from Susannah',
      'Consolidate TH/TH B2C variants with Sara Vallone and Sarah Price',
      'Finalize persona list and send to Susannah to pin in National accounts',
      'Build testing schedule (after controlled set is in use — see Project 5)',
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
    description: 'Run controlled experiments to identify top-performing personas and formats once governance (P4) standardizes the controlled set and cluster tags (P7) enable proper measurement by cluster. Cannot run valid experiments without both.',
    blockers: [
      'Project 4 (governance) must finalize controlled set first',
      'Project 7 (Vallone Tracker) must activate cluster tags to enable measurement',
    ],
    nextActions: [
      'Complete Projects 4 and 7 first',
      'Design testing schedule with Sarah Price',
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
    id: 'p12-unitedrobots', num: '12', tier: 0, type: 'project', status: 'hold',
    name: 'CSA Subs / United Robots Evaluation',
    owner: 'Pierce',
    description: 'Evaluate United Robots as a potential CSA alternative or supplement for certain content types. Kathy\'s examples on file. HOLD until Chris + Eric independently clarify business feasibility. Their track may change what you\'re evaluating against.',
    blockers: [
      'HOLD — Waiting on Chris + Eric to clarify business feasibility of United Robots',
    ],
    nextActions: [
      'No action until Chris + Eric surface their decision',
      'Kathy\'s examples on file when evaluation resumes',
    ],
    dependsOn: [],
    links: [
      { label: 'Sac Bee example 1', url: 'https://www.sacbee.com/news/article315177773.html' },
      { label: 'Kansas City example', url: 'https://www.kansascity.com/news/article315178360.html' },
      { label: 'Sac Bee example 2', url: 'https://www.sacbee.com/news/article315180449.html' },
    ],
  },

};
