# Ops Hub — Working Context

**Phase:** Build / Active
**Last session:** 2026-03-30 (standup + PGS-82 UX meeting)
**Status:** Dashboard live; direct contacts established with CSA dev team; PGS-82 UX sprint underway

For stable reference facts: see [REFERENCE.md](REFERENCE.md)
For session history: see [sessions/](sessions/)

---

## Current State

- Live at `https://piercewilliams.github.io/ops-hub`
- 13 active projects across 5 dependency tiers + 1 hold
- Meeting with Chris (boss) 2026-03-30 to prioritize
- Everything gates on two chains: **Access** (P1) and **Cluster taxonomy** (P6)
- Sync: 3x daily Mon–Fri (8am/12pm/5pm Dallas CDT), automated via scheduled trigger

## Features Live

- Tiered dependency map with SVG arrows
- Sidebar detail panels (status, blockers, next actions, systems, contacts, links)
- Progress pills (Up next / Recently done / Completed projects)
- Snapshot version bar (last 5 syncs, passkey-protected restore)
- CSA Dashboard tag chips (pain / requests / metrics) with popover detail
- Sync status pill with stale thresholds (warn: 5.5h, crit: 16h)
- Mutual-close behavior: sidebar and progress panel can't both be open
- Quality gate script at `scripts/check.sh`
- Snapshot version bars on csa-dashboard, csa-content-standards, data-t1headlines — weekly auto-snapshot (Mon 8am), passkey `8812`, max 5 per site; trigger `trig_01Qze9PVrNErCEYa1fMXxF2U`

## Project Status Snapshot

| # | Project | Tier | Status | Key Blocker |
|---|---------|------|--------|-------------|
| 1 | Platform Access & Training | 1 | In progress | Snowflake/Sigma ticket pending; Gary API pending |
| 2 | Dashboard Instrumentation | 4 | In progress | Sigma/Marfeel creds; Amplitude blocked (p-tagging) |
| 3 | T1 Headlines Analysis (Price) | 4 | In progress | Tarrow MSN/SmartNews re-exports pending |
| 3.5 | Content Analysis / Narrative Dashboard | 5 | Not started | Needs P3 shared with Sarah Price first |
| 4 | Article Format + Persona + Keyword Governance | 4 | In progress | Awaiting persona texts from Susannah |
| 5 | Personas & Formats Testing | 5 | Not started | Needs P4 + P7 |
| 6 | Content Cluster / Tagging Taxonomy | 3 | Blocked | Alignment meeting not scheduled |
| 7 | Vallone Tracker / CMS Automation | 4 | Blocked | Needs P6 alignment + Snowflake access |
| 8 | Rajiv CSA Mapping | 2 | Not started | Needs GitHub access from Rajiv |
| 9 | PRD Revisions | 3 | Not started | Needs P8 + P13 complete |
| 10 | Gary Tools Integration | 2 | Blocked | Gary API key not delivered |
| 11 | Recipes | 5 | Not started | Needs P9 + P4 |
| 12 | CSA Subs / United Robots Evaluation | HOLD | Hold | Chris + Eric must assess feasibility |
| 13 | System Prompts / Mode 1 & Mode 2 | 2 | Not started | (unblocked) |

## What's Next

1. [ ] **Request GitHub/product access from Rajiv Pant directly** (met at standup 2026-03-30 — unlocks P8)
2. [ ] **Write desired target audiences for National team and test in CSA** (standup action item; coordinate with Oliver Felix on PGS-97)
3. [ ] **Get Amplitude API access** — confirm provisioning path with IT or Chad (which group to join)
4. [ ] Enable Google Sheets API key (P2 — unblocked, do first)
5. [ ] Schedule P6 cluster alignment meeting with Chris + Sara + Susannah (PGS-40 is ON HOLD in Jira pending this)

## Items Not Yet in Any Repo

- Digest Chris's cluster performance sheet (feeds P6 alignment meeting)
- Study content graph doc (feeds P6 + P9)
- Apple News monitoring cadence setup (rq-apple-news-monitoring — separate ops deliverable)
- Content diff tool (PGS-82): UX sprint underway as of 2026-03-30. Marcelo (front-end) + Susannah/Efren (design). Pierce = stakeholder. Not yet a tracked ops-hub project.
- Headline tool + title options (rq-headline-tool, rq-title-options — clarify ownership with Chris)

---

*Tiered Context Architecture. Budget: ≤150 lines.*
*Lines used: ~85*
