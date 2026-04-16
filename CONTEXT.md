# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-16 17:14 UTC — Automated sync. Changes: csa-links.js updated — added p20-experiences-test (rq-semrush-api) and p21-mode2-trust-spike (rq-plagiarism-check, rq-import-to-research-draft, p-hallucination, p-plagiarism). No project status changes. Last human session: 2026-04-15 (session 5) — Full integrity pass across all 6 repos: API key exposure remediated, .gitignore files added, READMEs rewritten, pinned-item numbering bug fixed in app.js, check.sh data quality gate fully operational.
**Status:** 21 active/tracked projects (P20 + P21 added). Compass goals submitted (Jeremy approval pending Apr 30).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **Live at** `https://piercewilliams.github.io/ops-hub`
- **v0.88 in production (2026-04-15).** PGS-134 + PGS-96 + PGS-115 DONE. Docker bug patching (Oliver + Marcelo). v0.89 target: 6 items.
- **All 5 personas live as Team Target Audiences (2026-04-15):** Discover Browser + Science Enthusiast (Susannah); Curious Optimizer + Curious Explorer + Watercooler Insider (Pierce). PGS-133 ON HOLD.
- **Snowflake orientation complete (2026-04-15):** story_traffic_main (O&O PV by story/market/date) + dynamic_story_metadata (author/URL/SEO/keywords) in MCC presentation schema. Amplitude in Snowflake (events prod). GitHub→Snowflake direct (Chad setting up). **Revenue now in Snowflake (2026-04-16):** direct sold (Naviga) + programmatic (GAM) — discrepancies resolved by Ryan Spalding's team. Sigma dash: STAR-Automation-3wA6q4da4CrVGCyhIMqk2E. Schedule time with Ryan next week.
- **MAIA 14-day test started 2026-04-15** (~2026-04-29). Sara's teams log outputs; Pierce monitoring. Access + tracking sheet requested from Derek.
- **Critical tickets (2026-04-16 standup):** PGS-82 IN PROGRESS (Marcelo fixing 4 bugs + 2 flags today; if not resolved, code pulled from production, kept staging for v0.89.1; Pierce + Susannah reviewing diff testing items post-standup); PGS-104 IN QA (fix deployed to staging by Oliver this morning; Jonathan checking; Susannah: must ship today if PGS-82 can't); **PGS-17 HOLD REMOVED → CODE REVIEW** (Daury's PR has core Send-to-Cue; PGS-67 IN PROGRESS is Cue ID forwarding for feedback loop — directly unblocked by PGS-17); PGS-62 feedback loop epic 40% done (PGS-68/69/72 in Code Review; PGS-67 now active; PGS-66 WordPress path still Backlog); PGS-111 CODE REVIEW; PGS-140 IN QA; PGS-150 ON HOLD; PGS-189 SELECTED FOR DEV; PTECH-7730 TO DO. NEW: AI hallucination bug (Patrick — CSA added "Ada County" not in source; Saner creating ticket).
- **EGS-127 ticket 12828 in dev** (1 of 4-ticket epic). Marcelo leading.
- **Rajiv on vacation.** Emil Penalo + Oliver Felix have prod merge authority. 2-PR process in effect.
- **Gary (2026-04-16):** Off QA gate. Direct API integration dropped (vendor lock-in). Path forward: audit Gary's public resources, obtain code, propose internal replication to Chris + CSA eng.
- **SEMrush pull paused** (Chris flagged logic flaw 2026-04-15). Rocky/Julio credit rate per endpoint pending before any automation.
- **Q/Cue integration IN CODE REVIEW** (Daury, 31 files, 2026-04-13). WP 301 bug (PGS-170, Lauren Schuster) under investigation.
- **PGS-150 HOLD** (plagiarism — Copyscape recommended; RAG vs. open-web clarification pending).
- **Sigma CSA dash (Deedra):** Simple version almost done. Await delivery.
- **National portfolio canonical file:** `data/national-portfolio.js` — 13 brands, single source of truth for all API scoping.
- Sync: **Automated** 3×/day (Mon–Fri) via scheduled sync agent.

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
| 3 | T1 Headlines Analysis | 4 | In progress | 13 findings, daily grader, weekly ingest operational. Headline quality standards defined + eval tool live (Sara + Sarah Price satisfied). Author playbook upgrade blocked on Snowflake setup (Chad). |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | In progress | Synthesis layer: aggregates data-headlines + data-keywords + P2 instrumentation into circulated pipeline/product narratives. Tooling in active iteration. |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | All 5 personas live. PGS-104/111/135 in progress. Andy sign-off on Apple/SN templates still pending. |
| 5 | Personas & Formats Testing | 5 | In progress | Needs P4 stable + EGS-127. |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | EGS-127 ticket 12828 in dev (1 of 4). |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | EGS-127 + rq-send-to-cue + PGS-80 must land first. |
| 8 | Rajiv CSA Mapping | 2 | Not started | Low priority opportunistic. |
| 9 | ~~PRD Revisions~~ | — | Done | V0.5 delivered 2026-04-10, distributed at CSA Weekly 2026-04-14. |
| 10 | Gary Tools Integration | 2 | In progress | Direct API integration dropped (vendor lock-in). Pierce to audit Gary's public resources, obtain code, and propose internal replication to Chris + CSA eng. |
| 11 | Recipes | 5 | Not started | Needs P4 + P2 + P6 + P14. |
| 12 | United Robots Inbound Pipeline | 4 | Hold | **PGS-17 hold removed 2026-04-16 — now CODE REVIEW.** WP 301 bug (PGS-170). EGS-127 + PGS-80 still needed. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | Done | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | Prototype live. Pull paused (Chris logic flaw 2026-04-15). Rocky/Julio credit rate pending. |
| 15 | Partner Content / Inventory Optimization | 5 | In progress | Reuters RSS confirmed. AI vetting policy not drafted. Legal question unresolved. |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff (Sara, Sarah Price, Pierce, Kathy). |
| 17 | Spanish CSA Pipeline | 5 | Not started | Waiting on Chris/Rajiv direction. |
| 18 | Agentic Writing Helpers | 5 | In progress | Meeting Thu 2026-04-16 11am CDT (Sara + Hanna Wickes + Ryan Brennan + 4 more). |
| 19 | MAIA Trend Tool Validation | 4 | In progress | 14-day test 2026-04-15→~2026-04-29. Waiting on MAIA tab access + tracking sheet. |
| 20 | Experiences Vertical Content Test | 4 | In progress | Keyword data delivered to Sara 2026-04-15 (xlsx + docx). 3 GO HARD, 1 SKIP. Feedback loop due ~May 2026. |
| 21 | Mode 2 Trust & Editorial Risk Spike | 2 | In progress | PGS-189 — Oliver Felix assigned, Pierce tagged. Mode 2 silently adds content; trust/accuracy risk. PGS-150 HOLD pending Pierce criteria clarification. |

