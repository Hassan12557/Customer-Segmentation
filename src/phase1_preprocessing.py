import os
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# 1. LOAD THE DATASET
data_path = "D:/Data Science Projects/Customer Segmentation/data/commerce dataset.csv"
df = pd.read_csv(data_path)

print(f"Original Dataset Shape: {df.shape}")

# -------------------------------------------------------------
# STEP 1: DROP UNNECESSARY ID COLUMNS
# -------------------------------------------------------------
if "customer_id" in df.columns:
    df = df.drop(columns=["customer_id"])
    print("Dropped 'customer_id' column.")

# -------------------------------------------------------------
# STEP 2: HANDLE MISSING VALUES
# -------------------------------------------------------------
# Check if a column is numeric before computing median
missing_cols = df.columns[df.isnull().sum() > 0]
for col in missing_cols:
    if pd.api.types.is_numeric_dtype(df[col]):
        df[col] = df[col].fillna(df[col].median())
    else:
        df[col] = df[col].fillna("None")

print(f"Remaining missing values across dataset: {df.isnull().sum().sum()}")

# -------------------------------------------------------------
# STEP 3: SEPARATE NUMERICAL AND CATEGORICAL FEATURES
# -------------------------------------------------------------
num_cols = df.select_dtypes(
    include=["int64", "float64", "number"]
).columns.tolist()
cat_cols = df.select_dtypes(
    include=["object", "category", "string"]
).columns.tolist()

# -------------------------------------------------------------
# STEP 4: SCALE NUMERICAL FEATURES
# -------------------------------------------------------------
scaler = StandardScaler()
df_scaled_num = pd.DataFrame(
    scaler.fit_transform(df[num_cols]), columns=num_cols
)

# -------------------------------------------------------------
# STEP 5: ENCODE CATEGORICAL FEATURES (ONE-HOT ENCODING)
# -------------------------------------------------------------
encoder = OneHotEncoder(
    sparse_output=False, drop="first", handle_unknown="ignore"
)
encoded_array = encoder.fit_transform(df[cat_cols])
encoded_col_names = encoder.get_feature_names_out(cat_cols)

df_encoded_cat = pd.DataFrame(encoded_array, columns=encoded_col_names)

# -------------------------------------------------------------
# STEP 6: COMBINE PROCESSED DATA & SAVE
# -------------------------------------------------------------
df_clean = pd.concat([df_scaled_num, df_encoded_cat], axis=1)

# Ensure folder exists and save output
os.makedirs("data/processed", exist_ok=True)
df_clean.to_csv("data/processed/cleaned_customer_data.csv", index=False)

print(f"Cleaned & Scaled Dataset Shape: {df_clean.shape}")
print("Cleaned data saved to 'data/cleaned_customer_data.csv'")