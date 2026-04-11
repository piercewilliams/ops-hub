# Meeting Notes: Amanda / Sarah — Amplitude Session
**Date:** April 9, 2026, 9:55 AM PDT
**Duration:** ~45 minutes
**Participants:** Amanda Hamilton (Amplitude super admin), Sarah Price, Pierce Williams
**Attachments:** Amanda / Sarah (Google Meet notes), TH_Performance_Reporting_Requirements.docx

---

## Gemini Summary (verbatim)

**Summary**

Amplitude platform cleanup is underway for addressing messy data, with a technical issue submitted for author tracking and access guidance provided for budget, connections, and AI tools.

**Platform Cleanup and Training**
The Amplitude platform is undergoing a major cleanup of all properties and events due to previous lax user roles creating a messy environment. The team recommended the "getting started with Amplitude Analytics" course from Amplitude Academy for users seeking fundamental platform understanding.

**Author Tracking Issue Resolved**
A content author tracking issue in El Novo was identified as stemming from the content source being recorded as US Weekly, not the specific author. A technical request has been submitted to the analytics team to ensure the author in Amplitude reflects the actual person who wrote the story.

**Claude Integration and Budget**
Guidance was provided on connecting Amplitude to Claude via the pre-listed connector in Claude settings and maximizing Claude usage with good contextual data. A supervisor must request and validate additional budget through infrastructure to address current Claude data exhaustion.

---

## Gemini Details (verbatim)

- **Amplitude Access and Clean-up Initiative**: Amanda Hamilton confirmed that Amplitude is used for everything and noted they are currently undergoing a significant exercise to clean up all properties and events within the platform (00:01:49). This cleanup is necessary because previous rigid user roles allowed some users to add events without system alerts, leading to a "messy" environment. The analytics architect and their group are working on this, and the space is expected to be tidier within the next four to six weeks (00:02:58).

- **Troubleshooting El Novo Author Tracking**: Sarah Price raised an issue regarding tracking the work of an author, Samantha Agate, who transferred from US Weekly, into the El Novo dashboard (00:04:01). The system was not recognizing Samantha Agate as the author for the El Novo pieces because the content was coming through US Weekly Spanish, meaning she was not technically the author for El Novo (00:08:40) (00:11:32). Sarah confirmed they are a beginner with Amplitude and have been self-teaching the basics (00:05:14).

- **Amplitude Training Resources**: Amanda Hamilton shared that they would drop a link in the chat for the Amplitude Academy, recommending the "getting started with Amplitude Analytics" course flow. This course is recommended for helping users understand the different icons and overall platform functionality (00:05:14).

- **Resolution for Author Tracking Issue**: Amanda Hamilton determined that the author was not coming through as the main author in the analytics due to the content source being recorded as US Weekly, not the specific author (00:11:32). Amanda Hamilton is submitting a technical issue request to the analytics team to ensure the author in Amplitude analytics reflects the person who wrote the story, as this issue is hindering the content team's analytics abilities (00:15:46).

- **Finding and Customizing Existing Dashboards**: Sarah Price is looking for pre-built Amplitude dashboards to compare their team against the general newsroom, specifically seeking engagement metrics such as time on page, scroll depth, and pages per session (00:18:30). Amanda Hamilton suggested using the advanced search functionality within Amplitude to find relevant public charts and dashboards built by other teams. Users can search by metrics like "page views" and filter results to display only dashboards (00:21:06) (00:23:23).

- **Guidance on Duplicating and Customizing Charts**: Amanda Hamilton advised that users can duplicate individual charts from existing public dashboards that look promising (00:25:36). They also noted that improvements around scroll depth tracking are currently being rolled out for A360 (00:24:29).

- **Addressing Claude Data Usage and Connection**: Sarah Price confirmed they are out of Claude data due to having to manually combine data against their tracker in Claude, as they do not yet have the necessary Sigma dashboards (00:27:02). Amanda Hamilton confirmed that a supervisor must request and validate additional budget through infrastructure, specifically with Travis Farre (00:27:49) (00:29:44).

- **Connecting Amplitude to Claude**: Pierce Williams expressed that they are unfamiliar with connecting Amplitude to Claude, while Sarah Price confirmed their connector is already set up (00:28:48). Amanda Hamilton explained that users can access the connection in their Claude settings under "connectors" and easily hit 'connect' because Amplitude is an approved and pre-listed connector (00:30:41).

