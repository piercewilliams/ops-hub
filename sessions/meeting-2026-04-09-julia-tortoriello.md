# Meeting: Julia Tortoriello — El Nuevo Spanish Translation Process
**Date:** Wednesday 2026-04-09 at 12:59 PM CDT (~2:00 PM EDT)
**Duration:** ~25 minutes (transcript ends at 00:25:02)
**Participants:** Pierce Williams, Julia Tortoriello (El Nuevo / Miami)
**Gemini transcript source:** `Julia _ Pierce - 2026_04_09 12_59 CDT - Notes by Gemini.pdf`
**Note:** Gemini-generated transcript — contains transcription artifacts. "CH TBD" / "ChTBD" / "JBD" = ChatGPT/GPT-3. "CL" = Claude. "AIS" = AI systems. "trappity" = likely "GPT" or a tool name Julia used before GPT integration. Transcript is editable/computer-generated per Gemini footer.

---

## Context

Pierce connected with Julia based on a reference from Chris Palo, who mentioned that Julia had developed hands-on knowledge of recurrent AI translation errors when moving English content to Spanish — and had built prompt-based solutions around them. The goal of the meeting was to understand what Julia knew before the engineering team attempts to instrument the CSA (Content Scaling Agent) with Spanish translation capability.

---

## Gemini Summary (verbatim from PDF)

> Integration challenges for content scaling with Spanish translation were reviewed, with the team focused on AI tool preferences and error correction methods.

**AI Translation Challenges Identified:**
> The meeting goal was to understand specific content scaling issues and unnatural phrases produced by AI translators when moving English content to Spanish. Discussion focused on common errors and adjustment methods needed, especially when using AI for both translation and new content generation.

**GPT-3 Accuracy Preferred:**
> The team utilizes a combination of tools, including CMS-integrated Google Translate and GPT-3, due to GPT-3's superior accuracy in handling Spanish nuances compared to other solutions like Elbex. Google Translate alone is insufficient for high-quality content production.

**Recurrent Error Correction via Prompts:**
> Recurrent translation errors and stylistic needs are addressed using custom models and temperature-adjusted prompts within the CMS-integrated GPT-3. Specialized prompts are necessary to correctly translate specific exclusive terms and handle differences in Spanish journalistic standards, such as capitalization and punctuation rules.

**Using External and Specialized Translator Models:**
> In addition to the CMS integration, Julia Tortoriello uses an external, specialized model, which they described as a "dog translator" for *Us Weekly en español*, to handle phrases or content pieces that are not translated fluently by the integrated system. This separate translator is also used for translating Spanish content into English, particularly for high-profile stories and exclusive information received from reporters in Spanish-speaking countries like Argentina and Costa Rica, as the CMS currently lacks a button for Spanish-to-English translation.

**Addressing Dialect and Journalistic Standards in Spanish:**
> Julia Tortoriello confirmed that while many Spanish dialects exist, their content for the US Hispanic audience uses a standard akin to Colombian Spanish, which is suitable for journalistic publications in the region. They noted that specifying the audience (US Hispanic) and location (United States) to the AI is sufficient to produce natural-sounding content that adheres to the appropriate standards without needing highly detailed instruction on every nuance.

**Sharing Resources and Future Integration with the CSA:**
> Pierce Williams explained that the engineering team is building a Content Scaling Agent (CSA) to create stylistically different versions of articles for various platforms, and they wish to equip it with Spanish translation capabilities. Julia Tortoriello offered to share the simple prompt used in the CMS and also promised to try to send details of a more complex, specialized translator model that provides more context to the AI, which is currently being migrated. They also offered to test the CSA in Spanish to quickly identify if adjustments are needed.

**Suggested next steps (Gemini-generated):**
- [Julia Tortoriello] Share CMS Prompt: Send the CMS integrated prompt setting used for translation.
- [Julia Tortoriello] Test Scaling Agent: Try the Content Scaling Agent in Spanish; evaluate functionality and required adjustments.
- [Julia Tortoriello] Share Translator Link: Send the link and description for the complex standalone translator model.

---

## Full Verbatim Transcript

### 00:00:00

