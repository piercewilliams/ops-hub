// Project registry — all active projects, tasks, and holds
// Dependency arrows flow: upstream (dependsOn) → this project (downstream)

// ── Recently completed tasks ───────────────────────────────────────────────
// Add entries here (or let the sync agent add them) when individual tasks wrap up.
// Most recent first. Only last 5 are shown on the dashboard.
// Format: { date: 'YYYY-MM-DD', task: 'plain-language description', project: '#N Name' }
export const COMPLETED_TASKS = [
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
    description: 'API access confirmed for all platforms. One gap: confirm Sigma workbook scope + OAuth2 at Rocky+Chad walkthrough Wed 4/15 1:30pm CDT.',
    systems: [
      { name: 'Snowflake / Sigma', status: 'pending', note: 'Access confirmed — need to verify growth_and_strategy_role workbooks are all accessible. OAuth2 creds for dashboard adapter still needed.' },
      { name: 'CUE', status: 'done', note: '' },
      { name: 'WordPress', status: 'done', note: '' },
      { name: 'Google Sheets API', status: 'done', note: 'Manual bridge active via manual-metrics.js — no API key needed.' },
      { name: 'Amplitude', status: 'done', note: 'Access confirmed. Adapter blocked on CSA eng p-tagging bug (CUE/WP mismatch) — their fix.' },
      { name: 'Marfeel', status: 'done', note: 'Access confirmed 2026-04-09. Apple filter removed from main UI — Sarah Price\'s custom dashboard is the accurate Apple view. El Nuevo numbers may be inflated; verify before analysis.' },
      { name: 'Gary API', status: 'done', note: 'Full API docs + McClatchy key in hand. See gary-tools repo.' },
      { name: 'SEMrush', status: 'done', note: '250K credits in L&E workspace. Requested key directly from Rocky Rhodes 2026-04-13 (Sarah Price had it). Automation blocked until Julio credit rate confirmed.' },
      { name: 'MAIA', status: 'done', note: '' },
      { name: 'BitBucket', status: 'done', note: '' },
    ],
    blockers: [
      'Sigma: confirm workbook scope + OAuth2 creds (Chad Bruton) — walkthrough scheduled Wed 4/15',
    ],
    nextActions: [
      'Rocky+Chad walkthrough Wed 4/15 1:30pm CDT — Snowflake/Sigma scope, SEMrush credits + DataForSEO, keyword-to-article data in Sigma',
    ],
    dependsOn: [],
  },

  // ── TIER 2 ────────────────────────────────────────────────────────────────

  'p8-mapping': {
    id: 'p8-mapping', num: '8', tier: 2, type: 'project', status: 'in-progress',
    name: 'Rajiv CSA Mapping',
    owner: 'Pierce',
    compassGoal: 'G4 — Pipeline Documentation & Operational Knowledge',
    description: 'Map CSA transformations via BitBucket. Low priority — not blocking anything.',
    blockers: [],
    nextActions: [
      'Map CSA pipeline transformations via Bitbucket (low priority — do opportunistically)',
    ],
    dependsOn: ['p1-access'],
  },

  'p10-gary': {
    id: 'p10-gary', num: '10', tier: 2, type: 'project', status: 'in-progress',
    name: 'Gary Tools Integration',
    owner: 'Pierce (lead) · Susannah Locke · Chris Palo',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Gary Kirwan\'s toolkit evaluation complete (CSA Weekly 2026-04-14). Verdict: Gary is off the QA gate roadmap — confidence scores undocumented, methodology black-box, not deterministic despite claims. Gary has no plagiarism detection (uses Originality.ai — Copyscape stands). Gary value = commerce/SEO for Andy only; general tools: use as template only. New IP/contract concern raised by Kathryn Sheplavy: Gary\'s contract may not give McClatchy ownership of code built under it; tools live on Gary\'s personal API. Kathryn to discuss with Jason. Chris to tell Jason that team has failed to obtain Gary\'s code. Author profile replication greenlit: Gary built Sara Vallone\'s voice profile from ~100 articles — replicable in-house; dev ticket to be created; test internally (Sara/Pierce/Susannah) before wider rollout due to news sensitivity. Chris roadmap: V1 = internal source ranking library, V2 = user-generated content vetting (Substack).',
    blockers: [
      'Gary IP/contract: Kathryn Sheplavy discussing with Jason — McClatchy ownership of Gary\'s code unclear',
      'Sara Vallone parameter session not yet scheduled',
    ],
    nextActions: [
      'Create dev ticket: replicate author profile voice customization in-house (Gary\'s methodology known; Kathryn confirmed replicable)',
      'Schedule Sara Vallone parameter session — agenda ready (session-agenda-vallone.docx); 4 decisions needed',
      'Monitor Kathryn/Jason conversation on Gary contract + code access',
      'Begin scoping V1 internal source ranking library (Chris ask; after parameter session)',
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
    description: 'Strategy settled: Canonical ID = Cluster ID; articles are siblings. EGS-127 (Marcelo, 4 subtasks) replaces PGS-40. Ticket 12828 (first of 4) moved to Selected for Development 2026-04-13 — Marcelo offering guidance (did the planning, has engineering mods). Susannah\'s #1 analytics priority (one editor manually tracking 700+ stories/month).',
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
    description: 'Live data ingestion layer for csa-dashboard. Manual bridge active. Release batches defined (Susannah Slack 2026-04-14): Batch 1 in staging (PGS-115, PGS-96, PGS-134) — PGS-96 → READY FOR PRODUCTION (all tests passed). Batch 2: PGS-82 (top priority, in QA) + PGS-104 (getting code updates for all custom Content Formats). Batch 3: PGS-133, PGS-111, PGS-147, PGS-141. PGS-82 still #1 priority. PGS-140 IN PROGRESS — Marcelo needs Amplitude data test. PGS-139 SELECTED FOR DEV. PGS-171 IN PROGRESS. PTECH-7730 (p-tagging fix, PT Delta, TO DO). 35-item backlog context: Flatiron→MCP migration + Travis Frell approval requirement + dual code review = backlog. Clearing this week. New process: weekly release lists to Pierce/Chris (Kathryn committed).',
    adapters: [
      { name: 'Google Sheets (manual)', status: 'done', note: 'Edit data/manual-metrics.js to update numbers.' },
      { name: 'Sigma', status: 'pending-creds', note: 'Stories/week, batting average. Needs OAuth2 from Chad.' },
      { name: 'Marfeel', status: 'pending-creds', note: 'Discover rate, batting average. Needs API key.' },
      { name: 'Amplitude', status: 'pending-creds', note: 'Blocked on PTECH-7730 (TO DO, Platform Technology team). When fixed: enables adapter + unified Sigma dashboard of all CSA content.' },
    ],
    blockers: [
      'Sigma OAuth2 credentials (Chad Bruton)',
      'Marfeel API key',
      'Amplitude: PTECH-7730 (TO DO, unassigned, Platform Technology [PT] Delta) — must land before Amplitude adapter is reliable',
    ],
    nextActions: [
      'Get Marfeel API key → activate adapter',
      'Monitor PTECH-7730 (p-tagging fix) — activates Amplitude adapter when done',
      'Provide weekly release estimates/timeframes to management (Chris ask — use weekly dates, not "soon")',
      'Monitor PGS-82 QA progress — top priority this week per Susannah',
      'Sarah Price: follow up with Deedra on team vs. org comparison dashboard',
    ],
    dependsOn: ['p1-access'],
  },

  'p3-headlines': {
    id: 'p3-headlines', num: '3', tier: 4, type: 'project', status: 'in-progress',
    name: 'T1 Headlines Analysis (Price)',
    owner: 'Pierce · Sarah Price',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: '13 findings, 5-tile playbook, author playbooks, Headline Grader (daily, 15 criteria), weekly auto-ingest (Mon 8pm CDT). 21/21 tests pass. Fully hardened 2026-04-14: 9 CI bugs fixed. Tarrow weekly run now functional — verify automation held next Tuesday.',
    blockers: [
      'Headline Grader: can\'t move to McClatchy org — Chris pinging Rasheed about Bitbucket + Cloudflare team environment',
      'Author playbooks: Tarrow data has small per-author sample sizes — Chris prefers Snowflake as authoritative source; wait for Snowflake navigation meeting before treating playbooks as actionable',
    ],
    nextActions: [
      'Check Tuesday morning that Tarrow automation ran clean (first verification after fix)',
      'Document sandbox base build for Chris + Sarah Price (Chris explicitly asked)',
      'Notify Tarrow: active time outliers in source Excel (values up to 23,496s — likely ms stored as seconds)',
      'After Snowflake meeting (2026-04-15): assess what author-level data is available to upgrade playbooks beyond directional',
      'Ecosystem audit: validate cross-platform comparisons stay within ecosystem type (app-based vs web-based)',
    ],
    dependsOn: ['p1-access'],
  },

  'p4-governance': {
    id: 'p4-governance', num: '4', tier: 4, type: 'project', status: 'in-progress',
    name: 'Article Format + Persona + Keyword Governance',
    owner: 'Pierce · Sara Vallone · Susannah Locke · Sarah Price',
    compassGoal: 'G2 — Editorial Standards & Voice Guidelines',
    description: '5 National team personas sent to Susannah. AGENT-AUDIENCE §1 routing live. PGS-96 → READY FOR PRODUCTION (2026-04-14). PGS-104 (keyword enforcement) getting code updates to work with all custom Content Formats — keyword field coming this week, mandatory (Chris decided; Sara confirmed; Susannah updating ticket). PGS-134 + PGS-115 in staging. PGS-133/111/147/141 in code review. PGS-150 PRODUCT REVIEW (Copyscape endorsed; Victor recommendation). PGS-149 ON HOLD. PGS-93 BACKLOG. NEW: keyword color overlay greenlit at CSA Weekly — 4-color headline breakdown (subject/lead, keyword, active verb + 4th); Kathryn: toggle/overlay, must not affect markdown/CMS export; Chris: start with keyword color, then add headline success criteria; separate ticket needed. NEW: author profile replication — dev ticket to be created (replicate Gary\'s methodology in-house; test internally Sara/Pierce/Susannah).',
    blockers: [
      'Andy sign-off on Apple News + SmartNews templates — 2 emails sent, no response. Submit ticket if still silent.',
    ],
    nextActions: [
      'Create dev ticket: keyword color overlay (4-color headline breakdown — separate from keyword field ticket)',
      'Create dev ticket: author profile voice replication (Gary\'s methodology; test internally first)',
      'Finalize Science-Curious Retiree + Casual Reader persona definitions — required before Susannah saves as shared custom personas',
      'When PGS-134 ships: migrate Apple News + SmartNews best practices from persona → format section in csa-content-standards',
      'Andy: submit ticket if still no response on distribution templates',
      'Extend AGENT-AUDIENCE routing annotations to §2+ sections',
      'Consolidate TH/TH B2C persona variants with Sara + Sarah Price',
    ],
    dependsOn: ['p6-taxonomy'],
  },

  'p12-unitedrobots': {
    id: 'p12-unitedrobots', num: '12', tier: 4, type: 'project', status: 'in-progress',
    name: 'United Robots Inbound Pipeline',
    owner: 'Pierce · Sara Vallone · Sarah Price',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Use CSA to capture United Robots\' 50% revenue share. Q/Cue integration (Daury Caba) IN CODE REVIEW 2026-04-13 (31 files). Send-to-WP ✅ live but headline bug active — variant name + date corrupting URL slug, harms SEO. Daury investigating both. Build prerequisites still outstanding: EGS-127 (cluster ID), PGS-80 analytics.',
    blockers: [
      'Send-to-WP headline bug: variant name + date in slug → harms SEO. Daury Caba investigating.',
      'EGS-127 and PGS-80 must land before build starts',
    ],
    nextActions: [
      'Monitor Q/Cue code review (Daury) — when merged, rq-send-to-cue satisfied',
      'Monitor WordPress headline bug fix (Daury)',
      'When prerequisites land (EGS-127, PGS-80): define working group + alert feed scope with Sara Vallone',
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
    description: 'Two-layer keyword intelligence. Layer 1: Rocky Rhodes SEMrush gap analysis (competitor keywords we don\'t rank for). Layer 2: data-keywords prototype (piercewilliams/data-keywords) — 14 briefs, 4 verticals, volume×CPC verdicts (Go Hard / Test Small / Skip). Sara Vallone reviewed 2026-04-14: "great start," wants expansive not prescriptive. Rocky+Chad walkthrough Wed 4/15 1:30pm CDT. Open design question: calibrate scoring methodology + build feedback loop from team\'s actual choices.',
    blockers: [
      'Pending Chris feedback on verdict system and which verticals to pull next',
      'Rocky/Julio credit rate per endpoint not confirmed — required before any automation',
    ],
    nextActions: [
      'Rocky+Chad walkthrough Wed 4/15 1:30pm CDT — SEMrush credits/strategy, Sigma scope, DataForSEO, keyword-to-article data',
      'Await Chris feedback on verdict system and next verticals (sleep/recovery, HSAs per Sara V)',
      'Design scoring calibration — Go Hard/Skip methodology, CPC quality weighting, feedback loop from team choices',
      'Bridge to data-headlines: connect keyword gap findings to T1 headline performance data',
    ],
    dependsOn: ['p1-access'],
    systems: [
      { name: 'data-keywords prototype', status: 'done', note: 'piercewilliams/data-keywords — 14 briefs, 4 verticals; serve: python3 -m http.server 8080 → http://localhost:8080/docs/' },
      { name: 'SEMrush API', status: 'pending', note: 'Manual pulls done. Requested API key directly from Rocky 2026-04-13. No automation until credit rates confirmed (Rocky/Julio).' },
      { name: 'DataForSEO API', status: 'pending', note: 'Cheaper alternative flagged by Rocky — evaluate for batch use.' },
    ],
    contacts: [
      { name: 'Rocky Rhodes', role: 'SEMrush admin; has existing T1 site keyword reports; liaising with rep Julio on credit rates; evaluating DataForSEO as alternative' },
      { name: 'Chad Bruton', role: 'Snowflake/Sigma — knows if keyword-to-article data already exists in Sigma; walkthrough meeting requested 2026-04-13' },
    ],
  },

  // ── TIER 4 HOLD ───────────────────────────────────────────────────────────

  'p7-tracker': {
    id: 'p7-tracker', num: '7', tier: 4, type: 'project', status: 'hold',
    name: 'Vallone Tracker / CMS Automation',
    owner: 'Pierce (dev) · Sara Vallone (stakeholder)',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'Automate Sara Vallone\'s content governance sheet. Deprioritized by Chris — holds until prerequisites land. Send-to-WP ✅ done. Remaining: EGS-127 (cluster ID), rq-send-to-cue, PGS-80 analytics.',
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
    id: 'p35-narrative', num: '3.5', tier: 5, type: 'project', status: 'not-started',
    name: 'Content Analysis / Narrative Dashboard (Price)',
    owner: 'Pierce · Sarah Price',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Ongoing monitoring layer and testing narrative with Sarah Price. Distinct from headline analysis — this is the reporting/narrative layer on top.',
    blockers: ['Needs P3 findings consolidated with Sarah Price first'],
    nextActions: ['Meet with Sarah Price to define monitoring format and cadence'],
    dependsOn: ['p3-headlines'],
  },

  'p5-testing': {
    id: 'p5-testing', num: '5', tier: 5, type: 'project', status: 'not-started',
    name: 'Personas & Formats Testing / Optimization',
    owner: 'Pierce',
    compassGoal: 'G3 — Quality Framework & Testing Protocols',
    description: 'Controlled pairwise experiments (~3 formats × 3 personas). Start with Discover + Trend Hunterland. Discover Persona test sheet exists in Sarah Price\'s tracker (empty).',
    blockers: ['Needs P4 (controlled set) and P7 (cluster tags) first'],
    nextActions: ['Complete P4 + P7, then design pairwise schedule with Sarah Price'],
    dependsOn: ['p4-governance', 'p7-tracker'],
  },

  'p15-partner': {
    id: 'p15-partner', num: '15', tier: 5, type: 'project', status: 'in-progress',
    name: 'Partner Content / Inventory Optimization',
    owner: 'Pierce · Kathryn Sheldon · Chris Palo · Kathy',
    compassGoal: 'G1 — Product Liaison & Pipeline Request Management',
    description: 'AI policy for inbound partner content + inventory optimization. Lindy\'s (Arena Group sports) going live. Reuters: Sara Vallone has RSS access as of 2026-04-13. Heavy hard news content — mind/body section viable for national team. Testing Sting/Met Opera content for national distribution; Reuters photos also available to test. Sub-scope: fact-checking inbound partner content (Athlon ~1M stories/yr) — low priority, legal question on data-vs-content analysis rights unresolved.',
    blockers: [
      'AI vetting policy not drafted yet',
      'Legal: can we analyze (not train on) partner content? Unresolved.',
      'Inventory optimization: deferred until Chris green-lights',
    ],
    nextActions: [
      'Test Reuters mind/body content for national team fit — Sara piloting',
      'Test Reuters photos for national team use',
      'Co-develop AI vetting policy with Chris + Kathryn Sheldon',
      'Monitor Lindy\'s activation',
      'Low priority: once legal question resolves, cost out partner content fact-checker',
    ],
    dependsOn: [],
    contacts: [
      { name: 'Kathryn Sheldon', role: 'Feeds/programming; owns Arena Group relationship' },
      { name: 'Kathy', role: 'Partner content relationship; needed for inventory scope' },
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
    description: 'V0.5 complete, delivered 2026-04-10, distributed at CSA Weekly 2026-04-14. Chris framed as "goalpost" document and "archive" — snapshot context for all feature requests; not a live operational roadmap. Architecture: vertical pipes (T1–T5) + horizontal cross-cutting elements (publish-to-queue, Gary tools/nodes). Visualizations needed for eng team clarity (Chris explicitly requested; Pierce to build standalone HTML diagrams).',
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
    description: 'Closed 2026-04-03.',
    blockers: [],
    nextActions: [],
    dependsOn: [],
  },

  'p11-recipes': {
    id: 'p11-recipes', num: '11', tier: 5, type: 'project', status: 'not-started',
    name: 'Recipes',
    owner: 'Pierce',
    compassGoal: 'G2 — Editorial Standards & Voice Guidelines',
    description: 'A Recipe is a signal-driven lever configuration: given known inputs — creator profile (who produces what content well), content category performance by market, and site ECPM data — the system pulls the right combination of levers (persona × format × topic × distribution target) to configure content with a predictable expected return. Example: Ryan Brennan × creature features × Sacramento (ECPM 240) → predict cluster story → configure accordingly. Not a static spec; a learned prediction about which configuration maximizes return for a given creator+category+market combination. The "levers" are the controlled set of personas, formats, topics, and distribution destinations defined in P4 and P9. Data inputs come from EGS-127 (variant origin tracking), PGS-82/140 (differentiation + analytics), Sigma CSA dash (market performance), and eventually the LTV model (P16). ~10 verticals total (financial services, fashion, tech, etc.). Two additional pipeline types under investigation: (1) infographics pipeline — trend/research → branded infographic (e.g. HSA rates rising → Trend Hunter graphic); (2) licensed partner content pipeline — licensed influencer video/transcript → CSA → multiple articles + tangential content distributed to Trend Hunter app + Pier1 sites. Chris Palo confirmed interest in both (2026-04-10).',
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
    id: 'p18-agentic-writing', num: '18', tier: 5, type: 'project', status: 'not-started',
    name: 'Agentic Writing Helpers',
    owner: 'Pierce · Chris Palo · Sara Vallone · Susannah Locke · Kathryn Sheldon',
    compassGoal: 'G2 — Editorial Standards & Voice Guidelines',
    description: 'Agent-in-document workflows for McClatchy editorial teams. Sparked by Chris Palo forwarding Every.to "Proof" podcast (2026-04-13). The pattern matters, not the product. Two distinct workflows: (1) PRDs — agent co-drafts planning docs, colleague\'s agent reviews, human approves; (2) Content creation — record thoughts (Monologue or text), agent builds running note + outline, human writes in. Agent trust prerequisite: must identify which agents are reliable for McClatchy use cases before deploying to teams. Repo: write-assist.',
    blockers: [
      'Agent trust gate: must establish which agents are reliable for McClatchy editorial use before deploying to Sara\'s team or Susannah/Kat',
      'Scope not yet defined — awaiting Chris 1:1 direction on which workflow first',
    ],
    nextActions: [
      'Discuss with Chris at 1:1: which workflow first (PRDs or content creation)? Sara\'s team or Susannah/Kat?',
      'Define agent trust criteria — what makes an agent reliable enough for McClatchy editorial use?',
      'Map PRD workflow: plan → agent review → human approve → agent execute',
      'Map content creation workflow: Monologue/text → running note → outline → human writes in',
    ],
    dependsOn: ['p4-governance'],
    contacts: [
      { name: 'Chris Palo', role: 'Sponsor; forwarded Every.to Proof podcast 2026-04-13' },
      { name: 'Sara Vallone', role: 'Primary target team (content creation workflow)' },
    ],
    links: [
      { label: 'Every.to Proof podcast (overcast)', url: 'https://overcast.fm/+ABFpy8Pupn4' },
    ],
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
