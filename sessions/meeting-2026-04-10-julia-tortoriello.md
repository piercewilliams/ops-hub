# Meeting: Julia Tortoriello — El Nuevo Translation Process
**Date:** Thursday 2026-04-10 at 2 PM EST (held as scheduled)
**Contact:** Julia Tortoriello, El Nuevo/Miami
**Status:** DONE

---

## Summary

Discovery meeting to understand El Nuevo's current Spanish translation workflow before scoping CSA instrumentation. Julia was well-prepared and followed through with resources before/after the call.

---

## What Julia Shared

### Toolchain (current state)
- **CMS-integrated Google Translate + GPT-3** (referenced internally as "ChTBD"). GPT-3 is the workhorse — far superior to Google Translate alone and to Elbex (which other segments use).
- Google Translate alone is insufficient for quality journalism.
- Other company segments have migrated to Elbex; El Nuevo stays on GPT-3 because of its Spanish nuance handling.

### Error correction approach
- Julia creates **custom models and temperature-adjusted prompts** within the CMS-integrated GPT-3 to fix recurrent translation errors.
- Persistent example: AI struggles to correctly translate the exclusive term **"ae"** used for Us Weekly — requires explicit prompt instruction.
- Prompts also address Spanish-specific grammar standards: headline capitalization (only first word + proper nouns), quotation punctuation rules.
- CMS prompt Julia provided (6 rules):
  1. Only capitalize the first word and proper nouns in titles/headlines
  2. No period at end of headlines or promo titles
  3. Use Spanish quotation marks: " " (not « » or straight quotes)
  4. Punctuation (commas, periods) after closing quotation mark, unless punctuation belongs to quoted content
  5. Verbs must follow punctuation, not come before it
  6. Do not replace "exclusively" with "en exclusiva" unless the original English clearly refers to exclusive access granted to this outlet

### External specialized model
- Separate standalone GPT: **Us Weekly en Español Translator** (chatgpt.com/g/g-0SsURCxh4-traductor-equipo-en-espanol)
- Acts as a "dog translator" — handles phrases the CMS-integrated system doesn't translate fluently.
- Also used for **Spanish→English reverse translation** for high-profile stories from Argentina/Costa Rica reporters. The CMS has no Spanish-to-English button, so this fills the gap.

### Dialect and register
- US Hispanic audience → standard register similar to **Colombian Spanish** (appropriate for journalistic publications in the US Hispanic market).
- Specifying **"US Hispanic audience, United States location"** to the AI is sufficient to get correct grammar/register — no need for exhaustive dialect-by-dialect instructions.

### Selection and workflow (inferred from discussion)
- Team translates Us Weekly content; Spanish→English is occasional, driven by inbound reporter stories.
- No automated selection algorithm mentioned — editorial judgment implied.

---

## CSA Integration Angle

- Pierce explained the CSA and the plan for stylistically distinct platform variants.
- Chris Palo + Rajiv are considering a **dedicated Spanish CSA pipeline** — this meeting is the baseline for scoping that work.
- Julia offered to:
  - ✅ Share CMS prompt (done — sent in follow-up email)
  - ✅ Share standalone translator GPT link (done — chatgpt.com/g/g-0SsURCxh4)
  - [ ] **Test the CSA in Spanish** and identify adjustments needed

---

## Open Items

- [ ] **Julia to test CSA in Spanish** — she offered; set this up when Spanish pipeline scoping begins
- [ ] **Add Julia as CSA tester** when Spanish variant capability is ready
- [ ] **Save CMS prompt + GPT config** to csa-content-standards or gary-tools context when Spanish pipeline project is created

---

## Resources Received

| Resource | Details |
|----------|---------|
| CMS prompt | 6 Spanish editorial/formatting rules (in Julia's follow-up email) |
| Standalone GPT | chatgpt.com/g/g-0SsURCxh4-traductor-equipo-en-espanol |
| GPT description | "Traduzco artículos de Us Weekly respetando el tono original y las reglas de SEO." |
| GPT instructions (bilingual) | Preserves original tone; no proper name translation; auto-detects language direction; provides synonym/SEO title suggestions |