**Julia Tortoriello:** Hi,
**Pierce Williams:** Hi.
**Julia Tortoriello:** Pierce. Nice to meet
**Pierce Williams:** Hey, you too. Thanks for your time. Uh, I don't have a really strict agenda.
**Julia Tortoriello:** you.
**Pierce Williams:** I don't even know that this takes a full half hour. I just uh your name came up in a session with Chris Paulo about um them potentially wanting to integrate the content scaling agent with translation function. and he had just said that uh in your role kind of moving content from English to Spanish that you uh had come to understand maybe a number of things that just the AI just or the translators just didn't get right uh and that you were constantly trying to adjust to make it more natural. And I just was hoping to get you to talk out loud about what some of those things are uh and how you went about correcting for it.
**Julia Tortoriello:** Yes. Um, we use AI for translation. Um, and we use also AI to generate new content. Um uh what I noticed is um CH TBD so far um at least until the end of last year I I haven't um tried on CL for example or other AIS recently.

### 00:02:52

**Julia Tortoriello:** Um, but in Spanish, um, it's more much more accurate and can easily adjust to to, um, nuances in the language. Um, Spanish is not one as well as English is not one.
**Pierce Williams:** Yeah.
**Julia Tortoriello:** Um and for professional um content in the United States, we use some standards uh and uh and I've been like trying on trapd with the since the beginning I um recapitulating we started with an integration of uh will translate in the CMS and then I got into the company. It wasn't even anyone else developing as weekly and espanol. I started I founded it but it was already integrated because they the idea was there and there and they integrated Google translate and then I came up and um I was already using trappity so I said this is not accurate um the one thing that happened with the Google translate it's now it's more like flexible and learning etc. But until now that it's crazy but it it happens just in two years it was static or pretty estate ecstatic. So um it it was difficult to adjust to what we needed and traivity had it.

### 00:04:51

**Julia Tortoriello:** I know that now there are other al is that um adjust this as well but until now JBD for me is very efficient on that.
**Pierce Williams:** So it's better than it used to
**Julia Tortoriello:** I created I created some models for generating
**Pierce Williams:** be.
**Julia Tortoriello:** content and I also we have like a some some temperature adjusted to the um the GPT that is integrated with the with the CMS. So, we have some prompts that we keep it not as flexible as as any other prompt that that like a conversation. We don't have a conversation each time that we press this button, but we have a we have some PRs that it's pretty static and but with things that we need and with recurrence errors or mistakes that were happening. For example, in English we use exclusively for us weekly. This is the exclusive ae that is the literal translation of that is is wrong in Spanish and this is something that is hard to h to have it done corre correctly. So we have this in the prompt that is just a it's a very like little h thing in a whole language but it seems that it's something and activity.

### 00:06:39

**Pierce Williams:** Well, in this context it comes up all the
**Julia Tortoriello:** Yeah, that cannot um solve it.
**Pierce Williams:** time.
**Julia Tortoriello:** And then there are other things that as not related with the language translation but with the rhythm, some um grammatical um standards that are different in English and Spanish. One of these we could we could solve through the prompt. uh but it's the cap how we use capitals and titles headlines that are is different in English and Spanish and the other one is punctuation in quotes only on quotations that the quotes goes in Spanish inside the phrase and then the dot and or the punctuation and it's very hard for chivity to h do it correctly But most of the time is of the times is really accurate and it's very flexible on the nuances that we need. So we are still using that even though the rest of the
**Pierce Williams:** Okay.
**Julia Tortoriello:** company moved to Elbex and other AIS. Uh we are still using it because it's a it's the most accurate in Spanish from for our knowledge.

### 00:08:08

**Julia Tortoriello:** I wasn't again testing new um or other models recently uh but it's it's still very efficient to
**Pierce Williams:** Yeah. So, you have you have like a uh prompts already like a library of prompts that you use
**Julia Tortoriello:** us.
**Pierce Williams:** to correct the common errors that you see. Would you mind sharing
**Julia Tortoriello:** Yes, we have a prompt that Yeah,
**Pierce Williams:** a
**Julia Tortoriello:** I can send it to you. Erh the one that we have in um the one that we use uh in um the CMS integrated to the CMS but this is very very simple. The other one I I created some models that we use all the time. One of these is a translator and this is this works really really good from English to Spanish and Spanish to English. And I and I'll tell you some examples when I use this that is outside the CMS and it's and like a dog translator h created for for us weekly in espanol and there are some sometimes it happens I don't know why and um and it's not uh previous that sometimes the quotes or the expressions used on the template the first translation when I click translate I can show you uh later how how it works um it's it comes like cranky or not not very fluent or um like natural that it doesn't

