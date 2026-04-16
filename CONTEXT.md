# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-04-15 — Sara Vallone Experiences keyword pull complete. SEMrush API: 4 topics, full phrase_fullsearch + phrase_kdi + phrase_organic pipeline. Verdicts: Landmarks GO HARD, 5-Day Travel GO HARD, Scenic Road Trips GO HARD, Solo Dining SKIP. 4 xlsx files + docx analytical report delivered. Slack sent before Thu 11am meeting.
**Status:** 19 active/tracked projects. Compass goals submitted (Jeremy approval pending Apr 30).

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- **Live at** `https://piercewilliams.github.io/ops-hub`
- **v0.88 in production (2026-04-15).** PGS-134 + PGS-96 + PGS-115 DONE. Docker bug patching (Oliver + Marcelo). v0.89 target: 6 items.
- **All 5 personas live as Team Target Audiences (2026-04-15):** Discover Browser + Science Enthusiast (Susannah); Curious Optimizer + Curious Explorer + Watercooler Insider (Pierce). PGS-133 ON HOLD.
- **Snowflake orientation complete (2026-04-15):** story_traffic_main (O&O PV by story/market/date) + dynamic_story_metadata (author/URL/SEO/keywords) in MCC presentation schema. Amplitude in Snowflake (events prod). GitHub→Snowflake direct (Chad setting up). eCPM → Ryan Spalding.
- **MAIA 14-day test started 2026-04-15** (~2026-04-29). Sara's teams log outputs; Pierce monitoring. Access + tracking sheet requested from Derek.
- **Critical tickets:** PGS-82 PRODUCT REVIEW (2 must-fix: banner states green/red only, re-analysis loading indicator); PGS-104 IN PROGRESS (kicked back from QA — keyword enforcement still failing; Victor + Jonathan); PGS-111 CODE REVIEW (SEO metadata; Susannah confirmed NOT a blocker for PGS-104 release); PGS-140 IN QA (Marcelo); PGS-150 ON HOLD (Pierce must clarify implementation criteria — Susannah waiting); PGS-189 NEW SPIKE (Mode 2 trust/editorial risk — Oliver Felix assigned, Pierce tagged; Selected for Development); PTECH-7730 TO DO (p-tagging — Joe Vitali ETA 2026-04-16).
- **EGS-127 ticket 12828 in dev** (1 of 4-ticket epic). Marcelo leading.
- **Rajiv on vacation.** Emil Penalo + Oliver Felix have prod merge authority. 2-PR process in effect.
- **Gary evaluation closed (2026-04-14):** Off QA gate (black-box, not deterministic). Author profile replication greenlit (dev ticket pending). IP/contract concern (Kathryn + Jason). Sara parameter session TBD.
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
- Quality gate script at `scripts/check.sh`
- Snapshot version bars on csa-dashboard, csa-content-standards, data-headlines — weekly auto-snapshot (Mon 8am), passkey `8812`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker / State |
|---|---------|------|--------|---------------------|
| 1 | Platform Access & Training | 1 | In progress | All systems confirmed. **Pending:** GitHub→Snowflake (Chad), PTECH-7730 ETA (2026-04-16), Ryan Spalding eCPM. |
| 2 | Dashboard Instrumentation | 4 | In progress | v0.88 live. PGS-82 Product Review (2 must-fix). PGS-104 back In Progress. PGS-140 In QA. PTECH-7730 blocks Amplitude adapter. |
| 3 | T1 Headlines Analysis | 4 | In progress | 13 findings, daily grader, weekly ingest operational. Author playbook upgrade blocked on Snowflake setup (Chad). |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | In progress | Format not formalized — coordinate Sarah Price (returns 2026-04-17). |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | All 5 personas live. PGS-104/111/135 in progress. Andy sign-off on Apple/SN templates still pending. |
| 5 | Personas & Formats Testing | 5 | In progress | Needs P4 stable + EGS-127. |
| 6 | Content Cluster / Tagging Taxonomy | 3 | In progress | EGS-127 ticket 12828 in dev (1 of 4). |
| 7 | Vallone Tracker / CMS Automation | 4 | Hold | EGS-127 + rq-send-to-cue + PGS-80 must land first. |
| 8 | Rajiv CSA Mapping | 2 | Not started | Low priority opportunistic. |
| 9 | ~~PRD Revisions~~ | — | Done | V0.5 delivered 2026-04-10, distributed at CSA Weekly 2026-04-14. |
| 10 | Gary Tools Integration | 2 | In progress | Off QA gate. Author profile replication greenlit. IP/contract concern. Sara parameter session TBD. |
| 11 | Recipes | 5 | Not started | Needs P4 + P2 + P6 + P14. |
| 12 | United Robots Inbound Pipeline | 4 | Hold | WP 301 bug (PGS-170). Q/Cue in code review. EGS-127 + PGS-80 must land. |
| 13 | ~~System Prompts / Mode 1 & Mode 2~~ | — | Done | Closed 2026-04-03. |
| 14 | SEMrush / Keyword Signal Layer | 4 | In progress | Prototype live. Pull paused (Chris logic flaw 2026-04-15). Rocky/Julio credit rate pending. |
| 15 | Partner Content / Inventory Optimization | 5 | In progress | Reuters RSS confirmed. AI vetting policy not drafted. Legal question unresolved. |
| 16 | LTV Model | 5 | Not started | Chris scheduling kickoff (Sara, Sarah Price, Pierce, Kathy). |
| 17 | Spanish CSA Pipeline | 5 | Not started | Waiting on Chris/Rajiv direction. |
| 18 | Agentic Writing Helpers | 5 | In progress | Meeting Thu 2026-04-16 11am CDT (Sara + Hanna Wickes + Ryan Brennan + 4 more). |
| 19 | MAIA Trend Tool Validation | 4 | In progress | 14-day test 2026-04-15→~2026-04-29. Waiting on MAIA tab access + tracking sheet. |
| 20 | Experiences Vertical Content Test | 4 | In progress | Keyword data delivered to Sara 2026-04-15 (xlsx + docx). 3 GO HARD, 1 SKIP. Feedback loop due ~May 2026. |
| 21 | Mode 2 Trust & Editorial Risk Spike | 2 | In progress | PGS-189 — Oliver Felix assigned, Pierce tagged. Mode 2 silently adds content; trust/accuracy risk. PGS-150 HOLD pending Pierce criteria clarification. |