## What's Next — Pierce's Action Items

**G1 — Product/Pipeline:**
- [ ] **PGS-150:** Send Sara email + schedule criteria session with Chris Palo — Susannah has ticket on HOLD waiting (email drafted 2026-04-16)
- [ ] **CSA pipeline visuals for Britney** — "completed / working / in-transit" diagram; Chris ask 2026-04-14
- [ ] **Confirm first per-pub SEMrush pull with Rocky** — financial services confirmed as topic; pub not locked yet

**G2 — Editorial Standards:**
- [ ] **Thu 2026-04-16 11am CDT: agentic writing group session** → Pierce + Sara huddle after to pick pilot author

**G3 — Quality/Testing:**
- [ ] **Gary: audit public resources** — identify what's replicable; then obtain code and propose internal build to Chris + CSA eng

**G4 — Documentation:**
- [ ] **Document sandbox base build** — Chris explicitly asked; package toolkit + guardrails so Chris + Sarah Price can replicate

**G5 — Technical/Analytical:**
- [ ] **Mon 2026-04-20 3pm CDT — Ryan Spalding meeting** — review STAR-Automation Sigma dash; primary ask: access to underlying Snowflake data so revenue can feed into ops-hub/Recipe system Market dimension like other data sources; need agenda prep before meeting
- [ ] **Follow up Rocky on Julio credit rates** — end of week if no response; blocks all SEMrush automation

**Compass:**
- [ ] **Fri 2026-04-18: log week's progress in Compass ad hoc** — draft is in compass-goals.md § Week of 2026-04-14
- [ ] Jeremy Gockel approval — must reach "Track Goals" status by **April 30, 2026**
- [ ] Every Friday: request Compass progress notes from Claude (per-goal, based on WINS.md)

**Waiting — no Pierce action needed:**
- Joe Vitali: PTECH-7730 ETA
- Chad Bruton: GitHub→Snowflake setup
- Rocky/Julio: SEMrush per-endpoint credit rates
- Derek/Sara: MAIA tab access + tracking sheet (P19; Sara requested 2026-04-15)
- Gary Kirwan: code access response (Jason + Rajiv discussing)
- Chris Palo: LTV kickoff scheduling; Reuters link
- Susannah/Saner: weekly release estimates with specific dates to management (Chris ask — on them, not Pierce)
- Engineering: PGS-82 must-fix (banner states, re-analysis indicator), PGS-104 keyword enforcement fix, EGS-127, PTECH-7730, PGS-189 spike (Oliver Felix)
- Kat Sheplavy: trend analysis agent access — reached out 2026-04-16; access unlikely; P19 proceeds as MAIA vs. TH native if denied

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
**Purpose-driven pipelines (2026-04-10):** Every pipeline has an explicit purpose — engagement, revenue, acquisition, or other. Purpose may vary at the asset level within a pipeline (e.g. core TH asset = drive app clickthroughs; bottom-tier variants = acquire new readers). CPA is a cost-center signal, not the goal. OKRs differ per pipeline.
**Distribution channels (2026-04-10):** O&O, Trend Hunter app, Syndication, TBTV (future). Each has a different value calculation. Syndication = avenue, not focus.
**Inclination Engine (2026-04-10):** Named concept — sole future input for automated signals and trend unit brief generation. Feeds T1/T2 pipelines without human initiation. Not yet built. Needs PRD section.
**CPA breakeven reference (2026-04-10):** ~$85 asset cost → 6,156 PVs to cover cost (ECPM data from Chris). Reference only — do not specify in PRD.
**Recipe system (2026-04-12):** Creator × Format × Topic × Market → Predictable Return. Before committing pipeline capacity, configure the four dimensions. data-keywords = Topic layer (keyword signal; is the opportunity there?). CSA = Format layer. Inclination Engine = Creator layer (future). Snowflake/Sigma = Market layer (eCPM by site). Full canonical reference: `RECIPE.md` in ops-hub.
**Cluster (precise definition, 2026-04-12):** Canonical article + analytically-determined variants. Predictive output of the analytics signal. NOT synonymous with topic, vertical, or keyword group. Cluster ID = Canonical ID.

---

*Tiered Context Architecture. Budget: ≤150 lines.*
