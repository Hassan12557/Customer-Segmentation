
import math
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

# -------------------------------------------------------------
# STEP 1: LOAD THE DATASET
# -------------------------------------------------------------
df = pd.read_csv("D:/Data Science Projects/Customer Segmentation/data/commerce dataset.csv")

# -------------------------------------------------------------
# SECTION 1: OVERVIEW DASHBOARD (Original 4 Plots)
# -------------------------------------------------------------
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 1. Bar Chart: Customer Segments
sns.countplot(data=df, x="customer_segment", ax=axes[0, 0], palette="Set2")
axes[0, 0].set_title("1. Bar Chart: Customer Segment Breakdown")
axes[0, 0].set_xlabel("Customer Segment")
axes[0, 0].set_ylabel("Number of Customers")

# 2. Histogram: Total Spent ($)
sns.histplot(
    data=df, x="total_spent_usd", bins=20, kde=True, ax=axes[0, 1], color="skyblue"
)
axes[0, 1].set_title("2. Histogram: Total Spent ($) Spread")
axes[0, 1].set_xlabel("Total Spent in USD")
axes[0, 1].set_ylabel("Customer Count")

# 3. Box Plot: Spending across Loyalty Tiers
sns.boxplot(
    data=df, x="loyalty_tier", y="total_spent_usd", ax=axes[1, 0], palette="Set3"
)
axes[1, 0].set_title("3. Box Plot: Total Spent across Loyalty Tiers")
axes[1, 0].set_xlabel("Loyalty Tier")
axes[1, 0].set_ylabel("Total Spent in USD")

# 4. Pie Chart: Gender Breakdown
gender_counts = df["gender"].value_counts()
axes[1, 1].pie(
    gender_counts,
    labels=gender_counts.index,
    autopct="%1.1f%%",
    colors=["#ff9999", "#66b3ff"],
)
axes[1, 1].set_title("4. Pie Chart: Gender Share (%)")

plt.tight_layout()
plt.show()

# -------------------------------------------------------------
# SECTION 2: INDIVIDUAL PIE CHARTS FOR ALL CATEGORICAL COLUMNS
# Automatically creates pie charts for every text category column
# -------------------------------------------------------------

# Find all text/categorical columns (excluding customer_id and detailed text like city)
categorical_cols = df.select_dtypes(include=["object"]).columns.tolist()
if "customer_id" in categorical_cols:
    categorical_cols.remove("customer_id")
if "city" in categorical_cols:
    categorical_cols.remove("city")  # Too many unique cities for a pie chart

# Calculate grid size (4 pie charts per grid window)
num_cols = len(categorical_cols)
charts_per_page = 4

for i in range(0, num_cols, charts_per_page):
    page_cols = categorical_cols[i : i + charts_per_page]

    fig, axes = plt.subplots(2, 2, figsize=(14, 10))
    axes = axes.flatten()

    for idx, col_name in enumerate(page_cols):
        # Count values for this column
        counts = df[col_name].value_counts()

        # If a column has more than 5 unique groups (e.g., country), keep top 5 and group the rest as 'Other'
        if len(counts) > 5:
            top_counts = counts.iloc[:5]
            other_sum = pd.Series({"Other": counts.iloc[5:].sum()})
            counts = pd.concat([top_counts, other_sum])

        # Draw pie chart
        axes[idx].pie(counts, labels=counts.index, autopct="%1.1f%%")
        axes[idx].set_title(
            f"Pie Chart: {col_name.replace('_', ' ').title()}", fontsize=12
        )

    # Hide unused grid boxes if page has fewer than 4 charts
    for j in range(len(page_cols), 4):
        fig.delaxes(axes[j])

    plt.tight_layout()
    plt.show()