## What's Next

**Open (today / this week):**
- [x] ~~**Keyword data for Sara Vallone — Experiences vertical**~~ — DONE. 4 topics pulled, xlsx + docx delivered, Slack sent.
- [ ] Attend Thu 2026-04-16 11am CDT — agentic writing group session → Pierce + Sara huddle after to prioritize pain points and pick pilot author
- [ ] Create CSA pipeline visuals for Britney (Chris ask 2026-04-14) → send to Chris
- [ ] Send Sara details of additional tasks + required meetings (Pierce action from CSA Weekly)
- [ ] Provide weekly release estimates/timeframes to management (weekly dates, not "soon")

**Waiting on others:**
- Joe Vitali: PTECH-7730 ETA — responds 2026-04-16
- Chad Bruton: GitHub→Snowflake connection setup
- Rocky/Julio: credit rate per SEMrush endpoint (required before automation)
- Sarah Price: returns 2026-04-17 (narrative dashboard format coordination)
- Derek: MAIA tab access + Sara tracking sheet
- Susannah/Oliver/Saner: release schedule with staging + production dates → Pierce
- Sara Vallone: Gary parameter session scheduling (agenda ready at gary-tools/data/session-agenda-vallone.docx)

**Compass:** 5 goals submitted 2026-04-13. Jeremy Gockel approval due **April 30, 2026**. Mid-year: July 2026.


**#1 — TODAY (2026-04-15):**
**Step 1 — Schedule meetings today (before or after Snowflake call):**
0. [x] ~~**Schedule: Keyword Threshold session**~~ — Invite sent 2026-04-15. Rocky ✓ Sarah ✓ Chris free whenever. Agenda in `meetings/2026-04-xx-keyword-thresholds.md`
0. [x] ~~**Schedule: Sara Vallone agentic writing intro**~~ — DONE. **Thu 2026-04-16, 11–11:45am CDT.** Sara invited Hanna Wickes, Ryan Brennan, + 4 more. Group spitball on pain points → Pierce + Sara huddle after.
0. [ ] **Rocky+Chad walkthrough TODAY 1:30pm CDT** *(already on calendar — see `meetings/2026-04-15-snowflake-navigation.md`)*