- **Tips for Effective Claude Usage**: To maximize Claude's effectiveness with Amplitude, Amanda Hamilton recommends providing good context, such as referencing a simple chart with filters already applied, to help Claude identify correct properties and values (00:31:40). Users can also instruct Claude to build a context file, which will grow and remember details like which property to prioritize for specific queries (00:34:10).

- **Amplitude's Native AI Tools and Claude Skills**: Amanda Hamilton recommended using Amplitude's native AI agents and capabilities, which do not incur costs, to build dashboards before transitioning to Claude for co-work tasks like weekly reporting (00:28:48) (00:37:57). Amanda Hamilton also advised checking the analytics area for Amplitude-released Claude skills, which are safe and provide foundational Amplitude knowledge to Claude for tasks like analyzing dashboards (00:40:05).

- **Invitation to Analytics Discussions**: Amanda Hamilton confirmed that they meet with Amplitude monthly and offered Sarah Price and Pierce Williams the opportunity to join these calls or the internal Slack channel for announcements and product requests (00:41:38). Sarah Price accepted the offer to be added to the Slack channel (00:43:44).

---

## Gemini Suggested Next Steps (verbatim)

- [Amanda Hamilton] Submit Request: File technical issue request concerning Spanish content author attribution in Amplitude. Ensure analytics reflects story author, not just content source.
- [Chris] Adjust Budget: Contact Travis Farrar to request adjustment of the Claude budget spin limit.
- [Pierce Williams] Connect Amplitude: Use the Connectors area in Claude settings to link Amplitude. Access data for co-work tasks.
- [Amanda Hamilton] Add User: Add Sarah Price to the dedicated Amplitude Slack communication channel.

---

## Transcript (verbatim, Gemini-generated)

> **Note:** Gemini artifact: "Clawude" / "Clawde" / "claw" = Claude. "El Noo" / "El Noo" = El Nuevo. "M Melissa 6" = unclear reference. Transcript covers 00:00:00–00:28:48; Gemini summary covers full ~45-minute session.

**00:00:00**

**Sarah Price:** Good morning.
**Pierce Williams:** Good morning.
**Sarah Price:** Not morning for you anymore.
**Pierce Williams:** Yeah, you're in LA, right?
**Sarah Price:** I am.
**Pierce Williams:** So, what's it like 10 there?
**Sarah Price:** Yep.
**Pierce Williams:** Whereabouts in LA? Are
**Sarah Price:** Um I'm in the valley area.
**Pierce Williams:** you
**Sarah Price:** Uh Chatsport uh Chadzsworth Porter Ranch
**Pierce Williams:** okay?
**Sarah Price:** area.
**Pierce Williams:** I lived in u Pasadena Alhamra for a little
**Sarah Price:** Oh, nice. Okay.
**Pierce Williams:** bit.
**Sarah Price:** Hi,
**Amanda Hamilton:** Hello y'all.
**Sarah Price:** Amanda.
**Amanda Hamilton:** Hey Pierce, good to see you again. Sarah, have we been on together?
**Sarah Price:** No, I think this is our first time.
**Amanda Hamilton:** Ah, nice to meet you.
**Sarah Price:** You as
**Amanda Hamilton:** Better with faces,
**Sarah Price:** well.
**Amanda Hamilton:** but y'all tend to keep multiplying over there.
**Sarah Price:** I know. We came in around the same time,
**Amanda Hamilton:** Um, well, and uh,
**Sarah Price:** too.
**Amanda Hamilton:** can you tell me if these people are a part of y'all's group? Someone by the name of Doug Tume.

**00:01:49**

**Amanda Hamilton:** Tumi.
**Sarah Price:** I don't know that name.
**Amanda Hamilton:** Okay. How about a Courtney Amos? No. Okay, cool.
**Sarah Price:** Mm-
**Amanda Hamilton:** They just requested amplitude access and they're mimicking Paulo and I was like, or Paulo in Chris.
**Sarah Price:** H.
**Amanda Hamilton:** Paulo. Sorry, I have too many Chrises.
**Sarah Price:** Yeah.
**Amanda Hamilton:** But um I you know I was like I'm glad uh Pierce you could join us for amplitude
**Pierce Williams:** Yeah,
**Amanda Hamilton:** time
**Pierce Williams:** I'm trying to I'm still trying to figure out what all this stuff is used for. So, I'm eager to hear as much as I can.
**Amanda Hamilton:** used for everything. Um amplitude is your best friend. And we are, I'll just tell y'all, we're going through a really big exercise right now to clean up all of the properties, the events. Um, for the longest time, Amplitude had some pretty rigid uh roles for users available. Um, but we got our back. uh we were actually the people who requested it, then we helped them develop it, alpha it, baited it, and now it's GA.

