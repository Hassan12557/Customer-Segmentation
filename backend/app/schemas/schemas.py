from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any

# --- Auth Schemas ---
class SignUpRequest(BaseModel):
    name: Optional[str] = None
    full_name: Optional[str] = None
    email: EmailStr
    password: str

class SignUpResponse(BaseModel):
    status: str
    message: str
    email: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp_code: str = Field(..., example="123456")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

# --- Predict Schemas ---
class PredictRequest(BaseModel):
    total_spend: float = Field(..., ge=0, description="Total dollar spend", example=800.0)
    days_inactive: int = Field(..., ge=0, description="Days since last purchase", example=41)
    satisfaction_score: int = Field(..., ge=1, le=5, description="1 to 5 rating", example=4)

class PredictResponse(BaseModel):
    cluster_id: int
    persona_title: str
    status_badge: str
    description: str
    strategies: List[str]
    input_summary: Dict[str, Any]

# --- Contact Schemas ---
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    status: str
    message: str