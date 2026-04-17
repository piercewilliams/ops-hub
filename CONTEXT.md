# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-18 (human) — Snowflake data model complete: `ingest_tracker.py` (Google Sheet → NATIONAL_CONTENT_TRACKER, 2035 rows, headless), `model_tracker.py` (CTAS → TRACKER_ENRICHED in CONTENT_SCALING_AGENT, traffic + benchmark + cluster aggregates, Chad reviewing). `SNOWFLAKE.md` canonical reference created. Chad confirmed Google Sheet is transitional — CMS/CSA will own tracking within weeks/months. Earlier same session: enrich_tracker.py cell coloring + Trends tab + chart auto-regeneration. **Automated sync: 2026-04-17 — 1 change: rq-wp-export-301 marked fulfilled in csa-links.js.**
**Status:** 21 active/tracked projects (P20 + P21 added). Compass goals submitted (Jeremy approval pending Apr 30).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **Live at** `https://piercewilliams.github.io/ops-hub`
- **v0.88 in production (2026-04-15).** PGS-134 + PGS-96 + PGS-115 DONE. Docker bug patching (Oliver + Marcelo). v0.89 target: 6 items.
- **All 5 personas live as Team Target Audiences (2026-04-15):** Discover Browser + Science Enthusiast (Susannah); Curious Optimizer + Curious Explorer + Watercooler Insider (Pierce). PGS-133 ON HOLD.
- **Snowflake pipeline LIVE + AUTOMATED (2026-04-18):** GitHub Actions (`snowflake-tracker-sync.yml`) runs Monday 9am CDT — ingest → model, 22s total, first run clean. `TRACKER_ENRICHED` in `MCC_PRESENTATION.CONTENT_SCALING_AGENT` ready for Chad to wire into Sigma. `enrich_tracker.py` (sheet write-back) still manual/browser MFA. Gist shared with team. Revenue (Naviga+GAM) — Ryan Spalding meeting Mon 2026-04-20.
- **MAIA 14-day test started 2026-04-15** (~2026-04-29). Sara's teams log outputs; Pierce monitoring. Access + tracking sheet requested from Derek.
- **Ticket status 2026-04-17:** **PGS-82 CODE REVIEW** (Marcelo fixed bugs 1,2,4 + flags 1,2; pending Efren/Cat UI approval); **PGS-104 IN QA** (Victor Suarez); **PGS-17 CODE REVIEW** (Daury PR, high priority); **PGS-67 CODE REVIEW** (Daury; unblocked 2026-04-16 → Code Review same day); **PGS-170 DONE** (WordPress 301 slug bug shipped to prod 2026-04-16); PGS-62 epic 40% (PGS-68/69/72 + PGS-67 all Code Review); PGS-111 CODE REVIEW; PGS-140 IN QA; PGS-150 ON HOLD; PGS-189 SELECTED FOR DEV; PTECH-7730 TO DO (Julia Kim PM).
- **EGS-127 ticket 12828 in dev** (1 of 4-ticket epic). Marcelo leading.
- **Rajiv on vacation.** Emil Penalo + Oliver Felix have prod merge authority. 2-PR process in effect.
- **Gary (2026-04-16):** Off QA gate. Direct API integration dropped (vendor lock-in). Path forward: audit Gary's public resources, obtain code, propose internal replication to Chris + CSA eng.
- **SEMrush pull paused** (Chris flagged logic flaw 2026-04-15). Rocky/Julio credit rate per endpoint pending before any automation.
- **Q/Cue integration IN CODE REVIEW** (Daury, 31 files, 2026-04-13). WP 301 bug (PGS-170) DONE — shipped to prod 2026-04-16.
- **PGS-150 HOLD** (plagiarism — Copyscape recommended; RAG vs. open-web clarification pending).
- **Sigma CSA dash (Deedra):** Simple version almost done. Await delivery.
- **National portfolio canonical file:** `data/national-portfolio.js` — 13 brands, single source of truth for all API scoping.
- Sync: **Manual** — open ops-hub session, update projects.js, commit + push.

