# Keyword Threshold Definition Session
**Date:** TBD next week
**Attendees:** Pierce Williams, Rocky Rhodes, Sarah Price, Chris Palo
**Status:** Invite sent 2026-04-15. Rocky + Sarah confirmed via Slack. Chris free whenever (per Sarah).

---

## Purpose
Define the Go Hard / Test Small / Skip decision criteria that will govern the data-keywords tool — so thresholds reflect editorial and commercial judgment, not Pierce's solo call. Secondary: confirm SEMrush endpoint credit costs and finalize per-publication analysis direction. These decisions unlock the tool's next version and any automation work.

## Prep for Pierce
- Review current data-keywords prototype: what does a "Go Hard" look like today? What's the implicit logic?
- Review Sara's feedback: "expansive not prescriptive" — don't foreclose decisions, surface options
- Review Rocky's credit model: current understanding is ~10 units/line live, ~50 units/line historical; Rocky liaising with rep Julio for endpoint-level rates
- Have confirmed next verticals ready (sleep/recovery, HSAs — Chris/Sara priorities)
- Read data-keywords/REFERENCE.md § Stakeholder Feedback before the meeting

## Agenda

### 1. Threshold definition (Pierce + Rocky + Sarah + Chris)
- What KD ceiling separates "too competitive" from "winnable"? Does it vary by publication?
- What volume floor is meaningful? Does it vary by vertical (financial services CPC vs. entertainment volume)?
- What makes something Test Small vs. Go Hard — is it purely KD+volume, or does domain authority / brand fit factor in?
- Sara's framing: scoring should surface options, not foreclose them — how do we encode that philosophy into threshold logic?
- Chris's framing: per-publication analysis (each pub in its own ecosystem) — does this mean different thresholds per site?

### 2. SEMrush credit economics (Rocky)
- Endpoint-level credit costs: live data vs. historical — exact numbers from Julio
- What query types does the tool currently use? Which endpoints are cheapest for batch runs?
- Any automation-limiting constraints Pierce should know before building any scheduled pulls?

### 3. Per-publication direction (Chris + Pierce)
- Confirm: future analyses break out per publication rather than portfolio-wide
- What does Rocky's data infrastructure currently support? Can we get per-domain output from SEMrush?
- What does this mean for Rocky's next gap analysis pulls (Sleep, Creature features)?

### 4. Next verticals + timing (Rocky)
- Sleep/recovery confirmed (Sara V priority, also Chris HSA framing)
- Any other confirmed next pulls?
- Rocky's DataForSEO evaluation: cheaper alternative for batch — worth testing?

## Desired Outcomes
- [ ] Threshold criteria documented: KD ceiling, volume floor, decision logic for Go Hard / Test Small / Skip
- [ ] Whether thresholds are per-publication or portfolio-wide — decided
- [ ] SEMrush endpoint credit cost per query type confirmed → unblock automation decision
- [ ] DataForSEO: evaluate or skip for now
- [ ] Next verticals timing and structure confirmed with Rocky
- [ ] Chris's per-publication direction reflected in Rocky's next pull design
