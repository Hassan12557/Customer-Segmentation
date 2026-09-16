import os
import joblib
import pandas as pd

# 1. LOAD TRAINED PIPELINE
pipeline_path ="D:/Data Science Projects/Customer Segmentation/models/full_pipeline.pkl"

if not os.path.exists(pipeline_path):
    raise FileNotFoundError(
        f"Pipeline not found at '{pipeline_path}'. Run src/train_pipeline.py first!"
    )

pipeline = joblib.load(pipeline_path)
print("Pipeline loaded successfully!")

# 2. LOAD SAMPLE RAW DATA (FIRST 5 CUSTOMERS)
data_path = "D:/Data Science Projects/Customer Segmentation/data/commerce dataset.csv"
sample_df = pd.read_csv(data_path).head(5)

# Drop non-predictive ID column if present
if "customer_id" in sample_df.columns:
    sample_df = sample_df.drop(columns=["customer_id"])

# 3. HANDLE MISSING VALUES (INFERENCE CLEANING)
for col in sample_df.columns[sample_df.isnull().sum() > 0]:
    if pd.api.types.is_numeric_dtype(sample_df[col]):
        sample_df[col] = sample_df[col].fillna(sample_df[col].median())
    else:
        sample_df[col] = sample_df[col].fillna("None")

# 4. RUN PREDICTIONS
predicted_clusters = pipeline.predict(sample_df)

# 5. EXTRACT 2D PCA COORDINATES (PC1, PC2)
X_scaled_encoded = pipeline.named_steps["preprocessor"].transform(sample_df)
pca_coords = pipeline.named_steps["pca"].transform(X_scaled_encoded)

# 6. COMBINE & PRINT TEST RESULTS
results_df = pd.DataFrame(
    {
        "Customer_Index": range(1, len(sample_df) + 1),
        "PC1": pca_coords[:, 0].round(3),
        "PC2": pca_coords[:, 1].round(3),
        "Predicted_Cluster": predicted_clusters,
    }
)

# Map numeric cluster to human-readable Persona
persona_map = {
    0: "Active Regulars",
    1: "VIP Champions",
    2: "Dormant Low-Value",
    3: "At-Risk VIPs",
}
results_df["Persona"] = results_df["Predicted_Cluster"].map(persona_map)

print("\n=== PIPELINE PREDICTION TEST RESULTS ===")
print(results_df.to_string(index=False))
print("\nPipeline test passed successfully!")
