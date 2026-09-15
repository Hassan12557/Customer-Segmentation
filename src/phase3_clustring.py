import os
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# 1. Load PCA-reduced data from Phase 2 and original dataset
df_pca = pd.read_csv("data/processed/pca_customer_data.csv")
df_original = pd.read_csv("D:/Data Science Projects/Customer Segmentation/data/commerce dataset.csv")

# -------------------------------------------------------------
# STEP 1: TEST K-MEANS FROM K=2 TO K=8
# -------------------------------------------------------------
inertias = []
silhouette_scores = []
k_range = range(2, 9)

# Subsample 10,000 points for fast silhouette calculation
np.random.seed(42)
sample_idx = np.random.choice(len(df_pca), 10000, replace=False)
df_pca_sample = df_pca.iloc[sample_idx]

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(df_pca)

    inertias.append(kmeans.inertia_)
    score = silhouette_score(
        df_pca_sample, kmeans.predict(df_pca_sample)
    )
    silhouette_scores.append(score)
    print(
        f"Tested K={k} | Inertia: {kmeans.inertia_:.2f} | Silhouette Score: {score:.4f}"
    )

# -------------------------------------------------------------
# STEP 2: PLOT ELBOW & SILHOUETTE DIAGNOSTICS
# -------------------------------------------------------------
fig, ax1 = plt.subplots(figsize=(9, 5))

color = "tab:blue"
ax1.set_xlabel("Number of Clusters (K)", fontsize=11, fontweight="bold")
ax1.set_ylabel(
    "Inertia (Elbow Line)", color=color, fontsize=11, fontweight="bold"
)
ax1.plot(k_range, inertias, marker="o", color=color, linewidth=2)
ax1.tick_params(axis="y", labelcolor=color)

ax2 = ax1.twinx()
color = "tab:red"
ax2.set_ylabel(
    "Silhouette Score", color=color, fontsize=11, fontweight="bold"
)
ax2.plot(
    k_range,
    silhouette_scores,
    marker="s",
    color=color,
    linestyle="--",
    linewidth=2,
)
ax2.tick_params(axis="y", labelcolor=color)

plt.title(
    "Elbow Method & Silhouette Score for Optimal K",
    fontsize=13,
    fontweight="bold",
)
fig.tight_layout()
plt.savefig("elbow_silhouette_plot.png")
plt.show()


# -------------------------------------------------------------
# STEP 3: FIT FINAL MODEL WITH K=4 CLUSTERS
# -------------------------------------------------------------
optimal_k = 4
final_kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
df_pca["Cluster"] = final_kmeans.fit_predict(df_pca)
df_original["Cluster"] = df_pca["Cluster"]

# Save clustered datasets
os.makedirs("data/processed", exist_ok=True)
df_pca.to_csv("data/processed/pca_with_clusters.csv", index=False)
df_original.to_csv(
    "data/processed/clustered_customer_data.csv", index=False
)

print(f"\nSuccessfully segmented 50,000 customers into {optimal_k} clusters!")
print("Saved outputs to 'data/processed/clustered_customer_data.csv'")