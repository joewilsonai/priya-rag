# MidStates Plastics — Spend Cube Methodology Q3 2023

**Author:** Priya Banerjee
**Client:** MidStates Plastics
**Date:** October 2023
**File location:** Drive › Clients › MidStates › 02-Spend-Analysis

---

## Purpose

This methodology documents how the MidStates Q3 2023 spend cube was built, the data sources, the categorization rules, and the "leverage threshold" computation that drove the supplier consolidation recommendations.

The cube identified $14.6M in raw-material spend across 47 active suppliers and surfaced the 65% concentration in three commodity categories (HDPE, PP, ABS) that drove the RFP recommendation.

## Data inputs

Three sources, normalized in Excel:

1. **NetSuite GL extract** — all PO lines for raw materials, Q1 2022 through Q3 2023 (7 quarters trailing). 4,200 line items.
2. **AP master vendor list** — vendor name, vendor ID, payment terms, vendor since-date, supplier risk score (where MidStates had one)
3. **Plant production logs** — resin consumption by SKU, calibration data for cost-per-pound checks

Period covered: trailing 7 quarters; FY 2023 forecast extended for run-rate normalization.

## Categorization rules

Every spend line categorized by:

- **Commodity family** (HDPE, PP, ABS, PET, specialty thermoplastic, additive, color masterbatch) — auto-classified by item description string-match, ~94% precision; the remaining 6% manually categorized by Sergei's team
- **Strategic / non-strategic** — strategic = annualized spend >$100k OR sole-source for a specialty resin
- **Tier (per recommended structure)** — Tier 1 (>$500k annualized + multi-year strategic), Tier 2 ($100-500k annualized), Tier 3 (<$100k OR ad-hoc)

## Leverage threshold computation

The "leverage threshold" is the spend volume at which a supplier should grant pricing concessions in exchange for committed volume. We computed it per commodity family:

- HDPE: $850k annual = 5% off market
- PP: $720k annual = 4% off market
- ABS: $640k annual = 5% off market

Below those thresholds, MidStates was paying spot-market or above. **The fragmentation discovery: 31 of 47 suppliers were below leverage threshold.** Hence the consolidation recommendation.

## Top findings

- Total raw-material spend: $14.6M annual run-rate (Q3 2023)
- Top 3 commodity families = 65% of spend (HDPE 28%, PP 22%, ABS 15%)
- Suppliers above leverage threshold per family: 0 (HDPE), 1 (PP), 0 (ABS)
- Spend at suppliers above leverage threshold: $1.9M (13% of total)
- Spend at suppliers below leverage threshold: $12.7M (87% of total)
- Therefore: 87% of spend was paying retail or above

The RFP for HDPE / PP / ABS closed market rates 9-14% better than the trailing prices. Annualized savings on the top-3 commodity families: $1.4M. Additional savings from tail-supplier rationalization (Tier 3 cleanup): $0.4M. Total: $1.8M annualized.

## Cross-references

- Drive: `MidStates Spend Cube Q3 2023.xlsx` — the actual spend cube workbook (8 tabs)
- Drive: `MidStates RFP Results — HDPE PP ABS — Nov 2023.pdf` — RFP responses + scoring
- Notion: `2023-q4-midstates-plastics.md` — engagement notes
- Gmail thread: subject "Re: RFP results — Pete's questions"
