# Exploratory Data Analysis (EDA) & Preprocessing Report

## 1. Dataset Overview
* **Raw Dataset Size:** 50,000 rows × 53 columns
* **Target Variable:** None (Unsupervised Learning)
* **Primary Key Removed:** `customer_id` (Non-predictive identifier)

## 2. Preprocessing & Feature Engineering
* **Missing Value Imputation:**
  * Categorical text features filled with `"None"` (e.g., optional categories, missing social media presence).
  * Numerical missing values filled with column medians.
* **Categorical Encoding:** Applied `OneHotEncoder(drop="first")` across 30 text columns, expanding dataset dimensions from 53 to 469 numeric features.
* **Feature Scaling:** Standardized all numerical columns using `StandardScaler` ($Z$-score normalization) to equalize distance-based calculations for PCA and K-Means.

## 3. Dimensionality Reduction (PCA)
* **Target Components:** Reduced 469 preprocessed columns down to 2 Principal Components ($PC_1$ and $PC_2$).
* **Variance Retained:** $PC_1$ and $PC_2$ together capture **~25.78%** of the dataset's overall variance, providing clear spatial separation for 2D clustering.
* **Axis Interpretations (PCA Loadings):**
  * **PC1 (Horizontal Axis):** Heavy positive loadings on `total_spent_usd` and `total_purchases` (Measures Customer Value & Volume).
  * **PC2 (Vertical Axis):** Heavy positive loading on `days_since_last_purchase` and negative loading on `satisfaction_score` (Measures Inactivity & Frustration).