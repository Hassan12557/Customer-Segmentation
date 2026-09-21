from fastapi import APIRouter, HTTPException
import joblib
import pandas as pd
import os
from src.api.schemas import CustomerMetricsInput, PredictionResponse

router = APIRouter(prefix="", tags=["Inference"])

# Load serialized pipeline
MODEL_PATH = os.path.join("models", "full_pipeline.pkl")
pipeline = None

if os.path.exists(MODEL_PATH):
    try:
        pipeline = joblib.load(MODEL_PATH)
    except Exception as e:
        print(f"Warning: Could not load model pipeline: {e}")

# Business strategy mapping per cluster ID
PERSONA_MAP = {
    "At-Risk Customer": {
        "description": "This customer is showing early warning signs of disengagement. Timely intervention can retain them.",
        "strategies": [
            "Trigger a personalized re-engagement email sequence",
            "Offer a loyalty bonus or surprise discount",
            "Conduct a proactive check-in via preferred channel"
        ]
    },
    "VIP Customer": {
        "description": "High value, highly engaged customer with exceptional lifetime value.",
        "strategies": [
            "Invite to exclusive preview sales and product launches",
            "Assign dedicated priority customer support",
            "Offer early access to new feature releases"
        ]
    },
    "Loyal Active": {
        "description": "Consistent buyer with steady purchase frequency and high satisfaction.",
        "strategies": [
            "Enroll in tier-based loyalty program",
            "Encourage multi-item bundle purchases",
            "Request product reviews and testimonials"
        ]
    }
}


@router.post("/predict", response_model=PredictionResponse)
def predict_persona(metrics: CustomerMetricsInput):
    # Format input into Pandas DataFrame matching training features
    input_df = pd.DataFrame([{
        "Total_Spend": metrics.total_spend,
        "Days_Inactive": metrics.days_since_last_purchase,
        "Satisfaction_Score": metrics.satisfaction_score,
        "Total_Purchases": metrics.total_purchases,
        "Avg_Basket_Size": metrics.avg_basket_size,
        "Support_Tickets": metrics.support_tickets
    }])

    # Run pipeline inference if loaded, else rule-based fallback
    if pipeline:
        try:
            cluster_id = int(pipeline.predict(input_df)[0])
            # Map numeric cluster to persona name
            persona_titles = ["VIP Customer", "At-Risk Customer", "Loyal Active"]
            title = persona_titles[cluster_id % len(persona_titles)]
        except Exception:
            title = "At-Risk Customer" if metrics.days_since_last_purchase > 14 else "Loyal Active"
    else:
        # Business logic fallback if pickle file is not trained yet
        if metrics.days_since_last_purchase >= 20 or metrics.satisfaction_score <= 3:
            title = "At-Risk Customer"
        elif metrics.total_spend > 1000:
            title = "VIP Customer"
        else:
            title = "Loyal Active"

    persona_data = PERSONA_MAP.get(title, PERSONA_MAP["At-Risk Customer"])

    return {
        "persona_title": title,
        "description": persona_data["description"],
        "recommended_strategies": persona_data["strategies"],
        "input_summary": {
            "total_spend": f"${metrics.total_spend:,.0f}",
            "days_inactive": f"{metrics.days_since_last_purchase}d",
            "satisfaction": f"{metrics.satisfaction_score}/5 ★"
        }
    }