### 00:09:53

**Julia Tortoriello:** feels natural the translation we read every translation but the first translation is not human is always from AI. So sometimes it happens. So I I you we use it all the time. We grab a phrase or whatever piece of content from one article in English and we translate in par this parallel um translator. This is one. The other one we don't have bottom to translate from Spanish to English. We don't have this integration yet.
And uh we don't need it. Um we don't need like like this is not urgent for us to have but we translate we use content in you in as weekly from Spanish. not all the time, but we had some big big coverages in um we have the first one was in Argentina when Liam pay like two like almost two years ago and then we had two cases big big cases uh in Costa Rica last year. These um these stories are very very important because we with a with a we work with um a stranger strangers you know with reporters there from Puerto Rico and from Argentina.

### 00:11:32

**Julia Tortoriello:** I am from Argentina and with local people there. So all the information that the exclusive information that we were they were sending to us was in Spanish. Um so these are projects like big projects where we
**Pierce Williams:** Yeah.
**Julia Tortoriello:** need to translate Spanish to English and and we used this model and it was amazing. Obviously the process is the same. After I send the translation I read the translations. I I see that it's accurate etc. and I send it to an editor and the editor obviously edits as as well as we do every day with every single article that we translate. Um, so this this is still very very efficient and uh and all the things I'm like I don't know we we use this translator of the all the time. All the
**Pierce Williams:** So, um,
**Julia Tortoriello:** time.
**Pierce Williams:** the other thing I'm curious about is, so you said like at the beginning where like the Spanish spoken in different places is always different. Uh,
**Julia Tortoriello:** Yes.
**Pierce Williams:** and I'm wondering, so I did some stuff with like Arabic years ago where Arabic uh, like Middle Eastern countries there is like sort of a journalistic standard Arabic regardless.

### 00:12:54

**Julia Tortoriello:** We have that.
**Pierce Williams:** So like there's a Spanish that you're more likely to see in publications.
**Julia Tortoriello:** Yeah.
**Pierce Williams:** So sort of universal
**Julia Tortoriello:** Just to be clear, only here for the US Hispanic because we are set settled here. We use this and then obviously each country has its own standard. I come from Argentina. So in Argentina you speak from in a certain way in the newspaper but that's completely different from what we say here.
**Pierce Williams:** Right.
**Julia Tortoriello:** We don't use the same standard all over America. But for US Hispanic we use mostly
**Pierce Williams:** Okay.
**Julia Tortoriello:** Colombian. It's similar to Colombian Colombian.
**Pierce Williams:** Dialect or use.
**Julia Tortoriello:** Yeah.
**Pierce Williams:** Yeah. Okay. Yeah, those are my big questions. I guess the next thing I
**Julia Tortoriello:** But sorry. But one more thing.
**Pierce Williams:** guess
**Julia Tortoriello:** If you say to AI that you are set in the United States and your audience is the US Hispanic and you you want to have something like that feels natural here and that's um um what else I I can think on things and and this is something that it it will be solved.

### 00:14:15

**Julia Tortoriello:** You don't have to instruct on that. This is something that um it can be solved from the AI for
**Pierce Williams:** Okay. Well, I guess uh for my next conversation with Chris about this,
**Julia Tortoriello:** you.
**Pierce Williams:** maybe it would be helpful anything that you can share me that you have or tools that you use or props that you use so I could just say and describe what we have available to us.
**Julia Tortoriello:** Yes. one one only thing I'm moving um from one chhativity to another chivity I don't have access to the prompt uh but I can check if someone else can can give it to me um they are very in Mlachi they are very focused on me moving everything from the A360 um chatb to the this other one uh that is more protected but
**Pierce Williams:** Yeah.
**Julia Tortoriello:** um I I it happened recently. I cannot access to the to the prompt uh for
**Pierce Williams:** Okay.
**Julia Tortoriello:** the for the translator but but I'll see if I can send you meanwhile I will send you the the setting that we have in the CMS and I I I want to show you in just a

### 00:15:41

