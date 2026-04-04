// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
  { date: '2026-04-04', task: 'P1 Access: SEMrush + Amplitude access confirmed. Marfeel status still unclear. SEMrush 250K credits held by Sarah Price (confirmed 2026-04-03 alignment call) — to be forwarded to Pierce for API work.', project: '#1 Platform Access & Training' },
  { date: '2026-04-03', task: 'T1 Headlines: Governor system built into analysis environment — learns from Sarah Price\'s feedback over time; structured feedback request sent; Price will start providing notes next week.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'T1 Headlines: Evidence report generated against Sara Vallone\'s SmartNews/Apple News format guide (10 findings). Key corrections: WTK CONTRADICTED on SmartNews (p=0.046); questions worst formula on both platforms (Apple r=−0.265, SN r=−0.091, push −38% CTR); character ranges refined (SN: 70–90 ideal, Apple: 90–120); service journalism verticals claim softened. Push notifications section flagged as missing from guide entirely.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'T1 Headlines: Experiments page live (docs/experiments/index.html) — 8 suggestion cards auto-generated from analysis findings, Export PNG button added. Mann-Whitney tests added for sports/biz subtopic comparisons; politics rigor warning suppressed when n=0. SmartNews "Here\'s" finding downgraded to directional throughout (tile, table, callout, practical guidance). Build report fully clean: 6 ✓ checks, 3 informational engagement-outlier warnings (Tarrow source data issue).', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'Gary Tools: Charlotte Home Buyers Guide stress-test complete. Tool caught stale FY2025 tax rate ($966.20 vs correct $985.40) that human editor missed. Revaluation timing and causal chain framing flagged correctly. Gary reported results to Chris.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-03', task: 'P4 Governance: Sara Vallone\'s SmartNews/Apple News format guide received (via Sarah Price). Includes 2 personas: SmartNews Skimmer + Apple News Explorer. Evidence report produced against guide — 10 corrections surfaced (WTK contradicted on SmartNews; questions worst formula on both platforms; character targets refined; push notifications section missing entirely). Final guidance to be codified in csa-content-standards after Price conversation. Andy review still needed before personas go to Susannah.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-03', task: 'Gary Tools: Sara Vallone proposed simplified verdict taxonomy — 2 tiers: "Needs Clarification" (nuanced/mostly true, needs rewording) + "Needs Correction" (factually wrong, misleading, or needs verified source). Likes required corrections table (wants it moved to top). Appreciates source quality flagging (subpar blog callout). Sent 15 test articles. Requesting Gary access herself. Meeting next week to go deeper on ruleset.', project: '#10 Gary Tools Integration' },
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
      { name: 'Amplitude', status: 'done', note: 'Access confirmed 2026-04-04. CSA eng team has a separate p-tagging bug (CUE/WP tag format mismatch) — their fix, not a Pierce action item. Once resolved, activate dashboard adapter.' },
      { name: 'Marfeel', status: 'pending', note: 'Status unclear as of 2026-04-04 — may or may not be resolved. Verify. Also ask: why was Apple filter removed from main interface (Mar 2026)? Sarah Price\'s custom dashboard is now the only accurate Apple view.' },
      { name: 'Gary API', status: 'pending', note: 'Gary Kirwan to deliver API endpoint docs + McClatchy API key. Blocks Project 10.' },
      { name: 'SemRush', status: 'done', note: 'Access confirmed 2026-04-04.' },
      { name: 'MAIA', status: 'done', note: 'Access in hand.' },
      { name: 'BitBucket', status: 'done', note: 'Account created by IT. Added to CSA project by Amanda Hamilton 2026-03-30.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials still pending from Chad/IT',
      'Marfeel status unclear — verify whether access is actually resolved',
      'Gary API key not yet delivered by Gary Kirwan',
    ],
    nextActions: [
      'Schedule Chad Bruton walkthrough of growth_and_strategy_role Snowflake data (login resolved)',
      'Verify Marfeel access — may be resolved, may not',
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
      'Gary not responding — McClatchy API key status unclear; 4 questions unanswered as of 2026-04-03',
      'Sara Vallone meeting (next week) needed to finalize verdict taxonomy and run through test articles',
    ],
    nextActions: [
      'Originate draft ruleset before Sara Vallone meeting — start from her 2-tier taxonomy (Needs Clarification / Needs Correction); layer in source authority tiers and escalation logic',
      'Run Sara Vallone parameter session next week — walk 15 test articles she sent; use reports as working examples; arrive with draft ruleset for iteration',
      'Draft parameters document for Chris review once Sara session complete',
      'Continue following up with Gary — 4 questions still unanswered; Sara also seeking access independently',
      'Run first-test sequence once API key confirmed: health → scrape → meta → structure → brand-readiness → citations → poll',
      'Build integration spec per Chris\'s operational requirements: editor correction + override, error rate tracking by article/author/content type, override reporting (Pierce + Vallone + Chris initially)',
      'Once integration scoped: document claims validation workflow in csa-content-standards as a post-CSA quality gate step',
      'Define source trustworthiness management process — Pierce owns list; Sara wants to build it out from the subpar-source-flagging capability',
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
      'Add backlinking use case rationale — Sarah Price\'s team has 1 evergreen article at ~800 views/day; strategy is to flag existing articles that can link back to it; track ~25 URLs; future automation possible. Rationale: "borrow flare or credibility" from well-performing pieces.',
      'Add testing module to PRD scope — Chris, Sarah Price, Sara Vallone discussed: separate module where A/B test data lives outside CSA then feeds back in to improve headline building. "Down the line" not immediate, but needs to be in the PRD.',
      'Add Trend Hunter utility pieces — teams building content specifically for regular linking to build evergreen content (complements the backlinking strategy)',
      'Expand Sarah Price\'s + Sara Vallone\'s workflow detail — PRD currently slim on their processes',
      'Add claims validation as a formal PRD scope item once Gary integration is defined',
    ],
    dependsOn: [],
  },

  'p6-taxonomy': {
    id: 'p6-taxonomy', num: '6', tier: 3, type: 'project', status: 'in-progress',
    name: 'Content Cluster / Tagging Taxonomy',
    owner: 'Pierce · Susannah Locke · Chris Palo · Sara Vallone',
    description: 'Cluster tagging strategy SETTLED as of 2026-04-01 alignment meeting. Canonical ID = Cluster ID (session ID linking sibling variants). CSA articles are SIBLINGS. Full schema enablement and variant linking dev work now in the product/dev team\'s hands. PGS-40 remains ON HOLD in Jira pending dev queue. Pierce\'s role: stakeholder/monitor until dev delivers. VALIDATION: Sarah Price\'s content testing tracker has a live "Swarming Test" — 5 story clusters, 21 articles, tracking multi-article cluster performance manually (7 Dogs viral, Capybara, Ronnie Bowman, etc.). Articles tagged P (Parent/original) and C (Child/variant) — exactly the sibling structure Cluster IDs will automate at scale.',
    alignmentAgendaItems: [
      '(RESOLVED 2026-03-31) Canonical ID = Cluster ID confirmed; articles are siblings not parent/child; variant linking dev request logged.',
      '(RESOLVED 2026-04-01) Full cluster tagging strategy settled in alignment meeting.',
    ],
    blockers: [],
    nextActions: [
      'Monitor dev progress on variant linking and Cluster ID field implementation (PGS-40)',
      'Once dev delivers: document cluster tagging entry point (Research Draft stage) in csa-content-standards',
      'No other Pierce action items — strategy decided 2026-04-01, dev team owns execution',
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
    description: 'Activate live data ingestion layer in csa-dashboard. Manual metrics bridge live via manual-metrics.js + seedMetrics(). Amplitude access confirmed 2026-04-04 — p-tagging bug (CUE/WP format mismatch) still needs CSA eng fix before data is reliable. Google Sheets adapter closest to live — needs OAuth2 creds from Chad. Sigma and Marfeel still blocked on credentials. CSA uptime/production stats defined — data in hand, ready to populate. manual-metrics.js population deferred — CSA about to start auto-logging stats.',
    adapters: [
      { name: 'Google Sheets (manual)', status: 'done', note: 'Manual metrics bridge live via data/manual-metrics.js + seedMetrics() — no API key needed. Edit that file to update numbers.' },
      { name: 'Sigma', status: 'pending-creds', note: 'Provides Stories/week, batting average. Needs OAuth2 credentials.' },
      { name: 'Marfeel', status: 'pending-creds', note: 'Provides Discover rate, batting average. Needs API key + account manager URL.' },
      { name: 'Amplitude', status: 'pending-creds', note: 'Access granted 2026-04-04. CSA eng team p-tagging bug (CUE/WP tag format mismatch) still needs resolving before data quality is reliable — their fix. Once resolved, activate adapter.' },
    ],
    blockers: [
      'Google Sheets adapter: needs OAuth2 credentials from Chad Bruton',
      'Sigma OAuth2 credentials still needed for dashboard adapter',
      'Marfeel API key (access status unclear)',
      'Amplitude: access confirmed but p-tagging bug (CUE/WP format mismatch) must be fixed by CSA eng before data is reliable',
    ],
    nextActions: [
      'Get Google Sheets OAuth2 credentials from Chad Bruton → activate first live adapter',
      'Get Sigma credentials once Snowflake walkthrough happens → activate Sigma adapter',
      'Verify Marfeel access → get API key → activate Marfeel adapter',
      'Monitor CSA eng p-tagging fix → activate Amplitude adapter once resolved',
    ],
    dependsOn: ['p1-access'],
  },

  'p3-headlines': {
    id: 'p3-headlines', num: '3', tier: 4, type: 'project', status: 'in-progress',
    name: 'T1 Headlines Analysis (Price)',
    owner: 'Pierce · Sarah Price',
    description: 'Phase 2 active — 13 findings live, 5-tile playbook, experiments page live, governor system built. March Tarrow data ingested 2026-04-02; exhaustive cross-platform analysis complete. Full ANP data pipeline (420K rows, weekly drops from Tarrow). Findings (original 8): Featured Targeting, Push Notifications, Platform Topic Inversion, Views vs. Engagement, Formula Trends, Featuring Reaches Non-Subscribers, Topic Predicts Featuring, ANP Bottom-Performer Analysis. Added 2026-04-02 (5 new): MSN Formula Divergence, Formula × Topic Interaction, SmartNews Cross-Platform Formula Trap, Notification Outcome Language, Notification Send-Time. Playbook: Featured Targeting, Push Notifications, Section Tagging, Local vs. National, MSN Formula. Experiments page (docs/experiments/index.html): 8 suggestion cards auto-generated, Export PNG button. Governor system: learns from Sarah Price feedback to identify findings of interest proactively; structured feedback loop started 2026-04-03. Build report clean: 6 ✓ checks, 3 informational engagement-outlier warnings (Tarrow source data — active time values up to 23,496s, capped at 600s). Evidence report run against Vallone format guide — 10 corrections/additions surfaced. Ongoing monitoring cadence (monthly Tarrow + weekly ANP). O&O/Amplitude layer is a separate sub-workstream requiring Amplitude access.',
    blockers: [
      'O&O/Amplitude layer blocked by Amplitude access (P1) — treat as separate workstream, do not block core work',
    ],
    nextActions: [
      'Get SEMrush API key + 250K credits from Sarah Price (confirmed 2026-04-03; "Elan" at SEMrush set it up; Sarah will forward key + credit info)',
      '3-way meeting next week (Pierce, Sarah Price, Sara Vallone) — align on SEMrush signals/trends to track; Sarah Price will schedule',
      'Build SEMrush layer on top of API in T1 analysis environment — point-and-click signal tracking for Sarah (she deferred to Pierce to work the API)',
      'Governor: weight headline formula findings highest — Sarah confirmed focus is headlines only; syndication format variation has been paused',
      'Share formula × topic interaction finding → editorial leads (actionable: "here\'s" / question lift Apple News featuring ONLY for weather/emergency content)',
      'Share SmartNews formula trap finding → distribution team (questions and WTK actively hurt SmartNews; opposite of Apple News playbook)',
      'Meeting with Sarah Price 2026-04-04 — Apple headlines + TEO API through SEMrush + Sigma dashboard context; collect first governor feedback',
      'After Price meeting: codify finalized SmartNews/Apple News guidance into csa-content-standards for CSA ingestion (evidence report produced — guide needs 10 corrections before codification)',
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
    description: '5 personas sent to Susannah Locke to pin for all National accounts (2026-04-03): Discover Browser (already saved), + 4 additional ticketed in PGS-133. Content standards routing annotations live in §1: AGENT-AUDIENCE tags (general-style, headline, seo, human-only) enable CSA to grep rule sets by type. General style doc sent to Susannah to upload as CSA admin. H1 headline enforcement (80–100 chars) ticketed PGS-135. Sara Vallone\'s SmartNews/Apple News format guide received 2026-04-03 (via Sarah Price) — includes 2 new personas: SmartNews Skimmer + Apple News Explorer. Evidence report produced: guide needs 10 corrections before codification (WTK contradicted on SmartNews, questions worst formula on both platforms, character ranges refined, push notifications section missing). Final guidance to be codified in csa-content-standards after Price conversation. Andy review still required before personas go to Susannah. Pairwise testing approach confirmed: ~3 formats × 3 personas = ~9 tests.',
    status_detail: 'In progress. All 5 National team personas sent to Susannah 2026-04-03. PGS-133 (4 additional target audiences) selected for dev. PGS-134 (Everything to Know + FAQ/Service Journalism formats) in progress. PGS-135 (H1 headline 80–100 char enforcement) selected for dev. Apple News + Smart News format guide received — personas (SmartNews Skimmer, Apple News Explorer) in hand, Andy review still needed before codification.',
    blockers: [
      'Apple News + Smart News personas (SmartNews Skimmer, Apple News Explorer) received from Sara Vallone — Andy review still needed before sending to Susannah',
      'Format guide has 10 evidence-report corrections needed before codification in csa-content-standards',
      'H1 headline enforcement (PGS-135) pending Susannah prompt-level fix',
    ],
    nextActions: [
      'After Price meeting: finalize SmartNews/Apple News guidance incorporating evidence report corrections; codify into csa-content-standards for CSA ingestion',
      'Get Andy review on SmartNews Skimmer + Apple News Explorer personas; once approved, send to Susannah to pin for National accounts',
      'Confirm with Susannah that headline agent prompt has been updated with AGENT-AUDIENCE: headline content (csa-content-standards v1.4.0 applied it; CSA admin upload pending)',
      'Extend AGENT-AUDIENCE routing annotations beyond §1 to full guidance doc (pending Susannah confirmation it works)',
      'Document format/persona separation in csa-content-standards once dev tooling is defined (decision: independently selectable, mix-and-match)',
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

  'p14-semrush': {
    id: 'p14-semrush', num: '14', tier: 4, type: 'project', status: 'in-progress',
    name: 'SEMrush / Keyword Signal Layer',
    owner: 'Pierce · Sarah Price · Sara Vallone',
    description: 'Build a keyword and trend signal tracking layer using the SEMrush API. Sarah Price holds the API key + 250K credits (confirmed 2026-04-03 alignment call; "Elan" at SEMrush set it up). Goal: point-and-click interface for Sarah Price to track keyword performance without touching the API directly. Feeds T1 Headlines analysis and content planning broadly. Two confirmed use cases: (1) track ~5 URLs for keyword performance signals; (2) evergreen backlinking strategy — track ~25 URLs, measure improvement after adding backlinks to proven evergreen article (~800 views/day). 3-way alignment meeting planned next week (Pierce, Sarah Price, Sara Vallone) to define signals, presentation format, and update cadence before building.',
    blockers: [
      'SEMrush API key not yet received from Sarah Price (she will forward)',
      '3-way alignment meeting needed before building — must confirm what signals to track, presentation format, update frequency',
    ],
    nextActions: [
      'Receive SEMrush API key + 250K credit info from Sarah Price',
      '3-way meeting next week (Pierce, Sarah Price, Sara Vallone) — align on: signals/trends to track, how to present, weekly vs monthly cadence, what to toggle by; Sarah Price scheduling',
      'Build SEMrush layer post-meeting — point-and-click interface on top of API for Sarah Price',
      'Start with evergreen backlinking use case: track ~25 URLs, measure improvement after adding backlinks to ~800 view/day evergreen article',
    ],
    dependsOn: ['p1-access', 'p3-headlines'],
    contacts: [
      { name: 'Sarah Price', role: 'Primary user; holds SEMrush API key + 250K credits' },
      { name: 'Sara Vallone', role: 'Stakeholder; aligning on signals to track' },
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
      'Note: Discover Persona test sheet exists in Sarah Price\'s testing tracker but is empty/not started — natural starting point when P4/P7 are ready',
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