## Features Live

- Tiered dependency map with SVG arrows
- Sidebar detail panels (status, blockers, next actions, systems, contacts, links)
- Progress pills (Up next / Recently done / Completed projects)
- Snapshot version bar (last 5 syncs, passkey-protected restore)
- CSA Dashboard tag chips (pain / requests / metrics) with popover detail
- Sync status pill — shows "Last synced X ago" (green <3d, yellow 3–7d, red >7d)
- Quality gate script at `scripts/check.sh` (data quality: description length, ticket numbers, PINNED_ACTIONS count, done card completeness)
- Git pre-commit hook — check.sh runs automatically on every commit; no manual step required
- Snapshot version bars on csa-dashboard, csa-content-standards, data-headlines — weekly auto-snapshot (Mon 8am), passkey `8812`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker / State |
|---|---------|------|--------|---------------------|
| 1 | Platform Access & Training | 1 | In progress | All systems confirmed. **Pending:** GitHub→Snowflake (Chad), PTECH-7730 ETA (2026-04-16), Ryan Spalding eCPM. |
| 2 | Dashboard Instrumentation | 4 | In progress | v0.88 live. PGS-82 Product Review (2 must-fix). PGS-104 back In Progress. PGS-140 In QA. PTECH-7730 blocks Amplitude adapter. |
| 3 | T1 Headlines Analysis | 4 | In progress | 13 findings, daily grader, weekly ingest operational. **HIGH: Replace Tarrow data with Snowflake.** All ingest + grader + author playbooks currently on Tarrow (poor quality). Blocked on GitHub→Snowflake (Chad). |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | In progress | Synthesis layer: aggregates data-headlines + data-keywords + P2 instrumentation into circulated pipeline/product narratives. Tooling in active iteration. |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | All 5 personas live. PGS-104/111/135 in progress. Andy sign-off on Apple/SN templates still pending. |
| 5 | Personas & Formats Testing | 5 | In progress | Needs P4 stable + EGS-127. |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | EGS-127 ticket 12828 in dev (1 of 4). |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | EGS-127 + rq-send-to-cue + PGS-80 must land first. |
| 8 | CSA Pipeline Architecture Mapping & Gap Analysis | 2 | In progress | Reframed 2026-04-16: Bitbucket audit → as-built map (Sully AI decomposition lens) → PRD ideal map → prioritized gap delta + stakeholder visualizations. Blocker: confirm Bitbucket access. |
| 9 | ~~PRD Revisions~~ | — | Done | V0.5 delivered 2026-04-10, distributed at CSA Weekly 2026-04-14. |
| 10 | Gary Tools Integration | 2 | In progress | Direct API integration dropped (vendor lock-in). Pierce to audit Gary's public resources, obtain code, and propose internal replication to Chris + CSA eng. |
| 11 | Recipes | 5 | Not started | Needs P4 + P2 + P6 + P14. |
| 12 | United Robots Inbound Pipeline | 4 | Hold | PGS-17 + PGS-67 both CODE REVIEW. PGS-170 DONE (shipped 2026-04-16). EGS-127 + PGS-80 still needed. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | Done | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | Prototype live. Pull paused (Chris logic flaw 2026-04-15). Rocky/Julio credit rate pending. |
| 15 | Partner Content / Inventory Optimization | 5 | In progress | Reuters RSS confirmed. AI vetting policy not drafted. Legal question unresolved. |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff (Sara, Sarah Price, Pierce, Kathy). |
| 17 | Spanish CSA Pipeline | 5 | Not started | Waiting on Chris/Rajiv direction. |
| 18 | Agentic Writing Helpers | 5 | In progress | /sarah-weekly-update delivered. Phase 2: append to same doc (queued). Sarah PV request = same as enrich_tracker.py — resolved, no new build. Next: Style Checker + pilot author. |
| 19 | MAIA Trend Tool Validation | 4 | In progress | 14-day test underway. Fri 2026-04-18 meeting with Sarah + Chris. Kat access denied — two-way comparison confirmed. Waiting on MAIA tab + tracking sheet. |
| 20 | Experiences Vertical Content Test | 4 | In progress | Sara confirmed data usable 2026-04-16 — daily use starting. Feedback loop calibration ~May 2026. |
| 21 | Mode 2 Trust & Editorial Risk Spike | 2 | In progress | PGS-189 — Oliver Felix assigned, Pierce tagged. Mode 2 silently adds content; trust/accuracy risk. PGS-150 HOLD pending Pierce criteria clarification. |

