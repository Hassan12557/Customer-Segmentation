import os
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

# 1. Load clustered datasets
df_pca = pd.read_csv("data/processed/pca_with_clusters.csv")
df_original = pd.read_csv("data/processed/clustered_customer_data.csv")

# -------------------------------------------------------------
# STEP 1: VISUALIZE 2D CLUSTERS IN PCA SPACE
# -------------------------------------------------------------
plt.figure(figsize=(10, 6))
sns.scatterplot(
    data=df_pca,
    x="PC1",
    y="PC2",
    hue="Cluster",
    palette="tab10",
    alpha=0.6,
    s=20,
)

plt.title(
    "Customer Segments in 2D PCA Space (K=4)", fontsize=13, fontweight="bold"
)
plt.xlabel("Principal Component 1 (PC1)", fontsize=11)
plt.ylabel("Principal Component 2 (PC2)", fontsize=11)
plt.legend(title="Cluster", bbox_to_anchor=(1.05, 1), loc="upper left")
plt.tight_layout()

os.makedirs("EDA", exist_ok=True)
plt.savefig("EDA/cluster_2d_scatter.png")
plt.show()

# -------------------------------------------------------------
# STEP 2: PROFILE KEY METRICS BY CLUSTER
# -------------------------------------------------------------
profile_cols = [
    "total_spent_usd",
    "total_purchases",
    "days_since_last_purchase",
    "satisfaction_score",
    "age",
    "tenure_months",
]
available_cols = [c for c in profile_cols if c in df_original.columns]

# Calculate mean values for each cluster
cluster_profile = (
    df_original.groupby("Cluster")[available_cols].mean().round(2)
)
cluster_profile["Customer_Count"] = df_original["Cluster"].value_counts()

print("=== CLUSTER PROFILES (MEANS) ===")
print(cluster_profile.T)

# Save cluster profile report
cluster_profile.to_csv("data/processed/cluster_profiles_summary.csv")
print("\nProfile report saved to 'data/processed/cluster_profiles_summary.csv'")