**Julia Tortoriello:** So you see and and also you said that this is going to be uh for audio right or
**Pierce Williams:** for audio. No,
**Julia Tortoriello:** not.
**Pierce Williams:** no, it's so the the the so the engineering team, are you familiar with the scaling agent, the CSA that they're building?
**Julia Tortoriello:** Ah,
**Pierce Williams:** So, it's just an AI where we sort of have a draft article and say it was drafted for Smart News, but we also want a version on Google Discover and Apple News and maybe somewhere else in a local newspaper. It will version that document to make come up with variants that are different enough that it won't get flagged as AI or whatever. It just sort of creates stylistically different versions of the same content. Um, and they want to equip this thing with the ability to uh put stuff into our Spanish outlets as well. Um, Chris suggested I meet with you just to sort of understand the wrinkles of doing that sort of automating translation because you seem to have come up with ways around some of the problems already.

### 00:16:46

**Julia Tortoriello:** Yes. And now I know what you you are saying. Um this is something that we discuss in a workshop that we had here in New York, but they told me that it wasn't ready yet for Spanish. But have you tried it in Spanish or
**Pierce Williams:** Uh no, no. So, it's something we're about to take it and then but like when the engineering team gets there if there are big things like
**Julia Tortoriello:** not?
**Pierce Williams:** uh you know dialectic considerations or like this exclusively thing like like just sort of common problems. I don't want them to reinvent the wheel if you already have sort of a catalog of prompt solutions and stuff to sort of address most of the common problems.
**Julia Tortoriello:** H I can try it. I can try it in in Spanish and see what happens. Maybe it's just um Yeah,

### 00:17:44

**Pierce Williams:** Yeah.
**Julia Tortoriello:** to me because it's you very quickly and very
**Pierce Williams:** Yeah.
**Julia Tortoriello:** easily notice when something works and needs some adjustments and when some something doesn't work. It happens to me in Elvex that I created I created the models there but it was it wasn't possible to work there. Um, so, so I can I can help on that.
**Pierce Williams:** Yeah.
**Julia Tortoriello:** I'm happy to help on that and I will show you how it works. And because I guess it won't be very useful for you to just see our prompt. It's very short.
**Pierce Williams:** Oh,
**Julia Tortoriello:** I can share with you like right away,
**Pierce Williams:** okay.
**Julia Tortoriello:** but let me share the screen. I don't know if this one is translated already or not or but okay this story is not translated so I have this story and I go here. This the bottom that we are using um has integrated Google translate and chd. So I click here accept. This is the prompt that I will copy and send it

### 00:19:33

**Pierce Williams:** Oh, okay. Yeah,
**Julia Tortoriello:** to you.
**Pierce Williams:** great.
**Julia Tortoriello:** Um, but it's a very short one, but still I I'm I already copied for you. And then I click accept and we said that we are cloning this article. Why? because all the elements it you will see what happened. We are having a new article. Ah sorry I have to adjust the sharing. No I can do it here. Edit. So we have exactly the same article with all the elements like the picture and everything everything from the original but in Spanish.
**Pierce Williams:** Yeah.
**Julia Tortoriello:** We have we read everything and we check we change the the links to the we have
**Pierce Williams:** Okay. And so with those instructions, you feel like it's get it gets it mostly right most of the
**Julia Tortoriello:** it.
**Pierce Williams:** time.
**Julia Tortoriello:** It's yeah it's like I would say I noticed you are not seeing the new article right
**Pierce Williams:** Right. Yeah.
**Julia Tortoriello:** because sorry let me check.

### 00:21:07

**Pierce Williams:** But I wouldn't be able to read it anyway. I believe
**Julia Tortoriello:** Yeah is you see here when it says Natasha
**Pierce Williams:** you.
**Julia Tortoriello:** here up here. Let me see if I can uh stop sharing.
**Pierce Williams:** Yeah.
**Julia Tortoriello:** Let me see. This is the article is the same one exactly the same with all the elements, picture, tags, etc.
**Pierce Williams:** Yeah,
**Julia Tortoriello:** in Spanish.
**Pierce Williams:** great.
**Julia Tortoriello:** So, it's it takes like minutes. Uh,
**Pierce Williams:** And so this on the options.
**Julia Tortoriello:** and when we read it, sorry,
**Pierce Williams:** So you have the chat GBT or the Google Translate Plus GBT.
**Julia Tortoriello:** we
**Pierce Williams:** the check key one that by itself I guess is not as
**Julia Tortoriello:** we
**Pierce Williams:** effective.
**Julia Tortoriello:** don't know what to say. I can I can we we are used to use this combination.
**Pierce Williams:** Okay. Where do you want to go with what works?
**Julia Tortoriello:** Erh,
**Pierce Williams:** So if that's what you always use, that's what we use.
**Julia Tortoriello:** it works.

