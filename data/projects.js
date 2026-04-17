// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
// ── Pinned actions (global Up next priority) ──────────────────────────────
// Items here always appear at the TOP of the Up next panel, above per-project sort.
// Remove when done. Keep ≤3 items — this is not a second todo list.
// Format: { task: 'description', projectId: 'p##-slug' }
export const PINNED_ACTIONS = [
];

export const COMPLETED_TASKS = [
  { date: '2026-04-16', task: 'enrich_tracker.py built and run. Python script reads Sara Vallone\'s content tracker (Google Sheet), queries Snowflake STORY_TRAFFIC_MAIN + STORY_TRAFFIC_MAIN_LE via three strategies (article ID extraction, DYN_STORY_META_DATA URL join, CANONICAL_URL lookup), and writes 11 columns (story_id, total/search/social/direct/newsletter/applenews/smartnews/newsbreak/subscriber_pvs, conversions) to cols AA–AK. Final match: 1808 / 2002 URLs (90%). Strategy 1 (article ID regex) added 455 rows over prior URL-only approach. Never overwrites existing columns to the left. Run: python3 scripts/enrich_tracker.py.', project: '#7 Vallone Tracker / CMS Automation' },
  { date: '2026-04-16', task: '/sarah-weekly-update skill built and delivered to Sarah Price. Claude Code skill that automates her National Team Weekly Update .docx: upload Gemini notes + analytics report, invoke the skill, receive a populated Word doc in Downloads. Tested against 4 real files (2 Gemini, 2 performance reports). Windows install instructions sent via Slack (Claude Code + Python + pip install python-docx + unzip skill to %USERPROFILE%\\.claude\\skills\\). Phase 2 (Google Drive watch + auto-populate) deferred to a future session. Delivers on G4 sandbox toolkit commitment Chris Palo requested.', project: '#18 Agentic Writing Helpers' },
  { date: '2026-04-16', task: 'P18 Agentic Writing Helpers wishlist session (11am CDT, Sara Vallone + team). Documented 11 pain points. Top priorities: style guide enforcement (quick win — Samantha Agate; no Claude access required); variant differentiation (Ryan Brennan — CSA copies paragraphs, writers re-do varianting); Cue upload + H2 automation (Allison Palmer — hours/week, repetitive); keyword gaps in subheads (Allison Palmer + Lauren Jarvis-Gibson); gallery research/drafting bottleneck (Hanna Wickes). Hard constraint confirmed: most writers lack Claude access — all tools must work without it. Notes: write-assist/sessions/2026-04-16-wishlist-session.md.', project: '#18 Agentic Writing Helpers' },
  { date: '2026-04-16', task: 'PGS-82 (Variant Similarity Scoring) reached Code Review by EOD. Marcelo Freitas fixed bugs 1, 2, 4 + flags 1, 2 (confirmed blockers per Susannah). Bug 3 deferred (not a blocker). Moved to Code Review at 12:03pm. Binary scoring (okay/high-risk only) confirmed production design. PGS-104 confirmed In QA (Saner Keles → Victor Suarez). PGS-67 (CSA ID → Cue) moved to In Progress by Daury Caba (unblocked by PGS-17 hold removal). PGS-170 (WordPress 301 bug) moved to In QA (Victor Suarez).', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-16', task: 'Sara Vallone confirmed SEMrush Experiences keyword data is usable. All three alignment questions yes: (1) use all four topics; (2) assumptions correct; (3) okay to start using the tool daily. Starts the daily-use phase of data-keywords for Sara\'s team. Feedback loop calibration (~May 2026) still the end gate.', project: '#20 Experiences Vertical Content Test' },
  { date: '2026-04-16', task: 'Daily standup 2026-04-16: PGS-82 full QA complete — 4 bugs + 2 flags identified; Marcelo fixing today (pending Efren/Cat approval); if unresolved, code pulled from production, kept staging for v0.89.1. Binary scoring (okay/high-risk only) confirmed — "needs review" state eliminated. PGS-104 fix deployed to staging by Oliver; Jonathan checking; Susannah: must ship today if PGS-82 can\'t. PGS-17 HOLD REMOVED — now CODE REVIEW; Daury\'s PR has core Send-to-Cue without Snowflake fields; PGS-67 is follow-on. AI hallucination bug flagged by Patrick Al Khouri (CSA added "Ada County" content not in source material); Saner creating ticket. Marcelo: Trend Agent new phases complete, presenting tomorrow, implementation Monday. Victor: full site mobile responsiveness PR ready for review.', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-16', task: 'Headline Grader quality standards defined and eval tool built. Pierce worked with Sara Vallone and Sarah Price to establish headline quality criteria; implemented an eval tool both have signed off on. Closes out the Headline Grader criteria refinement commitment from C&P Weekly.', project: '#3 T1 Headlines Analysis' },
  { date: '2026-04-15', task: 'ops-hub dashboard quality infrastructure overhaul. (1) PINNED_ACTIONS export added to projects.js — global priority override for Up next panel; pinned items always render first with ▲ marker, blue border, and null-safe project reference. (2) getNextTasks() rewritten to prepend pinned items before tier/status sort. (3) check.sh extended with [Data quality] section: PINNED_ACTIONS count ≤3, done project card completeness (completedDate + resolvedBlockers), active project description ≤400 chars, no ticket numbers in descriptions — implemented as node eval of projects.js for accurate parsing. (4) Git pre-commit hook installed — check.sh runs automatically on every commit, no manual step required. (5) CLAUDE.md: three new behavioral enforcement sections added (Project Card Description Rules, PINNED_ACTIONS, Completed Project Card Rules). (6) P20 (Experiences Vertical Content Test) and P21 (Mode 2 Trust & Editorial Risk Spike) project cards added. (7) 10 active descriptions trimmed to ≤400 chars; ticket numbers removed from 3 descriptions. (8) All CSS dark-mode contrast issues fixed (pinned item background → rgba(var(--blue-rgb), 0.08)).', project: 'ops-hub Infrastructure' },
  { date: '2026-04-15', task: 'Jira activity processed: PGS-82 confirmed Product Review with 2 must-fix items (banner states green/red only; re-analysis loading indicator). PGS-104 kicked back from QA — keyword enforcement still failing; Victor + Jonathan on it. PGS-140 In QA (Marcelo). PGS-150 put ON HOLD — Pierce must clarify plagiarism scope/tool with Sara + Chris before Susannah can proceed. PGS-189 new spike selected for development — Mode 2 silently adds "common knowledge" content; Oliver Felix assigned as lead investigator; Pierce tagged as reviewer.', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-15', task: 'SEMrush API keyword pull for Sara Vallone Experiences vertical content test. Four topics analyzed: Landmarks (GO HARD — 1.5M/mo head term, KD 34, geographic variants KD 12–27), 5-Day Travel / Short Trips (GO HARD — avg KD 15, destination itineraries KD 4–9), Solo Dining (SKIP — volume ceiling 260/mo, $0 CPC), Scenic Road Trips (GO HARD — 8,100/mo, KD 26, no major travel publishers ranking). Full SEMrush pipeline: phrase_fullsearch (multi-seed per topic) + phrase_kdi (batch KD) + phrase_organic (competitor gap check). Deliverables: 4 xlsx files (per-topic, color-coded KD, portfolio gap flags) + 1 docx analytical report (verdict framework, methodology, per-topic analysis). All briefs added to data-keywords briefs.js. Slack message sent to Sara with report attached before 11am Thu meeting.', project: '#20 Experiences Vertical Content Test' },
  { date: '2026-04-15', task: 'All 5 National Team personas now live as Team Target Audiences in CSA production. Susannah Locke entered The Discover Browser + The Wonder-Driven Science Enthusiast; Pierce entered The Curious Optimizer, The Curious Explorer, and The Watercooler Insider. Admin-only feature — audiences are shared across all National Team accounts, environment-isolated. PGS-133 ON HOLD (admin feature replaces the code-change ticket entirely).', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-15', task: 'Snowflake/Sigma orientation meeting complete (Rocky Rhodes + Chad Bruton, 1:30pm CDT). Key findings: (1) story_traffic_main table (MCC presentation → Tableau reporting) = O&O page views by story/market/date — primary source for article-level traffic data. (2) dynamic_story_metadata table (MCC presentation) = author_name, URL, SEO metadata, keywords, taxonomies — all at story level, join on story ID. (3) SEO metadata and keywords already exist in story table — no separate build needed. (4) Amplitude data is in Snowflake as Amplitude events prod table (presentation/amplitude schema) — use Snowflake over direct Amplitude API. (5) No Sigma OAuth2 needed — Sigma is just a reporting UI; connect GitHub directly to Snowflake (Chad to help set up). (6) Ad yield/eCPM NOT at article level — tracked at page level, rolls up by traffic; contact Ryan Spalding (ad expert). (7) Google Search Console data in MCC RAW — access confirmed. (8) Dynamic table schema access granted live by Chad. (9) No existing CSA Sigma workbook (Rocky). (10) PTECH-7730 is a PE ticket — Joe Vitali is best contact for owner. (11) Rocky confirmed per-publication pull model; will rerun competitor data per pub not aggregated. (12) SEMrush: 250K = Pierce\'s L&E allocation; Rocky\'s pool = 2M/month (overage available if needed). Rocky pinging Julio on per-endpoint credit rates.', project: '#1 Platform Access & Training' },
  { date: '2026-04-15', task: 'csa-content-standards v1.7.0–v1.8.0: Complete CSA persona definition system built for Susannah Locke. (1) CSA Target Audience Definition sections added to all 5 persona pages — Name, Description, and four focus areas (Discovery / Understanding / Evaluation / Action) formatted for direct CSA UI entry. Sections expanded to include core drivers, full "What They Respond To" specifics, and behavioral engagement data. (2) Three new format pages scaffolded (§3.12 Trend Feature, §3.13 Science & Discovery Feature, §3.14 Entertainment & Trending) then removed at Sara Vallone\'s direction — personas and formats now decoupled in CSA UI, format guidance per persona unnecessary. (3) Tone sections added to §4.2–§4.5 persona pages preserving the only non-duplicate persona-level content from the removed format pages. (4) Dedicated AGENT-AUDIENCE: csa-target-audience tag added — all five persona definitions are machine-greppable from raw Markdown; unique tag appears nowhere else on site. Full infrastructure sync: navigation, admin/config, API (v1.8.0), master-reference, documentation, index, changelog, agent_routing.yml. Susannah and Sara both messaged with final state and raw Markdown links.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-15', task: 'Keyword threshold meeting invite sent 2026-04-15. Rocky Rhodes + Sarah Price confirmed via Slack. Chris Palo free whenever per Sarah. Meeting covers: Go Hard/Test Small/Skip threshold criteria, CPC + additional threshold drivers, per-publication calibration. Revised SEMrush pull ask to be discussed: per-publication model (not portfolio-wide), using US Weekly 3.20.2026 report as template.', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-15', task: 'v0.88 shipped to production. Three National team features live: (1) PGS-134 — "Everything to Know" + "FAQ / Service Journalism" content formats now available for National team; (2) PGS-115 — Google Discover Explainer format now visible to all users, not National team only; (3) PGS-96 — "The Discover Browser" saved as shared target audience for all National team accounts. PGS-133 placed ON HOLD — Susannah using new admin feature to create target audiences directly, making the code-change ticket unnecessary. Docker resource bug found post-deploy (Oliver Felix + Marcelo patching).', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-15', task: 'Daily standup 2026-04-15: PGS-82 confirmed high-priority with PyTorch performance issue identified — Marcelo fixing directly in branch before rebase. PGS-140 PR pushed (CODE REVIEW). PGS-139 IN PROGRESS (Marcelo). PGS-104 strategy: merge PR as-is, future issues = hotfix. Jason Adkins role confirmed: Insights Agent / Trend Hunter action plan — Kathryn scheduling call with Jason + Marcelo today. Guilherme Gomes Caires assigned to new epic (Marcelo\'s), requesting Snowflake access. Daury Caba created non-expiring tokens ticket for Q integration testing.', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-14', task: 'SN channel × formula analysis complete (T1 Headlines new finding). Analyzed 2025 SmartNews full-year data (38,251 rows). Question format underperforms in Top, Entertainment, Lifestyle channels (p<0.0001, p=0.012, p=0.027). WTK underperforms in Top channel (p=0.008). Number lead has large U.S.-channel penalty (Δ=−0.245, p<0.0001, n=83). Callout added to data-headlines formula trap panel. Experiment suggestion added: replicate in 2026 per-article data for causal validation. Longitudinal weekly snapshot data surfaced on main page and experiments page — trend table renders automatically after ≥2 more weekly runs.', project: '#3 T1 Headline Analysis' },
  { date: '2026-04-14', task: 'Distilled 25+ open CSA Jira tickets into executive bullet points for Chris Palo. Synthesized pending dev requests, bug status, and strategic items into a briefing-ready summary covering national team priorities, pipeline blockers, and in-progress/code-review queue.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-14', task: 'PGS-96 READY FOR PRODUCTION: Add "The Discover Browser" as a Saved Target Audience for all National team users. Susannah Locke approved — all QA tests passed: variant creation works, admin can create + save new target audiences, persists across sessions, visible to National team members via "view as," correctly hidden from Miami team members. Susannah note: will add the Discover Browser audience itself after production release.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-14', task: 'CSA Weekly 2026-04-14 — four outcomes: (1) PRD V0.5 distributed as foundational context doc for all future feature requests — Chris framed as "goalpost" document, described architecture as vertical pipes + horizontal cross-cutting elements; wants visualizations. (2) Gary evaluation complete and aligned: Gary ruled out as QA gate — black-box methodology (confidence scores undocumented, not deterministic despite claims); IP/contract concern raised (Kathryn to discuss with Jason about McClatchy ownership of Gary\'s code; Chris to mention to Jason that team has failed to obtain code). Gary value = commerce/SEO for Andy only. Author profile replication greenlit — Gary built Sara\'s voice from ~100 articles; replicable in-house; create dev ticket; test internally with Sara/Pierce/Susannah before wider rollout. (3) Keyword field: primary + secondary keywords with placement instructions coming this week. Chris overruled Sara\'s preference to wait — keyword field will be mandatory, not optional. Susannah updating ticket. (4) Keyword color overlay greenlit: Pierce proposed color-coding keyword placement in CSA output; Chris expanded to 4-color headline breakdown (subject/lead, keyword, active verb + fourth); Kathryn: toggle/overlay only, must not affect markdown or CMS export. Start with keyword color, then headline success criteria colors. Separate ticket needed.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-13', task: 'Compass 2026 performance goals submitted. 5 goals, 100% weight (25/25/20/20/10): (1) Product Liaison & Pipeline Request Management — Operational Excellence + Innovation at Scale; (2) Editorial Standards & Voice Guidelines — Performance-Driven Content + Innovation at Scale; (3) Quality Framework & Testing Protocols — Operational Excellence + Performance-Driven Content; (4) Pipeline Documentation & Operational Knowledge — Operational Excellence + Innovation at Scale; (5) Professional Development: Technical & Editorial Fluency — Talent Development + Innovation at Scale. Goals finalized against Chris Palo\'s Content & Programming 2026 team goals. compass-goals.md written and committed. Manager approval (Jeremy Gockel) pending by April 30.', project: 'Compass Performance Management' },
  { date: '2026-04-13', task: 'Gary batch test complete. 15/15 Sara Vallone articles processed via POST /api/v1/research/data-validity, 0 API errors. ~107 claims evaluated total. All 15 articles: MOSTLY_TRUE at article level (conf 0.78–0.88). 21 claims flagged at claim level: FALSE (1), MISLEADING (8), MIXED (9), INSUFFICIENT_EVIDENCE (3). Specific verifiable errors: (1) Alcatraz/America the Beautiful pass — NPS contradicts directly, verdict FALSE; (2) Statue of Liberty crown age-vs-height error in 3 travel articles (same syndicated piece), verdict MISLEADING; (3) 2022 fungi study presented as new research without age disclosure in 2 articles, verdict MISLEADING; (4) Mouth breathing cardiovascular link conflates OSA evidence with general mouth breathing, verdict MIXED/MISLEADING. Full claim-level report + DOCX generated (gary-tools/data/full-report-2026-04-13.docx). Session agenda for Sara Vallone parameter session generated (gary-tools/data/session-agenda-vallone.docx). Slack sent to Chris Palo + Sara Vallone 2026-04-13 with both reports and link to claims-validation spec. Cost: ~$5.50 total (~$0.38/article). Key API learnings documented in gary-tools/docs/api-reference.md.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-13', task: 'Rocky Gap Analysis briefs added to data-keywords prototype. Sara Vallone confirmed 4 topic categories for Rocky\'s next SEMrush pull: financial services (Chris priority + highest CPC), food+celeb, sleep, creature features. All 8 National Team sites combined per pull. Rocky queued; awaiting results. `fromRocky: true` boolean field + orange "Rocky Gap" badge added to data model and UI. Bianca Censori brief updated to reflect Rocky source. Prototype now visually distinguishes Rocky-derived vs. SEMrush-direct briefs.', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-13', task: 'Gary Kirwan live meeting (Google Meet mnk-ezrq-jkx, ~15 min). Key findings: (1) Gary confirmed NO plagiarism detection built internally — uses Originality.ai + Winston AI as external reference tools only. Copyscape/Originality.ai recommendation from PGS-150 spike stands. (2) Confidence scoring = claim-level: individual claims assessed + categorized → overall confidence aggregate. Mechanism is deterministic — Gary scrapes actual source markdown for hard proof comparison. (3) Priority bucket calibration possible per content type/domain — mechanism not yet fully defined by Gary. (4) All API endpoints confirmed live. (5) Code access: Gary discussing with Jason Smith + Rajiv; committed to Slack response. Next: Pierce runs 15-article fact-checking test for Sara Vallone evaluation.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-13', task: 'ops-hub completed projects pill fixed. P9 (PRD Revisions, completed 2026-04-10) and P13 (System Prompts, completed 2026-04-03) added back to PROJECTS with status: "done" and completedDate — were incorrectly deleted rather than marked complete. diagram.js updated to filter status === "done" projects from diagram rendering (drawArrows already handles missing cards gracefully). Completed Projects pill now correctly shows closed projects.', project: 'ops-hub Infrastructure' },
  { date: '2026-04-12', task: 'data-keywords prototype: data currency indicator added to summary bar. latestDataDate() parses "Mon YYYY" from all briefs\' dataSource fields, finds most recent, renders "· Data as of Apr 2026" inline in summary bar. CSS .data-currency rule uses --text-muted italic. Auto-updates when new briefs with more recent pulls are added.', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-12', task: 'RECIPE.md created in ops-hub — canonical cross-repo reference for the Recipe system (Creator × Format × Topic × Market → Predictable Return). Documents four dimensions, return type by pipeline purpose, cluster precise definition (canonical article + analytically-determined variants — NOT a synonym for topic), data repos by dimension, vertical signal profiles, current vs. future state. Added pointer in REFERENCE.md. This is the architecture frame for all data intelligence work.', project: '#11 Recipes' },
  { date: '2026-04-12', task: 'data-keywords prototype MVP complete and hardened for Chris Palo presentation. 14 briefs (10 Go Hard, 2 Test Small, 1 Skip, 1 celebrity transformations Go Hard) across 4 content verticals. Priority sort: impactScore = totalVolume × avgCPC (normalizes entertainment/food high-volume vs. financial services high-CPC). Skip verdict: weight loss generic terms (KD 100 — YMYL, owned by WebMD/Healthline) vs. celebrity weight loss (KD 33 — People.com competes, Go Hard). Summary bar excludes Skips. topCompetitors filled for all financial/food briefs. Celebrity weight loss transformations brief discovered from SEMrush CSV (557K vol, avg KD 33). TECHNICAL.md (full architecture reference) + EXECUTIVE-BRIEF.md (non-technical, written for Chris) created. Presentation prep notes saved to ops-hub memory.', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-11', task: 'Amanda Hamilton Amplitude session (April 9) fully documented — verbatim Gemini transcript + full analysis. Key findings: (1) El Nuevo author attribution bug filed: Samantha Agate\'s content shows content source as "US Weekly" not her as author; Amanda submitted technical request to analytics team. (2) Claude budget exhaustion is team-wide — Sarah Price confirmed out of ~$100/month; Pierce noted 3/5 people out; Amanda: Chris must contact Travis Farrar (infrastructure) to request additional budget. (3) Pierce needs to connect Amplitude via Claude Settings → Connectors → Amplitude (Sarah already connected; Amanda confirmed it is pre-listed and approved). (4) Tips: reference chart with filters applied for context; build context file over time; use Amplitude native AI (free) first for dashboards, then Claude for co-work. (5) Dedra Lawhead oversees news analytics; Amanda meets Amplitude monthly; Sarah accepted Slack channel invite. Saved to sessions/meeting-2026-04-09-amanda-hamilton-amplitude.md.', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-11', task: 'PGS-98 DONE: Additional Context and Editorial Notes fields now influence generated output. Substantive bug resolved — user-provided context (e.g. "focus on an Instagram post") was previously being ignored entirely. Fix affects the editorial direction workflow broadly, since this is how editors inject intelligence into the pipeline.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-11', task: 'PGS-87 DONE: Target Audience label now appears in Google Doc exports for platform variants. Previously dropped at the Platform Distribution step — users had to manually re-label each variant (significant time + error risk). Now each variant section is labeled with its audience (e.g. "Trend Hunter — Apple News").', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-11', task: 'Julia Tortoriello meeting fully documented: verbatim Gemini transcript (25 min, 00:00:00–00:25:02), verbatim CMS prompt (6 rules), verbatim standalone GPT config (name, description, bilingual instructions, 4 conversation starters, link). Saved to sessions/meeting-2026-04-09-julia-tortoriello.md. Meeting date corrected to April 9 (was logged as April 10). Old file redirected.', project: 'CSA Spanish Pipeline (discovery)' },
  { date: '2026-04-11', task: 'csa-dashboard ROADMAP.md created — documents current state of all 4 data adapter paths (Sigma, Marfeel, Google Sheets, Amplitude) with updated activation statuses and priority sequence. Replaces stale prior-session notes on the same topic.', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-10', task: 'Gary Kirwan tool roster email sent (CC: Chris Palo). Asked for full suite beyond Content Audit API: what tools exist, what each takes as input and returns, which are in development vs. production-ready, and how Gary sees them relating to each other as a suite. Framed as cross-pipeline node evaluation, not just fact-checking integration. Awaiting Gary\'s response.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-10', task: 'PRD V0.5 revision pass complete. All 10 Chris Palo items implemented: (1) CSA reframed as pipeline container, not magic tool; (2) Inclination Engine named and defined as T1/T2 auto-brief component in Signal & Brief Creation, CSA section, Strategic Pipeline Elements, and Open Questions; (3) Purpose-driven pipeline framing + per-pipeline OKR distinction added as Universal Principle + purpose statement on each pipeline; (4) Author profiles elevated to full Universal Principle with compounding-value framing; (5) Gary tools reframed as cross-pipeline nodes in CSA section, Quality Enrichment, and Strategic Pipeline Elements; (6) TBTV added to distribution channel lists; (7) Two new pipelines under investigation added as dedicated subsection (infographics + licensed partner content); (8) CPA language loosened throughout — directional frameworks only, "decrease monotonically" removed; (9) Monetization reframed as avenue with per-channel value calculation; (10) Data loop opened up — signal sources described as expanding, no hard spec. Also added: T3 sub-pipes (~10 by content vertical). Gary Kirwan tool roster email drafted (copy Chris Palo). Document ready for Google Docs.', project: '#9 PRD Revisions' },
  { date: '2026-04-10', task: 'PRD discussion with Chris Palo complete (2026-04-10, 3:24PM EDT). Major architecture clarifications: (1) CSA = pipeline container with purpose-driven pipes categorized by touch level (high/low/medium) — people still misunderstand it as a magic all-in-one tool. (2) Inclination Engine confirmed as named concept — the sole future input for automated signals and trend unit brief generation; needs explicit PRD section. (3) New pipelines under investigation: infographics pipeline (trend research → branded infographic, e.g. HSA rates rising → Trend Hunter graphic); licensed partner content pipeline (licensed influencer video/transcript → CSA → multiple articles + tangential content → Trend Hunter app + Pier1 sites). (4) Monetization reframed: syndication is an avenue, not the focus. Distribution channels = O&O, Trend Hunter app, Syndication, TBTV (future); value calculation differs per pipeline. (5) Gary tools = "nodes" — cross-pipeline tools that every pipeline touches; need full roster from Gary. (6) Data loop = keep open-ended in PRD; data sources for optimization expand daily. (7) CPA/cost language over-specified — loosen to directional frameworks, not pre-specified formulas. Action items: [Pierce] contact Gary for full tool roster (copy Chris); [Pierce] schedule Snowflake walkthrough with Chad; [Pierce] add Inclination Engine to PRD; [Sarah Price + Sarah Voluone] define SEO keyword scope; [Sarah Price] follow up with Deedra for team vs. org comparison dashboard.', project: '#9 PRD Revisions' },
  { date: '2026-04-10', task: 'PGS-114 DONE: Automatic AI disclaimer removed from Discovery Content Format. Writers now add disclaimer manually if needed. Scope: Discovery Content Format only. Existing saved drafts unaffected.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-10', task: 'PGS-93 ON HOLD: "Create Research Draft" from URL import flow put on hold at Pierce\'s request. Ticket came from Ryan directly — Susannah had ticketed without consulting Sara\'s team. Sara says the feature needs to be reworked before building. Pierce commented on ticket: "Sara says this needs to be reworked; please do not prioritize."', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-10', task: 'Julia Tortoriello discovery meeting complete — scoped El Nuevo Spanish translation workflow. Key findings: (1) Toolchain: CMS-integrated Google Translate + GPT-3 ("ChTBD"); GPT-3 far superior to Elbex for Spanish nuance; Google Translate alone insufficient. (2) Error correction via custom models + temperature-adjusted prompts — handles exclusive terms ("ae"), Spanish capitalization, quotation punctuation rules. (3) External standalone GPT ("dog translator") for Us Weekly en Español handles fluency edge cases and Spanish→English reverse translation for high-profile Argentina/Costa Rica reporter stories (CMS has no S→E button). (4) Dialect: US Hispanic audience → Colombian Spanish register; specifying "US Hispanic, United States" to the AI is sufficient — no exhaustive rule list needed. (5) Julia sent CMS prompt (6 editorial rules) + GPT link (chatgpt.com/g/g-0SsURCxh4); offered to test CSA in Spanish and identify adjustments. Chris Palo + Rajiv considering dedicated Spanish CSA pipeline — this meeting establishes baseline for scoping that work.', project: 'CSA Spanish Pipeline (discovery)' },
  { date: '2026-04-10', task: 'T1 Headlines: Cluster/variant production section added to author-playbooks page (`_cluster_production_section()` in generate_site.py). Shows: total clusters (422), share with ≥2 articles (94%), mean/median/max cluster size, distribution table (1–4 bins + 5+), author breakdown by cluster count and mean variants/cluster. Runs on tracker_raw directly — no performance join required. "Hanna Wickes" / "Hanna WIckes" data quality flag surfaced (148 clusters split across two rows). Three new _COL_TOOLTIPS entries added. 19/19 tests pass, all build checks clean.', project: '#3 T1 Headlines Analysis (Price)' },
  { date: '2026-04-09', task: 'Gary Tools: Documented desired functionality — escalation paths, Needs Clarification vs. Needs Correction behavior, internal logic. Passed to Sara Vallone with v0.1 ruleset.', project: '#10 Gary Tools Integration' },
  { date: '2026-04-09', task: 'WordPress send-to WP is now LIVE for Us Weekly, Woman\'s World, Soap Opera Digest, and Bargain Hunter. Content creators can send CSA drafts directly to WordPress as drafts via the CSA UI. Built by Saner Keles, Emil Penalo, Daury Caba, Susannah Locke, Regina Faler, and sasha_levchuk. CUE send-to still in progress (date TBD from Kat Sheplavy). Satisfies rq-send-to-wp prerequisite for P12.', project: '#12 United Robots Inbound Pipeline' },
  { date: '2026-04-09', task: 'data-headlines weekly auto-ingest pipeline built and fully unblocked: (1) download_tarrow.py — downloads live 2026 Google Sheet via Drive API using existing service account; (2) .github/workflows/weekly_ingest.yml — Monday 8pm CDT cron; change-detection; commits xlsx + docs/ + data/; (3) generate_site.py writes data/build_summary.json (8 tracked metrics); (4) update_snapshots.py appends to data/weekly_snapshots.json for longitudinal tracking. 19/19 smoke tests pass. Tarrow shared 2026 sheet with service account 2026-04-09 — pipeline fully operational.', project: '#3 T1 Headlines Analysis (Price)' },
  { date: '2026-04-09', task: 'data-keywords repo created (piercewilliams/data-keywords) — dedicated implementation repo for P14 SEMrush / Keyword Signal Layer. Full context architecture seeded: CONTEXT.md (blockers, prioritized tasks, scope decisions), REFERENCE.md (team/contacts, SEMrush credit model, DataForSEO alternative, all 3 confirmed use cases, related Jira tickets), sessions/2026-04.md (3-way meeting + email chain history). Claude Code permissions installed.', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-09', task: 'Cross-repo headline standards audit: found 13 conflicts between csa-content-standards, data-headlines grader, and empirical analysis findings. Fixed all non-Sara items: (1) grader char count corrected 80–110→70–120 (was failing headlines in the documented 110–119 sweet spot); (2) WTK criterion hardened from LLM soft check to objective rule grounded in most recent run (p=3.0e-6, n=213, survives Bonferroni — older p=0.046 overridden); (3) question headline detection added to grader (new no_questions criterion, weight=1); (4) featured placement exception removed from standards — no data support for this content type (0% featuring rate); (5) WTK added as third Apple News formula to avoid; (6) push notifications section added to headlines.md (70–89 chars, 1.45% median CTR, n=874, p<0.05); (7) "Did you miss" avoidance added to Universal Defaults; (8) platform override callout added to brand-guidelines §1.2; (9) machine-readable formula_constraints + platform_char_counts added to api/reference.json; (10) acronym list expanded ~30→~55 entries.', project: '#4 Article Format + Persona + Keyword Governance' },
  { date: '2026-04-08', task: 'SEMrush: Pierce looped into email chain with Rocky Rhodes (SEMrush admin) and Stephanie Zandecki. Rocky clarified credit unit model (live ~10 units/line, historical ~50 units/line); 250K credits ≈ 50 full runs at batch scale — Sara Vallone\'s credit concern validated. Rocky reaching out to SEMrush rep Julio for exact endpoint-level rates. DataForSEO API flagged as potentially cheaper alternative. Stephanie Zandecki (Senior SEO/TEO Lead) may have keyword-to-article data in Sigma dashboard already. Pierce has access to full SEMrush API docs.', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-08', task: 'SEMrush 3-way alignment meeting complete (Pierce, Sarah Price, Sara Vallone). Key outcomes: (1) SEMrush API held by Sarah Price — 250K credits allocated to L&E, NOT the CSA team; CSA is governed by team-provided keywords, not SEMrush-selected ones. (2) Immediate plan: track ~25 articles to compare identified keywords. (3) Credit concern: Sara Vallone afraid of running out quickly — need to confirm usage rate + recycling schedule before heavy use. (4) Testing incorporated into existing testing tracker, not a new spreadsheet. (5) Longer-term goals: backlinking tracking in CSA; utility tab for service journalism (Sara added to tracker for Trend Hunter team). (6) Headline grader: Sara Vallone noted it seems sufficient, needs a few days of use before specific feedback. (7) Amplitude/Claude integration: Sarah Price struggling — meeting with Amanda Hamilton (manages Amplitude) coming up; Pierce being added. Next: Sarah Price to forward SEMrush API email chain to Pierce (CC Sara Vallone).', project: '#14 SEMrush / Keyword Signal Layer' },
  { date: '2026-04-08', task: 'PTECH-7641 DONE (Platform Technology team — different from CSA eng/Maktachi): CSA analytics engineer set up foundational CSA data layer properties. Each CSA article now pushes csa_canonical_article_id, csa_variant_type, and csa_variant_id to window.dataLayer. Scoped to L&E sites; includes WordPress and CUE integration. Susannah flagged to Pierce: "different team than the CSA-focused team." Feeds Amplitude analytics layer but distinct from PGS-80 (user event tracking by CSA eng team).', project: '#2 Dashboard Instrumentation' },
  { date: '2026-04-08', task: 'Claude Code permission settings fully implemented: ~/.claude/settings.json (global user scope — applies in every repo, every surface including CLI, desktop app, IDE extensions) written from Rajiv Pant\'s curated 80+ permission template. .claude/settings.json (project scope) written to all 6 repos (ops-hub, csa-dashboard, csa-content-standards, data-headlines, gary-tools, data-cmstracker) and committed. ~/.claude/project-settings-template.json created as canonical template. ~/.zshrc updated with _claude_auto_setup chpwd hook — auto-installs project settings whenever cd-ing into any git repo that lacks them; also fires on shell startup. Result: no more permission interruptions for read/reversible operations across all repos and surfaces.', project: '#8 Rajiv CSA Mapping' },
  { date: '2026-04-08', task: 'T1 Headlines 2026-04-08c: Full Sarah Price alignment pass. New analysis: (1) nature/wildlife dual-headline formula guidance — SN overperforms, AN underperforms for the same content, opposite platform routing; (2) 0% featuring investigation — content type is the constraint (not section tagging, formula, or any editorial lever); no fix available; (3) head-to-head headline examples per formula, top 3 organic vs. bottom 3 for 5 formula types. 28-column SmartNews article-level data integrated: per-channel views (Top, Entertainment, Lifestyle, U.S., Business, World, Tech, Science, Health, Local, Search) + recommended_view; 86.3% of T1 views from Top feed. MSN sheet name mismatch fixed. SHOW_MSN_TILE guard applied everywhere. Author playbooks regression fixed (_AUTHOR_MIN_N lowered 5→1). PENDING_HIGH_ANALYSES guardrail added. Author Playbooks page delivered (docs/author-playbooks/index.html). Adversarial integrity pass (7 passes). 16/16 smoke tests pass.', project: '#3 T1 Headlines Analysis (Price)' },
  { date: '2026-04-08', task: 'T1 Headlines: Sarah Price tile feedback applied — tiles 4 (Views/Reading Depth), 6 (Featuring Reaches Non-Subscribers), 7 (Topic Predicts Featuring), MSN Formula (SHOW_MSN_TILE=False), and push send-time section all cut. Formula × Topic restructured: non-weather signal now leads (Crime + "Here\'s" 16% n=89, Business + "Here\'s" 14% n=72, Sports 0% regardless); weather = United Robots footnote. Tracker→ANP exploratory join: 32% match rate, 355 articles, 0% featuring rate across all verticals vs 1.2% ANP baseline — featuring is not a lever for this content type (key finding). Trendhunter vertical mapping confirmed by Sarah (author = proxy for vertical: Allison Palmer=Mind-Body, Lauren Jarvis-Gibson=Everyday Living, Lauren Schuster=Experience). Governance (GOVERNOR.md, governor_log) and pipeline (generate_site.py) updated. 16/16 smoke tests pass.', project: '#3 T1 Headlines Analysis (Price)' },
  { date: '2026-04-08', task: 'T1 Headlines: GitHub Actions daily grader workflow built (.github/workflows/grader.yml) — runs generate_grader.py daily at 10am CDT via schedule cron + workflow_dispatch; commits updated grader pages via built-in GITHUB_TOKEN. Retired unreliable local crontab (run_grader.sh). Added Run Now button to grader UI: passcode 8812 gates access; fine-grained GitHub PAT (actions:write) stored in localStorage after first entry; calls GitHub Actions dispatch API; clears bad PAT on 401. Secrets needed: GROQ_API_KEY + GOOGLE_SERVICE_ACCOUNT_JSON (base64-encoded, use ~/.credentials/pierce-tools.json).', project: '#3 T1 Headlines Analysis (Price)' },
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
    compassGoal: 'G5 — Professional Development: Technical & Editorial Fluency',
    description: 'Provisioning and orientation for all platforms and data systems Pierce uses: Snowflake/Sigma, Amplitude, Marfeel, SEMrush, Gary API, Cue, MAIA, and Bitbucket. Ensures Pierce can query, pull, and act on data without access blockers. Prerequisite for all analytical and pipeline work.',
    systems: [
      { name: 'Snowflake / Sigma', status: 'done', note: 'Role: growth_and_strategy_role. Key tables: MCC presentation → Tableau reporting → story_traffic_main (O&O PV by story/market/date) and dynamic_story_metadata (author_name, URL, SEO metadata, keywords, taxonomies — join on story ID). Amplitude events prod table also in Snowflake (presentation/amplitude schema). Dynamic table schema access granted 2026-04-15 by Chad. Google Search Console in MCC RAW. No Sigma OAuth2 needed — direct GitHub→Snowflake connection (Chad setting up). Chad Bruton is primary contact.' },
      { name: 'CUE', status: 'done', note: '' },
      { name: 'WordPress', status: 'done', note: '' },
      { name: 'Google Sheets API', status: 'done', note: 'Manual bridge active via manual-metrics.js — no API key needed.' },
      { name: 'Amplitude', status: 'done', note: 'Access confirmed. Amplitude data is also mirrored into Snowflake as Amplitude events prod table (presentation/amplitude schema) — prefer Snowflake over direct Amplitude API. CSA adapter still blocked on PTECH-7730 p-tagging fix.' },
      { name: 'Marfeel', status: 'done', note: 'Access confirmed 2026-04-09. Apple filter removed from main UI — Sarah Price\'s custom dashboard is the accurate Apple view. El Nuevo numbers may be inflated; verify before analysis.' },
      { name: 'Gary API', status: 'done', note: 'Full API docs + McClatchy key in hand. See gary-tools repo.' },
      { name: 'SEMrush', status: 'done', note: '250K credits = Pierce\'s L&E allocation (Sarah Price\'s bucket). Rocky\'s total pool = 2M/month — can cover overage if needed, not a standing arrangement. API key from Rocky 2026-04-13. Automation blocked until Julio confirms per-endpoint credit rates (Rocky pinging). Per-pub competitor pull model confirmed with Rocky 2026-04-15.' },
      { name: 'MAIA', status: 'done', note: '' },
      { name: 'BitBucket', status: 'done', note: '' },
    ],
    blockers: [],
    nextActions: [
      'Contact Chad Bruton to set up GitHub → Snowflake direct connection for dashboard adapter.',
      'Mon 2026-04-20 3pm CDT: Ryan Spalding meeting — review STAR-Automation Sigma dash; primary ask is access to underlying Snowflake tables so revenue data can feed Market dimension of Recipe system. Note: Derek Knostman architected the Naviga + GAM revenue dataset — follow up with Derek for deeper architecture questions.',
      'Monitor PTECH-7730 (p-tagging fix) — dev group assigned, Julia Kim PM; wait for ETA from Joe Vitali',
      'Explore story_traffic_main and dynamic_story_metadata tables — run test queries to validate joins and data quality before building on top of them.',
    ],
    dependsOn: [],
  },

  // ── TIER 2 ────────────────────────────────────────────────────────────────

  'p8-mapping': {
    id: 'p8-mapping', num: '8', tier: 2, type: 'project', status: 'in-progress',
    name: 'CSA Pipeline Architecture Mapping & Gap Analysis',
    owner: 'Pierce',
    compassGoal: 'G4 — Pipeline Documentation & Operational Knowledge',
    description: 'Map the CSA pipeline as it actually exists via Bitbucket, then compare it against the PRD ideal state to produce a prioritized gap analysis. Feeds stakeholder visualizations, the engineering roadmap conversation with Chris, and CSA Weekly planning.',
    blockers: [
      'Need Bitbucket access to CSA repo — confirm access or request via Chris/Rajiv',
    ],
    nextActions: [
      'Confirm Bitbucket access to CSA repo — if not already provisioned, request via Chris or Rajiv',
      'Map as-built CSA pipeline via Bitbucket: trace request flow through agents/stages; document inputs, outputs, and transformations at each node',
      'Apply Sully AI decomposition audit: for each stage, is it doing one focused job or multiple? Flag monolithic stages as architectural debt',
      'Build as-envisioned map from PRD V0.5: decomposed agent stages for keyword validation, fact-check, brand-fit, format compliance, headline gen, SEO metadata, diff check — each as a discrete node',
      'Produce delta document: enumerate gaps between as-built and as-envisioned; prioritize by (1) engineering feasibility, (2) impact on output quality, (3) dependency order',
      'Create visualizations: "completed / working / in-transit" diagram for Britney (Chris ask); full architecture delta for CSA Weekly / eng roadmap conversation',
    ],
    dependsOn: ['p1-access'],
  },

  'p10-gary': {
    id: 'p10-gary', num: '10', tier: 2, type: 'project', status: 'in-progress',
    name: 'Gary Tools Integration',
    owner: 'Pierce (lead) · Susannah Locke · Chris Palo',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Evaluation of Gary Kirwan\'s AI writing toolkit. Gary is off the automated QA gate (non-deterministic, black-box). Direct API integration is on hold due to vendor lock-in risk. Path forward: audit Gary\'s publicly available resources for anything replicable, obtain the code, then demonstrate a proposal to Chris and the CSA eng team for building the capability internally.',
    blockers: [],
    nextActions: [
      'Audit Gary\'s publicly available resources (docs, articles, published tools) — identify what can be taken and replicated',
      'Obtain Gary\'s code (via Kathryn/Jason contract path or direct ask)',
      'Demonstrate proposal to Chris + CSA eng team: build the capability internally rather than depend on Gary\'s API',
    ],
    dependsOn: ['p1-access'],
    contacts: [
      { name: 'Gary Kirwan', email: 'gary@kirwandigital.com', role: 'Tool developer' },
      { name: 'Jim Robinson', role: 'Internal SEO; has novelty concern about Gary' },
    ],
  },

  // ── TIER 3 ────────────────────────────────────────────────────────────────

  'p6-taxonomy': {
    id: 'p6-taxonomy', num: '6', tier: 3, type: 'project', status: 'in-progress',
    name: 'Content Cluster / Tagging Taxonomy',
    owner: 'Pierce · Susannah Locke · Chris Palo · Sara Vallone',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Structured tagging system that tracks content clusters — a canonical article plus its analytically-determined variants — so performance can be measured at the cluster level rather than per-article. Currently one editor manually tracks 700+ stories/month; the engineering implementation automates this. Foundational to all downstream analytics and recipe work.',
    blockers: [],
    nextActions: [
      'Monitor EGS-127 — ticket 12828 in dev; 3 tickets remain in backlog',
      'Once delivered: document cluster tagging in csa-content-standards',
    ],
    dependsOn: ['p1-access'],
    links: [
      { label: 'Chris cluster performance sheet', url: 'https://docs.google.com/spreadsheets/d/1VGMbJUV2u9QjUpk0QxMdHeNf9sTumEeR/edit' },
    ],
  },

  // ── TIER 4 ────────────────────────────────────────────────────────────────

  'p2-dashboard': {
    id: 'p2-dashboard', num: '2', tier: 4, type: 'project', status: 'in-progress',
    name: 'Dashboard Instrumentation',
    owner: 'Pierce',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Live metrics dashboard for the CSA program, tracking output volume, batting average, Discover rate, and Amplitude events. Built on data adapters (Snowflake, Marfeel, Amplitude) with a manual bridge active while adapters are completed. Depends on active CSA feature tickets (duplicate content, keyword enforcement, analytics) to reach full instrumentation.',
    adapters: [
      { name: 'Google Sheets (manual)', status: 'done', note: 'Edit data/manual-metrics.js to update numbers.' },
      { name: 'Snowflake (direct)', status: 'pending-setup', note: 'Replaces Sigma OAuth2 approach. Chad Bruton confirmed: connect GitHub directly to Snowflake — Sigma is just a reporting UI on top. Chad to help set up. Unblocks stories/week, batting average, and O&O PV.' },
      { name: 'Marfeel', status: 'pending-creds', note: 'Discover rate, batting average. OPEN QUESTION: ask Chad whether Marfeel data flows into Snowflake before pursuing API key — if it does, Snowflake adapter covers this and no API key needed.' },
      { name: 'Amplitude', status: 'pending-creds', note: 'Amplitude data is in Snowflake (Amplitude events prod table) — use Snowflake connection for raw event data. CSA-specific unified dashboard still blocked on PTECH-7730 (PE ticket, dev group assigned, Julia Kim PM — Joe Vitali checking ETA, responds 2026-04-16).' },
    ],
    blockers: [
      'Snowflake direct connection not yet set up — Chad Bruton to assist (GitHub → Snowflake)',
      'Marfeel: confirm with Chad whether Discover rate / batting average data is in Snowflake before pursuing API key',
      'PTECH-7730 (WordPress p-tagging fix) — dev group assigned, Julia Kim PM. Waiting on ETA from Joe Vitali (2026-04-16).',
    ],
    nextActions: [
      'Ask Chad: is Marfeel (Discover rate, batting average) data in Snowflake? If yes, Snowflake adapter covers it — no API key needed',
      'Monitor PTECH-7730 (p-tagging fix) — activates Amplitude adapter when done',
      'PGS-62 Feedback Loop epic (40% done): architecture + Snowflake/Amplitude access + report definitions + queries all DONE. PGS-68/69/72 (Content Graph, Synthesis Engine, Reports UI prototypes) in Code Review. PGS-67 (CSA ID forwarding to Cue — critical content-linking dependency) IN PROGRESS (Daury; unblocked by PGS-17 hold removal today). PGS-66 (WordPress ID forwarding) still Backlog.',
      'PGS-82: CODE REVIEW as of 12:03pm 2026-04-16. Marcelo fixed bugs 1, 2, 4 + flags 1, 2 (confirmed blockers per Susannah). Bug 3 deferred (not a blocker). Binary scoring (okay/high-risk only) confirmed production design. Pending Efren/Cat UI approval before production.',
      'PGS-104: Fix deployed to staging this morning (Oliver); Jonathan checking fix today. Susannah: must ship today if PGS-82 can\'t. IN QA.',
      'PGS-150: Send Sara email (drafted 2026-04-16) + schedule criteria session with Chris — Susannah on HOLD',
      'New: AI hallucination bug — Patrick Al Khouri debugging (CSA added "Ada County" content not in source). Saner creating ticket. Monitor.',
      'Sarah Price: Monitor PGS-82 calibration threshold together — report suspected missed issues to group',
    ],
    dependsOn: ['p1-access'],
  },

  'p3-headlines': {
    id: 'p3-headlines', num: '3', tier: 4, type: 'project', status: 'in-progress',
    name: 'T1 Headlines Analysis (Price)',
    owner: 'Pierce · Sarah Price',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Data analysis and tooling to identify what makes high-performing T1 headlines in the National content pipeline. Deliverables: findings playbook, per-author performance profiles, and a daily automated Headline Grader (15 criteria, weekly ingest). Run in partnership with Sarah Price.',
    blockers: [
      'Headline Grader: can\'t move to McClatchy org — Chris pinging Rasheed about Bitbucket + Cloudflare team environment',
      'Author playbooks: Tarrow data thin — Snowflake is the authoritative source. Tables identified 2026-04-15: author_name in dynamic_story_metadata (MCC presentation), joined to story_traffic_main on story ID. Upgrade blocked until GitHub→Snowflake connection set up (Chad Bruton).',
    ],
    nextActions: [
      'Get GitHub→Snowflake connection set up (Chad) — switch data source from Tarrow pulls to direct Snowflake pipe before circulating findings',
      'Verify Tarrow weekly automation is running clean (check next Monday morning)',
      'Upgrade author playbooks using Snowflake: join dynamic_story_metadata (author_name) to story_traffic_main (PV by story/market/date) on story ID. Blocked on GitHub→Snowflake setup.',
      'Once Snowflake piped: share formula × topic interaction findings with editorial leads + SmartNews formula trap with distribution team',
      'Ecosystem audit: validate cross-platform comparisons stay within ecosystem type (app-based vs web-based)',
      'Long-term: watch for cross-author patterns in headline/keyword/traffic data that may indicate Google author-throttling.',
    ],
    dependsOn: ['p1-access'],
  },

  'p4-governance': {
    id: 'p4-governance', num: '4', tier: 4, type: 'project', status: 'in-progress',
    name: 'Article Format + Persona + Keyword Governance',
    owner: 'Pierce · Sara Vallone · Susannah Locke · Sarah Price',
    compassGoal: 'G2 — Editorial Standards & Voice Guidelines',
    description: 'Establishes and maintains the editorial governance layer for National team CSA usage: 5 defined personas, a content format library, mandatory keyword enforcement, and SEO standards. All deliverables live in csa-content-standards and the CSA production UI. Governs what the CSA is configured to produce and how National team editors use it.',
    blockers: [],
    nextActions: [
      'Follow up with Susannah on keyword color overlay — greenlit at CSA Weekly; awaiting team ticket',
      'Follow up with Susannah on author profile replication — greenlit at CSA Weekly; Gary methodology known',
      'Extend AGENT-AUDIENCE routing annotations to §2+ sections',
    ],
    dependsOn: ['p6-taxonomy'],
  },

  'p12-unitedrobots': {
    id: 'p12-unitedrobots', num: '12', tier: 4, type: 'project', status: 'hold',
    name: 'United Robots Inbound Pipeline',
    owner: 'Pierce · Sara Vallone · Sarah Price',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Use CSA to wrap and enrich United Robots\' automated wire content (sports, weather, elections) for McClatchy sites. Send-to-WP integration is live but unreliable until a headline URL slug bug is fixed. On hold pending cluster tagging, send-to-Cue integration, and analytics instrumentation.',
    blockers: [
      'PGS-170 (Send-to-WP headline URL slug bug: variant name + date in slug → harms SEO). In QA as of 2026-04-16 (Victor Suarez).',
      'EGS-127 and PGS-80 must land before build starts',
    ],
    nextActions: [
      'PGS-17 (Send-to-Cue): HOLD REMOVED 2026-04-16 — now CODE REVIEW. Daury\'s PR has core functionality without Snowflake fields. PGS-67 is follow-on for Snowflake + feedback loop. Monitor merge.',
      'Monitor WordPress headline bug fix (Daury)',
      'When prerequisites land (EGS-127, PGS-80, PGS-17): define working group + alert feed scope with Sara Vallone',
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
    compassGoal: 'G5 — Professional Development: Technical & Editorial Fluency',
    description: 'Keyword intelligence layer that surfaces content opportunities for the National team using SEMrush data — scoring topics by volume, difficulty, and portfolio gap to produce Go Hard / Test Small / Skip verdicts. Prototype live at 14 briefs across 4 verticals; next iteration adds per-publication analysis and authority-progression logic.',
    blockers: [
      'Go Hard/Test Small thresholds undefined — needs Rocky + Sarah session (invite sent, date TBD)',
      'Rocky/Julio credit rate per endpoint not confirmed — Rocky pinging Julio 2026-04-15; required before any automation',
    ],
    nextActions: [
      'FEEDBACK LOOP (end of Sara Vallone Experiences experiment, ~2026-05): Check which of the 4 topics she published on and which she skipped — including topics we rated SKIP (Solo Dining) and GO HARD (Landmarks, 5-Day Travel, Road Trips). Cross-check against actual article performance in those domains. Use results to calibrate GO HARD / SKIP thresholds and verdict logic in data-keywords tool.',
      'Confirm which pub + vertical for Rocky\'s first per-publication rerun — financial services discussed, pub not locked. Rocky confirmed per-pub model 2026-04-15.',
      'Follow up with Rocky end of week if no Julio credit rate response.',
      'Revamp tool per stakeholder feedback — read data-keywords/REFERENCE.md § Stakeholder Feedback first',
      'Add keep/decline + note field + performance feedback loop to tool',
      'Bridge to data-headlines: keyword gap (what to chase) + headline performance (what format wins)',
    ],
    dependsOn: ['p1-access'],
    systems: [
      { name: 'data-keywords prototype', status: 'done', note: 'piercewilliams/data-keywords — 14 briefs, 4 verticals. Live: https://piercewilliams.github.io/data-keywords/' },
      { name: 'SEMrush API', status: 'done', note: '250K credits = Pierce\'s L&E allocation. Rocky\'s total pool = 2M/month — can cover overage if Pierce hits 250K, not a standing arrangement. API key from Rocky 2026-04-14. No automation until Julio confirms per-endpoint rates.' },
      { name: 'DataForSEO API', status: 'pending', note: 'Rocky uses a "data for SEO" service internally for organic metadata/keyword rank tracking — separate from the DataForSEO API. Rocky\'s take: Amplitude (via Snowflake) is better for multi-channel use cases. Evaluate DataForSEO API separately for batch keyword lookups.' },
    ],
    contacts: [
      { name: 'Rocky Rhodes', role: 'SEMrush admin; API key source; pinging Julio on per-endpoint credit rates; confirmed per-pub model 2026-04-15' },
      { name: 'Chad Bruton', role: 'Snowflake primary contact ("buck stops with me"). Setting up GitHub→Snowflake connection for dashboard.' },
      { name: 'Ryan Spalding', role: 'Ad/revenue expert — direct sold (Naviga) + programmatic (GAM) revenue now in Snowflake as of 2026-04-15. Sigma dash: STAR-Automation-3wA6q4da4CrVGCyhIMqk2E. Meeting scheduled next week for Market dimension of Recipe system.' },
      { name: 'Allison Ciaccio', role: 'TH team — financial services expansion target (long-term)' },
    ],
  },

  // ── TIER 4 HOLD ───────────────────────────────────────────────────────────

  'p7-tracker': {
    id: 'p7-tracker', num: '7', tier: 4, type: 'project', status: 'hold',
    name: 'Vallone Tracker / CMS Automation',
    owner: 'Pierce (dev) · Sara Vallone (stakeholder)',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Automate Sara Vallone\'s content governance sheet. Send-to-WP integration done. Deprioritized by Chris — holds until cluster tagging, send-to-Cue, and analytics instrumentation land.',
    blockers: [
      'HOLD: EGS-127, rq-send-to-cue, and PGS-80 must land first',
    ],
    nextActions: [
      'Monitor prerequisites — when all land, bring revised proposal to Chris',
    ],
    dependsOn: ['p6-taxonomy', 'p1-access'],
  },

  // ── TIER 5 ────────────────────────────────────────────────────────────────

  'p35-narrative': {
    id: 'p35-narrative', num: '3.5', tier: 5, type: 'project', status: 'in-progress',
    name: 'Content Analysis / Narrative Dashboard (Price)',
    owner: 'Pierce · Sarah Price',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Synthesis layer that aggregates outputs from headline analytics, keyword intelligence, CSA dashboard instrumentation, and other tools into narrative reports on pipeline and product performance. Distinct from the individual analysis tools — this is the reporting layer on top, designed to produce insights worth circulating to stakeholders.',
    blockers: [],
    nextActions: [
      'Continue iterating on constituent tools (data-headlines, data-keywords, P2 instrumentation)',
      'Once tooling is stable, define aggregation format and circulation cadence',
    ],
    dependsOn: ['p3-headlines', 'p14-semrush', 'p2-dashboard'],
  },

  'p5-testing': {
    id: 'p5-testing', num: '5', tier: 5, type: 'project', status: 'in-progress',
    name: 'Personas & Formats Testing / Optimization',
    owner: 'Pierce',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Controlled pairwise experiments testing persona × format combinations to identify what actually drives performance. Starting with Discover + Trend Hunter personas. Depends on P4 format library stabilizing and cluster tagging for reliable outcome measurement.',
    blockers: ['Needs P4 format library stable + EGS-127 cluster tagging before controlled experiments can run'],
    nextActions: ['Design pairwise test schedule with Sarah Price — Discover × Curious Explorer as first candidate pair'],
    dependsOn: ['p4-governance', 'p7-tracker'],
  },

  'p15-partner': {
    id: 'p15-partner', num: '15', tier: 5, type: 'project', status: 'in-progress',
    name: 'Partner Content / Inventory Optimization',
    owner: 'Pierce · Kathryn Sheldon · Chris Palo · Kathy',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Optimize how McClatchy selects and places 20-30 partner content feeds (Reuters, Athlon, Field Level Media, UPI, and others). Current system uses recency or hard-coded priority with no performance layer. Field Level Media drives ~1/3 higher PV/story than Minute Media for sports. Two lanes: quick — top 5 feeds MRSS optimization; larger — full feed indexing + placement optimization.',
    blockers: [
      'Reuters still provisioning (~1 week) — waiting on access before testing',
      'AI vetting policy not drafted yet',
      'Legal: can we analyze (not train on) partner content? Unresolved.',
    ],
    nextActions: [
      'Await Chris kickoff of MRSS optimization with Kathy (Chris\'s action item)',
      'Once Kathy engages: quick audit of top 5 feeds — identify PV/story by vendor',
      'Monitor Field Level vs Minute Media placement performance as baseline',
      'Co-develop AI vetting policy with Chris + Kathryn Sheldon',
      'Low priority: once legal question resolves, cost out partner content fact-checker',
    ],
    dependsOn: [],
    contacts: [
      { name: 'Kathryn Sheldon', role: 'Feeds/programming; owns Arena Group relationship' },
      { name: 'Kathy', role: 'Partner content relationship; owns vendor scope' },
      { name: 'Joe Vitali', role: 'Reuters provisioning contact — internal only, do not surface externally' },
    ],
  },

  'p16-ltv': {
    id: 'p16-ltv', num: '16', tier: 5, type: 'project', status: 'not-started',
    name: 'LTV Model',
    owner: 'Pierce · Chris Palo · Sara Vallone · Sarah Price · Kathy',
    compassGoal: 'G4 — Pipeline Documentation & Operational Knowledge',
    description: 'LTV model for content assets — cost + value per asset, evergreen vs. transient weighting. Chris Palo Q2 milestone. Build internally first, then integrate data team. Exclude unavailable sources (e.g. MSN) rather than imputing.',
    blockers: [
      'Kickoff meeting not yet scheduled (Chris scheduling)',
      'Revenue data from Justin needed for validation',
    ],
    nextActions: [
      'Attend kickoff — Chris scheduling with Sara Vallone, Sarah Price, Kathy, Pierce',
      'Provide statistical input on evergreen/transient weighting',
    ],
    dependsOn: ['p3-headlines'],
  },

  'p9-prd': {
    id: 'p9-prd', num: '9', tier: 3, type: 'project', status: 'done',
    name: 'PRD Revisions',
    completedDate: '2026-04-10',
    owner: 'Pierce',
    compassGoal: 'G4 — Pipeline Documentation & Operational Knowledge',
    description: 'PRD revised through V0.5 and delivered to Chris Palo 2026-04-10; distributed at CSA Weekly 2026-04-14. Versions: V0.1 initial draft → V0.2 Sara Vallone feedback incorporated (MAIA as brief source, headline keyword anchoring, plagiarism + diff check modules named, editorial experience section) → V0.3 Sarah Price inputs (testing module as standalone, evergreen backlinking as named use case) → V0.4 delivered to Chris → V0.5 final revisions incorporating Chris 1:1 feedback. Chris framed PRD as "goalpost" document and "archive" — snapshot context for all feature requests, not a live operational roadmap. Architecture settled: vertical pipes (T1–T5) + horizontal cross-cutting elements (publish-to-queue, Gary tools/nodes, Inclination Engine). Syndication ecosystem taxonomy, LTV=0 framework, and swarm testing added as Phase 2/3 requirements. Live in Google Docs.',
    resolvedBlockers: [
      'PRD scope kept expanding with each stakeholder input round — resolved by treating V0.5 as "done enough to ship" per Chris direction; ongoing additions → separate feature requests',
    ],
    blockers: [],
    nextActions: [],
    dependsOn: [],
  },

  'p13-sysprompts': {
    id: 'p13-sysprompts', num: '13', tier: 2, type: 'project', status: 'done',
    name: 'System Prompts / Mode 1 & Mode 2',
    completedDate: '2026-04-03',
    owner: 'Pierce',
    compassGoal: 'G4 — Pipeline Documentation & Operational Knowledge',
    description: 'Investigation into CSA Mode 1 vs. Mode 2 behavior — why the same source URLs produced different output depending on workflow entry point. Resolved 2026-04-03 when Oliver Felix confirmed via Slack: Mode 1 (Publication Ready) = Import from URL flow; Mode 2 (Research Draft) = Search/DemoTopics flow. Mode is determined by workflow entry point, not team configuration — National team is not treated differently from other teams. This explained a persistent source of confusion about inconsistent CSA output quality. Finding propagated to csa-dashboard (REFERENCE.md, requests.js, nodes.js) and ops-hub. No further action required; behavior is by design.',
    resolvedBlockers: [
      'Why does the same URL produce different CSA output quality depending on how you enter the workflow? → Mode 1/2 are entry-point-determined, not team-configured (Oliver Felix, 2026-04-03)',
    ],
    blockers: [],
    nextActions: [],
    dependsOn: [],
  },

  'p11-recipes': {
    id: 'p11-recipes', num: '11', tier: 5, type: 'project', status: 'not-started',
    name: 'Recipes',
    owner: 'Pierce',
    compassGoal: 'G2 — Editorial Standards & Voice Guidelines',
    description: 'Signal-driven configuration framework that maps creator profile, content category, and distribution target to a predictable content return — specifying which persona × format × topic × market combination maximizes expected performance. Not a static spec; a learned prediction built as data infrastructure (persona governance, taxonomy, keyword signal, performance data) matures.',
    blockers: [
      'P4 persona governance must finalize the controlled format/persona set (P9 PRD complete — recipes concept defined as T3 pipeline layer)',
    ],
    nextActions: [
      'Build recipes on-demand — one at a time as data infrastructure (EGS-127, PGS-82/140, Sigma CSA dash) is in place to track and optimize that vertical',
      'First recipe: identify which T3 vertical has the most pieces ready, build that one first to prove the model',
    ],
    dependsOn: ['p4-governance', 'p2-dashboard', 'p6-taxonomy', 'p14-semrush'],
  },

  'p18-agentic-writing': {
    id: 'p18-agentic-writing', num: '18', tier: 5, type: 'project', status: 'in-progress',
    name: 'Agentic Writing Helpers',
    owner: 'Pierce · Chris Palo · Sara Vallone',
    compassGoal: 'G2 — Editorial Standards & Voice Guidelines',
    description: 'Tooling to reduce writer friction in the CSA workflow, starting with the highest-impact interventions from the Apr 16 wishlist session: style guide enforcement, variant differentiation checking, keyword flagging, and Cue upload automation. All tools must work without Claude access — most writers on Sara\'s team are not yet provisioned.',
    blockers: [
      'Claude access not universal — most writers on Sara\'s team cannot use Claude-dependent tools; all external tooling must work within CSA or without Claude',
      'News labor concerns: author fine-tuning on individual writer data requires union agreement — not an engineering problem',
      'CSA backend unknown: core agent identity (Claude? LangChain?) unresolved — no one could answer; blocks CSA-integrated approaches',
    ],
    nextActions: [
      'Eval with Claude: rank all 11 pain points by impact × feasibility — produce prioritized order before Sara proposal',
      'Propose prioritized list to Sara Vallone — confirm ranking, calibrate to any special instructions or constraints Pierce doesn\'t have visibility into',
      'Pick pilot author from confirmed priorities; Samantha Agate (style enforcement) is current leading candidate',
      'Verify input-length-to-output-length issue status with engineering — CSA output length currently pinned to input length; Pierce said it was raised and being addressed',
    ],
    dependsOn: ['p4-governance'],
    contacts: [
      { name: 'Chris Palo', role: 'Sponsor; philosophy-first directive; has trained voice model on Sara\'s content externally' },
      { name: 'Sara Vallone', role: 'Primary pilot target; owns content creation workflow; hosted Apr 16 wishlist session' },
      { name: 'Hanna Wickes', role: 'Pain point: gallery research/drafting bottleneck — aggregation + language transformation' },
      { name: 'Ryan Brennan', role: 'Pain point: variant generation — CSA copies paragraphs, writers re-do the varianting work' },
      { name: 'Allison Palmer', role: 'Pain point: Cue upload + H2 fixing is hours/week; also flagged keyword gaps in subheads' },
      { name: 'Samantha Agate', role: 'Pain point: style guide enforcement — brand-specific rules not being applied' },
      { name: 'Lauren Jarvis-Gibson', role: 'Pain point: variant titles too similar; keyword not carried into headlines' },
    ],
    links: [
      { label: 'Every.to Proof podcast (overcast)', url: 'https://overcast.fm/+ABFpy8Pupn4' },
      { label: 'Apr 16 wishlist session notes (Gemini)', url: '' },
    ],
  },

  'p19-maia-trend-tool': {
    id: 'p19-maia-trend-tool', num: '19', tier: 4, type: 'project', status: 'in-progress',
    name: 'MAIA Trend Tool Validation',
    owner: 'Pierce · Sara Vallone · Derek',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Validation of trend signal tools for the National content pipeline. The 14-day MAIA test is underway with Sara\'s teams logging writeability and rejection reasons. Originally scoped as a three-way comparison (MAIA vs. Kat Sheplavy\'s agent vs. TH native) — Kat access requested 2026-04-16 but unlikely to be granted; comparison may run as MAIA vs. TH native only.',
    blockers: [
      'Pending access to Insights Dashboard MAIA tab — Sara requested 2026-04-15',
      'Pending add to Sara Vallone tracking sheet — Sara requested 2026-04-15',
    ],
    nextActions: [
      'Get access to MAIA tab + Sara\'s tracking sheet — begin monitoring once live (waiting on Sara/Derek)',
      'Kat access denied 2026-04-16 — proceed as MAIA vs. TH native two-way comparison (confirmed)',
      'At end of 14 days (~2026-04-29): analyze MAIA feedback by vertical; categorize failure modes (specificity / directionality / temporal / vertical mismatch)',
      'Produce comparison: MAIA vs. TH native (+ Kat agent if access granted) — signal type, content angle quality, vertical fit',
      'Deliver prompt-branching recommendation: one National prompt or separate prompts for Mind-Body / Experiences / Everyday Living?',
    ],
    contacts: [
      { name: 'Derek', role: 'Owner of MAIA Trend Tool (Insights Dashboard); initiated 14-day test' },
      { name: 'Kat Sheplavy', role: 'Building "Agent Smith" ecosystem — Trend Agent (Phase 1–6 complete, live: staging-trend-agent.trendhunteragents.ai; Phase 7–8 next) + Insights Agent (on deck). Marcelo Freitas is eng lead. Pierce access denied 2026-04-16. P19 runs as MAIA vs. TH native two-way comparison.' },
      { name: 'Sara Vallone', role: 'Editorial execution; teams doing the testing; owns tracking sheet' },
      { name: 'Sarah Price', role: 'Reviews success metrics at end of test window; also pending MAIA tab access' },
      { name: 'Chris Palo', role: 'Sponsor; issued test directive; owns success metric review' },
    ],
    notes: [
      'BASELINE PROMPT (National Team, as of 2026-04-15 — this is what the test is evaluating):',
      'This is an AUTOMATED DAILY SCAN. Task: produce a daily trend report identifying SPECIFIC emerging trends at the product, behavior, or cultural phenomenon level.',
      'TEMPORAL FOCUS: Focus EXCLUSIVELY on signals from the past 24-72 hours. Breaking news tie-ins, viral social moments (past 48hrs), sudden search volume spikes, new product launches, regulatory announcements, emerging memes, celebrity-driven trends gaining sudden traction. Do NOT include trends discussed widely for weeks/months unless there is a SPECIFIC new development in the last 72 hours.',
      'SPECIFICITY: Product/behavior level, NOT broad industry themes. BAD: "AI in Healthcare", "Sustainable Living". GOOD: "Mushroom Coffee", "Mouth Taping for Sleep", "Gut Health Sodas", "Beef Tallow Skincare", "Dopamine Menus".',
      'DIRECTIONALITY: Every trend must be something the content team can act on — must support multiple content pieces (roundup, how-to, explainer, expert Q&A). Not a single product launch, momentary social format, or brand collab with no broader behavior behind it.',
      'OUTPUT: 10-15 trends, each with: Trend name, Category, Subcategory, Description (1-2 sentences), What\'s new (recent trigger), Evidence (sources + URLs + dates), Industries, Audience segments, Content angle (headline tied to live moment), Recommended format, Urgency (High/Medium/Low). Then: 5-8 Content Opportunities + Competitive Gaps.',
      'SUCCESS METRICS (Pierce + Sara + Sarah review at ~2026-04-29): Are trends useful and in which areas? Writeability % (viable for B2C articles). Specificity (product/behavior level vs. industry level). Traffic performance of published articles. Does prompt need to branch for verticals (Mind-Body / Experiences / Everyday Living)?',
    ],
  },

  'p20-experiences-test': {
    id: 'p20-experiences-test', num: '20', tier: 4, type: 'project', status: 'in-progress',
    name: 'Experiences Vertical Content Test',
    owner: 'Pierce · Sara Vallone',
    compassGoal: 'G5 — Professional Development: Technical & Editorial Fluency',
    description: 'Sara Vallone\'s Experiences vertical content test — SEMrush keyword pull across four topics (Landmarks, 5-Day Travel, Scenic Road Trips, Solo Dining) to determine Go Hard / Skip verdicts. The first live calibration input for the data-keywords verdict system: what Sara publishes and how those articles perform will be used to refine thresholds.',
    blockers: [],
    nextActions: [
      'Sara confirmed data usable 2026-04-16 (all 3 alignment questions yes). Follow up only if she requests adjustments during daily use.',
      'FEEDBACK LOOP (~May 2026): When Sara\'s experiment concludes, check: (1) which GO HARD topics she published on, (2) which she skipped, (3) whether Solo Dining SKIP was respected or ignored, (4) actual performance of published articles vs. verdict prediction. Use to recalibrate verdict thresholds in data-keywords.',
    ],
    systems: [
      { name: 'data-keywords', status: 'done', note: 'Experiences briefs live in docs/data/briefs.js (trv-landmarks, trv-5day-travel, trv-solo-dining, trv-roadtrips). Pull script: scripts/pull_experiences.py. Exports: scripts/export_experiences.py → reports/.' },
      { name: 'SEMrush API', status: 'done', note: 'phrase_fullsearch + phrase_kdi + phrase_organic pipeline. ~14K units per run. Reference: data-keywords/SEMRUSH-API.md. ALWAYS validate seeds in Keyword Magic Tool before running API.' },
      { name: 'Deliverables', status: 'done', note: 'data-keywords/reports/: 4 xlsx (per topic) + experiences-keyword-report-2026-04-15.docx. Slacked to Sara 2026-04-15.' },
    ],
    contacts: [
      { name: 'Sara Vallone', role: 'Content test owner; requested keyword data; editorial execution; owns tracking for experiment outcomes' },
    ],
    dependsOn: ['p14-semrush'],
  },

  'p21-mode2-trust-spike': {
    id: 'p21-mode2-trust-spike', num: '21', tier: 2, type: 'project', status: 'in-progress',
    name: 'Mode 2 Trust & Editorial Risk Spike (PGS-189)',
    owner: 'Oliver Felix · Susannah Locke · Pierce',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Formal spike investigating whether Mode 2 (Intermediate) silently adds factual content without user awareness — and the editorial trust and accuracy risks this creates. Deliverable: written findings covering which workflows invoke Mode 2 by default, what it can add, and implications for future QA infrastructure. Investigation only; no implementation changes in scope.',
    blockers: [
      'PGS-189 in Selected for Development — Oliver Felix assigned; no active sprint yet',
    ],
    nextActions: [
      'Review Oliver\'s findings when published — form a take; no active contribution needed until deliverable is ready',
      'Schedule PGS-150 criteria session with Sara Vallone + Chris Palo (see agenda below) — Susannah is in HOLD waiting on this',
      'Once PGS-189 findings land: use them to scope PGS-150 (plagiarism) and any Gary fact-checking work (P10)',
      'Monitor AI hallucination bug (2026-04-16): CSA added "Ada County" content not present in source material (Boise Statesman draft). Patrick Al Khouri debugging; Saner creating ticket. Related to Mode 2 scope question — CSA may be looking beyond immediate source into linked stories.',
    ],
    notes: [
      'PGS-150 SESSION AGENDA — questions Pierce must bring answers to (with Sara + Chris):',
      '1. SCOPE: What counts as "plagiarism" for CSA output? Three distinct cases: (a) CSA rephrases user-pasted source material — is that plagiarism or expected behavior? (b) Mode 2 adds content from "common knowledge" with no attributable source — how do we detect or handle that? (c) CSA output coincidentally resembles published articles via training overlap — is this in scope?',
      '2. TOOL SELECTION: Three options on the table: Copyscape (open-web; Gary\'s reference; checks output against published internet content), Originality.ai / Winston AI (Gary uses these as external reference tools; detect AI-generated content as well as plagiarism), internal RAG comparison (compare CSA output against only the user-provided input; cheapest, most targeted, but misses open-web matches). Decision: which problem are we actually solving?',
      '3. TRIGGER: When does the check run? At draft generation? Before export to Cue? On-demand only? Automatic for every article?',
      '4. THRESHOLD + ACTION: What similarity score trips a flag? What does the editor do with a flagged article — edit, discard, override with explanation? Who owns the resolution?',
      '5. MODE 2 COMPLICATION: PGS-189 may reveal Mode 2 adds content with no traceable source. Plagiarism detection logic needs to handle AI-injected context differently from user-sourced content — or we get false positives on Mode 2 output. Do we wait for PGS-189 findings before scoping this?',
      '6. AUDIENCE SCOPE: National team only, or all CSA users? Different user groups, workflows, and risk tolerances may need different thresholds.',
    ],
    contacts: [
      { name: 'Oliver Felix', role: 'Assigned spike owner — lead investigator on PGS-189' },
      { name: 'Susannah Locke', role: 'Reporter on PGS-189; put PGS-150 on HOLD pending Pierce\'s criteria input' },
      { name: 'Sara Vallone', role: 'Key stakeholder for PGS-150 criteria session' },
      { name: 'Chris Palo', role: 'Key stakeholder for PGS-150 criteria session; owns tool and budget decisions' },
    ],
    dependsOn: ['p13-sysprompts'],
  },

  'p17-spanish': {
    id: 'p17-spanish', num: '17', tier: 5, type: 'project', status: 'not-started',
    name: 'Spanish CSA Pipeline',
    owner: 'Pierce · Chris Palo · Rajiv Pant · Julia Tortoriello',
    description: 'Dedicated Spanish-language CSA pipeline — discovery phase only. Julia Tortoriello meeting (2026-04-09) established baseline: current stack is CMS-integrated Google Translate + GPT-3 + standalone "dog translator" GPT. Dialect: Colombian Spanish register for US Hispanic audience. Julia willing to test CSA in Spanish. Chris + Rajiv considering dedicated pipeline — no scope or timeline yet.',
    blockers: [
      'No direction from Chris Palo or Rajiv Pant yet — watching for scope definition',
      'Needs P4 CSA configuration framework as prerequisite',
    ],
    nextActions: [
      'Wait for Chris/Rajiv direction before any scoping or build work',
    ],
    dependsOn: ['p4-governance'],
    contacts: [
      { name: 'Julia Tortoriello', role: 'El Nuevo translation lead; has CMS prompt + standalone GPT config; willing to test CSA in Spanish' },
    ],
  },

};
