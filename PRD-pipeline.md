# McClatchy Content Pipeline — End-to-End Vision PRD

**Version:** 0.3 Draft  
**Owner:** Pierce Williams  
**Status:** In Progress — For review with Chris Palo and Sara Vallone  
**Last Updated:** 2026-03-31  
**Due:** 2026-04-03

---

## Table of Contents

- [Overview](#overview)
- [Ideal End State](#ideal-end-state)
- [The Four Pipelines](#the-four-pipelines)
- [The CSA — Core Platform Vision](#the-csa--core-platform-vision)
- [Phase 1 — Performance Signal & Origination](#phase-1--performance-signal--origination)
- [Phase 2 — Content Brief & Research](#phase-2--content-brief--research)
- [Phase 3 — Content Generation](#phase-3--content-generation)
- [Phase 4 — Quality Enrichment & Verification](#phase-4--quality-enrichment--verification)
- [Phase 5 — Editorial Review & Approval](#phase-5--editorial-review--approval)
- [Phase 6 — CMS Handoff, Queue & Publishing](#phase-6--cms-handoff-queue--publishing)
- [Phase 7 — Distribution](#phase-7--distribution)
- [Phase 8 — Performance Tracking & Feedback Loop](#phase-8--performance-tracking--feedback-loop)
- [Phase 9 — Operations Layer (Control Room)](#phase-9--operations-layer-control-room)
- [Phase 10 — Content Graph (Asset Lineage & Versioning)](#phase-10--content-graph-asset-lineage--versioning)
- [Open Questions](#open-questions)
- [Appendix: Active Projects by Phase](#appendix-active-projects-by-phase)

---

## Overview

This document maps the ideal end state of McClatchy's AI-assisted content pipeline — from the moment a performance signal identifies a content opportunity, through generation, enrichment, editorial, publishing, and distribution, and back to the performance data that informs the next cycle.

Its purpose is to give the development team a clear, complete picture of the system they are building toward, so that individual features can be evaluated as steps toward a defined goal rather than isolated improvements. For every incremental step or scoped decision the product team brings forward, this document is the goalpost: does it move us closer to the six-month vision?

This document also includes a vision for what the CSA itself ultimately looks like and does — a section that has been absent from prior PRD iterations and is needed to give the dev team a complete picture of the tool at the center of the pipeline.

**This is a pipeline map, not a prioritization document.** Priorities will be determined collaboratively based on economic impact and complexity.

---

## Ideal End State

McClatchy's content pipeline operates as a closed, instrumented loop across four parallel content pipelines:

**Signal in → brief generated → content created → enriched → verified → greenlighted or auto-routed → published → distributed → performance feeds back in → next signal**

**Key properties:**

- **Closed loop.** Performance data from distributed content directly informs what gets generated next. No manual handoffs break the loop.

- **Modular quality gates.** Each pipeline element — citations, brand voice, internal links, SEO metadata, cluster assignment, persona match, format compliance — has a discrete, verifiable quality gate surfaced as a green check or red flag. Editors act on the report; they do not re-run the modules manually.

- **CPA-driven.** Cost Per Asset is the primary pipeline metric. Right now CPA is dominated by human labor costs; as volume scales, compute and storage costs will become the larger factor. Every pipeline improvement should reduce CPA or improve quality and distribution at the same cost.

- **Four parallel pipelines.** The system runs four distinct content pipelines simultaneously, each with its own automation level, editorial profile, channel targets, and CPA characteristics. Scaling the system means scaling all four, not optimizing one. Foundational elements — article format templates, author profiles, publish to Cue/CMS — are required by all four and are therefore the highest-leverage investments.

- **Automation spectrum.** The four pipelines range from fully automated (United Robots-style, bottom) to most editorially intensive (Discover, top). Human involvement scales with editorial complexity; the highest-volume content requires no per-piece human action. All four run simultaneously; content is routed to the appropriate pipeline at brief creation.

- **Test, learn, apply.** The national/L&E team is the fast test-and-learn environment. Everything we build and validate here is designed to apply to the news department and broader McClatchy groups. Build for us, apply to them.

---

## The Four Pipelines

The pipeline is not a single workflow — it is four parallel workflows running simultaneously, differentiated by content type, automation level, editorial involvement, and channel target. All four require the same foundational infrastructure (article format templates, author profiles, publish to Cue/CMS) to function.

### T1 — United Robots / Automated

**What it is:** Fully automated inbound and outbound content. The United Robots pipeline brings in automated wire-style content; this tier is also where outbound content that requires no per-piece human judgment lives. Content flows like a ticker.

**Human role:** None per piece. Humans define the rules, templates, and thresholds; the system executes. Exception handling routes to an operator queue, not an inbox.

**Channel targets:** TBD based on UR partnership scope.

**Key characteristic:** Volume and velocity. CPA at this tier is dominated by compute cost, not labor. The economics are fundamentally different from every other tier.

---

### T2 — App-Based / Platform

**What it is:** Content generated by the CSA and sent directly to app-based distribution partners — Smart News, Newsbreak, and equivalents — without going through McClatchy's CMS and without requiring publication on a McClatchy property first. This is a distinct and significant architectural advantage: because these platforms don't require a McClatchy publish first, the content can go CSA → channel, bypassing the CMS entirely and enabling a much faster, lower-friction pipeline.

**Human role:** Minimal. Configuration-level oversight. Because McClatchy's editorial reputation is not at stake in the same way (no byline on the McClatchy site, no CMS publish step), there is more room to test and adapt quickly.

**Channel targets:** Smart News, Newsbreak; potentially others with similar no-site-publish requirements.

**Key characteristic:** The CSA-to-channel direct path. No CMS step. This tier is where the most aggressive automation testing happens. Author mana (the constraint on how many times a given author's name can be used across generated versions) is less of a limiting factor here because content may not carry a named byline.

---

### T3 — API / Canonical ("Repackaging")

**What it is:** A single high-touch canonical asset — a white paper, a guide, a definitive reference piece (e.g., a retirement guide, a home-buying explainer) — is created with significant editorial investment. From that canonical, 8–10 format variants are derived (explainer, listicle, FAQ, etc.). Each variant is then adapted for location-specific markets (Miami, Kansas City, Sacramento, etc.), producing potentially 45 or more primary assets from one canonical. Those primary assets can then be versioned further for distribution partners.

**Human role:** High at the canonical creation stage; increasingly automated for format variants and location adaptations. The pipeline is bimodal: editorial-intensive at the top of the funnel, mechanical downstream.

**Channel targets:** O&O sites (Discover), distribution partners, syndication.

**Key characteristic:** Volume from systematic derivation. One carefully crafted canonical generates a large asset tree. The economics improve dramatically with each derivation layer. Author mana is a real constraint here — versioning the same content 18+ times under one author's name is not sustainable; this pipeline requires a strategy for author attribution at scale.

---

### T4 — Discover

**What it is:** A trending or newsworthy story is discovered, evaluated, and adapted for the optimal channel with factual corrections, stylistic adjustments, and persona-appropriate framing. This is the most editorially intensive pipeline — the "batting average" workflow Sara's team runs daily. One story becomes up to ~5 channel-optimized versions. The content is more newsy, more time-sensitive, and requires the most human judgment about angle, framing, and persona.

**Human role:** Most editorial of any tier. An editor identifies the story, validates the brief, reviews the generated output, approves the enrichment report element by element, and selects the headline variant. The editor is in the loop throughout.

**Channel targets:** Discover (primary), Apple News, Smart News, MSN — channel selection is a per-piece editorial decision.

**Key characteristic:** Editorial judgment at every stage. This is where the CSA's focus accuracy matters most (the keyword feature is expected to address current focus issues). Author persona quality has the most impact here — Sara's team sees the biggest time savings when author profiles are working correctly.

---

## The CSA — Core Platform Vision

*Note: This section reflects Pierce's synthesis and will require validation from Sara Vallone, who has ground-level insight into what the ideal functional state looks like for writers and editors. Her feedback is a key input to this section.*

The CSA (Content Scaling Agent) in its ideal form is not a writing tool that editors use manually — it is the operational core of McClatchy's content production platform. Every pipeline phase touches it. It sits above the CMSs, below the editorial layer, and at the center of the signal-to-distribution loop.

### What the CSA does (ideal state)

**Accepts structured briefs.** The CSA receives a fully-specified brief: keywords, target persona, article format template, outlet parameters, distribution channel, pipeline tier, cluster assignment. The brief is either auto-generated from the signal layer (T1/T2) or filled in by an editor (T3/T4). Without a complete brief, generation does not start.

**Generates focused, format-compliant content.** Given a complete brief, the CSA generates an article that is on-topic (the keyword feature is the primary mechanism for keeping focus accurate — this is what determines whether the article is about Alan Richson the person vs. the movie about him), format-compliant (against the article format template for the given type and outlet), and persona-matched.

**Decouples the headline from the article body.** The headline is a separately generated, separately tracked, separately selectable element. It is not embedded in the article — it is a parallel output with multiple variants. Each variant is tracked for performance attribution. The editor selects from the variants or writes a new one. The headline that goes to each channel is recorded.

**Applies author profiles.** Author profiles (voice training based on a writer's existing body of work, blended with publication-level brand guidelines) are applied at generation time — not retrofitted by a human editor. This is the feature Chris identified as the single biggest time-saver for Sara's team. When it works correctly, the editor is not correcting voice — they are confirming it.

**Routes through quality gates.** After generation, the output is passed through a modular quality verification layer. Each gate (citation check, brand-fit, internal links, meta optimization, content structure, format compliance) runs automatically and produces a green check or red flag. The result is a structured enrichment report, not a monolithic pass/fail.

**Surfaces to editors as a structured package (T3/T4).** The editor does not open a raw draft. They open a package: article draft + enrichment report + headline variants + brief metadata for confirmation. Sign-off is element-by-element. The editor confirms what passed; they address what failed. High-confidence pieces can be greenlighted in seconds.

**Routes directly to channel (T1/T2).** For automated tiers, the CSA output goes directly to the channel — for T2, this means Smart News or Newsbreak without a CMS step. No human in the loop per piece.

**Publishes to Cue (or WordPress).** For T3/T4, approved content is pushed directly into the appropriate CMS without manual entry. The editor approves; Cue or WordPress receives it. Publish to Cue is one of the two most urgent pipeline capabilities — without it, the time savings from generation are absorbed by manual CMS entry.

**Tracks every output.** Every generated asset is assigned a canonical ID at brief creation. All derivatives, variants, and versions are linked to it. The data layer captures the full lineage for performance attribution.

### What it means for writers and editors

*[Sara Vallone input needed — this subsection is a placeholder.]*

The ideal state is that Sara's team spends their time on editorial judgment — deciding what to cover, validating angles, selecting from prepared options — and not on reformatting, rephrasing for voice, manually entering content into CMS, or generating variations by hand. The system handles the repeatable work; the editor handles what requires human judgment.

---

## Phase 1 — Performance Signal & Origination

**What this phase does:** Identifies what content to create, for which pipeline and channel, based on what is performing across distribution and where coverage gaps exist.

### Ideal State

- Performance data from all active distribution channels flows continuously into a unified signal layer.
- The signal layer surfaces top-performing content patterns — formulas, topics, persona combinations, cluster coverage gaps — and routes them to the appropriate pipeline tier.
- For T1 and T2, signal data directly triggers brief generation without human initiation.
- For T3 and T4, signal data surfaces as suggested briefs that a human validates and launches.
- Cluster performance data continuously informs which clusters need coverage and at which tier.
- Signal latency is minimized: the system responds to trending patterns in near-real-time, not on a monthly manual cycle.

### What's Needed

- A unified signal layer that aggregates performance data from all distribution channels — not channel-by-channel siloed analysis.
- Automated pipeline from distribution platform exports to the signal layer, eliminating manual data pulls.
- Cluster performance integration: the signal layer reads cluster coverage state and surfaces gaps.
- Tier-routing logic: rules that determine which signal patterns belong in which pipeline.
- Real-time or near-real-time performance data, replacing monthly manual analysis cadence.

---

## Phase 2 — Content Brief & Research

**What this phase does:** Defines all parameters for a piece of content before generation begins — what to write, for whom, in what format, with what keywords, assigned to which cluster, routed to which pipeline.

### Ideal State

- For T1 and T2, brief parameters are populated entirely from the signal layer and pipeline configuration. No human input required to launch.
- For T3 and T4, the Research Draft interface pre-populates suggested parameters from the signal layer. A human validates, adjusts, and launches.
- Every brief specifies the complete parameter set before generation starts:

| Parameter | T1/T2 | T3/T4 |
|-----------|-------|-------|
| Keywords | Auto-populated from signal | Validated/adjusted by editor |
| Article format template | Auto-assigned from pipeline config | Selected by editor |
| Outlet parameters | Auto-assigned | Selected by editor |
| Target persona / author profile | Auto-assigned | Validated by editor |
| Distribution channel(s) | Auto-assigned from pipeline config | Selected by editor |
| Headline direction | Auto-generated | Specified or reviewed by editor |
| Cluster ID | Auto-assigned | Validated by editor |
| Pipeline tier | Auto-routed | Confirmed by editor |

- **Headline is treated as a separately specified element from brief creation**, not as an afterthought appended to a completed article.
- Cluster assignment happens here — proactively, at brief creation — not retroactively at publish.
- For T3 (canonical): the brief for the canonical asset includes the full downstream derivation plan — which format variants and which markets — so the asset tree is defined upfront, not improvised.

### What's Needed

- Article format templates: machine-readable specs defining structure, word count ranges, required elements, and outlet parameters per article type. **This is the highest-leverage foundational element — without templates, none of the four pipelines can scale.**
- Persona and author profile library: authored and maintained set of persona definitions and author voice profiles, keyed to distribution channels. The keyword feature (currently in code review) is the near-term mechanism for improving brief focus accuracy.
- Cluster taxonomy alignment: agreed ID format, full field set, and entry point — confirmed across content and product teams before anything is built. This unblocks the entire cluster chain.
- Headline decoupling: headline specified as a separate, trackable parameter in the brief, not embedded in the article body.
- Brief automation layer for T1/T2: signal layer → brief parameters, with pipeline routing logic.
- T3 canonical planning: the brief creation flow for the API/Canonical pipeline needs to support defining the full derivation tree (format variants × location variants) at the outset.

---

## Phase 3 — Content Generation

**What this phase does:** The CSA generates content from the brief. Generation behavior, output structure, and quality bar differ by pipeline.

### Ideal State

**T1 — Automated:** Content generated fully automatically from brief parameters. Output conforms to a strict, pre-validated format template. No human initiates or monitors individual pieces. Generation failures route to an exception queue.

**T2 — App-Based:** Content generated automatically from a complete brief. Output goes directly to the channel adapter for T2 distribution — there is no CMS step. A lightweight format compliance check runs before dispatch.

**T3 — API/Canonical:** The canonical asset is generated with high investment in brief quality and iterative refinement. Once the canonical is approved, the CSA generates format variants (explainer, listicle, FAQ, etc.) and location-specific versions systematically from the canonical. The derivation pipeline is automated; the canonical creation is editorial. Author mana is managed at the canonical level — derivatives can carry alternate attribution or different author profiles to avoid exhausting a single author's usage limit.

**T4 — Discover:** The CSA generates a complete, channel-optimized draft from the brief. Focus accuracy (driven by keyword parameters) is critical here — the article should be about the subject specified, not a tangentially related topic. The output is structured for downstream enrichment and editorial review.

**Across all pipelines:**
- Multiple headline variants are generated as a parallel output. The signal-optimal variant is pre-selected; the editor selects from the set or writes a new one.
- Output conforms to the article format template for the given type and outlet.
- Author profile is applied at generation time, not retrofitted by an editor.
- Output is structured for downstream quality verification without manual reformatting.

### What's Needed

- Article format templates in machine-readable form: structure, word count ranges, required elements, headline format, outlet-specific parameters.
- Author profile integration at generation time: profiles applied from the brief, not selected post-generation.
- Headline variant generation: multiple variants produced as a parallel output alongside the article body.
- T3 canonical-to-derivative pipeline: systematic generation of format variants and location versions from an approved canonical, with author mana management.
- Exception queue design for T1/T2: what happens when generation fails or output falls below the quality threshold?
- Focus accuracy mechanism: keyword parameters passed to the CSA must reliably constrain the article's subject. (Keywords feature in code review is the near-term fix.)

---

## Phase 4 — Quality Enrichment & Verification

**What this phase does:** Post-generation, pre-distribution verification and enrichment layer. Each pipeline element is checked independently and produces a discrete green/red result. At T1/T2, results drive automated routing. At T3/T4, results surface in the editorial interface as an enrichment report.

### Ideal State

Each module runs automatically on generation output and produces a machine-readable result — pass, fail, or flagged — that is either acted on automatically (T1/T2) or surfaced to the editor (T3/T4).

**Verification and enrichment modules:**

1. **Citation and fact validation** — verifies claims and external links are accurate and sourced from credible references. Prioritizes Tier 1 sources (journals, encyclopedias, major news). Flags unsupported claims. Deterministic — human must verify flagged items.

2. **Brand-fit audit and polish** — aligns output to publication voice and guidelines. For multi-site syndication, applies tiered guidelines: national standard plus per-publication local. Probabilistic — AI judgment acceptable with human override.

3. **Internal link suggestions** — recommends internal links based on content relevance and topical authority. Prevents orphaned pages. Requires McClatchy content library indexed in a vector database.

4. **Meta optimization** — generates SEO title and meta description optimized for the target distribution channel. Probabilistic.

5. **Content structure audit** — validates heading hierarchy, skimmability, and compliance against the article format template.

6. **Format compliance check** — confirms the output matches the specified article format template (word count, required sections, outlet parameters). Hard gate — a format failure is not a suggestion.

**Automation by pipeline:**
- T1/T2: All modules run automatically. Pieces that fail a hard gate route to the exception queue. Pieces that pass all gates proceed to distribution.
- T3/T4: All modules run automatically. Results surface as the enrichment report in the editorial interface. The editor addresses flags; they do not re-run modules.

**Key principle (from Chris):** Deterministic elements — factual claims, external links — require human verification. Probabilistic elements — voice match, keyword scoring, link relevance — are suitable for AI judgment with human override. The system distinguishes between these and surfaces them accordingly.

### What's Needed

- Enrichment and verification API: a modular service that accepts article content plus brief parameters and returns per-module results in a standard schema.
- McClatchy content library indexed for internal link suggestions.
- McClatchy brand guide stored and versioned in the enrichment system.
- Two-tier brand guidelines: national and per-publication local guidelines agreed, stored, and applicable before brand-fit modules can run on syndicated content.
- Standard enrichment report schema: consumed identically by the editorial interface (T3/T4) and the automated routing layer (T1/T2).
- Author voice library: trained profiles for target authors, maintained and versioned.

---

## Phase 5 — Editorial Review & Approval

**What this phase does:** Human editorial validation of the enriched content package. Applies to T3 and T4 only. The editor's role is to confirm and route, not to rewrite.

### Ideal State

**T1/T2:** No editorial review. Verification gate results determine routing automatically.

**T3/T4:** The editor receives a structured package — not a raw draft:

- Article draft (generated and enriched)
- Enrichment report: per-module results, each with a green check or red flag and specific issue descriptions
- Headline variants: the signal-optimal variant pre-selected; editor selects or writes a new one
- Brief metadata for confirmation: cluster, persona, distribution channel, article type, format template applied

**Sign-off is element-by-element, not holistic.** The editor approves what passed; they address what failed. A clean enrichment report at high signal confidence = the editor confirms rather than reviews. High-confidence pieces can be greenlighted in seconds.

**Routing:**
- Clean report + high signal confidence → auto-greenlight queue; editor confirms
- Specific flags → targeted fix; the piece returns for a specific correction, not a full rewrite
- Low signal confidence or format non-compliance → full T3/T4 review

**T4 differs:** The editor is a collaborator, not a reviewer. They may substantially revise the AI-generated draft. The enrichment report still runs; the editorial process is a working session, not a sign-off sequence.

### What's Needed

- Editorial interface: element-by-element sign-off UI. The editor sees the enrichment report alongside the draft — not the raw draft alone. Each element has an explicit approve/flag interaction.
- Auto-greenlight threshold definition: what criteria — enrichment gate scores, signal confidence, format compliance — qualify a T3 piece for confirm-only status?
- T4 collaboration workflow: how does a human author work with a CSA-generated draft? What is the hand-off and revision protocol?

---

## Phase 6 — CMS Handoff, Queue & Publishing

**What this phase does:** Approved content is delivered to the appropriate destination — CMS for T3/T4, channel adapter for T2, automated dispatch for T1 — with all metadata populated and queued for publish.

### Ideal State

**T1 — Automated:** Content is dispatched directly to configured channels without any CMS step.

**T2 — App-Based:** Content goes from the CSA directly to the channel adapter — Smart News, Newsbreak, etc. — without touching McClatchy's CMS and without requiring publication on a McClatchy property. This is the defining architectural characteristic of T2: the CMS is not in the path.

**T3 and T4 — Publish to Cue (or WordPress):** The pipeline pushes approved content directly into the appropriate CMS with all metadata fields pre-populated. The editor does not manually enter the article — they review the staged item in Cue or WordPress and publish. **Publish to Cue is one of the two most urgent pipeline capabilities.** Without it, the time saved in generation is spent in manual CMS entry.

At CMS delivery, all metadata is written automatically:
- Article format template applied
- Cluster ID and subject
- Persona / target audience
- Distribution channel(s)
- Selected headline variant
- Author attribution
- Pipeline tier

All publish events — timestamp, channel, tier, headline variant used, author — are captured in the data layer, linked to the canonical article ID for performance attribution.

Manual tracking sheets are retired; the data layer replaces them.

### What's Needed

- Publish-to-queue: the ability for the CSA (or pipeline data layer) to push approved T3/T4 content directly into the CMS publish queue without manual entry. This is the second most urgent pipeline capability after article format templates.
- Pipeline data layer: sits above both CMSs (Cue and WordPress), handles routing, metadata write, and delivery.
- T2 channel adapter: a routing layer that sends CSA output directly to app-based platform APIs without a CMS step.
- Metadata schema completion: cluster ID, persona, article type, distribution channel fields agreed and mapped to CMS fields — requires cluster taxonomy from Phase 2.
- Publish event capture: all events written to the data layer for attribution.

---

## Phase 7 — Distribution

**What this phase does:** Content is distributed to the appropriate channels for its pipeline. Channel-specific formatting is applied automatically. Distribution metadata is captured for the performance loop.

### Ideal State

Distribution is triggered automatically at publish or dispatch. Each piece's brief metadata (pipeline, cluster, persona, format, channel) determines how it is routed and formatted.

**T1:** Content flows continuously to configured channels. High volume, no per-piece action.

**T2:** Content dispatched from CSA to Smart News, Newsbreak, and equivalent platforms via direct API. No McClatchy site publish required. Channel-specific format applied by the adapter.

**T3 (canonical derivations):** Primary assets (format variants × location versions) distributed to O&O sites and syndication partners. The canonical and each derivative carry independent distribution records.

**T4 (Discover):** Distributed to Discover (primary) and configured platform channels after editorial approval. Channel selection is a per-piece editorial decision. Two-tier brand guidelines applied for multi-site syndication.

**Across all pipelines:** Distribution metadata — channel, headline variant used, publish timestamp, pipeline tier — is written back to the article record in the data layer. This is what enables Phase 8 to close the loop.

### What's Needed

- Channel-specific format adapters: each active channel (Discover, Apple News, Smart News, Newsbreak, MSN, T1 stream) has a format adapter that transforms output to channel spec.
- Distribution routing logic: rules mapping pipeline + cluster + persona + format → channel set.
- Two-tier brand guidelines decision for syndication: national vs. per-publication application, conflict resolution mechanism.
- T2 direct-dispatch adapter: CSA output → platform API, no CMS intermediary.
- Distribution event capture: all distribution events written back to the article record.

---

## Phase 8 — Performance Tracking & Feedback Loop

**What this phase does:** Distributed content performance flows back into the origination layer, closing the loop and making the system smarter over time.

### Ideal State

- Performance data from all active distribution channels flows automatically into a unified data layer.
- The data layer surfaces:
  - **CPA per asset:** total labor + compute cost per published asset, trending over time, segmented by pipeline / format / cluster / persona. Right now CPA is dominated by human labor costs; as volume scales, compute and storage costs will grow relative to labor. The pipeline should be instrumented to track both, so the crossover point is visible.
  - **Content velocity:** articles produced and published per day/week, by pipeline and channel
  - **Performance by pattern:** which formulas, topics, personas, and clusters are driving engagement by channel
  - **Headline variant performance:** which variant outperformed per channel and content type
  - **Author profile performance:** which profiles are producing better outcomes, feeding voice model refinement
- Performance data feeds directly back into Phase 1: top-performing patterns surface as new brief inputs automatically, not via manual analysis.
- Cluster performance drives Phase 2 coverage recommendations: undercovered or underperforming clusters surface as targets.
- Author voice models are refined based on which profiles produce better outcomes — not just which profiles match existing writing.

### What's Needed

- Unified data layer: all channel performance data (Discover, Apple News, Smart News, Newsbreak, MSN, T1 stream) flows into a single queryable store.
- Article-level attribution: each published article linked back to its canonical ID, pipeline, cluster, persona, headline variant, and author profile.
- CPA instrumentation: agreed formula tracking labor time in pipeline + compute cost, attributed per article. CPA needs to be reportable both with and without overhead allocation.
- Performance → signal connection: data layer feeds Phase 1 automatically.
- Cluster and persona performance segmentation: performance queryable by cluster and persona, not just article.
- Performance tracking integration (Amplitude / Sigma): the CSA should send performance events to the tracking layer. This is an element Chris identified as non-negotiable in the PRD — it must be in the plan even if it's not yet built.
- Author voice feedback loop: performance data informs voice model refinement at the author profile level.

---

## Phase 9 — Operations Layer (Control Room)

**What this phase does:** A unified, real-time operations dashboard giving the content team visibility into the entire pipeline across all four workflows — queue depth, gate status, velocity, distribution, CPA, cluster coverage, and strategic element progress — in one view.

This is the "control room" vision and the primary deliverable of the Operations Layer section of the current PRD. The dev team cannot build toward this effectively without a clear picture of what it should do — which is what this document exists to provide.

### Ideal State

A single operations dashboard surfaces the full pipeline state:

**Queue View**
- Content at each stage across all four pipelines: Brief → Generating → Verifying → Review → Queue → Distributing → Live
- Time-in-stage per piece; alerts for content stuck beyond threshold
- Operator actions: re-route, escalate, flag, send back, approve bypass, change pipeline

**Gate Status**
- Quality gate pass/fail rates by gate type and pipeline
- Current failure reasons surfaced from enrichment reports
- Exception queue status for T1/T2

**Distribution View**
- Content published in the last 24h/7d, by channel and pipeline
- Channel coverage gaps
- Performance at 24h/7d/30d by channel and content type

**CPA Tracker**
- Current Cost Per Asset across the pipeline
- CPA trend over time — tracking the crossover point when compute costs begin to exceed labor costs
- CPA by pipeline, format, cluster, persona — where is the system most and least efficient?

**Cluster Coverage Map**
- Which clusters have recent content; which are undercovered relative to signal
- Coverage vs. signal alignment: is the pipeline producing content in the right clusters?

**Strategic Pipeline Elements**
- Tracking of strategic feature elements separately from bugs. New feature enhancements that are projected to generate more revenue move to the front of the queue. Bug fixes are tracked separately and do not consume strategic roadmap bandwidth.
- Current status of each pipeline element (templates, author profiles, publish-to-queue, headline decoupling, SEO integration, backend versioning, performance tracking, Gary integration) against the six-month vision

**Signal Feed**
- Top-performing patterns right now
- Suggested brief inputs for T3/T4 review
- Pipeline alerts: CPA spike, gate failure rate above threshold, cluster undercoverage

### What's Needed

- Phase 8 must be instrumented before the control room can surface meaningful data.
- Pipeline stages must be machine-readable states with defined transitions — not editorial categories. Every stage transition is an event in the data layer.
- Strategic element tracking: a clear separation in the system between strategic pipeline features (tracked in this PRD) and bugs (tracked separately in the backlog).
- Architecture decision: is the control room a net-new application or an extension of the existing CSA interface? Who owns it on the dev team?
- Alert threshold definitions: what is "stuck"? What is an unacceptable gate failure rate? What constitutes a CPA spike?

---

## Phase 10 — Content Graph (Asset Lineage & Versioning)

**What this phase does:** Tracks the full lineage of every content asset — from brief to canonical to all versioned derivatives — and links performance data back to each variant.

**Priority status: Deferred.** Per Chris Palo's guidance, the Content Graph is not a near-term priority. If the dev team wants to build it, McClatchy should be at the table — but we are not driving it. The Operations Layer (Phase 9) comes first.

### Ideal State

- Every piece of content has a canonical ID assigned at brief creation. All derivatives — format variants, location adaptations, syndicated versions, headline alternatives, editorial revisions — are linked to that canonical record.
- Performance is tracked by variant: which headline won on which channel, which location version outperformed, which format drove the most engagement.
- The full production chain is versioned: generation output → enriched draft → editorial revision → published → post-publish edits.
- The Content Graph feeds the Operations Layer: operators can see which variants are winning and which pipeline is producing the best return per asset.

### What's Needed

- Architecture decision: where does the Content Graph live?
- Canonical ID system: agreed format, assigned at brief creation, persistent through all pipeline stages.
- Versioning schema: what constitutes a new "version"?
- Milestone definition: what triggers this becoming a priority?

---

## Open Questions

These are the decisions that will most significantly shape implementation.

1. **Cluster taxonomy.** What is the agreed cluster ID format and full field set? Who owns the taxonomy? Must be resolved before Phases 2, 6, and 8 can be instrumented.

2. **CPA formula.** Agreed definition of Cost Per Asset — what counts as cost? Labor time only, or also compute and storage? What is the revenue or engagement proxy when direct attribution isn't available? (Chris confirmed CPA measurement has started; the formula needs to be codified.)

3. **Two-tier brand guidelines.** How does national vs. per-publication application work for multi-site syndication? What is the conflict resolution mechanism?

4. **Editorial interface design.** Is element-by-element sign-off a product team deliverable or an editorial workflow design? Who owns the spec, and who builds it?

5. **Control room ownership.** Is the Operations Layer a net-new tool or an extension of the CSA interface? Who on the dev team owns it?

6. **Auto-greenlight thresholds.** What criteria — enrichment gate scores, signal confidence level, format compliance — qualify a T3 piece for confirm-only status? Who sets and adjusts these thresholds?

7. **T1 scope.** What exactly is the United Robots-replacement automated stream? What content types, channels, and volume? What does "fully automated" mean within McClatchy's editorial standards?

8. **T3 author attribution at scale.** How is author mana managed when one canonical generates 45+ derivatives? What are the rules for author attribution on downstream assets?

9. **T4 workflow design.** What does human-AI co-authorship look like operationally for Sara's team? What is the ideal state for writers and editors working with the CSA? *(Sara Vallone input needed.)*

10. **Content Graph timing.** What milestone triggers this becoming a priority?

---

## Appendix: Active Projects by Phase

| Phase | Project | Ticket / Ref | Status | Key Blocker |
|-------|---------|-------------|--------|-------------|
| 1 — Origination | T1 Headlines Analysis | P3 | In progress | Full Tarrow data pending; Sarah Price feedback pending |
| 1 — Origination | Cluster performance automation | — | Not started | Requires Phase 2 taxonomy + Phase 8 tracking |
| 2 — Brief | Keywords field (focus accuracy) | PGS-104 | Code review | — |
| 2 — Brief | Audience definitions / persona fetch | PGS-97 | In progress | Pierce must write definitions; Oliver Felix building fetch |
| 2 — Brief | Cluster / Taxonomy alignment | P6 | Blocked | Alignment meeting not scheduled |
| 2 — Brief | Persona + author profile standards | P4 (partial) | In progress | Sara Vallone persona drafts pending |
| 3 — Generation | Article format templates | — | In progress | Dev team has been building toward this; Chris identified as #1 foundational need |
| 3 — Generation | Headline variant generation | — | In progress | — |
| 3 — Generation | Author profile integration at generation | P10 (Gary) | Blocked | Gary API key pending |
| 4 — Enrichment | Enrichment / verification API | P10 (Gary) | Blocked | Gary API key pending |
| 5 — Editorial | Editorial sign-off interface | — | Not scoped | — |
| 6 — CMS | Publish-to-queue | — | In progress | Chris identified as #2 foundational need; dev team aware |
| 6 — CMS | T2 direct-dispatch adapter | — | Not scoped | Requires T2 pipeline architecture decision |
| 6 — CMS | Pipeline data layer + publish event capture | P2 (partial) | In progress | Platform access + attribution fix needed |
| 7 — Distribution | T1 / UR-replacement pipeline | P12 | In progress | Scope and working group not yet defined |
| 7 — Distribution | Two-tier brand guidelines | — | In discussion | Requires enrichment API scoping |
| 8 — Tracking | Performance tracking integration | P2 | In progress | Platform access pending; Amplitude p-tag fix needed |
| 8 — Tracking | CPA instrumentation | — | Not started | Formula definition needed |
| 9 — Ops Layer | Operations dashboard | PRD V3 Pt 2 | Not started | Requires Phase 8 instrumented first |
| 10 — Content Graph | Content Graph | PRD V3 Pt 1 | Deferred | Not a current priority per Chris |