**00:02:58**

**Amanda Hamilton:** Um so unfortunately for people to be able to do certain things in the past, they got some access to being able to like add events. Um and there weren't like system alerts when they did it. And so uh things got a little messy. Um but my analytics architect Ryan and Ryan Spalding and that group are working together. So um as we go through today and we look at some of the different properties and and anything like that that you have questions on, I'm just going to give you that caveat that hopefully here within uh the next, you know, we'll probably be done like we're working little bits at it at a time. So hopefully by the next four to six weeks like from now it'll be a much tidier space.
**Sarah Price:** What the?
**Amanda Hamilton:** Um so I know uh Sarah you had sent a question about how wanting to know how to add a user to a
**Sarah Price:** Yes.
**Amanda Hamilton:** dashboard.
**Sarah Price:** So, this is an interesting one. Um, I'm trying to track our El Novo,

**00:04:01**

**Amanda Hamilton:** Okay.
**Sarah Price:** um, uh, you know, what's being picked up by my team and translated over there. Um, so they're keeping the by lines the same. So I was able to track Ryan Brennan and Hannah Wixs. Um, but I'm struggling with Samantha um, Agate because she came to us from US Weekly. And so when I try and add her in, it's telling me that she's not the author on these El Novo pieces because essentially it's going
**Amanda Hamilton:** Mhm.
**Sarah Price:** through US Weekly Spanish. So I'm trying to figure out if there's a way that I can pull her Spanish specific pieces into this dashboard.
**Amanda Hamilton:** Yeah. Let's take a look together. Now, heads up, I am a super admin and amplitude. So, like there are things you may see icons that maybe you don't have cuz I beta and alpha test a lot of things for them. Um, and you may see certain positions or I may be able to do something that you may go, "Hey, I didn't know a user could do that. Now I'm like worried someone could just edit my dashboard." That's not the case.

**00:05:14**

**Sarah Price:** It's
**Amanda Hamilton:** Um,
**Sarah Price:** cool.
**Amanda Hamilton:** most people when they see this like it's going to appear much more locked down. So, uh, her content
**Sarah Price:** I will say I'm I'm a beginner with Amplitude. This is my first time using this. Um, so I am at the basics. I've been trying to teach myself over the weeks and everything, but it should be pretty simple things that I I have built for you.
**Amanda Hamilton:** No worries. And did y'all get the links to like the Amplitude Academy or anything like that?
**Sarah Price:** I did not I got some training instructional videos from Buddy I believe but like any anything you want to send my way I will
**Amanda Hamilton:** Mhm. Yeah.
**Sarah Price:** take.
**Amanda Hamilton:** Let me drop that link in chat because they have some good like
**Sarah Price:** Perfect.
**Amanda Hamilton:** basic I I always recommend the getting started with Amplitude Analytics um as really a course flow to go
**Sarah Price:** Love that.
**Amanda Hamilton:** through um just because it helps you understand some of all the different icons and and everything else that we have in there.

**00:06:15**

**Sarah Price:** for
**Amanda Hamilton:** Um, but all right.
**Sarah Price:** sure.
**Amanda Hamilton:** So, we would like to add our good friend Samantha to this. Now, her content is it on the El Noo site. You
**Sarah Price:** It is. So they pull things from her US Weekly Spanish content.
**Amanda Hamilton:** said,
**Sarah Price:** So they'll pull it over and translate it. But her name is still on there to my understanding. Um,
**Amanda Hamilton:** let's take a look. Oh, we have ad takeovers everywhere.
**Sarah Price:** that's
**Amanda Hamilton:** All right. And I am not super fluent. Do you know um what?
**Sarah Price:** me neither. So she's entertainment. So like Oscars,
**Amanda Hamilton:** Okay. Good.
**Sarah Price:** US Weekly,
**Amanda Hamilton:** Good.
**Sarah Price:** that kind of stuff. Yeah.
**Amanda Hamilton:** Photo inter.
**Sarah Price:** I was going to say,
**Amanda Hamilton:** And oh,
**Sarah Price:** let me let me see if I can pull.
**Amanda Hamilton:** a lot of perhaps like her us weekly. Now let's if I

