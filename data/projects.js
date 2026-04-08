// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
  { date: '2026-04-08', task: 'csa-content-standards v1.6.2: SEO Keywords (Meta Keywords) guidance added site-wide. Source: TEO team guidelines (Oliver Felix), refined with National team input (Pierce + Susannah Locke). National team refinement: single words acceptable (TEO required multi-word phrases only); count expanded to 1–5. Changes: §1.2 Character Counts SEO Keywords field added; new ### SEO Keywords (Meta Keywords) Rules section (AGENT-AUDIENCE: seo tagged); Pre-Publish Checklist line added; ### SEO Keywords (Meta Keywords) (REQUIRED) subsection added after ### Meta Description in all ten §3 format sections (§3.1–3.10). Example: "travel, supplements, Jason Kelce, dca plane crash, washington plane crash". Resolved PGS-148 SEO keywords gap that was blocking Oliver Felix.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-08', task: 'csa-content-standards v1.6.1: Platform Formats consistency audit complete. All discrepancies between validated headline data (data-headlines) and site documents corrected: publishing-guidelines.md §6.3 Apple News range fixed (80–139 → 90–120, 110–119 sweet spot); headlines.md Apple News block rewritten + SmartNews outlet block added; agent_routing.yml SmartNews seo entry added. Data-validated labels added throughout both platform pages (§10.1 SmartNews, §10.2 Apple News) and api/reference.json + master-reference.md.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-08', task: 'csa-content-standards v1.6.0: Platform Formats §10 built — SmartNews §10.1 and Apple News §10.2 standalone pages. SmartNews: 70–90 chars (80–99 sweet spot), no question/WTK, number-led OK, SmartFormat RSS/XML spec, GA4 in-app caveat, SmartNews Skimmer persona. Apple News: 90–120 chars (110–119 sweet spot), no question/number-led, featured placement exception, subtitle required, AI content policy, 100%/70% monetization split, Apple News Explorer persona. Navigation, admin config, master-reference, api/reference.json, agent_routing.yml all updated.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-08', task: 'csa-content-standards v1.4.2: §9 Claims Validation page built (docs/claims-validation.md). Five verdicts: TRUE/FALSE/MISLEADING/INSUFFICIENT_EVIDENCE/OVERGENERALIZED. Editorial action taxonomy mapped to Sara\'s 2-tier system (Needs Correction / Needs Clarification). Source authority tiers (Tier 1/2/3). Content-type-specific rules: health (hard stop on any flag; Tier 1 required even on TRUE for dosage/drug/efficacy), legal (primary source docs; check figure vintage), financial (confirm statistics even on TRUE; attribute forecasts), real estate (OVERGENERALIZED = Needs Correction), travel (verify vs official at publish), entertainment (named source for relationship/pregnancy/legal). Escalation table. Override documentation requirement. Acceptance criteria for test article walk. Feeds Gary Tools integration (§9 spec complete; Gary API integration details to be added after Sara Vallone parameter session).', project: '#10 Gary Tools Integration' },
  { date: '2026-04-07', task: 'csa-content-standards v1.4.1: AI Tool Responsibility page finalized (DRAFT banner removed). All escalation contacts resolved: Step 2 = Sara Vallone + #prog-and-growth; supervisor conflict = Sara Vallone and/or Chris Palo; recurring issues + stop-use = #nationalteam-csa-feedback. Partner/Feed Content verbatim matching rule added (3+ consecutive words = rewrite). Only remaining open item: override documentation location (TBD, pending CSA team input). §8 added to master-reference.md; api/reference.json section 8 entry added.', project: '#15 Partner Content / Inventory Optimization' },
  { date: '2026-04-03', task: 'P4 Governance: Sara Vallone alignment call — confirmed 4-agent routing architecture (headlines / SEO / body content / final style pass). Sara now understands AGENT-AUDIENCE tags and why content standards must be labeled by agent type. She will send Apple News + SmartNews combined doc (format at top, persona labeled at bottom) to Andy for review, then to Pierce. Sara conceptually frames Apple News/SmartNews best practices as format, not persona — once format/persona decoupling lands, content should migrate from persona to format section.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-04', task: 'P1 Access: SEMrush + Amplitude access confirmed. Marfeel status still unclear. SEMrush 250K credits held by Sarah Price (confirmed 2026-04-03 alignment call) — to be forwarded to Pierce for API work.', project: '#1 Platform Access & Training' },
  { date: '2026-04-03', task: 'T1 Headlines: Governor system built into analysis environment — learns from Sarah Price\'s feedback over time; structured feedback request sent; Price will start providing notes next week.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'T1 Headlines: Evidence report generated against Sara Vallone\'s SmartNews/Apple News format guide (10 findings). Key corrections: WTK CONTRADICTED on SmartNews (p=0.046); questions worst formula on both platforms (Apple r=−0.265, SN r=−0.091, push −38% CTR); character ranges refined (SN: 70–90 ideal, Apple: 90–120); service journalism verticals claim softened. Push notifications section flagged as missing from guide entirely.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'T1 Headlines: Experiments page live (docs/experiments/index.html) — 8 suggestion cards auto-generated from analysis findings, Export PNG button added. Mann-Whitney tests added for sports/biz subtopic comparisons; politics rigor warning suppressed when n=0. SmartNews "Here\'s" finding downgraded to directional throughout (tile, table, callout, practical guidance). Build report fully clean: 6 ✓ checks, 3 informational engagement-outlier warnings (Tarrow source data issue).', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-03', task: 'Gary Tools: Charlotte Home Buyers Guide stress-test complete. Tool caught stale FY2025 tax rate ($966.20 vs correct $985.40) that human editor missed. Revaluation timing and causal chain framing flagged correctly. Gary reported results to Chris.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-03', task: 'P4 Governance: Sara Vallone\'s SmartNews/Apple News format guide received (via Sarah Price). Includes 2 personas: SmartNews Skimmer + Apple News Explorer. Evidence report produced against guide — 10 corrections surfaced (WTK contradicted on SmartNews; questions worst formula on both platforms; character targets refined; push notifications section missing entirely). Final guidance to be codified in csa-content-standards after Price conversation. Andy review still needed before personas go to Susannah.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-03', task: 'Gary Tools: Sara Vallone proposed simplified verdict taxonomy — 2 tiers: "Needs Clarification" (nuanced/mostly true, needs rewording) + "Needs Correction" (factually wrong, misleading, or needs verified source). Likes required corrections table (wants it moved to top). Appreciates source quality flagging (subpar blog callout). Sent 15 test articles. Requesting Gary access herself. Meeting next week to go deeper on ruleset.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-03', task: 'Gary Tools: Pierce inserted into email chain with 4 questions for Gary (confidence scoring methodology, severity calibration by content type, article-level vs claim-level output, reproducibility across runs). Sara Vallone looped in via Slack to define editorial parameters — awaiting her response.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-07', task: 'AI Tool Responsibility: Full page created in csa-content-standards (docs/tool-responsibility.md) with DRAFT banner. Content draws from Sara Vallone\'s draft + expanded escalation language drafted by Pierce: named escalation chain, supervisor conflict path, stop-use trigger, plagiarism/attribution check, partner content vetting policy, override documentation. Six [TBD] placeholders require decisions from Chris Palo + Sara Vallone (Step 2/3 contacts, supervisor conflict contact, Slack channel, override doc location, United Robots scope, doc ownership/cadence). Page added to navigation.yml + admin/config.yml. NOT to be distributed externally until TBDs resolved.', project: '#15 Partner Content / Inventory Optimization' },
  { date: '2026-04-07', task: 'CSA Fact-Checking Ruleset v0.1 drafted. Frames Gary Kirwan\'s tool as a built-in CSA fact-checking module (per Chris direction — no external attribution). Covers: 5-verdict taxonomy (TRUE/FALSE/MISLEADING/INSUFFICIENT_EVIDENCE/OVERGENERALIZED) mapped to Sara\'s 2-tier action taxonomy (Needs Clarification / Needs Correction); source authority tiers (Tier 1/2/3); content-type-specific rules (health, legal, financial, real estate, travel, entertainment); escalation logic by flag count and content type; override documentation format. 4 open items for Rajiv/Susannah (United Robots scope, module access by role, confidence scores, audit trail). Ready for Sara Vallone test-article walk next week.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-07', task: '/sync-repos skill created at ~/.claude/skills/sync-repos.md. CLAUDE.md updated with enforcement instruction. Feedback memory written. Three-layer enforcement so cross-repo sync happens without user prompting.', project: '#8 Rajiv CSA Mapping' },
  { date: '2026-04-06', task: 'T1 Headlines: Headline Grader built and delivered to Sara Vallone + Sarah Price. Requirements gathered from Sara/Sarah at C&P Weekly and prior sessions, refined by Pierce, built into generate_grader.py with 14 criteria in 4 tiers (rule-based char count, formula detection, keyword, all-caps, DYM, article lead, subject leads, informational flags + Groq LLM active voice, lead burial, curiosity gap, accuracy, vague WTK). Pulls live from Sara Vallone\'s Google Tracker sheet (daily 10am Chicago cron). 30-day rolling history at docs/grader/history.json. Site link delivered to Sara Vallone + Sarah Price 2026-04-06.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-06', task: 'PRD V0.4 completed and delivered to Chris Palo for final review. Sara Vallone feedback incorporated (MAIA as brief source, headline keyword anchoring, plagiarism + diff check modules named, editorial experience section completed). Sarah Price inputs incorporated (testing module as standalone system, evergreen backlinking as named use case). Syndication ecosystem taxonomy (app-based captured vs. web-based competitive), LTV=0 framework, and swarm testing added as formal Phase 2/3 product requirement. V0.4 docx on Pierce\'s Desktop; live in Google Docs.', project: '#9 PRD Revisions' },
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
      { name: 'Marfeel', status: 'pending', note: 'Status unclear as of 2026-04-04 — may or may not be resolved. Verify. Also ask: why was Apple filter removed from main interface (Mar 2026)? Sarah Price\'s custom dashboard is now the only accurate Apple view. Note: Marfeel numbers may be inflated for El Nuevo specifically (C&P Weekly 2026-04-06) — verify before using in analysis.' },
      { name: 'Gary API', status: 'done', note: 'Full API docs received 2026-04-08. Base URL: unified-seo-gateway.kirwan-digital-marketing-ltd.workers.dev. McClatchy key in hand (rotatable). See gary-tools repo for endpoint catalog and first-test sequence.' },
      { name: 'SemRush', status: 'done', note: 'Access confirmed 2026-04-04.' },
      { name: 'MAIA', status: 'done', note: 'Access in hand.' },
      { name: 'BitBucket', status: 'done', note: 'Account created by IT. Added to CSA project by Amanda Hamilton 2026-03-30.' },
      { name: 'CSA GitHub repo', status: 'done', note: 'DECISION 2026-04-07: Bitbucket mirrors GitHub — Bitbucket access is sufficient (Kathryn Sheplavy confirmed). GitHub access not needed. Both are fine to have if convenient, but not pursuing.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials still pending from Chad/IT',
      'Marfeel status unclear — verify whether access is actually resolved',
    ],
    nextActions: [
      'Schedule Chad Bruton walkthrough of growth_and_strategy_role Snowflake data (login resolved)',
      'Verify Marfeel access — may be resolved, may not',
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
      'Lower priority — do not block other work on this',
      'Map CSA transformations opportunistically as BitBucket/GitHub access allows',
    ],
    dependsOn: ['p1-access'],
  },

  'p10-gary': {
    id: 'p10-gary', num: '10', tier: 2, type: 'project', status: 'in-progress',
    name: 'Gary Tools Integration',
    owner: 'Pierce (lead) · Susannah Locke (integration lead) · Chris Palo (stakeholder)',
    description: 'UNBLOCKED 2026-04-08 — Gary sent full API docs to Chris. Base URL: unified-seo-gateway.kirwan-digital-marketing-ltd.workers.dev. McClatchy API key in hand (rotatable per Gary). Key fact-checking endpoint: POST /api/v1/research/data-validity. Gary\'s recommended workflow: copy API doc into Claude and run markdown articles through it. Three reports run: Duggar legal, Women\'s World health, Charlotte Home Buyers Guide. Charlotte stress-test complete: tool caught stale FY2025 tax rate ($966.20 vs correct $985.40) that human editor missed. Chris directed Pierce + Sara Vallone to define editorial parameters (verdict types: TRUE/FALSE/MISLEADING/INSUFFICIENT_EVIDENCE/OVERGENERALIZED). Sara proposed simplified 2-tier taxonomy: "Needs Clarification" + "Needs Correction". Acceptance tracking = system quality signal. Primary use case: claims validation / factual accuracy post-CSA, before editor\'s desk. NOT primarily an SEO play.',
    blockers: [
      'Sara Vallone parameter session (next week) needed to finalize verdict taxonomy and run through 15 test articles — v0.1 ruleset sent to Sara 2026-04-08, awaiting her review',
      '4 technical questions still unanswered: confidence score definition, severity calibration by domain, article-level vs claim-level output, reproducibility across runs',
    ],
    nextActions: [
      'Document Gary desired functionality FIRST: hierarchy of escalation paths, desired behavior/responses for each scenario (e.g. Needs Clarification vs Correction), internal logic. Susannah confirmed (2026-04-07 CSA Weekly) this approach is the right one to set dev expectations upfront.',
      'Run first-test sequence against Gary API: GET /health → POST /scrape → POST /optimize/meta → POST /audit/content-structure → POST /audit/unanswered-questions → GET /brands/mcclatchy/readiness → POST /audit/citations → poll GET /jobs/:id',
      'Run Sara Vallone parameter session next week — walk 15 test articles, iterate on v0.1 ruleset',
      'Draft parameters document for Chris review once Sara session complete',
      'Define source trustworthiness management process — Pierce owns list; Sara wants to build from subpar-source-flagging capability',
      'Once integration scoped: document claims validation workflow in csa-content-standards as a post-CSA quality gate step',
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
    description: 'COMPLETE. PRD V0.4 delivered to Chris Palo 2026-04-06. Sara Vallone + Sarah Price feedback fully incorporated. Syndication ecosystem taxonomy, LTV=0 framework, swarm testing, standalone testing module, evergreen backlinking all added. Chris had not yet read V0.4 as of 2026-04-07 meeting (Pierce dropped link). Outstanding open question for Chris: appropriate level of automation in middle pipeline categories — Chris acknowledged this is his call. V0.4 docx on Desktop; live in Google Docs.',
    blockers: [],
    nextActions: [
      'Await Chris Palo final review and feedback on V0.4 — he is reading now; will provide feedback on automation levels in middle categories',
    ],
    dependsOn: [],
  },

  'p6-taxonomy': {
    id: 'p6-taxonomy', num: '6', tier: 3, type: 'project', status: 'in-progress',
    name: 'Content Cluster / Tagging Taxonomy',
    owner: 'Pierce · Susannah Locke · Chris Palo · Sara Vallone',
    description: 'Cluster tagging strategy SETTLED as of 2026-04-01 alignment meeting. Canonical ID = Cluster ID (session ID linking sibling variants). CSA articles are SIBLINGS. PGS-40 (Define Tagging Taxonomy) → WON\'T DO (2026-04-08 Jira). Work restructured into EGS-127 — an epic with 4 subtasks tracking which content variants came from which canonical article. Marcelo Freitas assigned to start. Susannah\'s #1 analytics priority: one editor (Sarah) manually tracking 700+ stories/month — this automates it. Distinct from PGS-140 (duplicate content analytics) and PGS-80 (user event tracking). Performance: national team at 1-in-3.3 stories-per-cluster ratio as of 2026-04-07 (target: 1-in-4 — already exceeded). Tracking still painful without tagging live. FUTURE: Chris proposed daily AB testing of templates (content creators unaware of test group).',
    alignmentAgendaItems: [
      '(RESOLVED 2026-03-31) Canonical ID = Cluster ID confirmed; articles are siblings not parent/child; variant linking dev request logged.',
      '(RESOLVED 2026-04-01) Full cluster tagging strategy settled in alignment meeting.',
    ],
    blockers: [],
    nextActions: [
      'Monitor EGS-127 progress (Marcelo Freitas) — 4-subtask epic for tracking variant origins, replacing PGS-40',
      'Once EGS-127 delivers: document cluster tagging entry point (Research Draft stage) in csa-content-standards',
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
    description: 'Activate live data ingestion layer in csa-dashboard. Manual metrics bridge live via manual-metrics.js + seedMetrics(). Amplitude access confirmed 2026-04-04 — p-tagging bug (CUE/WP format mismatch) still needs CSA eng fix before data is reliable. Sigma and Marfeel still blocked on credentials. CSA uptime/production stats defined — data in hand, ready to populate. manual-metrics.js population deferred — CSA about to start auto-logging stats.',
    adapters: [
      { name: 'Google Sheets (manual)', status: 'done', note: 'Manual metrics bridge live via data/manual-metrics.js + seedMetrics() — no API key needed. Edit that file to update numbers.' },
      { name: 'Sigma', status: 'pending-creds', note: 'Provides Stories/week, batting average. Needs OAuth2 credentials.' },
      { name: 'Marfeel', status: 'pending-creds', note: 'Provides Discover rate, batting average. Needs API key + account manager URL.' },
      { name: 'Amplitude', status: 'pending-creds', note: 'Access granted 2026-04-04. PGS-80 event tracking DONE (2026-04-06). Remaining blocker: CSA eng p-tagging bug (CUE/WP tag format mismatch) still needs resolving before data quality is reliable — their fix. Once resolved, activate adapter.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials still needed for dashboard adapter',
      'Marfeel API key (access status unclear)',
      'Amplitude: p-tagging bug (CUE/WP format mismatch) must be fixed by CSA eng before data is reliable',
    ],
    nextActions: [
      'Verify Marfeel access → get API key → activate Marfeel adapter',
      'Schedule Chad Bruton Snowflake walkthrough → get Sigma OAuth2 credentials → activate Sigma adapter',
      'Monitor CSA eng p-tagging fix → activate Amplitude adapter once resolved',
      'Monitor PGS-140 (duplicate content analytics) — Marcelo started Amplitude implementation 2026-04-07 (intelligence only, no UI); confirm Amplitude event names with dev team when ticket moves to build',
    ],
    dependsOn: ['p1-access'],
  },

  'p3-headlines': {
    id: 'p3-headlines', num: '3', tier: 4, type: 'project', status: 'in-progress',
    name: 'T1 Headlines Analysis (Price)',
    owner: 'Pierce · Sarah Price',
    description: 'Phase 2 active — 13 findings live, 5-tile playbook, experiments page, governor system, Headline Grader all shipped. March Tarrow data ingested 2026-04-02; exhaustive cross-platform analysis complete. Full ANP data pipeline (420K rows, weekly drops from Tarrow). Findings (original 8): Featured Targeting, Push Notifications, Platform Topic Inversion, Views vs. Engagement, Formula Trends, Featuring Reaches Non-Subscribers, Topic Predicts Featuring, ANP Bottom-Performer Analysis. Added 2026-04-02 (5 new): MSN Formula Divergence, Formula × Topic Interaction, SmartNews Cross-Platform Formula Trap, Notification Outcome Language, Notification Send-Time. Playbook: Featured Targeting, Push Notifications, Section Tagging, Local vs. National, MSN Formula. Experiments page (8 suggestion cards auto-generated). Governor system: structured feedback loop started 2026-04-03. Headline Grader (docs/grader/index.html): daily headline grader against Sara Vallone\'s live Tracker sheet; 14 criteria (rule-based + Groq LLM); 30-day rolling history; site link delivered to Sara Vallone + Sarah Price 2026-04-06. Evidence report run against Vallone format guide — 10 corrections/additions surfaced. O&O/Amplitude layer is a separate sub-workstream requiring Amplitude access.',
    blockers: [
      'O&O/Amplitude layer: access confirmed — blocked on CSA eng p-tagging bug (CUE/WP tag format mismatch); treat as separate workstream, do not block core work',
      'Headline Grader stalled on deliverability: cannot move repo out of Pierce\'s personal GitHub into M-Lache org — Pierce lacks permission to set up OAuth tokens, API keys, or GitHub automations in M-Lache org. Chris Palo pinging Rasheed about Bitbucket + Cloudflare JSON access as team environment.',
    ],
    nextActions: [
      'Document sandbox base build (toolkit, guardrails, access) — Chris explicitly asked 2026-04-07; needed for Chris + Sarah Price to create specialized builds. Do this first before other next actions.',
      'Notify Tarrow: active time outliers in source Excel (values up to 23,496s — likely milliseconds stored as seconds); pipeline caps at 600s but source data needs fixing',
      'Downgrade WTK/SmartNews site prose from "significant" to "directional" — held pending human resolution (_SN_FORMULA_DATA shows WTK at p=3.0e-6 in a different run, conflicting with p=0.046)',
      'Ecosystem taxonomy audit: validate cross-platform comparisons only compare within ecosystem type (app-based captured: Apple News, SmartNews, Newsbreak vs. web-based competitive: Yahoo, O&O); flag any comminging findings in governor',
      'Share formula × topic interaction finding → editorial leads ("here\'s" / question lift Apple News featuring ONLY for weather/emergency content)',
      'Share SmartNews formula trap finding → distribution team (questions and WTK actively hurt SmartNews; opposite of Apple News playbook)',
      'Individual performance tracking: add per-author breakdown to Headline Grader — author field already in Sara\'s Tracker sheet',
      'Follow up with Sarah Price on SEMrush API key + 250K credits if not yet received',
      '3-way SEMrush meeting (Pierce, Sarah Price, Sara Vallone) — Sarah Price scheduling; align on signals to track, cadence, presentation format',
      'Codify finalized SmartNews/Apple News guidance into csa-content-standards — pending Vallone final format guide (10 corrections needed first)',
      'Build SEMrush layer after 3-way meeting defines scope',
      'Headline Grader: monitor Sara Vallone + Sarah Price feedback on criteria; refine rule tiers in generate_grader.py as input comes in',
      'Receive cluster performance data + Amplitude pulse data from Sarah Price (waiting on her)',
      'O&O layer: activate once CSA eng p-tagging bug resolved',
    ],
    dependsOn: ['p1-access'],
  },

  'p4-governance': {
    id: 'p4-governance', num: '4', tier: 4, type: 'project', status: 'in-progress',
    name: 'Article Format + Persona + Keyword Governance',
    owner: 'Pierce · Sara Vallone · Susannah Locke · Sarah Price',
    description: '5 personas sent to Susannah Locke to pin for all National accounts (2026-04-03): Discover Browser (already saved), + 4 additional ticketed in PGS-133. AGENT-AUDIENCE routing — §1 content status: general-style sections (§1.1 Voice & Tone, §1.3 Explicit Language, §1.4 link count + anchor) uploaded by Susannah via UI; headline (§1.2 PGS-141) + seo (§1.2 PGS-148) selected for dev; human-only (§1.4 What to Link To + §1.5–1.9) no action needed. Susannah using Claude to fetch content by tag. PGS-148 high priority: seo title (50–70 chars), meta description (100–155 chars), focus keyphrase rules from seo-rules.md — National team only, overrides PGS-102; Pierce tagged; eng to review alongside PGS-104. OPEN GAP: Oliver Felix (2026-04-07) flagged seo-rules.md is missing SEO Keywords section. TEO spec provided: 3–5 multi-word phrases, all lowercase, comma-separated, include location for local stories. Pierce to confirm adopt vs. rewrite before eng builds. PGS-150 (Spike, 2026-04-07): Investigate plagiarism detection for CSA-generated output — off-the-shelf APIs (Copyscape, CopyLeaks, Turnitin, iThenticate) + internal tooling. Surface at Audience Variants stage alongside PGS-82. Distinct from PGS-82: this checks output vs. third-party web content. National team first. Emily Bohnet surfaced in B2B feedback. Pierce CC\'d. H1 headline enforcement ticketed PGS-135. Sara Vallone\'s SmartNews/Apple News format guide received 2026-04-03 — 2 new personas (SmartNews Skimmer, Apple News Explorer); 10 corrections needed; Andy review still required.',
    status_detail: 'In progress. All 5 National team personas sent to Susannah 2026-04-03. PGS-133 (4 additional target audiences) in Code Review. PGS-134 (Everything to Know + FAQ/Service Journalism) in progress. PGS-135 (H1 headline enforcement) selected for dev. PGS-141 (H1 rules for National team agent prompt) selected for dev. PGS-147 (intro length ~80–100 words) in progress. PGS-148 (SEO field rules — seo title 50–70 chars, meta description 100–155 chars, focus keyphrase) selected for dev, High priority — Pierce tagged; eng to review alongside PGS-104; BLOCKED on SEO Keywords gap (Oliver Felix 2026-04-07 comment — Pierce to resolve). PGS-150 (plagiarism detection spike, 2026-04-07) — new. AGENT-AUDIENCE §1 content: general-style sections (§1.1/1.3/1.4 link count) uploaded by Susannah via UI; headline (PGS-141) + seo (PGS-148) in selected for dev; human-only (§1.4 What to Link To + §1.5–1.9 — no action). Apple News + Smart News format guide received — Andy review still needed.',
    blockers: [
      'Apple News + Smart News distribution templates: Sara mostly done, pending Andy final sign-off — Andy sent 2 emails (2026-04-07), no response. Chris: wait a few more days then submit ticket; eng turnaround = few days.',
      'Format guide has 10 evidence-report corrections needed before codification in csa-content-standards',
      'H1 headline enforcement (PGS-135) pending Susannah prompt-level fix',
    ],
    nextActions: [
      'PGS-150 (plagiarism detection spike) — monitor eng recommendation. No action until spike produces shortlist. When recommendation lands: scope integration at Audience Variants stage alongside PGS-82.',
      'Andy: wait a few more days for Apple News + Smart News template feedback. If still no response, submit ticket — Sara\'s version is good enough to proceed (Chris confirmed). Note: any Andy edits will require a ticket to eng (few days turnaround).',
      'CAUTION: Do not call national team members "reporters" — use "content creators" or "contributors." Labor/union sensitivity. Chris Palo (2026-04-07); conversation stays internal.',
      'Monitor Sara Vallone investigation of content creator using external Claude to process URLs before CSA outline input (flagged Susannah 2026-04-07). Escalation path for author attribution issues via Brody.',
      'Consolidate TH/TH B2C variants with Sara Vallone and Sarah Price',
      'Extend AGENT-AUDIENCE routing annotations beyond §1 — §1 fully confirmed live 2026-04-08; audit §2+ sections and add tags where applicable',
      'Finalize SmartNews/Apple News guidance incorporating evidence report corrections; codify into csa-content-standards — pending Vallone final format guide',
      'Once format/persona decoupling lands: review whether Apple News + SmartNews best practices should migrate from persona section to format section',
      'Document format/persona separation in csa-content-standards once dev tooling is defined',
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
      'Second use case: headline tweaks on underperforming articles — identify underperformers, tweak headline, track keyword/traffic improvement over time (Sarah Price 2026-04-03). Potential SEMrush layer feature; also a natural experiment type for T1 analysis site.',
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
      'HOLD pending four Jira prerequisites: (1) Cluster ID field in CUE + WP (P6 dev / EGS-127), (2) Send-to-CUE functional (rq-send-to-cue), (3) Send-to-WP functional (rq-send-to-wp), (4) PGS-80 analytics live (draft-to-publish ratio + export event tracking)',
      'Chris deprioritized 2026-03-30 — revisit once prerequisites land and bring to Chris with updated scope',
    ],
    nextActions: [
      'Monitor Jira for: EGS-127 (variant origin tracking, replaces PGS-40), Send-to-CUE, Send-to-WP, PGS-80 analytics',
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

  'p15-partner': {
    id: 'p15-partner', num: '15', tier: 5, type: 'project', status: 'in-progress',
    name: 'Partner Content / Inventory Optimization',
    owner: 'Pierce · Kathryn Sheldon · Chris Palo · Kathy (stakeholder)',
    description: 'Partner content pipeline and AI policy — active as of 2026-04-06 (C&P Weekly). Lindy\'s (Arena Group sports feed) expected to go live this week into sports server. Reuters RSS feed still unavailable (salesperson unresponsive; Joe ready to fire off to Simple Feed when it arrives). Arena Group AI-generated content (Athlon "how to watch" NBA articles): acceptable with disclaimer. Policy gap: team needs to define risk tolerance and vetting policy for AI-sourced partner content coming into the pipeline — different from creating content ourselves. Chris Palo, Kathryn Sheldon, and Pierce to co-develop. **New sub-scope (2026-04-07):** Chris wants a tool to check inbound partner content (e.g., Athlon Sports sports scores + "where to watch") for factual errors and AI detection — functions as a governor on inbound content. ~1 million partner stories annually. Cost ~$20K/year if checking all; spot-checking feeds is an option. Open legal question: contractually forbidden from training on partner content, but analyzing "data" (not "content") flowing through systems may be allowable — Chris is going back and forth on this. Low priority now; Chris wants to eventually test Athlon\'s AI feed with a fact-checker. Inventory optimization analysis (the original "not yet" scope): audit owned vs. partner fill rates, ~10% traffic lift potential (one-time) — still deferred until Chris green-lights. Kathy owns partner content relationship and must be looped in for that scope.',
    blockers: [
      'Reuters RSS feed unavailable — salesperson unresponsive; Joe ready to activate when feed arrives',
      'AI vetting policy not yet drafted — Pierce + Chris + Kathryn to develop',
      'Inventory optimization analysis still deferred — Chris "not yet" on that scope',
      'Partner content fact-checker sub-scope: legal question on data vs. content analysis rights not yet resolved',
    ],
    nextActions: [
      'Co-develop AI policy for vetting AI-sourced partner content — with Chris Palo + Kathryn Sheldon; covers: disclaimer requirements, accuracy risk tolerance, escalation procedures',
      'Monitor Lindy\'s launch — confirm it goes live into sports server this week',
      'Monitor Reuters status — confirm once feed arrives and activates',
      'Partner content fact-checking (low priority): once legal question on data-vs-content analysis rights is clarified, cost out the tool and propose spot-check approach to Chris',
      'When Chris green-lights inventory scope: audit website inventory slots, map owned vs. partner fill rates, quantify ~10% traffic improvement opportunity',
    ],
    dependsOn: ['p9-prd'],
    contacts: [
      { name: 'Kathryn Sheldon', role: 'Feeds/programming lead; owns United Robots + Arena Group relationship' },
      { name: 'Kathy', role: 'Owns partner content relationship; must be involved in inventory optimization scope' },
    ],
  },

  'p16-ltv': {
    id: 'p16-ltv', num: '16', tier: 5, type: 'project', status: 'not-started',
    name: 'LTV Model',
    owner: 'Pierce · Chris Palo · Sara Vallone · Sarah Price · Kathy',
    description: 'Lifetime Value (LTV) model for content assets — associate a cost and value with each created asset; establish weighting for evergreen vs. transient content. Chris Palo\'s Q2 milestone. Strategy: partially build internally first (same approach as CSA), then bring in data team for integration. Will incorporate Pierce\'s statistical input. Revenue data from Justin needed for validation. Two-week test/refine period planned. Data discipline: if data is unavailable from a source (e.g. MSN), exclude that source to optimize for known factors — do not impute or approximate. Chris planning to schedule kickoff meeting this week with Sara, Sarah Price, Pierce, and Kathy.',
    blockers: [
      'Revenue data from Justin (macro dashboard) needed for model validation',
      'Meeting not yet scheduled — Chris Palo scheduling kickoff this week',
    ],
    nextActions: [
      'Attend LTV model kickoff meeting — Chris scheduling this week with Sara Vallone, Sarah Price, Kathy, Pierce',
      'Provide statistical input on evergreen vs. transient content weighting — apply same analytical framework as T1 work',
      'Once scope defined: identify which revenue data from Justin is needed and in what format',
    ],
    dependsOn: ['p9-prd'],
    contacts: [
      { name: 'Justin', role: 'Provides macro revenue/political data; source for LTV validation data' },
    ],
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