**TONIGHT / FIRST THING TOMORROW (due before Thu 2026-04-16 11am):**
0. [ ] **Keyword data for Sara Vallone — Experiences vertical content test** — Sara needs KW data for 4 topics: Landmarks, 5-day travel, Solo dining, Roadtrips with best window views. 2-week test starting ASAP. Committed to delivering tonight or first thing tomorrow morning. Drop results in Slack.

**Step 2 — Also today:**
0. [x] ~~**Enter remaining 3 Team Target Audiences in CSA production**~~ — DONE 2026-04-15. All 5 personas live as Team Target Audiences.
0. [ ] **Create CSA pipeline visuals for Britney** — "completed / working / in-transit" diagram; Chris asked 2026-04-14; send to Chris when done (he passes to Britney)
0. [ ] **Send Sara details of additional tasks + required meetings** (Pierce action from CSA Weekly)
0. [ ] **Provide weekly release estimates/timeframes to management** (Chris ask — use weekly dates, not "soon")

1. [x] ~~**CSA Weekly — Tue 4/14 3pm CDT**~~ — DONE. PRD distributed; Gary evaluation aligned; keyword field mandatory; PGS-96 → Ready for Production; keyword color overlay + author profile replication greenlit.
   - [x] ~~**Distill open CSA tickets → exec bullet points**~~ — DONE 2026-04-14. Major items + key dates sent to Chris for Britney.
1.5. [x] ~~**Check data-headlines Actions tab**~~ — DONE 2026-04-14. Pipeline fully operational.
1.6. [x] ~~**Create P18 repo (agentic writing helpers)**~~ — DONE. write-assist repo created 2026-04-14.
2. [x] ~~**Julia Tortoriello meeting**~~ — DONE 2026-04-09. CMS prompt + standalone GPT config received verbatim. Julia willing to test CSA in Spanish.
3. [x] ~~**PRD discussion with Chris**~~ — DONE 2026-04-10. Revision items queued — see P9.
4. [x] ~~**PRD revision pass**~~ — DONE 2026-04-10 evening. V0.5 complete and delivered.
5. [x] ~~**Contact Gary Kirwan for full tool roster**~~ — DONE 2026-04-10. Email sent, CC Chris Palo. Awaiting Gary's response.
6. [x] ~~**Contact Rocky Rhodes re: existing keyword reports**~~ — Slacked 2026-04-13. Also asked for SEMrush API key directly. Awaiting reply.
7. [x] ~~**Schedule Chad Bruton Snowflake walkthrough**~~ — Slacked Rocky + Chad 2026-04-13 requesting 30–45 min walkthrough (Snowflake/Sigma + SEMrush). Awaiting availability.
8. [ ] **Attend LTV model kickoff meeting** — Chris Palo scheduling this week with Sara Vallone, Sarah Price, Kathy, Pierce. No initiation action; wait for calendar invite.
9. [x] ~~**Attend Amplitude/Amanda Hamilton meeting**~~ — DONE 2026-04-09. El Nuevo author bug filed. Claude budget → Chris/Travis Farrar. Notes: `sessions/meeting-2026-04-09-amanda-hamilton-amplitude.md`
10. [x] ~~**Connect Amplitude connector**~~ — DONE 2026-04-11. Also connected: Google Drive, Gmail, GitHub, Atlassian/Jira/Compass, Google Calendar, Slack.