**00:07:13**

**Sarah Price:** So, let's see if I
**Amanda Hamilton:** uh
**Sarah Price:** can
**Amanda Hamilton:** cat them. I might as well click this one. Ryan Hudgins.
**Sarah Price:** I was going to say, let me see if I can pull you a specific article.
**Amanda Hamilton:** That would be very helpful.
**Sarah Price:** Yes,
**Amanda Hamilton:** can
**Sarah Price:** cuz that's what we're trying to be like is like can we see what they're pulling from our
**Amanda Hamilton:** also
**Sarah Price:** team and then be able to give them
**Amanda Hamilton:** um yeah that okay let's
**Sarah Price:** so
**Amanda Hamilton:** see long as this search did what I want it to la we found one right so
**Sarah Price:** Perfect.
**Amanda Hamilton:** what I'm doing is I'm just looking at our page source because this is going to tell me the values that are coming into my analytics so I can like you know be very sure make sure there's not anything weird.
**Sarah Price:** Okay.
**Amanda Hamilton:** So we got our creator here. We've got you know that particular URL. Nothing looking out of place. Let's see up here.

**00:08:40**

**Amanda Hamilton:** And this is always the really fun bit to read. Yeah, she should be in here three times. Where's the third? There we go. All right. So, she is definitely listed. And you're saying as you go to try to like add
**Sarah Price:** So essentially just copy that and put it for Samantha. It's not pulling anything, but like I can go into Marfield and see that she's had two articles within the last 30 days that were published over there, but they don't pull into
**Amanda Hamilton:** I was
**Sarah Price:** Amplitude.
**Amanda Hamilton:** Mhm.
**Sarah Price:** And I did ask the AI on Amplitude. I've been trying to mess with that and it says, "Well, she's not really the author on this page. That's, you know, from her Spanish US Weekly, but she's not technically the author for El Novo. And I was like, that's
**Amanda Hamilton:** Well,
**Sarah Price:** interesting.
**Amanda Hamilton:** and we're going to do going to alter it to contains. And don't worry, just because I can edit this does not mean everybody can.

**00:09:51**

**Sarah Price:** Oh, I'm happy. I'm happy to have you edit
**Amanda Hamilton:** Um, it keeps not wanting to let Come on.
**Sarah Price:** it.
**Amanda Hamilton:** Better not be because I'm beta testing that thing. There we go. I got a new AI memory thing I'm testing. All right. So, publication name, content source, and she is definitely in there. So, let's do this. We're going to do a quick comparison.
**Sarah Price:** I was going to say I can give you the two titles um from Marfield that it says are in the last 30 days if that's helpful.
**Amanda Hamilton:** I actually want to find one of Ryan's articles now. And I'm pretty sure I just had one when I was looking because I want one of the other authors that you have showing up just fine. I'm just gonna have to search him.
**Sarah Price:** Mhm.
**Amanda Hamilton:** Uh Ryan Bren, Florida. I need it in Yes. for you, my dude. How many page star I'm gonna do? I am dead.

**00:11:32**

**Sarah Price:** At
**Amanda Hamilton:** So he would be in there. That is interesting.
**Sarah Price:** least it's not just
**Amanda Hamilton:** No. And let's see.
**Sarah Price:** me.
**Amanda Hamilton:** I'm gonna Sometimes you play just a little bit and let's take a look at because it would be on our Oh, and that's also a good idea to attempt as well. into what did I just hit? Whoopsie. There we go. Hi, how are you? Give me my amplitude events, please. Thank you. There you are. Business unit for sure. content stores is coming in as us weekly.
**Sarah Price:** That's why I was like, "That's not the author." I was like, "What do you
**Amanda Hamilton:** Mhm.
**Sarah Price:** mean?
**Amanda Hamilton:** Which means your Ryan Brennan data is not including his Spanish. It's uh putting anything else. But yeah,
**Sarah Price:** Also good to
**Amanda Hamilton:** she does not She is not coming in as your main author. So it is bringing that in as the content source just us weekly.

