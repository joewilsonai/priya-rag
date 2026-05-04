# Hartwell Logistics — Deadhead Analysis Methodology

**Author:** Priya Banerjee
**Client:** Hartwell Logistics
**Date:** November 2024
**File location:** Drive › Clients › Hartwell › 04-Methodology

---

## Purpose

This methodology documents the deadhead-reduction analysis used during the Hartwell TMS engagement to identify lane-utilization improvement opportunities. Hartwell's dispatch team can rerun the analysis quarterly using the accompanying Python script (`hartwell-deadhead-analysis.py`) and the standard dispatch CSV export from McLeod LoadMaster.

The IND-CHI corridor finding (64% utilization vs 82% cohort) was identified using this exact methodology against 12 months of Hartwell dispatch data (Sep 2023 – Aug 2024).

## What "deadhead" means

Deadhead = unloaded miles driven by a truck. Most often the return leg of a one-way load when the dispatcher hasn't matched a backhaul. Less commonly: positioning miles between a load drop-off and the next load pickup.

Standard industry definition: utilization % = loaded-miles ÷ total-miles. A lane running at 80% utilization is operating with 20% deadhead.

## Data inputs

The script reads three CSV exports from the TMS:

1. **dispatch_loads.csv** — one row per load: load_id, origin_city, destination_city, miles, dispatch_date, driver_id, customer_id
2. **driver_routes.csv** — one row per truck-day: truck_id, driver_id, route_date, total_miles_driven
3. **lane_pairs.csv** (optional) — pre-computed origin-destination corridor mapping for normalization

If lane_pairs.csv isn't provided, the script auto-clusters origin-destination pairs by Euclidean distance (haversine) on city centroids.

## Computation

For each lane pair (e.g., IND→CHI):

1. Sum loaded-miles across all loads on that lane in the period
2. Sum total-miles driven by trucks running that lane in the period (from driver_routes.csv intersected with dispatch_loads.csv)
3. Utilization % = loaded ÷ total
4. Compare against industry cohort benchmark (we used DAT RateView 2024 lane benchmarks for similar mid-market regional 3PLs)

## Output

The script outputs `hartwell-deadhead-results.csv` with columns:

- lane_pair
- loaded_miles_qtr
- total_miles_qtr
- utilization_pct
- cohort_benchmark_pct
- delta_vs_cohort (negative = underperforming)
- annualized_margin_opportunity_usd (for lanes >5pt below cohort)

The "annualized_margin_opportunity_usd" estimate uses Hartwell's average per-mile contribution margin ($0.78/loaded-mile in 2024) and assumes recovery to cohort benchmark, less the estimated cost of a dedicated backhaul-brokerage dispatcher (we used $78k fully-loaded for the IND-CHI recommendation).

## Top findings (Hartwell 2024 H2)

| Lane | Util % | Cohort % | Delta | Annual margin opportunity |
|------|--------|----------|-------|---------------------------|
| IND-CHI | 64% | 82% | -18pt | $340k |
| LOU-NSH | 71% | 79% | -8pt | $135k |
| CIN-PHX | 58% | 73% | -15pt | $95k (lower volume than IND-CHI; pursued but smaller) |
| PIT-PHI | 78% | 80% | -2pt | (within tolerance, no action) |

The IND-CHI recommendation became the engagement's standalone deliverable: hire a dedicated dispatcher for backhaul brokerage on the worst 3 corridors. Estimated net annual margin contribution after the dispatcher cost: $390k+.

## Quarterly rerun

Greg Halloran's team runs this analysis at end of each quarter. Total time required: ~30 minutes once the data pipe from McLeod LoadMaster is established. Output is reviewed with Lena and Marcus in the Q-end ops review.

## Limitations

- Doesn't account for seasonality — Q4 deadhead is naturally higher across the industry due to retailer demand patterns. Always benchmark within-quarter.
- Doesn't model second-order effects of backhaul brokerage on driver retention (when drivers can predict full-load weeks, retention improves; this is real but not in this model).
- Cohort benchmarks shift over time. We used 2024 DAT RateView; refresh annually.
