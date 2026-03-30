# Ops Hub — Working Context

**Phase:** Active — pre-prioritization meeting
**Status:** All projects inventoried; dependency map built
**Last session:** 2026-03-29

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- 13 active projects across 5 dependency tiers + 1 hold
- Meeting with Chris (boss) tomorrow (2026-03-30) to prioritize
- Everything gates on two chains: **Access** (P1) and **Cluster taxonomy** (P6)
- Visual dependency map live at `index.html` (open in browser)

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker |
|---|---------|------|--------|-------------|
| 1 | Platform Access & Training | 1 | In progress | Snowflake/Sigma ticket pending; Gary API pending |
| 2 | Dashboard Instrumentation | 4 | In progress | Sigma/Marfeel creds; Amplitude blocked (p-tagging) |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | Tarrow MSN/SmartNews re-exports pending |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 shared with Sarah Price first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Awaiting persona texts from Susannah (requested 2026-03-25) |
| 5 | Personas & Formats Testing / Optimization | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | Blocked | Alignment meeting not scheduled |
| 7 | Vallone Tracker / CMS Automation | 4 | Blocked | Needs P6 alignment + Snowflake access |
| 8 | Rajiv CSA Mapping | 2 | Not started | Needs GitHub access from Rajiv |
| 9 | PRD Revisions | 3 | Not started | Needs P8 + P13 complete |
| 10 | Gary Tools Integration | 2 | Blocked | Gary API key not delivered |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | CSA Subs / United Robots Evaluation | HOLD | Hold | Chris + Eric must assess feasibility first |
| 13 | System Prompts / Mode 1 & Mode 2 | 2 | Not started | (unblocked) |

## What's Next — Immediate (before meeting)

1. [ ] Prep meeting agenda for Chris (2026-03-30): dependency chain framing
2. [ ] Enable Google Sheets API key (P2 — unblocked, do now)
3. [ ] Reply to Susannah re: cluster entry point (P6 — hold building, schedule alignment meeting)
4. [ ] Attend dev standup — scope Amplitude event names with Patrick/Dar (P2 forward-path)

## Items Not Yet in Any Repo (track here until documented)

- Digest Chris's cluster performance sheet (feeds P6 alignment meeting)
- Study content graph doc (feeds P6 + P9)
- Apple News monitoring cadence setup (rq-apple-news-monitoring — related to P3, separate ops deliverable)
- Content diff tool (Susannah's #1 priority; Jim Robinson built cosine similarity checker; Pierce's role TBD)
- Headline tool + title options (rq-headline-tool, rq-title-options in dashboard register — clarify ownership with Chris)

---

*This file follows the Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~70*
