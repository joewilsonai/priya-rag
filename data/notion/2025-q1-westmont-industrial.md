# Westmont Industrial — Engagement Notes (2025 Q1)

**Client:** Westmont Industrial — specialty industrial valve manufacturer, Cleveland OH (HQ) + Chattanooga TN + Ciudad Juárez
**Engagement type:** Safety-program audit + certification-tracking redesign
**Duration:** 8 weeks (Feb 3 – Mar 28, 2025)
**Fee:** $98k
**Outcome:** Workday Talent Learning module rolled out replacing manual cert-tracking spreadsheet; OSHA refresh compliance up from 71% on-time → 94% on-time within 6 months

---

## Engagement scope

Westmont had failed an OSHA audit in November 2024 — not for any underlying training gap, but for **inability to produce records on demand**. Their cert tracker was a shared Excel spreadsheet maintained by the Cleveland EHS coordinator (Maya Ortiz, who'd been there 14 years and held everything in her head). When OSHA asked for documentation, Maya was out on bereavement leave, and the file hadn't been updated in 6 weeks. Auditors didn't care about the why — fail.

VP People (Carl Rasmussen, founder-family loyalist) called me. Wanted a cert-tracking system audit + remediation plan. Dana Reyes (Senior HR Generalist) ran the engagement on the HR side.

## Top three operational risks identified

After 3 weeks of interviews and document review, I surfaced three risks ranked by severity:

1. **Single-point-of-failure dependency on Maya Ortiz for all cert records.** Critical risk. She was the entire system. If she retired or went on leave, Westmont was operating blind. **Recommendation:** lift the tracker out of personal Excel into Workday Talent Learning; train 3 backup admins.

2. **Plant-specific cert variance with no visibility from HQ.** Chattanooga had developed its own LOTO recert cycle that was 6 weeks off the Cleveland cycle. Ciudad Juárez was operating under entirely separate Mexican STPS cycles (correct for that jurisdiction, but no visibility from Cleveland). **Recommendation:** unified Workday view with plant-specific filtering; automated escalation to HQ when any plant slips beyond grace period.

3. **No automated escalation path for past-deadline employees.** When someone missed an OSHA refresh, no one was notified — Maya would notice during her quarterly spreadsheet update. By then the employee had been operating non-compliant for weeks. **Recommendation:** automated email cascade at 60/30/7 days pre-deadline, plus manager + EHS notification at end-of-grace-period.

## Workday Talent Learning rollout

Westmont licensed Workday Talent Learning as part of their existing Workday HCM contract (no incremental cost — they were paying for it but had never enabled it). I led the data migration from Maya's Excel into Workday over weeks 5-7, in collaboration with Dana and a Workday consultant from the implementation partner.

**Migration scope:** ~2,400 active certifications across 540 employees, 28 cert types, 3 plants.

**Cutover:** March 24, 2025. Old Excel was sunset on April 1, 2025 with a 30-day reference-only window.

**Critical fix during migration:** the Workday data model needed a custom field for plant-specific cycle override (so Chattanooga's 6-weeks-off LOTO cycle could persist without forcing it onto Cleveland's calendar). The Workday consultant initially resisted the customization; Dana and I overrode them. Right call — the override has been used 4x in the 6 months since.

## What didn't go well

I underestimated Maya's emotional attachment to the spreadsheet. She'd built it, maintained it, was rightly proud of how dependable it had been. The first week of migration discussions was tense — she felt the engagement was a verdict on her work. I should have led with the framing "this protects you from being the single point of failure" sooner. By Week 6 she was a champion of the migration. **Lesson: when displacing a long-tenured operator's tooling, the human is more important than the tooling for the first 2 weeks.**

## Stakeholders

- **Carl Rasmussen** (VP People) — sponsor; founder-family loyalist, conservative, signed off on every recommendation but slow.
- **Dana Reyes** (Senior HR Generalist) — engagement co-lead on the HR side; sharp, low-ego, executed flawlessly post-migration. The kind of operator who could run an HR generalist function for a Fortune 500 if she wanted to. Currently happy at Westmont.
- **Maya Ortiz** (EHS Coordinator, Cleveland) — initial reluctance, ended as champion. See "What didn't go well."
- **Joaquín Méndez** (Plant Manager, Ciudad Juárez) — useful counterweight on STPS-vs-OSHA distinctions; helped me avoid an early scoping mistake of assuming everything was OSHA.

## Files cross-reference

- Drive: `Westmont Cert-Tracking Audit Final.pdf`
- Drive: `Westmont Workday TL Migration Plan v3.xlsx`
- Drive: `Westmont — top 3 risks one-pager.pptx` (the deck Carl forwarded to the board)
- Gmail thread: subject "Re: Workday TL — go-live punch list"
- Slack: #westmont-cert-migration (workspace export)
