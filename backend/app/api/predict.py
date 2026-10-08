# from fastapi import APIRouter
# from app.schemas.schemas import PredictRequest, PredictResponse
# from app.ml.predictor import predictor_service
#
# router = APIRouter(tags=["ML Prediction"])
#
# @router.post("/predict", response_model=PredictResponse)
# def predict_customer_persona(payload: PredictRequest):
#     result = predictor_service.predict(
#         total_spend=payload.total_spend,
#         days_inactive=payload.days_inactive,
#         satisfaction_score=payload.satisfaction_score
#     )
#     return result
from fastapi import APIRouter, HTTPException
from app.schemas.schemas import PredictRequest, PredictResponse
import joblib
import os

router = APIRouter()

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "full_pipeline.pkl")

# Load model pipeline
pipeline = None
if os.path.exists(MODEL_PATH):
    try:
        pipeline = joblib.load(MODEL_PATH)
        print("[MODEL] Pipeline loaded successfully.")
    except Exception as e:
        print(f"[MODEL ERROR] Could not load model file: {e}")

@router.post("/predict", response_model=PredictResponse)
def predict_customer_segment(req: PredictRequest):
    try:
        # Segment Classification Logic / Heuristics fallback
        spend = req.total_spend
        inactive = req.days_inactive
        satisfaction = req.satisfaction_score

        if spend < 500 or inactive > 60 or satisfaction <= 2:
            title = "Churned / Lapsed Customer"
            badge = "High Risk"
            desc = "Strong churn signals detected. Customer has disengaged due to low frequency or poor experience."
            strats = [
                "Send a win-back email with a personalized discount offer",
                "Deploy a satisfaction survey to identify root pain points",
                "Offer a limited-time incentive to re-engage"
            ]
            cluster = 0
        elif spend >= 1000 and inactive <= 30 and satisfaction >= 4:
            title = "High-Value Loyal Champions"
            badge = "VIP Segment"
            desc = "Top-tier loyal customer with high purchase value and consistent engagement."
            strats = [
                "Invite to an exclusive VIP rewards program",
                "Provide early access to new product releases",
                "Request product reviews and testimonials"
            ]
            cluster = 1
        else:
            title = "Moderate Potential Customer"
            badge = "Growth Potential"
            desc = "Consistent purchase history with room for basket-size expansion."
            strats = [
                "Cross-sell complementary products",
                "Trigger automated follow-up emails after purchase",
                "Provide tier-based reward milestones"
            ]
            cluster = 2

        return PredictResponse(
            cluster_id=cluster,
            persona_title=title,
            status_badge=badge,
            description=desc,
            strategies=strats,
            input_summary={
                "total_spend": spend,
                "days_inactive": inactive,
                "satisfaction_score": satisfaction
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")