**#2 — NEXT WEEK:**
7. [x] ~~**Weekly report format coordination**~~ — DONE. Pierce sending ops piece to Sarah Price in a shared Google Doc.
7. [ ] **Sara Vallone Gary parameter session** — 4 decisions: verdict→action mapping, content-type thresholds, acceptance tracking design, reporting cadence. Agenda ready. Awaiting scheduling.
7.5. [ ] **Internal source ranking library (V1)** — Chris's ask from C&P Weekly. Begin scoping once Gary unreliability is documented and parameter session complete.
8. [ ] **Gary Tools meeting with Sara Vallone** — walk 15 test articles, iterate on ruleset. Draft already in her hands.
8. [x] ~~**3-way SEMrush meeting**~~ — DONE 2026-04-08. Scope defined. API chain incoming from Sarah Price.
8. [ ] **Andy review on Apple News + SmartNews distribution templates** — Sara sent 2 emails, no response. Chris (2026-04-07): wait a few more days, then submit ticket; eng turnaround = few days. Do not block on Andy indefinitely.
**#3 — AFTER NEXT WEEK'S MEETINGS:**
8. [x] ~~**Format/persona decoupling (PGS-134)**~~ — DONE in v0.88. **Now action: migrate Apple News + SmartNews best practices from persona → format section in csa-content-standards.**
9. [ ] **Get final Vallone format guide + codify into csa-content-standards** — DO NOT FORGET. Confirm Vallone produces final version with T1 findings incorporated, then codify. 10 corrections to verify: remove WTK from SmartNews recs, add questions-hurt-both rule, add push notifications section, refine char targets (SN: 70–90 / Apple: 90–120).
10. [x] ~~**Build SEMrush keyword layer (P14)**~~ — DONE. Prototype complete: 14 briefs, 4 verticals, impact-score sort, Skip verdict, TECHNICAL.md + EXECUTIVE-BRIEF.md. **Next: present to Chris at 1:1 Tue 4/14 12:30pm CDT.**
10.5. [ ] **P14 scoring calibration** — Design question for future session: how Go Hard/Skip verdicts are assigned, how volume×CPC ranking weighs quality vs. volume, and how the tool might learn over time from which recommendations the team actually acts on (feedback loop). Sara's framing: expansive, not prescriptive — scoring should surface options, not foreclose them. **Calibration trigger:** at end of Sara Vallone Experiences experiment (~May 2026), check what she published + what she skipped (incl. topics we rated SKIP) against actual performance → refine verdict thresholds accordingly.
12. [ ] **Finalize Science-Curious persona definitions** — Retiree + Casual Reader need canonical definitions before Susannah saves as shared custom personas.
13. [ ] **Extend AGENT-AUDIENCE routing annotations beyond §1** — §1 fully confirmed live (2026-04-08). Susannah is tagging; next: audit §2+ sections and add AGENT-AUDIENCE tags where applicable.
14. [ ] **Document sandbox base build** — Chris explicitly asked (2026-04-07). Document the toolkit, guardrails, and access info so Chris Palo and Sarah Price can create their own specialized builds (e.g., analytics, partner content). Repo is public; package it. This supersedes the earlier "20-step environment" framing — focus is on repeatability for non-Pierce users, not just setup documentation.
15. [ ] **Investigate Bitbucket shared repo provisioning** — can Pierce provision a shared repo space for the team? Chris implied this is needed for collaboration on analysis code. Check access level.
16. [ ] **T1 ecosystem taxonomy audit** — validate that cross-platform comparisons in current analysis respect ecosystem boundaries (app-based captured: Apple News, SmartNews, Newsbreak vs. web-based competitive: Yahoo, O&O). Flag any findings that commingle these groups; note in governor.
**Compass (HR — performance management):**
- [x] ~~**Draft and submit goals**~~ — DONE 2026-04-13. 5 goals submitted in Compass. compass-goals.md written and committed.
- [x] ~~**Upload photo** to Compass profile~~ — DONE 2026-04-13
- [ ] **Jeremy Gockel approval** — must reach "Track Goals" status by **April 30, 2026**
- [ ] Mid-year check-in: **July 2026** (mandatory)
- [ ] Final evaluation: **January 2027**
- [ ] **Every Friday:** request Compass progress notes from Claude (per-goal, based on WINS.md + session work)