**00:13:35**

**Amanda Hamilton:** Um which let's take a look at why. Ah, right up here it has cut off the author in my MI stats
**Sarah Price:** Huh?
**Amanda Hamilton:** and see on this article it's actually saying the content source is A360. So this is uh I believe one of Ryan's articles. So, that is definitely going to explain why that's not coming over. Uh, but that doesn't really help our problem, now does it? Uh, so let's take a look at our article and see if we have anything that would get me what I'm at. So, the way this is uh yeah, this is coming in right now, there wouldn't be a way to filter for her. But fear not,
**Sarah Price:** All right.
**Amanda Hamilton:** there's a way to fix it.
**Sarah Price:** Oh, I love
**Amanda Hamilton:** Um,
**Sarah Price:** that.
**Amanda Hamilton:** so this is an analytics change we would want and that would be this. So let me I'm going to do something real quick. You're going to journey with me. Okay, just don't panic as we journey.

**00:15:46**

**Sarah Price:** Okay.
**Amanda Hamilton:** Nope, it's not that one. It is all my really fun forms. Oh, it would have been not me. There it is. My J forum. I need to actually go to that URL and view it as somebody who can submit it. Email. We're going to do another technical issue request. I'm just going to say hey team on content on do estimating Spanish that the author in amplitude and then in static um the value A360 or what was it on here? S weekly with a line below. The content team would prefer since this is internally shared content that the author analytics is the person who wrote the story. It's the author in the page. Um it is hindering their analytics abilities in amplitude not all right content possible get this strange I can't spell you guys are going to learn that disrupting major workloads and I'm gonna so what I'm doing just so you know because it's the easiest way for me to get something to my teams that isn't an emergency because as you know when you lead a team if a boss comes and

**00:18:30**

**Sarah Price:** Mhm.
**Amanda Hamilton:** is like do this they might try to drop everything to do it and I want them to look into this because we want this fixed Um,
**Sarah Price:** Right.
**Amanda Hamilton:** but I don't want them to feel like, oh, because Amanda said it, it's, you know,
**Sarah Price:** That's fair.
**Amanda Hamilton:** right now.
**Sarah Price:** Yeah.
**Amanda Hamilton:** Um,
**Sarah Price:** Cool.
**Amanda Hamilton:** here we go. So, haha, it wasn't just you.
**Sarah Price:** That That makes I was like, I I must be doing something wrong. So, that's kind of nice. Um the other one I sent you is just very basic. I kind of was trying to convert it to fit my team. So, our needs are like I want to be able to compare my team versus the general newsroom. Um, this one I kind of took from one that Sarah Volone sent me that was originally done, I think, for Mama's Uncut or something like that. I'm really struggling with getting some like engagement metrics. Um I I've kind of asked around are there already like built dashboards for the newsrooms or things like that that I might be able to copy over and play with um that could show like where I could filter out my team or you know things like that where like the the engagement metrics I'm really trying to get are like time on page scroll depth and pages per session.

**00:20:02**

**Sarah Price:** Um, so like are I was wondering if there are any boards already kind of built maybe for another team that I could just go in and
**Amanda Hamilton:** Oh yeah.
**Sarah Price:** customize.
**Amanda Hamilton:** Um, have you played at all with the search functionality? Um,
**Sarah Price:** I have
**Amanda Hamilton:** okay.
**Sarah Price:** not
**Amanda Hamilton:** Well, we'll play a little bit with that. Um, here we go. So yeah, you know, looking at a couple of things which session length you do got to be careful uh because
**Sarah Price:** That's one I really wasn't sure about.
**Amanda Hamilton:** depending
**Sarah Price:** Essentially, I just copied over it from Mama's Uncut and was like, can I make this Miami? So, that one's Yeah. Um, and then these two.
**Amanda Hamilton:** it is
**Sarah Price:** Yeah. I I just I like would like to know the best way to kind of like do this if it's, you know, I do have some Sigma boards coming hopefully. Um, but right now, in the meantime, I've just been trying to pull this data myself.

**00:21:06**