## What's Next — Pierce's Action Items

**G1 — Product/Pipeline:**
- [ ] **PGS-150:** Send Sara email + schedule criteria session with Chris Palo — Susannah has ticket on HOLD waiting (email drafted 2026-04-16)
- [ ] **CSA pipeline visuals for Britney** — "completed / working / in-transit" diagram; Chris ask 2026-04-14
- [ ] **Confirm first per-pub SEMrush pull with Rocky** — financial services confirmed as topic; pub not locked yet

**G2 — Editorial Standards:**
- [ ] **Build Style Checker (P18 quick win)** — paste CSA output + select brand → auto-enforce style guide; AP base + Women's World/US Weekly exceptions; Pierce confirmed feasible
- [ ] **Pierce + Sara huddle (P18)** — pick pilot author from Apr 16 session pain points (Samantha Agate for style enforcement is leading candidate)
- [ ] **Verify input-length/output-length fix status** — confirm with engineering whether CSA output-length-pinned-to-input has been addressed

**G3 — Quality/Testing:**
- [ ] **Gary: audit public resources** — identify what's replicable; then obtain code and propose internal build to Chris + CSA eng

**G4 — Documentation:**
- [ ] **Document sandbox base build** — Chris explicitly asked; package toolkit + guardrails so Chris + Sarah Price can replicate

**G5 — Technical/Analytical:**
- [ ] **Replace Tarrow data with Snowflake (HIGH PRIORITY)** — All data-headlines Tarrow dependencies (weekly ingest, grader, author playbooks, tracker_raw) must be replaced with direct Snowflake pulls. Tarrow is poor quality; Snowflake is the authoritative source. Gate: GitHub→Snowflake connection (Chad Bruton). Tables: STORY_TRAFFIC_MAIN + DYN_STORY_META_DATA.
- [ ] **Mon 2026-04-20 3pm CDT — Ryan Spalding meeting** — review STAR-Automation Sigma dash; primary ask: access to underlying Snowflake data so revenue can feed into ops-hub/Recipe system Market dimension like other data sources; need agenda prep before meeting

**Compass:**
- [ ] Jeremy Gockel approval — must reach "Track Goals" status by **April 30, 2026**
- [ ] First Compass progress notes: **Fri 2026-04-25** (earliest — goals not yet approved)
- [ ] Every Friday: request Compass progress notes from Claude (per-goal, based on WINS.md)

**Waiting — no Pierce action needed:**
- Deedra Lawhead: Sigma creator access for Pierce + Sarah Price (asked 2026-04-18) — gate on building TRACKER_ENRICHED workbook
- Chad Bruton: reviewing TRACKER_ENRICHED model + Sigma hookup (this afternoon 2026-04-18)
- Joe Vitali: PTECH-7730 ETA (Julia Kim is PM)
- Derek/Sara: MAIA tab access + tracking sheet (P19; Sara requested 2026-04-15)
- Gary Kirwan: code access response (Jason + Rajiv discussing)
- Chris Palo: LTV kickoff scheduling; Reuters link
- Susannah/Saner: weekly release estimates with specific dates to management (Chris ask — on them, not Pierce)
- Engineering: PGS-82 must-fix (banner states, re-analysis indicator), PGS-104 keyword enforcement fix, EGS-127, PTECH-7730, PGS-189 spike (Oliver Felix)
- Kat Sheplavy: access denied 2026-04-16 — P19 proceeds as MAIA vs. TH native two-way comparison

