from fastapi import APIRouter
from app.schemas.schemas import PredictRequest, PredictResponse
from app.ml.predictor import predictor_service

router = APIRouter(tags=["ML Prediction"])

@router.post("/predict", response_model=PredictResponse)
def predict_customer_persona(payload: PredictRequest):
    result = predictor_service.predict(
        total_spend=payload.total_spend,
        days_inactive=payload.days_inactive,
        satisfaction_score=payload.satisfaction_score
    )
    return result