**Amanda Hamilton:** Absolutely. So, if you're in Amplitude, you know, just home area. Oh, let me get to the production project. I don't mess everybody up. Uh, search is always a great option that we have available. Um so Dedra Lawhead as well is over you know the news analytics. So in terms of some of their dashboards but some things that I really enjoy doing um would be searching around like the metrics you're specifically thinking um about looking into. So uh you might you know when we think about
**Sarah Price:** Okay.
**Amanda Hamilton:** oh marketing analytics has a whole folder called page. Now, your searches may look a little bit different because it depends,
**Sarah Price:** Right.
**Amanda Hamilton:** but default settings is a lot of things in Amplitude will be viewable. Um, so if you search by page views,
**Sarah Price:** Okay.
**Amanda Hamilton:** we're going to do an advanced search because I want to uh show you a couple of things about signs, symbols, etc. So, for what comes up for you,
**Sarah Price:** Awesome.
**Amanda Hamilton:** you're going to be able to see always the name of who built it, right?

**00:22:15**

**Sarah Price:** Right.
**Amanda Hamilton:** um or who the editors are. Um Oh yeah,
**Sarah Price:** I'm gonna I'm gonna record this if you don't mind. Perfect.
**Amanda Hamilton:** absolutely.
**Sarah Price:** Okay, cool.
**Amanda Hamilton:** Uh so you do your search, you know, this is like the advanced search, right? And you can see options. Now,
**Sarah Price:** Yep.
**Amanda Hamilton:** because I'm a super admin, if somebody's got something private, like I can see it. But,
**Sarah Price:** Right.
**Amanda Hamilton:** you know,
**Sarah Price:** Well, if it's private,
**Amanda Hamilton:** that's why you Yeah,
**Sarah Price:** I don't need to mess with it. Yeah.
**Amanda Hamilton:** you always name things uh based on names, you know, other people can see. So that is something uh I used to stress in my trainings a lot like don't name anything that you're like ah what happens if you know it cuz people will see it.
**Sarah Price:** Yeah.
**Amanda Hamilton:** Um,
**Sarah Price:** Right.
**Amanda Hamilton:** like so when you look there are a couple you see those little symbols beside the name that denotes what you're working with.

**00:23:23**

**Amanda Hamilton:** Um,
**Sarah Price:** Yeah.
**Amanda Hamilton:** and so you can kind of see some explanation of a few of the symbols here. Uh but this little you know lineick tick tick that denotes it's going to be some form of just like a chart.
**Sarah Price:** Yeah.
**Amanda Hamilton:** So you have charts and you have dashboards right?
**Sarah Price:** Right.
**Amanda Hamilton:** So this is a dashboard which is multiple charts.
**Sarah Price:** Right. Charts.
**Amanda Hamilton:** Um and then these are different kinds of charts. So this is going to be a basic segmentation.
**Sarah Price:** Yep.
**Amanda Hamilton:** This is going to be a uh little time. This one's going to be uh I think it's a bar, but you have different types. And then you may see even more symbols because someone may have a cohort,
**Sarah Price:** Right.
**Amanda Hamilton:** someone may have a notebook page. So if you're thinking, I would like to understand all the dashboards, you can come over here and hit dashboard and then you can uh see some options.
**Sarah Price:** Cool.
**Amanda Hamilton:** And I always tell people, you know, I'm going to open in a new tab.

**00:24:29**

**Amanda Hamilton:** It's always really fun. Anything that's public that like you're able to see. Ignore this guy. He's He's wanting to hang out with me today. Um, and I have like 37,000 tabs open,
**Sarah Price:** I mean,
**Amanda Hamilton:** so don't trust uh
**Sarah Price:** yeah, same.
**Amanda Hamilton:** everything I do. But you may look at it and you go, "No, you know, and you can always do more specifics." So I think when you were noting earlier
**Sarah Price:** Great. Okay.
**Amanda Hamilton:** like some of the things that you wanted to look at were not only time on page but uh let me think there were scroll
**Sarah Price:** Uh scroll depth pages per
**Amanda Hamilton:** piano.
**Sarah Price:** session.
**Amanda Hamilton:** So that might be the more specific you get you may get some more options
**Sarah Price:** Okay,
**Amanda Hamilton:** too. Right.
**Sarah Price:** cool.
**Amanda Hamilton:** Um, and you can see all different. Now, scroll depth, I will tell you, we're actually just rolling out some improvements around that
**Sarah Price:** Oh, I love
**Amanda Hamilton:** um because uh for A360 cuz they did

**00:25:36**

