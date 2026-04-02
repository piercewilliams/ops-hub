# McClatchy Content Pipeline—End-to-End Vision PRD

**Version:** 0.3 Draft  
**Owner:** Pierce Williams  
**Status:** In Progress—For review with Chris Palo and Sara Vallone  
**Last Updated:** 2026-03-31  
**Due:** 2026-04-03

## Table of Contents

- [Overview](#overview)
- [Ideal End State](#ideal-end-state)
- [The Four Pipelines](#the-four-pipelines)
- [The CSA—Core Platform Vision](#the-csa--core-platform-vision)
- [System Requirements](#system-requirements)
  - [Request Intake & Triage](#request-intake--triage)
  - [Signal & Brief Creation](#signal--brief-creation)
  - [Content Generation](#content-generation)
  - [Quality Enrichment & Verification](#quality-enrichment--verification)
  - [Editorial Review & Approval](#editorial-review--approval)
  - [CMS Delivery & Channel Distribution](#cms-delivery--channel-distribution)
  - [Performance Tracking](#performance-tracking)
  - [Content Graph](#content-graph)
- [Operations Layer—The Control Room](#operations-layer--the-control-room)
- [Open Questions](#open-questions)

---

## Overview

This document maps the ideal end state of McClatchy's AI-assisted content pipeline: from the moment a performance signal identifies a content opportunity, through generation, enrichment, editorial, publishing, and distribution, and back to the performance data that informs the next cycle.

Its purpose is to give the development team a clear, complete picture of the system they're building toward, so that individual features can be evaluated as steps toward a defined goal rather than isolated improvements. For every incremental step or scoped decision the product team brings forward, this document is the goalpost: does it move us closer to the six-month vision?

This document also includes a vision for what the CSA itself ultimately looks like and does—a section that's been absent from prior PRD iterations and is needed to give the dev team a complete picture of the tool at the center of the pipeline.

**This is a pipeline map, not a prioritization document.** Priorities will be determined collaboratively based on economic impact and complexity.

---

## Ideal End State

McClatchy's content pipeline operates as a closed, instrumented loop across four parallel content pipelines:

**Signal in → brief generated → content created → enriched → verified → greenlighted or auto-routed → published → distributed → performance feeds back in → next signal**

**Key properties:**

- **Closed loop.** Performance data from distributed content directly informs what gets generated next. No manual handoffs break the loop.

- **Modular quality gates.** Each pipeline element—citations, keywords, brand/author voice, internal links, SEO metadata, cluster assignment, persona match, format compliance, and perhaps more—has a discrete, verifiable quality gate surfaced as a green check or red flag. The editor's job is to fix what failed, not to retry the check. When a module flags a problem, the editor addresses it in the content; the system re-checks automatically when the content is saved or submitted. This prevents checkbox theater: a module that can be re-run without changing anything will eventually pass on the same flawed content, and the gate means nothing.

- **CPA-driven.** Cost Per Asset is the main pipeline metric. Right now CPA is dominated by human labor costs; as volume scales, compute and storage costs will become the larger factor. Every pipeline improvement should reduce CPA or improve quality and distribution at the same cost.

- **Four parallel pipelines.** The system runs four distinct content pipelines simultaneously, each with its own automation level, editorial profile, channel targets, and CPA characteristics. Scaling the system means scaling all four, not optimizing one. Foundational elements—article format templates, publish to CMS—are required by all four and are therefore the highest-leverage investments. Author profiles apply to T2, T3, and T4; T1 automated content will not carry a named author byline.

- **Automation spectrum.** The four pipelines range from fully automated (United Robots-style, bottom) to most editorially intensive (Discover, top). Human involvement scales with editorial complexity; the highest-volume content requires very limited, targeted per-piece human action. All four run simultaneously; content is routed to the appropriate pipeline at brief creation.

- **Test, learn, apply.** The national/L&E team is the fast test-and-learn environment. Everything we build and validate here is designed to apply to the news department and broader McClatchy groups. Build for us, apply to them.

---

## The Four Pipelines

The pipeline isn't a single workflow; it's four parallel workflows running simultaneously, differentiated by content type, automation level, editorial involvement, and channel target. All four require the same foundational infrastructure (article format templates, keywords, publish to CMS) to function.

### T1—United Robots / Automated

**What it is:** Fully automated inbound and outbound content. The United Robots pipeline brings in automated wire-style content; this tier is also where outbound content that requires little or no per-piece human judgment lives. Content flows like a ticker.

**Human role:** None per piece. Humans define the rules, templates, and thresholds; the system executes. Exception handling routes to an operator queue, not an inbox.

**Channel targets:** TBD based on UR partnership scope.

**Key characteristic:** Volume and velocity. CPA at this tier is dominated by compute cost, not labor. The economics are fundamentally different from every other tier.

---

### T2—App-Based / Platform

**What it is:** Content generated by the CSA and sent directly to app-based distribution partners—Smart News, Newsbreak, and equivalents—without going through McClatchy's CMS and without requiring publication on a McClatchy property first. This is an architectural advantage: because these platforms don't require a McClatchy publish first, content goes CSA → channel, bypassing CMS entirely.

**Human role:** Minimal. Configuration-level oversight. Because McClatchy's editorial reputation is not at stake in the same way (no byline on the McClatchy site, no CMS publish step), there's more room to test and adapt quickly.

**Channel targets:** Smart News, Newsbreak; potentially others with similar no-site-publish requirements.

**Key characteristic:** The CSA-to-channel direct path. No CMS step. This tier is where the most aggressive automation testing happens. Author mana is less of a constraint here; content may not carry a named byline.

---

### T3—API / Canonical ("Repackaging")

**What it is:** A single high-touch canonical asset—a white paper, a guide, a definitive reference piece (e.g., a retirement guide, a home-buying explainer)—is created with significant editorial investment. From that canonical, 8–10 format variants are derived (explainer, listicle, FAQ, etc.). Each variant is then adapted for location-specific markets (Miami, Kansas City, Sacramento, etc.), producing potentially 45 or more primary assets from one canonical. Those primary assets can then be versioned further for distribution partners.

**Human role:** High at the canonical creation stage; increasingly automated for format variants and location adaptations. The pipeline is bimodal: editorial-intensive at the top of the funnel, mechanical downstream.

**Channel targets:** O&O sites (Discover), distribution partners, syndication.

**Key characteristic:** Volume from systematic derivation. One carefully crafted canonical generates a large asset tree. The economics improve dramatically with each derivation layer. Author mana is a real constraint here; 18+ versions under one author's name isn't sustainable, and this pipeline requires a strategy for author attribution at scale.

---

### T4—Discover

**What it is:** A trending or newsworthy story is discovered, evaluated, and adapted for the optimal channel with factual corrections, stylistic adjustments, and persona-appropriate framing. This is the most editorially intensive pipeline—the "batting average" workflow Sara's team runs daily. One story becomes up to ~5 channel-optimized versions. The content is more newsy, more time-sensitive, and requires the most human judgment about angle, framing, and persona.

**Human role:** Most editorial of any tier. An editor identifies the story, validates the brief, reviews the generated output, approves the enrichment report element by element, and selects the headline variant. The editor is in the loop throughout.

**Channel targets:** Discover (primary), Apple News, Smart News, MSN; channel selection is a per-piece editorial decision.

**Key characteristic:** Editorial judgment at every stage. This is where the CSA's focus accuracy matters most (the keyword feature is expected to address current focus issues). Author profile quality will have the most impact here; once author profiles are working correctly, this is where Sara's team stands to gain the most time back.

---

## The CSA—Core Platform Vision

*Note: This section reflects Pierce's synthesis and will require validation from Sara Vallone, who has ground-level insight into what the ideal functional state looks like for writers and editors. Her feedback is a key input to this section.*

The CSA (Content Scaling Agent) in its ideal form isn't a writing tool that editors use manually; it's the operational core of McClatchy's content production platform. Every pipeline phase touches it. It sits above the CMSs, below the editorial layer, and at the center of the signal-to-distribution loop.

### What the CSA does (ideal state)

**Operates from continuous, multi-horizon performance intelligence.** Every operational decision—what to brief, which pipeline, which formats and personas, which topic areas need coverage—is grounded in near-term signals (what is performing right now), medium-term signals (what is building audience over weeks), and long-term signals (which content types, subject categories, personas, and formats consistently pull the right audiences over months). A reactive pipeline responds to what just went out. This pipeline operates from all three horizons simultaneously. All the capabilities below exist in service of that principle.

**Accepts structured briefs.** The CSA receives a fully-specified brief: keywords, target persona, article format template, outlet parameters, distribution channel, pipeline tier, and cluster assignment (if applicable). The brief is either auto-generated from the signal layer (T1/T2) or editor-validated (T3/T4). Without a complete brief, generation doesn't start.

**Generates focused, format-compliant content.** Given a complete brief, the CSA generates an article that is on-topic (the keyword field determines whether the article is about Alan Richson the person or the movie about him), format-compliant (against the article format template for the given type and outlet), and persona-matched.

**Decouples the headline from the article body.** The headline is a separately generated, separately tracked, separately selectable element. It's not embedded in the article; it's a parallel output with multiple variants. Each variant is tracked for performance attribution. The editor selects from the variants or writes a new one. The headline that goes to each channel is recorded.

**Applies author profiles (T2/T3/T4).** Author profiles (voice training based on a writer's existing body of work, blended with publication-level brand guidelines) are applied at generation time—not retrofitted by a human editor. When it works correctly, the editor isn't correcting voice—they're confirming it. This is the single biggest per-piece time-saver for Sara's team.

**Routes through quality gates.** After generation, output passes through a modular quality verification layer. Each gate (citation check, brand-fit, internal links, meta optimization, content structure, format compliance) runs automatically and produces a green check or red flag. The result is a structured enrichment report, not a monolithic pass/fail.

**Surfaces to editors as a structured package (T3/T4).** The editor doesn't open a raw draft. They open a package: article draft + enrichment report + headline variants + brief metadata for confirmation. Sign-off is element-by-element. The editor confirms what passed; they address what failed. High-confidence pieces can be greenlighted in seconds.

**Routes directly to channel (T1/T2).** For automated tiers, the CSA output goes directly to the channel; for T2, this means Smart News or Newsbreak without a CMS step. No human in the loop per piece.

**Publishes to Cue (or WordPress).** For T3/T4, approved content is pushed directly into the appropriate CMS without manual entry. The editor approves; Cue or WordPress receives it. Publish-to-Cue is one of the two most urgent pipeline capabilities; without it, the time savings from generation are absorbed by manual CMS entry.

**Tracks every output.** Every generated asset is assigned a canonical ID at brief creation. All derivatives, variants, and versions are linked to it. The data layer captures the full lineage for performance attribution.

**Surfaces performance intelligence continuously.** The multi-horizon view isn't a report operators pull on demand; it's always present and always informing what happens next.

### What it means for writers and editors

*[Sara Vallone input needed—this subsection is a placeholder.]*

The ideal state is that Sara's team spends their time on editorial judgment—deciding what to cover, validating angles, selecting from prepared options—and not on reformatting, rephrasing for voice, manually entering content into CMS, or generating variations by hand. The system handles the repeatable work; the editor handles what requires human judgment.

---

## System Requirements

*What the ideal end state looks like for each capability area, along with the priors required and a relative CPA impact signal. This isn't a sequenced roadmap; implementation order is determined collaboratively based on economic impact and complexity.*

---

### Request Intake & Triage

**Ideal state:** All inbound content requests—from sales, marketing, editorial stakeholders, or external partners—enter a single intake queue regardless of origination channel (email, Slack, verbal, form). Each request is captured with requester, content type, priority, and deadline at intake. Requests are triaged against pipeline capacity and strategic fit before assignment; accepted requests are converted into briefs and routed to the appropriate pipeline tier. The queue is visible in the Operations Layer; request status isn't tracked separately. Fulfilled requests are linked to the generated assets for accountability and downstream performance attribution.

**Priors:** Operations Layer (intake queue surfaces in the control room); agreed SLA thresholds by request type and content tier; brief schema (so accepted requests convert to well-formed briefs rather than vague handoffs).

**CPA impact: Medium.** Request coordination overhead is currently fragmented across email, Slack, and Airtable—each handoff is invisible to the pipeline and adds latency. Unified intake reduces per-request coordination cost and enables load-balancing that improves throughput without headcount increases.

---

### Signal & Brief Creation

**Ideal state:** A unified signal layer continuously aggregates performance data from all active distribution channels. For T1/T2, it auto-populates brief parameters and triggers generation without human initiation. For T3/T4, it surfaces suggested parameters that an editor validates and launches. Every brief is fully specified before generation begins: keywords, target persona, article format template, outlet parameters, distribution channel, pipeline tier, cluster assignment, and headline direction. Headline is a separately specified parameter—not an afterthought. Subject category and cluster assignment happen at brief creation, not retroactively at publish. For T3, the brief includes the full downstream derivation plan (format variants × markets) so the asset tree is defined upfront, not improvised.

**Priors:** Article format templates (required before any brief can be auto-populated meaningfully); content taxonomy (agreed subject category system and cluster/sibling ID format); author profile library (T2/T3/T4); signal layer architecture decision.

**CPA impact: High.** Auto-brief generation at T1/T2 removes per-piece human labor from origination entirely; reducing manual brief-building time at T3/T4 directly reduces per-piece cost.

---

### Content Generation

**Ideal state:** The CSA generates content from a complete brief. T1 and T2 generation is fully automated with no human initiation or monitoring per piece. T3 and T4 involve editorial validation but generation itself is automated. Across T2, T3, and T4, author profiles are applied at generation time—not retrofitted post-generation. Multiple headline variants are generated as a parallel output alongside the article body; the signal-optimal variant is pre-selected. For T3, the canonical-to-derivative pipeline generates format variants (explainer, listicle, FAQ, etc.) and location-specific versions systematically from the approved canonical, with author mana managed at the canonical level so derivatives can carry alternate attribution. Focus accuracy—the article being about what the brief specifies—is enforced through keyword parameters. Generation failures at T1/T2 route to an exception queue, not a human inbox.

**Priors:** Signal & Brief Creation layer; article format templates (the single highest-leverage foundational investment; without them none of the four pipelines can scale); author profile library (T2/T3/T4).

**CPA impact: High.** The core labor-reduction mechanism across all four pipelines.

---

### Quality Enrichment & Verification

**Ideal state:** After generation, every piece passes through a modular verification and enrichment layer. Each module runs automatically and returns a machine-readable pass/fail/flag result. For T1/T2, gate results drive automated routing; pieces that pass proceed, pieces that fail a hard gate route to an exception queue. For T3/T4, results surface as a structured enrichment report in the editorial interface.

**Modules:**

1. **Citation and fact validation:** verifies claims and external links against credible sources. Deterministic; flagged items require human verification.
2. **Brand-fit audit:** aligns output to publication voice and guidelines; for multi-site syndication applies tiered guidelines (national + per-publication local). Probabilistic; AI judgment acceptable with human override.
3. **Internal link suggestions:** recommends links based on content relevance; requires McClatchy content library indexed in a vector database.
4. **Meta optimization:** generates SEO title and meta description for the target channel. Probabilistic.
5. **Content structure audit:** validates heading hierarchy, skimmability, and compliance against the article format template.
6. **Format compliance check:** confirms output matches the specified format template. Hard gate; a format failure isn't a suggestion.

**Gary Tools integration.** Gary Kirwan's external claims validation tool provides an enhanced verification layer for Module 1. When it flags an issue, the editor can correct it or override it (overrides are rare and treated as a signal of miscalibration, not editorial preference). The integration tracks corrections and overrides by article, author, and content type; overrides generate a report routed to Sara Vallone, Pierce Williams, and Chris Palo. Source trustworthiness—which sources the tool checks against—is a managed list that Pierce owns and updates over time. *Integration is pending Gary's API key and endpoint documentation.*

**Priors:** Content generation layer; enrichment and verification API; McClatchy content library indexed; brand guidelines stored and versioned; standard enrichment report schema consumed identically by the editorial interface and the automated routing layer.

**CPA impact: High (T1/T2):** removes human review entirely for automated tiers. **Medium (T3/T4):** reduces editorial time per piece; editor acts on a structured report rather than evaluating a raw draft holistically.

---

### Editorial Review & Approval

*Applies to T3 and T4 only. T1/T2 have no per-piece editorial review; verification gate results determine routing automatically.*

**Ideal state:** The editor receives a structured package: article draft, enrichment report with per-module results, headline variants with the signal-optimal pre-selected, and brief metadata for confirmation. Sign-off is element-by-element: the editor approves what passed and addresses what failed. Clean enrichment reports at high signal confidence can be greenlighted in seconds. For T3, routing logic determines whether a piece goes to confirm-only status or requires targeted fixes. For T4, the editor is a collaborator—they may substantially revise the draft; the enrichment report informs rather than gates.

**Priors:** Quality enrichment layer; editorial interface built with element-by-element sign-off UI; auto-greenlight thresholds defined.

**CPA impact: Medium.** Accelerates T3/T4 editorial work but can't eliminate the human-in-the-loop requirement at these tiers.

---

### CMS Delivery & Channel Distribution

**Ideal state:** For T3/T4, approved content is pushed directly into Cue or WordPress with all metadata pre-populated: format template, cluster ID, subject category, persona, distribution channels, selected headline variant, author attribution, pipeline tier. The editor reviews the staged item and publishes; they don't manually enter the article. Publish-to-Cue is the second most urgent pipeline capability after article format templates; without it, the time saved in generation is absorbed by manual CMS entry. For T2, content dispatches directly to the channel adapter without a CMS step—the defining architectural advantage of T2. For T1, content dispatches directly to configured channels. All publish and dispatch events are written to the data layer linked to the canonical ID. Channel-specific formatting is applied by adapters; two-tier brand guidelines (national + per-publication) apply for multi-site syndication.

**Priors:** Pipeline data layer (sits above both CMSs, handles routing and metadata write); CMS API access for Cue and WordPress; T2 channel adapter; metadata schema completion (requires content taxonomy); channel-specific format adapters; two-tier brand guidelines decision.

**CPA impact: High.** Manual CMS entry is one of the largest remaining per-piece labor costs at T3/T4.

---

### Performance Tracking

**Ideal state:** Performance data from all active channels flows automatically into a unified data layer, which surfaces: CPA per asset (labor and compute costs tracked separately so the crossover point is visible as T1/T2 volume scales); content velocity by pipeline and channel; performance by pattern across all three time horizons; headline variant performance by channel and content type; and author profile performance (T2/T3/T4) feeding voice model refinement. Top-performing patterns feed back into the signal layer automatically. Pipeline stages are machine-readable states with defined transitions; every stage transition is a capturable event.

**Priors:** CMS delivery and distribution layers instrumented; Amplitude/Sigma integration; agreed CPA formula; pipeline stage state machine defined.

**CPA impact: Medium.** The tracking infrastructure itself doesn't reduce CPA, but it's what makes the Operations Layer possible, and the Operations Layer is what makes optimization decisions data-driven rather than intuitive.

---

### Content Graph

*Implementation status: deferred per Chris Palo's guidance; we're not driving this, but McClatchy must be at the table when the dev team builds it. The ideal state below is our position for that conversation.*

Without the Content Graph, performance data answers the question: "how is our content doing?" With it, the question becomes: "when we produce a listicle variant from a home-buying canonical targeting Midwest markets on Apple News, how does it perform versus the explainer variant from the same canonical—and does that pattern hold across subject categories?" The difference between those two questions is the difference between aggregate reporting and actionable intelligence. The Content Graph is the data infrastructure that makes variant-level attribution possible.

**The canonical ID as spine.** Every content asset is assigned a canonical ID at brief creation—not at generation, not at publish, but at the moment the brief is specified. This is the critical architectural decision: the canonical ID is the session key that binds all outputs from a single brief across their entire lifecycle. Everything else hangs from it. A canonical ID assigned at publish is already too late; the production history that happened before publish is lost.

**The lineage model.** A single T3 brief might produce: one canonical → 8–10 format variants → each adapted to 45+ markets = 360–450+ primary assets, each potentially producing multiple headline variants per channel. The Content Graph tracks every node and every relationship. For T4, a single brief produces up to five channel-optimized siblings; the graph records which headline went to which channel and how each performed. The relationship types that must be defined: format variant, location version, editorial revision, headline variant, distribution version. These aren't interchangeable; a format variant is a different kind of derivative than a location adaptation.

**What gets versioned.** Every state transition in the production chain is a distinct version:

1. Generation output: the first draft from the brief
2. Enriched draft: post-quality modules, pre-editorial
3. Editorial revision: the approved version after editorial sign-off
4. Published: first published state, with full metadata captured
5. Post-publish edits: corrections, updates, and any re-distribution events

**What the Content Graph enables.** Three things that aren't achievable without it:

- *Variant-level performance attribution:* which format, persona, headline, and channel combination produced the best outcome for a given content type; this is what makes T3 derivation planning data-driven rather than intuitive
- *Author mana tracking:* across all derivatives of a canonical and across the current publishing period, how many times has a given author's name been used; without the graph, it isn't trackable at scale
- *Sibling group performance* (feeds directly into the Operations Layer): how are the variants from a given cluster performing relative to each other; which won, and on what dimensions

**McClatchy's position when at the table.** The asks are specific:

- Canonical IDs assigned at brief creation, not at publish
- All variants linked to canonical with typed relationship definitions
- Performance attributed per variant, per headline, per channel—not aggregated to the canonical level
- Full versioning schema capturing every state transition from generation through post-publish
- Query API so the Operations Layer can pull Content Graph data without bespoke engineering on each request

**Trigger for prioritization.** Publish-to-Cue and the performance tracking data layer must be live and generating meaningful attribution data before the Content Graph's value justifies the infrastructure investment. The cluster ID at brief creation—already in scope under Signal & Brief Creation—is the prerequisite that must be in place first.

**CPA impact: Low** near-term; **High** long-term. Variant-level attribution is what makes precision optimization of the T3 derivation pipeline possible at scale, and T3 at scale is one of the highest-volume, lowest-marginal-cost pipelines in the system.

---

## Operations Layer—The Control Room

The Operations Layer is the control room: a unified, real-time dashboard covering the entire pipeline's state, health, and performance. It surfaces both the operational (what needs attention now) and the strategic (are we building the right things and are they working).

Every panel exists to support a specific decision. Near-term decisions use real-time data. Medium-term decisions use weekly patterns. Strategic decisions use monthly trends. The dashboard holds all three simultaneously so operators are never reacting only to what just went out.

*Requires the Performance Tracking data layer to be fully instrumented. Panels are described here as an ideal-state spec.*

---

### Pipeline State View

Every piece of content in the system has a defined machine-readable stage: **Brief → Generating → Verifying → Review → Staged → Dispatched → Live.** Stage transitions are events in the data layer, not editorial categories. The Pipeline State View surfaces the full queue across all four pipelines simultaneously.

**What operators see:**
- Volume in each stage, by pipeline and channel, in real time
- Time-in-stage per piece; alerts for content stuck beyond per-tier thresholds (T3/T4 editorial review has different acceptable latency than T1/T2 automated verification)
- Exception queue status for T1/T2: volume, failure types, time in queue; operators manage stage health, not individual pieces; an unusual exception queue spike signals an upstream problem, not just unlucky individual articles
- Author mana warnings: when a given author's name approaches the overuse threshold across a cluster's derivatives

**Operator actions available:** re-route (change pipeline tier), escalate to senior editorial, flag for manual review, approve bypass (with reason logged), re-generate (T3/T4 only).

---

### Gate Status

Aggregate enrichment report intelligence. Not "did this piece pass" but "what is failing, on what content types, at what rate, and what does that imply?"

**What operators see:**
- Pass/fail rates by gate type and pipeline, trending over time
- Deterministic vs. probabilistic failure breakdown, never aggregated; they require different responses. Citation failures (deterministic) signal content quality degradation; persistent brand-fit failures (probabilistic) signal threshold miscalibration, not bad content; format compliance failures (hard gate) signal a content or template problem.

---

### Distribution View

What's gone out, to where, and how it's performing: the retrospective and the active in one view.

**What operators see:**
- Content published and dispatched in the last 24h/7d, by channel and pipeline
- Channel coverage gaps as active alerts—a channel that hasn't received content within expected cadence surfaces immediately, not just as a historical gap
- Near-term performance at 24h/48h/7d by channel and content type; this feeds directly into the Signal Feed
- **Sibling group performance:** for any cluster, how are the variants performing relative to each other? Which format and channel combination is winning, and by how much? This is the direct input to T3 canonical planning: "every time we produce a listicle variant from a home-buying canonical, it outperforms the explainer on Apple News by 2x" is a T3 investment decision, not just an interesting observation

---

### CPA Tracker

Cost Per Asset is what the entire pipeline optimizes for; the CPA Tracker makes that optimization visible and attributable over time.

**What operators see:**
- Current CPA across the pipeline, trending over time; this is the top-of-dashboard number
- CPA broken into labor and compute components. Labor costs: time in brief creation, editorial review, CMS entry (Publish-to-Cue is the single biggest lever on this line item; when it ships, the CMS entry labor component drops to near zero for T3/T4). Compute costs: generation, enrichment modules, storage, distribution. Both tracked so the crossover point is visible as T1/T2 volume scales.
- **CPA by pipeline:** T1's CPA should decrease monotonically as volume increases (fixed overhead amortized over more pieces, marginal compute cost). T3's CPA should decrease as the canonical-to-derivative pipeline matures (higher investment at canonical creation, lower cost per derivative). T4's CPA is relatively fixed by editorial intensity; the lever is throughput, not automation.
- CPA by format, subject category, and persona: where is the system most and least efficient, and why?
- The **labor cost waterfall**: as each pipeline capability comes online, the labor component of CPA should produce a visible step-down. Article format templates, author profiles, Publish-to-Cue, keyword field—each is a measurable reduction. The tracker makes the before/after legible and justifies continued investment.

---

### Topic Coverage Map

Coverage of subject areas relative to what signal demand actually looks like—not a static content inventory, but a live alignment check.

**What operators see:**
- Which subject areas have recent content at which pipeline tiers; which are undercovered
- **Coverage vs. signal alignment:** the system is producing X% of content in a given topic area, but Y% of signal demand is there; misalignment in either direction (over-covered and underperforming, or signal demand outpacing coverage) surfaces as a flag
- Performance density by subject area: some areas may be well-covered but producing poor engagement—that's a quality, persona, or format mismatch signal, not a coverage gap; these require different responses
- Recommended brief inputs derived from coverage gaps, fed to the Signal Feed

---

### Author Profile Performance

How author profiles are performing across tiers and channels. Applies to T2, T3, and T4.

**What operators see:**
- Engagement outcomes by author profile, segmented by pipeline, format, channel, and subject category: which profiles are working for which combinations
- **Author mana status:** usage tracking across the current period, both within a given cluster's derivatives and across canonicals; it's the operational input to author attribution decisions at brief creation; operators should never be guessing how much mana remains
- Profile refinement signals: profiles that consistently underperform against similar content from other profiles are flagged as candidates for voice model refinement
- For T3 at scale: which author attribution strategy (named author vs. alternate attribution vs. no byline) is producing the best outcomes per channel and content type

---

### Strategic Pipeline Elements

The accountability view. This is how the content team holds the dev team to the six-month pipeline vision. Strategic features are tracked here, separately from bugs and routine backlog items; bugs don't consume strategic roadmap bandwidth.

**What operators see:**
- Current status of each foundational pipeline element—article format templates, author profiles (T2/T3/T4), Publish-to-Cue, keyword input field, headline variant generation, performance tracking integration, Gary Tools integration, Content Graph—against the ideal end state defined in this document
- **CPA impact tier for each element** (High/Medium/Low, derived from the System Requirements section): this is the prioritization vocabulary for conversations with the dev team
- Which pipelines are blocked or degraded without each element—makes the dependency cost of delay legible
- Completion trend: are strategic elements moving, stalling, or regressing?

---

### Signal Feed

The live intelligence stream. The Signal Feed is what makes the Operations Layer more than a reporting tool; it's where past performance becomes forward action.

**What operators see:**

- **Near-term signals:** what's performing right now, by channel and format; feeds T4 brief creation directly
- **Medium-term signals:** what is building audience and engagement over the past 2–4 weeks; informs T3 canonical planning and persona prioritization for the next cycle
- **Long-term signals:** which subject categories, formats, and persona combinations consistently produce the best outcomes over 60–90 days; these are the structural patterns that should shape pipeline investment decisions, not reactive adjustments to last week's numbers
- **Pipeline health alerts:** CPA spike, gate failure rate above threshold, topic undercoverage, author mana approaching limit, channel coverage gap; each alert surfaces with the specific data behind it, not just a flag
- **Recommended brief inputs:** the system synthesizes signal data into concrete starting points for T3/T4 editors; not raw data to interpret, but draft brief parameters derived from what's working across all three time horizons

---

## Open Questions

These are the decisions that will most significantly shape implementation.

1. **Content taxonomy and cluster ID system.** Two related but distinct questions: (a) What is the agreed subject category taxonomy—the set of topic/subject areas articles get assigned to for coverage tracking and performance segmentation? Who owns it? (b) What is the agreed cluster ID format—the identifier that links sibling variant articles generated from the same brief? Both must be resolved before Signal & Brief Creation, CMS Delivery, and Performance Tracking can be instrumented.

2. **CPA formula.** Agreed definition of Cost Per Asset—what counts as cost? Labor time only, or also compute and storage? What is the revenue or engagement proxy when direct attribution isn't available? (Chris confirmed CPA measurement has started; the formula needs to be codified.)

3. **Two-tier brand guidelines.** How does national vs. per-publication application work for multi-site syndication? What is the conflict resolution mechanism?

4. **Editorial interface design.** Is element-by-element sign-off a product team deliverable or an editorial workflow design? Who owns the spec, and who builds it?

5. **Control room ownership.** Is the Operations Layer a net-new tool or an extension of the CSA interface? Who on the dev team owns it?

6. **Auto-greenlight thresholds.** What criteria—enrichment gate scores, signal confidence level, format compliance—qualify a T3 piece for confirm-only status? Who sets and adjusts these thresholds?

7. **T1 scope.** What exactly is the United Robots-replacement automated stream? What content types, channels, and volume? What does "fully automated" mean within McClatchy's editorial standards?

8. **T3 author attribution at scale.** How is author mana managed when one canonical generates 45+ derivatives? What are the rules for author attribution on downstream assets?

9. **T4 workflow design.** What does ideal human-AI co-authorship look like operationally for Sara's team? What is the ideal state for writers and editors working with the CSA? *(Sara Vallone input needed.)*

10. **Content Graph timing.** What milestone triggers this becoming a priority?
