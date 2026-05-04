From: Dana Reyes <dana.reyes@westmont-industrial.com>
To: Priya Banerjee <priya@priyabanerjee-consulting.com>
Date: Apr 2, 2025, 6:52 AM
Subject: Workday TL — go-live punch list

Priya — quick post-cutover update. Workday Talent Learning has been live one week now. Punch-list status:

DONE:
- All 2,400 active certifications migrated (verified record-by-record sample of 240 records)
- Plant-specific cycle override field is working — Joaquín tested with Ciudad Juárez NOM cycles, no calendar collision with OSHA-driven Cleveland records
- Automated cascade running at 60/30/7-day pre-deadline + end-of-grace
- Maya is comfortable. (Big sigh of relief — she pulled me aside Tuesday and said "this is better than the spreadsheet was, even on its best day.")

OPEN (small):
- 4 records had data-cleanup edge cases (employees on extended leave whose cert dates were paused — Workday pauses with a flag, our old Excel stopped tracking entirely). Maya is fixing.
- The dashboards Carl wants for the board need a final color-tweak to print cleanly. IT is on it.

OPEN (medium):
- Need a written process for Workday admin handoff if Maya's out — single-point-of-failure was the original engagement risk so I want a "what happens if Maya is out for 2+ weeks" runbook before I close this engagement on my side.

That last one is the one I'd love your eye on if you have 30 min. Punch list otherwise looks clean — engagement closing on plan.

Carl is forwarding the "top three operational risks one-pager" deck to the board for the May meeting. He wants you on the call if scheduling allows. May 14, 2pm Eastern.

Dana

---

From: Priya Banerjee <priya@priyabanerjee-consulting.com>
To: Dana Reyes <dana.reyes@westmont-industrial.com>
Date: Apr 2, 2025, 9:14 AM
Subject: Re: Workday TL — go-live punch list

Dana — strong list. Three things:

(1) Maya-is-out runbook: yes, take 30 min Friday. I'll draft a 2-page template based on what I've seen at other clients (the doc I sent you on the Carrington S&OP cadence handoff has the right shape — same pattern, different domain). We'll cover: who has admin in Workday, who can issue cert overrides, who fields cascade-noise complaints, what's the escalation path if a plant manager bypasses the cascade. Should be ~90% transferable across Cleveland/Chattanooga/Juárez with plant-specific notes.

(2) Board call May 14: confirmed. Will dial in. Tell Carl the deck is in good shape — top-3-risks framing is what's going to land for board members who don't know HR systems. Don't let him add slides.

(3) The 4 leave-flag records — keep Maya's hand-fix list. I want to use it as the case-study for the "what we learned about migration scope" slide in my own marketing materials (anonymized, obviously). With your permission.

Excellent execution all the way through this. The board call is going to be a victory lap.

— Priya