**Sarah Price:** that.
**Amanda Hamilton:** not, you know, have what they were like it wasn't on there yet. Uh, let me get you that ticket, too. because it literally just went out today.
**Sarah Price:** Oh, that's Yeah, that's great.
**Amanda Hamilton:** Let's see. There we go. Um and add a new Yep. chat here. So you tend to like, you know, take a look and see.
**Sarah Price:** Perfect.
**Amanda Hamilton:** So I might look at this, you know, dashboard here. Maybe they'll have a little something something that I like. Every time I'm going to give them feedback on that, but that that guy is just the tar out of me. Um, so maybe you're like, ah, you know, this is, you know, closer to some things I want. So just duplicate individual charts as well.
**Sarah Price:** charts. Okay, cool.
**Amanda Hamilton:** Um but anytime you're looking to do you know anything you can always hit this
**Sarah Price:** Yeah,
**Amanda Hamilton:** more um and then copy your own
**Sarah Price:** that's Yeah, that's kind of how I've been playing with it.

**00:27:02**

**Sarah Price:** Yeah, that's great. Um,
**Amanda Hamilton:** version.
**Sarah Price:** I can start looking into that. I don't want to take up all our all our time with this. I know Pierce um and I were also hoping for some claude connection tips. Um I'm currently out of cloud data. Um, so I can't use it right now, but anything where we can uh, you know, use that to pull, I'd love to hear about. Um, I did try once to just ask for what I wanted and it pulled me like so many things that I was like, "This isn't quite right." So any tips or tricks on how to kind of use that for this would be fantastic.
**Amanda Hamilton:** Yes. You say you're out of claw as in you've spent your entire like $100 budget for the
**Sarah Price:** Yeah.
**Amanda Hamilton:** month. I don't know.
**Sarah Price:** That's Yeah.
**Pierce Williams:** I think that's a problem.
**Amanda Hamilton:** There is a What?
**Pierce Williams:** seem like three out of five people are out of it's
**Sarah Price:** Yeah.

**00:27:49**

**Amanda Hamilton:** What? What are y'all
**Pierce Williams:** Yeah.
**Sarah Price:** So that's that's because I don't have the Sigma dashboards.
**Amanda Hamilton:** doing?
**Sarah Price:** I've been having to like pull all of the data and then slow it like throw it against my tracker in Clawude. So it's been a lot of a lot of data combination.
**Amanda Hamilton:** Okay. So,
**Sarah Price:** Yeah.
**Amanda Hamilton:** your supervisor can request additional budget even for like um the month or something for you. It's got to get proven against, but that's uh your supervisor has to go to infrastructure.
**Sarah Price:** Yeah.
**Amanda Hamilton:** So like Travis Frell to request and validate it.
**Sarah Price:** Oh, that's okay.
**Amanda Hamilton:** One thing I will call out before we look at the cloud connection um is
**Sarah Price:** Yeah.
**Amanda Hamilton:** Amplitude does have agents and the AI capabilities and they've done quite a bit there.
**Sarah Price:** Yeah. I've been using the AI in there.
**Amanda Hamilton:** Um
**Sarah Price:** It It's been fairly helpful. That's where I was like, "Okay, well, it's not an author issue."

**00:28:48**

**Amanda Hamilton:** yes um but it does like and we don't pay you know like for these monies.
**Sarah Price:** Yeah.
**Amanda Hamilton:** So I always recommend this something I talked to like M Melissa 6 and some others about you can always you know try and start here and then depending on what
**Sarah Price:** Absolutely.
**Amanda Hamilton:** you're wanting to do within cloud. So, you don't have Sigma access at all yet, do you?
**Sarah Price:** I have very limited Sigma access. I believe that Pierce has the snowflake access.
**Amanda Hamilton:** Okay.
**Sarah Price:** Um but I I do not.
**Amanda Hamilton:** Let's see. All right.
**Pierce Williams:** Yeah.
**Sarah Price:** Yeah.
**Amanda Hamilton:** And have y'all gone through like It sounds like you have your connector to amplitude all set
**Sarah Price:** Yes.
**Amanda Hamilton:** up.
**Sarah Price:** So I' I've put it into my claw. It's It's in there. Yes.
**Amanda Hamilton:** Awesome.
**Pierce Williams:** I I do not I don't even know how to do that.
**Sarah Price:** Oh yeah, there probably a good place to start

