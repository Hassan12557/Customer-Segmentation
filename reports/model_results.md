# Clustering Model Results & Customer Profiling

## 1. Algorithm & Diagnostics
* **Selected Model:** K-Means Clustering
* **Optimal Cluster Count ($K$):** $K = 4$
* **Diagnostic Evaluation:**
  * **Elbow Method:** Showed clear diminishing returns in Inertia reduction after $K = 4$.
  * **Silhouette Score:** Reached an optimal balance peak of **0.3975** at $K = 4$ (Scores significantly dropped for $K \ge 5$).

## 2. Cluster Profiles Summary

| Metric | Cluster 0 (Blue) | Cluster 1 (Orange) | Cluster 2 (Green) | Cluster 3 (Red) |
| :--- | :--- | :--- | :--- | :--- |
| **Persona Label** | Active Regulars | VIP Champions | Dormant Low-Value | At-Risk VIPs |
| **Customer Count** | 18,064 (36%) | 14,909 (30%) | 10,200 (20%) | 6,827 (14%) |
| **Avg Spend ($)** | $22,345.05 | $95,004.10 | $12,561.50 | $82,780.55 |
| **Avg Purchases** | 80.45 | 141.04 | 48.31 | 135.07 |
| **Recency (Days Inactive)** | 18.13 | 18.15 | 130.55 | 178.54 |
| **Satisfaction Score (1-5)** | 3.39 | 3.18 | 2.41 | 2.50 |

## 3. Strategic Recommendations
* **Cluster 1 (VIP Champions):** Enroll in VIP loyalty programs, grant early access to new feature releases, and offer premium rewards.
* **Cluster 0 (Active Regulars):** Provide cross-selling bundles and volume discount thresholds to elevate spending into the VIP tier.
* **Cluster 3 (At-Risk VIPs):** **High Priority.** Deploy targeted win-back campaigns and personalized support outreach to recover churn-risk spenders.
* **Cluster 2 (Dormant Low-Value):** Rely on automated, low-cost email marketing sequences; avoid heavy ad spend.