**Later — not this week:**
- Design pairwise test schedule with Sarah Price (P5; needs P4 stable + EGS-127 first)
- Extend AGENT-AUDIENCE routing to §2+ sections in csa-content-standards
- Finalize Science-Curious persona definitions (Retiree + Casual Reader)
- Build data-headlines adapter pattern (GOVERNOR_CORE.md, ADAPTER_TEMPLATE.md)
- Revamp data-keywords tool per stakeholder feedback (read REFERENCE.md first)
- MAIA 14-day validation analysis (~2026-04-29)
- Investigate Bitbucket shared repo provisioning
- Expand data-keywords to TH team (Allison Ciaccio) — after national team validated
- Scoping V1 internal source ranking library — after Gary parameter session
- Share data-headlines findings → editorial leads + distribution team — blocked on Snowflake (Chad); switch from Tarrow pulls to direct pipe first


## Strategic Frameworks (from Chris Palo)

**Syndication ecosystems:** App-based captured (Apple News, SmartNews, Newsbreak) — LTV=0, pure PV increment. Web-based competitive (Yahoo, O&O) — standard CTR/PV dynamics. Do NOT commingle in analytics.
**LTV=0 for syndication:** PV delta only — no subscriber conversion. Every syndication slot = incremental PVs on top of O&O.
**Cluster batting average:** 1-in-3.3 as of 2026-04-07 (target 1-in-4, before CSA: 1-in-5). Q2 metrics: 3× output; $85/asset cost; 500K PV goal; 5–8% long-term traffic lift.
**Headline vs. article:** Headline = click acquisition (syndication surface). Article = retention/subscriber conversion. Analytically distinct — do not conflate.
**Political data:** Justin's/Dedra's macro dashboards are separate from Pierce's CSA statistical testing layer.
**Context engineering over iteration (Sully AI, 2026-04-16):** Chris Palo shared whitepaper — decomposed, focused agents outperform iterative correction loops. Applying: each CSA quality gate (keyword validation, fact-check, brand-fit, format compliance, headline gen, SEO metadata, diff check) should be a separate focused agent. Deterministic elements (facts, attribution) = human sign-off gate; probabilistic (optimization, scoring) = AI judgment. "Prompt quality becomes load-bearing" — format templates, persona files, and keyword specs are engineering infrastructure. Parallel focused agents = enrichment layer completes in slowest single agent's time, not sum. Validates our architecture direction.
**Purpose-driven pipelines (2026-04-10):** Every pipeline has an explicit purpose — engagement, revenue, acquisition, or other. Purpose may vary at the asset level within a pipeline (e.g. core TH asset = drive app clickthroughs; bottom-tier variants = acquire new readers). CPA is a cost-center signal, not the goal. OKRs differ per pipeline.
**Distribution channels (2026-04-10):** O&O, Trend Hunter app, Syndication, TBTV (future). Each has a different value calculation. Syndication = avenue, not focus.
**Inclination Engine (2026-04-10):** Named concept — sole future input for automated signals and trend unit brief generation. Feeds T1/T2 pipelines without human initiation. Not yet built. Needs PRD section.
**CPA breakeven reference (2026-04-10):** ~$85 asset cost → 6,156 PVs to cover cost (ECPM data from Chris). Reference only — do not specify in PRD.
**Recipe system (2026-04-12):** Creator × Format × Topic × Market → Predictable Return. Before committing pipeline capacity, configure the four dimensions. data-keywords = Topic layer (keyword signal; is the opportunity there?). CSA = Format layer. Inclination Engine = Creator layer (future). Snowflake/Sigma = Market layer (eCPM by site). Full canonical reference: `RECIPE.md` in ops-hub.
**Cluster (precise definition, 2026-04-12):** Canonical article + analytically-determined variants. Predictive output of the analytics signal. NOT synonymous with topic, vertical, or keyword group. Cluster ID = Canonical ID.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