*(Transcript ends at 00:28:48. Gemini summary covers full ~45-minute session through 00:43:44.)*

---

## Analysis

### Key Findings

**1. El Nuevo author attribution bug — filed as technical request**
Samantha Agate transferred from US Weekly to El Nuevo. Her El Nuevo content is translated from her US Weekly Spanish pieces. Amplitude is recording the content source as "US Weekly" (or "US Weekly Spanish"), not her as the individual author — so she doesn't show up when Sarah filters the El Nuevo dashboard by author. Amanda confirmed this is a genuine bug, not a user error. She filed a technical issue request to the analytics team to fix: author field in Amplitude should reflect the person who wrote the story, not just content source. **This was blocking Sarah's El Nuevo analytics dashboard.**

**2. Amplitude platform cleanup — in progress, 4–6 weeks**
Analytics architect Ryan Spalding is leading a major properties/events cleanup. Previous lax user roles allowed events to be added without system alerts, creating a messy environment. Caveat: any Amplitude data or property questions between now and 4–6 weeks from this date should factor in that the data environment is actively being tidied.

**3. Claude budget exhaustion — team-wide issue**
Sarah Price exhausted her ~$100/month Claude budget by manually pulling data and combining it against her tracker in Claude (workaround for not having Sigma dashboards). Pierce flagged that ~3 of 5 people on the team are out. Amanda: **supervisor (Chris) must go to infrastructure — specifically Travis Farrar — to request and validate additional budget.** This is not self-service.

**4. Claude + Amplitude connector — Pierce needs to connect**
Sarah already has the Amplitude connector set up in Claude. Pierce does not. Amanda: go to **Claude Settings → Connectors → Amplitude** (it is pre-listed and approved; just hit "connect"). No additional credentials needed.

**5. Tips for Claude + Amplitude**
- Reference a specific chart with filters already applied so Claude can correctly identify properties and values
- Instruct Claude to build a context file that grows over time, remembering which properties to prioritize for specific query types
- Use Amplitude's native AI agents first (no cost) for building dashboards; use Claude for co-work tasks like weekly reporting
- Check the Amplitude analytics area for Amplitude-released Claude skills (safe, foundational Amplitude knowledge)

**6. Dashboard discovery workflow**
- Use Amplitude advanced search by metric name (e.g. "page views," "scroll depth")
- Filter results to dashboards only (vs. charts)
- Can always see who built each dashboard/chart
- Dedra Lawhead oversees news analytics — her dashboards are a good starting point
- Can duplicate individual charts from any public dashboard

**7. Scroll depth — improvements just rolled out for A360**
As of April 9, 2026, scroll depth tracking improvements went out for A360. Sarah should check for any updated scroll depth dashboards.

**8. Sigma/Snowflake access gap**
Sarah: very limited Sigma access, no Snowflake. Pierce has Snowflake access. Sarah's Claude budget exhaustion is directly caused by this gap — she is manually pulling data because she lacks Sigma dashboards. Sigma dashboards would eliminate the workaround.

**9. Dedra Lawhead — news analytics lead**
Dedra Lawhead oversees news analytics in Amplitude and has dashboards that Sarah found useful. She should be a first stop when looking for pre-built newsroom dashboards.

**10. Monthly Amplitude calls**
Amanda meets with Amplitude monthly. Offered Pierce and Sarah to join these calls or an internal Slack channel for announcements and product requests. Sarah accepted the Slack channel invitation.

### Open Items / Actions

| Who | Action | Status |
|-----|--------|--------|
| Amanda Hamilton | File tech request: fix Samantha Agate author attribution in El Nuevo Amplitude data | DONE (filed during meeting) |
| Chris | Contact Travis Farrar (infrastructure) to request additional Claude budget for team | TO DO |
| Pierce | Connect Amplitude: Claude Settings → Connectors → Amplitude → Connect | TO DO |
| Amanda Hamilton | Add Sarah Price to Amplitude Slack channel | TO DO (Amanda's action) |
| Sarah | Take Amplitude Academy "Getting started with Amplitude Analytics" course | TO DO |
| Sarah | Explore Dedra Lawhead's news analytics dashboards as starting point | TO DO |

---

*Source: `/Users/pierce/Desktop/Amanda _ Sarah - 2026_04_09 09_55 PDT - Notes by Gemini.pdf`*
