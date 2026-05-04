# Carrington Industries — S&OP Cadence Redesign Methodology

**Author:** Priya Banerjee
**Client:** Carrington Industries
**Date:** April 2023
**File location:** Drive › Clients › Carrington › 03-Methodology

---

## Purpose

This document describes the S&OP (Sales & Operations Planning) cadence redesign delivered to Carrington Industries, the diagnosis of bullwhip in their existing pattern, and the weekly-integrated cadence that replaced it. The redesign drove a 28% WIP-inventory reduction and was a key contributor to the $2.4M annualized inventory carrying-cost savings.

## The diagnosis: 6-week feedback delay

Carrington's pre-engagement cadence:

- **Monthly demand review** (1st Friday of month) — sales forecasts updated, communicated to ops
- **Weekly supply review** (every Wednesday) — production scheduling adjusts within month-locked demand assumptions
- **Quarterly capacity review** (1st month of quarter) — long-lead capex, capacity reservations

The structural problem: a demand signal that arrived at the Friday demand-review meeting could not affect raw-material orders for up to 6 weeks (next monthly review + 4-week raw-steel lead time). The sales-to-procurement feedback loop was operating on a frequency that was too low for Carrington's product velocity.

Result: bullwhip. Finished-goods variance (sales) ±8% week-over-week. Raw-material orders (procurement) ±35% week-over-week. The supply-chain amplification was 4.4x — well above industry-healthy 1.5-2x.

## The redesign: weekly integrated S&OP

Replaced three meetings with one:

- **Tuesday integrated S&OP** (90 minutes, weekly)
  - Sales forecast at SKU-family level (15 min)
  - Production schedule adjustments (20 min)
  - Procurement actions for the week (20 min)
  - Capacity flag-check (15 min)
  - Open-issue resolution (20 min)

Same group of people (sales, ops, procurement, finance), but now in the same room weekly with all four lenses present at the same time. Demand-supply-capacity feedback compressed from 6-week to 1-week.

## Roll-up granularity

Critical fix: forecasting moved from customer-level to SKU-family-level.

- Customer-level forecasts had MAPE of 22% (too noisy for 4-week lead times)
- Total-product-level forecasts had MAPE of 9% (too coarse to drive raw-material decisions)
- SKU-family-level (the redesign) had MAPE of 14% (right granularity for procurement decisions)

The SKU-family rollup logic was implemented as custom NetSuite saved-search logic owned by Janet Park (Carrington's demand planner). Documented separately in `Carrington-NetSuite-customizations.md`.

## Buffer-inventory rationalization (companion fix)

Within the new cadence, set role-specific reorder points by SKU velocity:

- **Fast-movers** (>50 cases/week): 2-week buffer
- **Mid-velocity** (10-50 cases/week): 4-week buffer
- **Slow-movers** (<10 cases/week): 6-week buffer
- **Dead stock** (no shipment in 18 months): one-time selloff, no reorder

Identified ~60 dead-stock SKUs (8% of total SKU count, 0.4% of revenue) — selloff freed $610k of working capital.

## Outcome metrics

- WIP turns: 8.2x → 11.5x (40% improvement)
- Inventory carrying cost: $9.8M → $7.4M annual ($2.4M saved)
- SKU-family forecast MAPE: 14% sustained over 18 months post-engagement
- Bullwhip ratio (raw-material variance ÷ finished-goods variance): 4.4x → 2.1x (within industry-healthy range)

## Transferability

This methodology has been used at three subsequent engagements (Westmont safety-cadence redesign, MidStates procurement-cadence integration, Northbridge production-planning rebuild). The underlying pattern — collapse multi-frequency cadences into a single weekly-integrated meeting with the right granularity of demand signal — is transferable across mid-market manufacturing verticals. The SKU-family rollup specifics differ by industry (automotive, fasteners, aerospace, plastics), but the cadence shape doesn't.
