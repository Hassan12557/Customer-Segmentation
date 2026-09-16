import os
import joblib
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.compose import ColumnTransformer
from sklearn.decomposition import PCA
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# 1. LOAD RAW DATASET
data_path = "D:/Data Science Projects/Customer Segmentation/data/commerce dataset.csv"
df = pd.read_csv(data_path)

# Drop non-predictive ID column
if "customer_id" in df.columns:
    df = df.drop(columns=["customer_id"])

# 2. HANDLE MISSING VALUES
for col in df.columns[df.isnull().sum() > 0]:
    if pd.api.types.is_numeric_dtype(df[col]):
        df[col] = df[col].fillna(df[col].median())
    else:
        df[col] = df[col].fillna("None")

# 3. IDENTIFY FEATURE TYPES
num_cols = df.select_dtypes(
    include=["int64", "float64", "number"]
).columns.tolist()
cat_cols = df.select_dtypes(
    include=["object", "category", "string"]
).columns.tolist()

# 4. DEFINE PREPROCESSING TRANSFORMER
preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), num_cols),
        (
            "cat",
            OneHotEncoder(
                sparse_output=False, drop="first", handle_unknown="ignore"
            ),
            cat_cols,
        ),
    ]
)

# 5. BUILD END-TO-END PIPELINE (Preprocess -> PCA -> KMeans)
full_pipeline = Pipeline(
    [
        ("preprocessor", preprocessor),
        ("pca", PCA(n_components=2, random_state=42)),
        ("kmeans", KMeans(n_clusters=4, random_state=42, n_init=10)),
    ]
)

# 6. FIT PIPELINE ON ENTIRE DATASET
print("Training full pipeline (Preprocessing + PCA + K-Means)...")
full_pipeline.fit(df)

# 7. SAVE PIPELINE TO MODELS DIRECTORY
os.makedirs("models", exist_ok=True)
model_path = "models/full_pipeline.pkl"
joblib.dump(full_pipeline, model_path)

print(f"Pipeline successfully fitted and exported to '{model_path}'!")
