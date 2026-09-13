import os
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from sklearn.decomposition import PCA

# 1. Load the cleaned dataset from Phase 1
df_clean = pd.read_csv("data/processed/cleaned_customer_data.csv")
print(f"Loaded cleaned dataset with shape: {df_clean.shape}")

# -------------------------------------------------------------
# STEP 1: CALCULATE INFORMATION RETAINED (VARIANCE)
# -------------------------------------------------------------
pca_full = PCA()
pca_full.fit(df_clean)

# Calculate total percentage of data kept as we add components
cumulative_variance = np.cumsum(pca_full.explained_variance_ratio_)

# Draw a line plot showing how much information we keep
plt.figure(figsize=(8, 5))
plt.plot(
    range(1, len(cumulative_variance) + 1),
    cumulative_variance,
    color="b",
    linewidth=2,
)
plt.title("PCA Explained Variance vs. Number of Components")
plt.xlabel("Number of Features (Principal Components)")
plt.ylabel("Cumulative Information Retained")
plt.grid(True)
plt.savefig("pca_variance_plot.png")
plt.show()

# -------------------------------------------------------------
# STEP 2: REDUCE DATASET TO 2 SUPER-COLUMNS (PC1 & PC2)
# -------------------------------------------------------------
pca_2d = PCA(n_components=2)
pca_features = pca_2d.fit_transform(df_clean)

# Put the 2 new super-columns into a clean dataframe
df_pca = pd.DataFrame(pca_features, columns=["PC1", "PC2"])

# Save the reduced dataset to use in Phase 3 (Clustering)
os.makedirs("data/processed", exist_ok=True)
df_pca.to_csv("data/processed/pca_customer_data.csv", index=False)

total_info = sum(pca_2d.explained_variance_ratio_) * 100
print(f"Reduced Dataset Shape: {df_pca.shape}")
print(f"Total information retained in 2D space: {total_info:.2f}%")
print("Saved reduced data to 'data/processed/pca_customer_data.csv'")