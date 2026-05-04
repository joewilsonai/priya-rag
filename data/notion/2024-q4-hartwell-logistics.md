# Hartwell Logistics — Engagement Notes (2024 Q4)

**Client:** Hartwell Logistics — regional 3PL (third-party logistics), Cincinnati OH
**Engagement type:** TMS evaluation + lane optimization study
**Duration:** 10 weeks (Sep 9 – Nov 22, 2024)
**Fee:** $115k
**Outcome:** McLeod LoadMaster TMS selection adopted; 18% deadhead-reduction opportunity quantified on IND-CHI corridor

---

## Engagement scope

Hartwell brought me in after their COO Lena Park flagged a frustrating gap: their existing TMS (a 12-year-old custom-built system on top of a 2008 SQL Server instance) was failing to support multi-leg dispatch and was producing financial reports two weeks late every month. Lena wanted three things, in order: (1) clear-eyed TMS evaluation against three named candidates (McLeod, MercuryGate, Trimble), (2) lane-level cost analysis to identify deadhead-reduction opportunities, (3) a 6-month implementation roadmap whoever they picked.

CEO Ed Hartwell (semi-retired chairman, founder's son) sat in on weeks 1, 5, and 10. Wanted gut-feel commentary not data dumps.

## TMS recommendation: McLeod LoadMaster

The eval matrix had 47 weighted criteria. Final scores:

- **McLeod LoadMaster:** 87/100 — best fit for Hartwell's mid-market regional density. Strong load-tendering and dispatch. Existing Cincinnati-area customer base = staff already knew it.
- **MercuryGate TMS:** 72/100 — better for cross-border but Hartwell doesn't do meaningful cross-border. Pricing was higher.
- **Trimble TMS:** 78/100 — strong fleet-side, weaker brokerage-side (which is half of Hartwell's revenue). Implementation cost 1.5x McLeod.

McLeod won. They signed in December 2024. Implementation kicked off January 2025.

## Lane optimization findings

The deadhead-reduction analysis was the unexpected high-value part. Hartwell tracks lane utilization by hub but had never normalized for backhaul matching. I built a simple Python script (lives in `/Drive/hartwell-deadhead-analysis.py`) that pulled their last 12 months of dispatch data, computed loaded-miles ÷ total-miles by lane, and flagged the 5 lanes with the worst utilization.

**Top finding: IND-CHI corridor was running at 64% utilization vs 82% on similar competitor lanes.**

The cause was structural: Hartwell's Indianapolis automotive customers all wanted Monday outbound, which meant all the trucks went to Chicago empty Sunday night to meet Monday loads. No one had thought to backfill the Chicago→Indianapolis return lane with bid traffic.

**Recommendation:** Hartwell hire a dispatcher (~$78k/year fully loaded) dedicated to backhaul brokerage on the worst 3 corridors. Net saving from improved utilization: estimated $340k annual margin contribution. Greg Halloran (Director of Fleet & Brokerage) loved it; Lena approved. Hire was made March 2025.

## Stakeholders

- **Lena Park** (COO) — sponsor; data-driven, low patience for narrative without numbers, hates surprises in Monday meetings. Excellent client for this kind of work.
- **Ed Hartwell** (Chairman, semi-retired) — gut-feel reviewer; wanted "is McLeod really the right call" in plain English not numbers.
- **Greg Halloran** (Director of Fleet & Brokerage) — owned the backhaul recommendation, championed it.
- **Marcus Bell** (Director of Operations) — Lena's deputy on this engagement; wrote the weekly leadership briefing that became the template I now reference for any client where a director-of-ops needs a weekly upward-comm. He's smart, measured, runs his teams cleanly. Watch him — he's the type who quietly becomes COO somewhere in 5 years.

## What I'd do differently

I underweighted the implementation timeline in the original deck. McLeod kickoff slipped from January to mid-February because Hartwell's IT team had to harden their AD infrastructure first (something I should have flagged in the readiness assessment). Cost them ~6 weeks. **Lesson for next TMS eval: always run a 4-page IT readiness gate before the recommendation deck goes out.**

## Files cross-reference

- Drive: `Hartwell TMS Evaluation Deck — Final Nov 22 2024.pptx`
- Drive: `Hartwell Deadhead Analysis Methodology.pdf`
- Drive: `hartwell-deadhead-analysis.py` (the dispatch-data Python script)
- Gmail thread: subject "Re: McLeod selection — final read"
- Slack: #hartwell-tms-eval (workspace export)
