# Snowflake Navigation Meeting
**Date:** 2026-04-15, 1:30pm CDT
**Attendees:** Pierce Williams, Chad Bruton, Rocky Rhodes
**Status:** Scheduled

---

## Purpose
Get navigation cues for Snowflake data — understand what author-level and keyword-level data exists, and where. This is not a SQL help session. The goal is to leave knowing: what's available, where to find it, and whether it can support the next phase of headline grader + keyword tool work.

## Prep for Pierce
- Review current P3 author playbooks blocker: Tarrow data thin, Chris prefers Snowflake for author-level analysis
- Review P14 keyword tool: does keyword-to-article mapping already exist in Sigma/Snowflake?
- Review Rocky's role: SEMrush credits, DataForSEO evaluation, next keyword verticals queued (Sleep, Creature features)
- Have the confirmed next verticals list ready to discuss with Rocky

## Agenda

### 1. Snowflake orientation (Chad)
- What tables/views exist for author-level performance data?
- How is content attributed to authors in Snowflake vs. what's in Tarrow?
- Is there enough per-author sample size to support author playbooks? (Chris skeptical of Tarrow — prefers Snowflake)
- Does keyword-to-article mapping data already exist? (Stephanie Zandecki question — fold in if Chad knows)

### 2. SEMrush + DataForSEO strategy (Rocky)
- Credit rates per endpoint — what does each type of query cost? (Required before any automation)
- DataForSEO as alternative: pricing, data quality comparison, right use cases
- Rocky's confirmed next gap analysis pulls: Sleep, Creature features — timing and structure

### 3. Sigma scope (Chad + Rocky)
- Does Sigma already have keyword-to-article data that would save a build?
- What does the CSA Sigma dashboard scope look like from Chad's side?

## Desired Outcomes
- [x] Know what author-level data is available in Snowflake and whether it's actionable for playbooks
- [ ] Know SEMrush credit cost per endpoint → Rocky pinging Julio; pending
- [ ] Decision on DataForSEO: evaluate or skip for now — Rocky's take: Amplitude (via Snowflake) better for multi-channel; DataForSEO useful for organic/rank tracking if needed
- [x] Confirm whether keyword-to-article Sigma data exists — Rocky: no existing CSA Sigma workbook
- [ ] Next verticals timing confirmed with Rocky — financial services confirmed as priority, pub not locked

---

## Outcomes (2026-04-15)

### Snowflake structure confirmed
- Three layers: Raw → Clean → Presentation
- Amplitude = direct connection to Snowflake; its data lives in `Amplitude events prod` table (presentation/amplitude schema)
- Most useful data is in Presentation

### Key tables
| Table | Schema path | Contents |
|-------|-------------|----------|
| `story_traffic_main` | MCC presentation → Tableau reporting | Story ID, event date, page views, visits — by market and date for every story |
| `dynamic_story_metadata` | MCC presentation | Author name (`author_name`), URL, SEO metadata, keywords, taxonomies — join on story ID |
| `Amplitude events prod` | presentation/amplitude | Full Amplitude event data in Snowflake — use this instead of direct Amplitude API |

- Google Search Console data: MCC RAW → Google Search Console schema — Pierce confirmed access at end of meeting
- Dynamic table schema access: granted live by Chad during meeting
- SEO metadata and keywords already in story table — no separate build needed

### Sigma / OAuth2 clarification
Sigma OAuth2 is NOT needed. Sigma is just a reporting UI on top of Snowflake. Connect GitHub directly to Snowflake instead. Chad confirmed this is possible and offered to help set it up (GitHub preferred over Bitbucket — Chad doesn't use Bitbucket).

### Ad yield / eCPM
Not available at article level. Tracked at page level and rolled up by traffic. Chad deferred to Ryan Spalding ("ad expert") for anything yield/eCPM related. Ryan has something built but noted it's imperfect science.

### PTECH-7730
Rocky: it's a PE ticket. Joe Vitali is best contact — may not own it but will know who does.

### No existing CSA Sigma workbook
Rocky was unaware of any. Rocky offered to pitch in on CSA data work going forward.

### SEMrush / Rocky
- Per-publication model confirmed — Rocky will rerun competitor data pull per pub, not aggregated
- Rocky has not heard from Julio on credit rates; pinging again same day
- 250K = Pierce's L&E allocation; Rocky's total pool = 2M/month (overage possible if needed, not standing)
- Rocky's "data for SEO" internal service = organic metadata + keyword rank tracking tool; separate from DataForSEO API

### Action items
- [Pierce] Contact Chad Bruton to set up GitHub → Snowflake direct connection
- [Pierce] Contact Ryan Spalding about ad yield/eCPM data
- [Pierce] Contact Joe Vitali about PTECH-7730 ownership
- [Pierce] Explore story_traffic_main + dynamic_story_metadata — run test queries
- [Rocky] Ping Julio on per-endpoint credit rates
- [Rocky] Rerun competitor data pull per publication (financial services first, pub TBD)