### 00:22:18

**Julia Tortoriello:** It works. H Google translate by itself. It didn't.
**Pierce Williams:** Okay.
**Julia Tortoriello:** Um but maybe we have to it's in now we don't have when you translate with one. Yes. I can still I can check I can check if you are
**Pierce Williams:** No,
**Julia Tortoriello:** interested.
**Pierce Williams:** not really. I mean, you know, if you have a solution that works, that's what I want to know is what it is,
**Julia Tortoriello:** Yes.
**Pierce Williams:** you know.
**Julia Tortoriello:** Yes. It really works. The other thing, let me see if I can check if I can. Let me see if I can show you this. Give me a second. So you said that you are in Chris in Chris Paulo team now.
**Pierce Williams:** Yeah. Yeah. I've only been here for three weeks. So So no,
**Julia Tortoriello:** Were you in a different department or
**Pierce Williams:** I'm a new hire. Yeah, I was doing other completely other stuff
**Julia Tortoriello:** ah
**Pierce Williams:** before.

### 00:23:34

**Julia Tortoriello:** H. No, I'm not seeing my my GBD here. Ah, here. What happened? You'll see. I don't know what happened.
**Pierce Williams:** Looks like they just want to know who you are.
**Julia Tortoriello:** Okay. I I can send you either way. I can send you the link to use it. My co-workers from as weekly they have it. They have the link and they use it. The only thing that I I don't have the the description and the model. Yeah. But because I for some I don't know I don't have access but I'm requesting that. So I will try to send it to you. This is a little more complex. You are the translator for us weekly as weekly is entertainment blah blah blah. There is more context. Um and it's really good.
**Pierce Williams:** Yeah.
**Julia Tortoriello:** is even better than the translator

### (continuing)

**Pierce Williams:** Yeah. Great.
**Julia Tortoriello:** integrated.
**Pierce Williams:** Well, I'll take anything I can get from you as soon as you can get it. I appreciate it.
**Julia Tortoriello:** Okay, sounds good. I'm excited about it.
**Pierce Williams:** Thanks for Have a good one.
**Julia Tortoriello:** You too. Bye. Bye. Bye.

**Transcription ended after 00:25:02**

---

## Analysis & Key Findings

### What El Nuevo actually runs

El Nuevo's translation workflow is a two-layer system:

**Layer 1 — CMS-integrated button (daily workflow):**
- When Julia presses "accept" on a story, the CMS clones the English article (all elements: headline, body, picture, tags) and runs it through **Google Translate + GPT-3 (ChatGPT)** in combination.
- The GPT-3 layer has a **static, temperature-adjusted prompt** — not a conversational interface. It fires once when the button is pressed.
- Output: new Spanish article with all original elements preserved. Editor then reviews, adjusts links, reads for accuracy, and publishes.
- This combination works. Google Translate alone did not — it was static and couldn't adjust. GPT-3 alone handles nuances. Together they produce a publishable first draft most of the time.
- The CMS prompt is **very short** (Julia's words: "very very simple"). She copied it live during the call and committed to sending it.

**Layer 2 — Standalone "dog translator" GPT (parallel use, outside CMS):**
- A standalone ChatGPT model Julia built, used for phrases or passages that come out "cranky" / "not fluent" from Layer 1.
- Also the only path for **Spanish → English** translation (the CMS has no reverse translation button). Used for high-profile inbound stories from Argentina/Costa Rica reporters.
- Julia described it as "even better than the translator integrated" — more context, more complex system prompt, entertainment/Us Weekly framing baked in.
- She tried to demo it live but lost access during the call (mid-migration from A360 to a more secure McClatchy system). Her Us Weekly co-workers all have the link and use it.
- She will send: the link + whatever description/model context she can retrieve.

### Recurrent errors Julia has solved with prompts

| Error type | What goes wrong | How Julia fixed it |
|---|---|---|
| "exclusively" / "ae" | In English: "exclusively for Us Weekly." Literal Spanish "ae" is wrong — it means something different. | Explicit instruction in the CMS prompt: do not use "ae" as the translation of "exclusively" unless the English clearly refers to outlet-exclusive access |
| Headline capitalization | AI over-capitalizes headlines (English style). Spanish standard: capitalize first word + proper nouns only. | Rule in prompt |
| Quotation punctuation | Spanish puts the period/comma after the closing quotation mark; the content inside the quotes has its own punctuation rules. AI "sometimes" gets this wrong. | Rule in prompt — still imperfect; Julia says GPT gets it "most of the time" |

Julia noted these are "little things in the whole language" but they recur enough to require explicit prompt coverage.

### Dialect / register guidance

- **US Hispanic audience = Colombian Spanish register** — this is the standard for journalistic publications serving the US Hispanic market.
- Julia (from Argentina) confirmed: Argentine Spanish is distinctly different; the Colombian-adjacent US Hispanic standard is a deliberate editorial choice, not a default.
- **Key operational finding:** You do **not** need to explicitly enumerate dialect rules. Simply telling the AI `"You are set in the United States. Your audience is US Hispanic."` is sufficient for it to produce natural-sounding, appropriately registered content. The AI resolves the dialect from those two inputs without further instruction.

### What Julia tried and abandoned

- **Elbex** — the rest of the McClatchy company migrated to Elbex. Julia tried to create models there but "it wasn't possible to work there." El Nuevo remains on GPT-3 because of superior Spanish nuance handling. No further context given on why Elbex failed for their use case.
- **Google Translate alone** — was static and couldn't adapt to their standards. No longer used solo.

### CSA discussion

Pierce explained the CSA as: draft article → stylistically different variants for Smart News, Google Discover, Apple News, local newspaper, etc. The engineering team wants to add Spanish translation capability to this pipeline.

Julia's reaction:
- Said this was discussed in "a workshop in New York" but they were told "it wasn't ready yet for Spanish" at the time.
- Offered to test the CSA in Spanish herself — said it would be fast for her to identify what works and what doesn't based on her existing calibration.
- Flagged she has experience noticing when AI output "works and needs some adjustments and when something doesn't work" — including testing models in Elbex which ultimately didn't work.

### What Julia committed to send Pierce

| Item | Status | Notes |
|---|---|---|
| CMS prompt | Committed — copied live during call | Very short. Static. Temperature-adjusted. Covers headline caps, punctuation, "ae"/exclusively rule. |
| Standalone translator GPT link | Committed — co-workers have it | Julia can send the link; needs to request access to send the model description |
| Standalone translator model description | Pending — access lost mid-migration | McClatchy migrating her from A360 → new protected system; she's requesting the description from someone who still has it |

---

## What We Know Going Into Spanish CSA Scoping

1. **The combination that works today:** Google Translate + GPT-3 with a static, temperature-adjusted prompt. This is the baseline to match or improve on.
2. **Prompt coverage needed at minimum:** "ae"/exclusively term, headline capitalization, quotation punctuation. These are the known recurrent errors Julia has already solved.
3. **Register:** "US Hispanic audience, United States" = sufficient. No need to enumerate Colombian Spanish rules explicitly.
4. **Two translation directions needed:** EN→ES (daily; CMS-integrated) and ES→EN (occasional; used for inbound exclusive from Latin American reporters — currently a manual step with no CMS button).
5. **Julia is an available tester.** She offered proactively. She can run a draft through CSA in Spanish in ~10 minutes and tell us what breaks.
6. **The "dog translator" model** has more context than the CMS prompt — it includes Us Weekly editorial framing. When CSA Spanish translation is scoped, the dog translator's system prompt is the more instructive artifact to study.
7. **Elbex doesn't work for this team.** If McClatchy pushes CSA to use Elbex as its translation layer, this is a known risk based on Julia's experience.
8. **The CSA was discussed in a New York workshop but not yet deployed to El Nuevo or in Spanish.** Julia knew of it but had no hands-on experience — it's genuinely new territory for them.

---

## Open Items

- [x] ~~**Julia to send CMS prompt**~~ — RECEIVED (see verbatim resources below)
- [x] ~~**Julia to send standalone GPT link**~~ — RECEIVED (see verbatim resources below)
- [x] ~~**Get Julia's standalone model description**~~ — RECEIVED (see verbatim resources below)
- [ ] **Julia to test CSA in Spanish** — offered proactively; set this up when Spanish pipeline scoping begins. Julia confirmed in follow-up: "I'm happy to help and try on platforms/models or whatever you need."
- [ ] **Future: invite Julia into CSA Spanish pilot** — she's motivated, has calibrated eye for Spanish AI output quality

---

## Resources Received — Verbatim

### CMS Prompt (received via email from Julia post-call)

> Apply these Spanish editorial and formatting rules:
> - Only capitalize the first word and proper nouns in titles and headlines.
> - Do not add a period at the end of headlines or promo titles.
> - Use Spanish quotation marks: " " (not « » or straight quotes).
> - Place punctuation (commas, periods) **after** the closing quotation mark, unless the punctuation belongs to the quoted content.
> - Verbs must follow punctuation, not come before it.
> - Do not replace "exclusively" with "en exclusiva" unless the original English clearly refers to exclusive access granted specifically to this outlet.

**Usage context:** This is the static prompt baked into the CMS translate button. It fires once per article click, combined with Google Translate + GPT-3. It is intentionally short — the GPT-3 model handles most nuance; these rules cover only the recurrent errors that GPT-3 consistently got wrong without explicit instruction.

---

### Standalone GPT — "Us Weekly en Español Translator"

**Link:** https://chatgpt.com/g/g-0SsURCxh4-traductor-equipo-en-espanol

**GPT Name:** Traductor equipo en español / Us Weekly en Español Translator

**Description (as configured):**
> Traduzco artículos de Us Weekly respetando el tono original y las reglas de SEO.
> *(I translate Us Weekly articles while preserving the original tone and SEO best practices.)*

**Full Instructions (bilingual, verbatim as configured):**

> Este GPT es un traductor de artículos de Us Weekly, especializado en traducir contenido del inglés al español manteniendo el tono original de las notas. Es importante que respete la correcta gramática y puntuación en español. No traducirá nombres propios ni títulos de programas, películas, etc. Puede detectar el idioma del texto y traducir automáticamente del inglés al español o del español al inglés según se requiera. Además, cuando sea necesario, proporcionará opciones de sinónimos o sugerencias para mejorar títulos o partes de los artículos. Este traductor mantendrá en mente las mejores prácticas de SEO para títulos y encabezados en español.
>
> // This GPT is a translator from Us Weekly articles, specializing in translating content from English to Spanish for Us Weekly en Español, while preserving the original tone of the pieces. It is essential to maintain correct grammar and punctuation in Spanish. It will not translate proper names or titles of shows, movies, etc. It can detect the language of the text and automatically translate from English to Spanish or Spanish to English as needed. Additionally, when necessary, it will provide synonym options or suggestions to improve titles or parts of the articles. This translator will keep SEO best practices in mind for titles and headings in Spanish.

**Conversation starters (verbatim):**
- "Traduce este artículo de inglés a español:" → "Translate this article from English to Spanish:"
- "Dame opciones para este título:" → "Give me options for this title:"
- "¿Puedes mejorar esta frase para SEO?" → "Can you improve this sentence for SEO?"
- "Necesito una traducción de español a inglés:" → "I need a translation from Spanish to English:"

**Key capabilities this model adds vs. the CMS prompt:**
- Bilingual auto-detection — translates EN→ES or ES→EN automatically based on input language
- Does **not** translate proper names, show titles, or movie titles
- Provides synonym options and title improvement suggestions
- Explicitly optimized for SEO best practices in Spanish headings
- Has Us Weekly editorial context baked in (entertainment framing, tone preservation)
- Julia's assessment: "even better than the translator integrated" — more context, richer output

---

### Julia's Follow-up Email (closing line, verbatim)

> "I'm happy to help and try on platforms/models or whatever you need. Best, Julia"

---

## People / Context Notes

- Julia founded Us Weekly en Español at McClatchy — she was the first person working on it when they integrated Google Translate.
- She is from Argentina; knows that Argentine journalistic Spanish ≠ US Hispanic standard.
- She is currently mid-migration between McClatchy internal AI environments (A360 → a "more protected" system), which temporarily limits her access to some model configs.
- She has tried Elbex and abandoned it for translation work.
- She is aware of the CSA from an internal New York workshop but had been told it wasn't ready for Spanish.
