import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns

# 1. Load the dataset from your data folder
df = pd.read_csv("data/dataset/commerce dataset.csv")

# Create a 2x2 grid layout for our 4 charts
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# -------------------------------------------------------------
# CHART 1: BAR CHART (Customer Segments)
# Counts how many customers fall into each main segment
# -------------------------------------------------------------
sns.countplot(data=df, x="customer_segment", ax=axes[0, 0], palette="Set2")
axes[0, 0].set_title("1. Bar Chart: Customer Segment Breakdown")
axes[0, 0].set_xlabel("Customer Segment")
axes[0, 0].set_ylabel("Number of Customers")

# -------------------------------------------------------------
# CHART 2: HISTOGRAM (Total Spent Distribution)
# Shows how spending amounts spread across all 50,000 customers
# -------------------------------------------------------------
sns.histplot(
    data=df, x="total_spent_usd", bins=20, kde=True, ax=axes[0, 1], color="skyblue"
)
axes[0, 1].set_title("2. Histogram: Total Spent ($) Spread")
axes[0, 1].set_xlabel("Total Spent in USD")
axes[0, 1].set_ylabel("Customer Count")

# -------------------------------------------------------------
# CHART 3: BOX PLOT (Spending by Loyalty Tier)
# Highlights middle values and extreme high-spending outliers
# -------------------------------------------------------------
sns.boxplot(
    data=df, x="loyalty_tier", y="total_spent_usd", ax=axes[1, 0], palette="Set3"
)
axes[1, 0].set_title("3. Box Plot: Total Spent across Loyalty Tiers")
axes[1, 0].set_xlabel("Loyalty Tier")
axes[1, 0].set_ylabel("Total Spent in USD")

# -------------------------------------------------------------
# CHART 4: PIE CHART (Gender Distribution)
# Shows percentage share for simple categories with few options
# -------------------------------------------------------------
gender_counts = df["gender"].value_counts()
axes[1, 1].pie(
    gender_counts,
    labels=gender_counts.index,
    autopct="%1.1f%%",
    colors=["#ff9999", "#66b3ff"],
)
axes[1, 1].set_title("4. Pie Chart: Gender Share (%)")

# Adjust spacing between charts and show the window
plt.tight_layout()
plt.show()
