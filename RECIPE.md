# The Recipe System — Reference

**The goal:** A predictive, purpose-driven content production system where the optimal configuration of creator × format × topic × market is determined by data signal, producing a predictable return against a defined purpose (acquisition, revenue, engagement).

Source: Chris Palo directives across 2026-03 and 2026-04 sessions; Gemini transcript 2026-04-10.

---

## The Four Dimensions

```
Creator × Format × Topic × Market → Predictable Return
```

| Dimension | What it determines | Current data source | Future state |
|---|---|---|---|
| **Creator** | Author persona; who writes it and what they're inclined toward | Author selection (manual) | Inclination Engine — sole automated signal input (Chris Palo, 2026-04-10) |
| **Format / Pipeline** | High / medium / low touch; article, infographic, video, licensed partner content; cost per asset | CSA pipeline type | CSA suggests optimal pipeline + cost per asset automatically |
| **Topic** | Which cluster to build; search demand; difficulty; monetization profile by vertical | data-keywords (forward-looking) + data-headlines (backward-looking) | Same, but layered with Snowflake ECPM by cluster |
| **Market** | Which O&O site or distribution channel; ECPM varies significantly by market | Sigma/Snowflake (manual pull) | Married to creator × topic to predict return before committing |

---

## Return — Purpose-Defined per Pipeline

Return is not one thing. Each pipeline has a defined purpose, and the metric is dynamic:

| Purpose | Metric | Context |
|---|---|---|
| **Acquisition** | Unique visitors, page views | O&O content acquiring new audience; also content driving clickthroughs to Trend Hunter app |
| **Revenue** | ECPM × page views | O&O programmatic; ECPM varies by market and cluster |
| **Engagement** | SubPVs, scroll depth, time on page | Subscriber retention; subs content depth |

A single piece of content can have a **primary** purpose (one distribution channel) and a **secondary** purpose (augmentation to another). The OKR for a pipeline may differ from the OKR for individual assets within it.

---

## Key Numbers

| Item | Value | Source |
|---|---|---|
| Asset cost | ~$85 per asset — approximation Chris used for a specific Miami/KC analysis; not a universal constant | Chris Palo, 2026-04-10 |
| Breakeven | ~6,156 page views — derived from that same approximation (asset cost ÷ avg eCPM); recalculate per pipeline/market | Chris Palo, 2026-04-10 |
| Below breakeven | Asset did not pay for itself | The logic is the point, not the specific number |
| ECPM | Varies meaningfully by market and cluster — pull actual values from Sigma for any real calculation | Chris Palo, 2026-04-10 |

---

## The Cluster — Precise Definition

> A **cluster** is a canonical article + its analytically-determined variants. The analytics signal predicts which configuration (which canonical, which variants, which features) is optimized for a given objective in a given context (creator × topic × market × purpose).

**Critical:** The cluster is *predictive*, not descriptive. It is not synonymous with "topic," "vertical," or "keyword group." The cluster is the *output* of signal — the result of deciding what to build and how to configure it. Keyword research tells you whether a cluster is worth building. The cluster definition comes after.

**Cluster ID = Canonical ID.** Siblings (variants) are linked by canonical article ID. They are siblings, not parent/child. (Confirmed: Chris Palo, Sara Vallone, Susannah Locke, 2026-03-31.)

---

## Data Repos and Their Role in the Recipe

| Repo | Dimension served | What it answers |
|---|---|---|
| `data-keywords` | **Topic** | Should we build a cluster here? What's the search demand, difficulty, and CPC by vertical? |
| `data-headlines` | **Topic** (backward-looking) | When we have written in this space, what formats and angles have won? |
| Snowflake / Sigma | **Market** | What's the ECPM for this cluster on each O&O site? What's the breakeven page view count? |
| Inclination Engine | **Creator + Topic** | What trends are signaling right now? (Future: automated sole input for signal pipeline) |
| CSA (Content Service Architecture) | **Format** | Which pipeline type (high/medium/low touch) fits this content? What's the cost per asset? |

---

## Distribution Channels

| Channel | Revenue model | Notes |
|---|---|---|
| O&O sites (Miami Herald, Kansas City Star, Sacramento Bee, etc.) | Programmatic ECPM | Primary; ECPM varies meaningfully by market |
| Trend Hunter app | Subscription / engagement | Core asset goes here; acquisition content on O&O drives clickthroughs |
| Syndication | Revenue share | Separate model; currently most visible in data due to data access |
| TBTV | TBD | Future channel; Chris referenced 2026-04-10; no further spec yet |

---

## Vertical Signal Profiles (from data-keywords)

Different verticals have fundamentally different return profiles, which determines which Recipe lever matters most:

| Vertical | Volume profile | CPC profile | Primary purpose |
|---|---|---|---|
| Entertainment | 1M–2M+/mo per cluster | $0.70–$0.90 | Acquisition — traffic play |
| Financial services | 500–3K/mo per cluster | $4–$30+ | Revenue — high value per visitor |
| Food / recipes | 60K–435K/mo per cluster | $0.10–$0.19 | Display at scale — volume compensates for low CPC |
| Health / wellness | High volume, high KD | Moderate | Often a Skip — medical authority sites dominate |

The CPC signal is a proxy for ECPM at the topic/vertical layer, before site-level eCPM data is layered in from Snowflake.

---

## Current vs. Future State

**Current (2026):** Humans select topic, creator, format, and market. Analytics are post-hoc — we learn what worked after publishing. The Recipe dimensions are configured manually based on experience and available signal.

**Near-term:** data-keywords provides topic signal before cluster commitment. data-headlines provides backward-looking format signal. Snowflake ECPM layered in to project return by market.

**Future state (Chris's vision):** Inclination Engine inputs trend signals → CSA suggests optimal pipeline + cost per asset → brief arrives at creator → content producers never have to pitch. The Recipe is fully configured by analytics.

---

## The Two Inputs Chris Named for SEO / Keyword Layer

1. **Rocky Rhodes (SEMrush)** — bespoke keyword pulls for specific topics; can run gap analysis for Tier 1 sites and US Weekly; useful for site-level layering ("Miami does well on these keywords, layer that in every day").
2. **data-keywords (Pierce, direct)** — vertical-level keyword intelligence; topic signal before cluster commitment; article-level output with monetization profile. Built to become the standard; enterprise-handoff target.

These are parallel inputs, not competing. Rocky handles site-specific gap data; data-keywords handles vertical-level opportunity signal.
