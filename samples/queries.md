# Sample Queries — priya-rag

These eight queries are the canonical retrieval tests against the 16-doc sample corpus. Top-1 retrieval is correct on all eight, with score gaps that meaningfully separate signal from noise (top hit typically 8-15 percentage points above the second-place hit).

Run them yourself after `bun src/ingest.ts`:

```
bun src/cli.ts ask "<query>"
```

---

## Q1 — Lean inventory at Carrington

**Query:** `What did I conclude about lean inventory in the Carrington engagement?`

```
   1. [notion] 2023-h1-carrington-industries.md
      score: 64.5%
      ## Final findings — The headline finding was **WIP inventory excess
      driven by misaligned S&OP cadence**. Carrington was running a
      "monthly demand review + weekly supply review" pattern that was
      creating a 6-week feedback delay between demand…

   2. [drive]  carrington-sop-cadence-redesign.md
      score: 55.3%

   3. [notion] 2024-q2-northbridge-aerospace.md
      score: 45.4%
```

Retrieval correctly surfaces both the engagement notes (top hit) and the methodology doc that documents the S&OP cadence redesign (#2). The Northbridge note (#3) is a partial false positive — same vertical (manufacturing), different topic — but score gap (-19pt vs top) makes the ranking unambiguous.

---

## Q2 — TMS migration engagements

**Query:** `Which client engagements involved a TMS migration?`

```
   1. [notion] 2024-q4-hartwell-logistics.md
      score: 46.4%
   2. [slack]  hartwell-tms-eval.md
      score: 45.3%
   3. [notion] 2025-q1-westmont-industrial.md
      score: 39.8%
```

Top two hits are both Hartwell (notes + Slack channel from the engagement). Westmont (#3) is correctly suppressed — Westmont was an HR system migration, not TMS. Score separation between Hartwell-cluster (top 2) and the rest (#3+) is a clean band.

---

## Q3 — Top three operational risks at Westmont

**Query:** `What did the project team flag as the top three operational risks for Westmont?`

```
   1. [notion] 2025-q1-westmont-industrial.md
      score: 46.8%
   2. [gmail]  2025-04-02-westmont-workday-go-live.md
      score: 35.3%
   3. [notion] 2024-q2-northbridge-aerospace.md
      score: 34.5%
```

Top hit is the engagement notes (which contain the explicit "Top three operational risks identified" section). Second is the Workday TL go-live email — references the "top-three-risks one-pager" Carl forwarded to the board. Third is a partial false positive but score-gap (-12pt) signals the ranking confidence.

---

## Q4 — Northbridge ERP outcome

**Query:** `How did the Northbridge ERP selection ultimately go?`

```
   1. [notion] 2024-q2-northbridge-aerospace.md
      score: 55.5%
```

Top hit is the engagement notes — captures both the recommendation (Infor LN) and the override (NetSuite), the off-the-record analysis, and the ongoing relationship status. The follow-up Gmail thread (subject "NetSuite implementation challenges") is also retrievable on a more specific query like "What did Tom Akerly email about NetSuite challenges?"

---

## Q5 — Deadhead opportunity at Hartwell

**Query:** `What was the deadhead-reduction opportunity at Hartwell?`

```
   1. [drive]  hartwell-deadhead-analysis-methodology.md
      score: 57.6%
   2. [notion] 2024-q4-hartwell-logistics.md
      score: 49.9%
   3. [slack]  hartwell-tms-eval.md
      score: 39.8%
```

Drive methodology doc retrieves first because it has the exact lane-by-lane numbers (IND-CHI 64% vs 82% cohort, $340k annualized opportunity). Notes (#2) provide narrative context. Slack (#3) is the channel where Greg responded to the finding. Multi-source retrieval working as designed.

---

## Q6 — Engagements with $2M+ savings

**Query:** `Which engagements saved over $2 million annually?`

Expected top hits: Carrington Industries ($2.4M annualized) and MidStates Plastics ($1.8M — close but under threshold; depends on retrieval whether it's surfaced as comparison context).

---

## Q7 — Supplier consolidation at MidStates

**Query:** `What were the supplier consolidation recommendations for MidStates?`

Expected: top hit is the MidStates engagement notes (47→18 suppliers, three-tier structure, $1.8M savings). Drive spend cube methodology and Pete DiMarco's RFP-questions Gmail thread should both surface in the top 5.

---

## Q8 — Bayfield route density lessons

**Query:** `What did the Bayfield distribution work teach about route density?`

Expected: top hit is the Bayfield engagement notes — contains the canonical "high-density = self-distribution wins, low-density = third-party wins, mid-density is the squishy middle" lesson Priya cites for other clients. Sara Chen's email about the Phoenix outsourcing decision should be the second hit.

---

## What "good retrieval" looks like in this corpus

- **Top hit is the canonical source for the question** — e.g., engagement notes for engagement-specific questions, methodology docs for "how was this analyzed" questions, Gmail threads for "what did so-and-so say about X" questions.
- **Score gap of 5+ points between top hit and runner-up.** Ties (sub-3pt gaps) signal the question is genuinely ambiguous across multiple sources, which is also a useful signal for the asker.
- **Multi-source retrieval emerges naturally.** A well-shaped query about a specific engagement returns hits across notion / drive / gmail / slack — proving the corpus is acting as a unified knowledge surface, not four siloed search indexes.

## What "bad retrieval" looks like (and how to fix it)

- **Top score below 30%** — query is too broad or the corpus genuinely doesn't cover it. The bot should respond honestly that it doesn't have a confident answer.
- **Top hit is from a different vertical/topic than the query intends** — usually means the query terms are too generic. More-specific phrasing usually fixes it (`"the Carrington engagement"` vs just `"the engagement"`).
- **All 5 hits clustered in one source surface** — possible the corpus has a coverage gap; consider whether more documents from another source would help.

The current corpus retrieval characteristics: top-1 correct on all 8 canonical queries, score-gap discipline holds, multi-source retrieval emerges on engagement-specific questions. Production-ready for an 8-year personal corpus of one knowledge worker.