**PGS-82/139/140 rollout — Susannah is driving, Pierce is tagged:**
- [ ] PGS-82 must-fix items confirmed by Susannah before release: (1) banner states = green/red only, no "Needs Review"; (2) re-analysis loading indicator. Monitor for next engineering pass.
- [ ] PGS-104 back in Victor's hands — keyword enforcement still failing after Jonathan QA. Monitor for next pass.
- [ ] **PGS-150 HOLD — Pierce action:** Schedule criteria session with Sara Vallone + Chris Palo. Susannah is waiting. Full agenda in P21 card.
- PGS-189: Pierce is a stakeholder/reviewer only — wait for Oliver's findings, then form a take.
- Rollout: staging → QA → production (national team flag) → PGS-139 (auto-resolve) → PGS-140 (analytics)

**Waiting on others (no action needed):**
- Derek MAIA test: access to Insights Dashboard MAIA tab + Sara's tracking sheet — requested 2026-04-15. Need both to begin monitoring.
- Chad Bruton: GitHub→Snowflake direct connection setup — message sent 2026-04-15
- Ryan Spalding: eCPM/ad yield methodology for Market dimension — message sent 2026-04-15
- Joe Vitali: PTECH-7730 — confirmed with dev group, Julia Kim is PM. Joe checking ETA, responding tomorrow 2026-04-16.
- ~~Sara Vallone: agentic writing intro~~ — **confirmed Thu 2026-04-16 11am CDT**
- **Chris Palo: Reuters Connect link** — Chris said he'd send it (2026-04-14 1:1). Accept/follow up if it doesn't arrive by end of week. See P15.
- ~~Sara Vallone: hot take on SEMrush keyword output~~ — **DONE 2026-04-14.** Verdict: "great start," info is good, likes the layout. Key framing: wants it **expansive, not prescriptive** — don't pigeon-hole content decisions. Aligned on using Rocky's KW data as the next layer. Ready to start playing around with it.
- Rocky Rhodes (rrhodes@mcclatchy.com): credit burn rate per SEMrush endpoint — querying Julio; no reply as of 2026-04-11 (confirmed via Gmail); must have before writing any automation
- Stephanie Zandecki: keyword-to-article Sigma question folded into Rocky+Chad walkthrough meeting — will confirm via Chad; no separate message needed
- Sarah Price: cluster/Amplitude pulse data; headline grader feedback (reviewing); El Nuevo article count + translation % by author bylines; Chad Snowflake session (coordinating with Dedra); follow up with Deedra on team vs. org comparison dashboard
- Chris Palo: LTV meeting scheduling (not yet on calendar as of 2026-04-11); clustering stats → Eric Nelson + Kathy Veter; Rasheed re: Bitbucket + Cloudflare team environment
- Rocky Rhodes: (1) existing KW reports for National team pubs + SEMrush API key — Slacked 2026-04-13, awaiting reply; (2) DataForSEO as SEMrush alternative — flagged 2026-04-13, awaiting his take; (3) Julio/credit burn rate status — followed up 2026-04-13, awaiting reply. **For any Rocky or Rocky+Chad meeting agenda: include Julio credit rate update as standing item.**
- Rocky Rhodes + Chad Bruton: Snowflake/Sigma + SEMrush walkthrough — **confirmed Wed 2026-04-15 1:30pm CDT**. Agenda: Snowflake/Sigma access scope for National team, SEMrush starting point + credit strategy, DataForSEO (already in Snowflake?), keyword-to-article data in Sigma, Julio credit rate update, Rocky existing KW reports for National team pubs
- Sarah Price: follow up with Deedra for team vs. org comparison dashboard
- Susannah Locke + Oliver Felix + Saner Keles: release schedule with staging + production dates → sending to Pierce (2026-04-13 standup action item)
- Susannah Locke: H1 enforcement fix (PGS-135) — PGS-133 ON HOLD (admin feature replaces it)
- Dev team: EGS-127 (variant origin tracking); PGS-133/134/135; p-tagging bug (Amplitude blocker); rq-send-to-cue (date TBD — Kat to announce); PGS-140 IN PROGRESS (Marcelo); Emil/Oliver clearing PR review backlog
- Sigma: confirm full scope of access within growth_and_strategy_role (Chad Bruton walkthrough needed)
- Kat Sheplavy: Snowflake trend agent table keys for Marcelo (escalating to Brad); CUE send-to date announcement TBD


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
