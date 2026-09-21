from pydantic import BaseModel, Field
from typing import List, Dict, Any

# Authentication Schemas
class UserRegister(BaseModel):
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

# Customer Metrics Input (Includes standard + expanded features)
class CustomerMetricsInput(BaseModel):
    total_spend: float = Field(..., ge=0, description="Total Spend in USD")
    days_since_last_purchase: int = Field(..., ge=0, description="Days inactive")
    satisfaction_score: int = Field(..., ge=1, le=5, description="1-5 Star rating")
    total_purchases: int = Field(default=5, ge=0)
    avg_basket_size: float = Field(default=2.0, ge=0.0)
    support_tickets: int = Field(default=0, ge=0)

# Prediction Response Schema
class StrategyItem(BaseModel):
    id: int
    text: str

class PredictionResponse(BaseModel):
    persona_title: str
    description: str
    recommended_strategies: List[str]
    input_summary: Dict[str, Any]