from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional

# --- Auth Schemas ---
class SignUpRequest(BaseModel):
    name: str = Field(..., min_length=2, example="Hassan Raza")
    email: EmailStr = Field(..., example="dev@example.com")
    password: str = Field(..., min_length=6, example="securepassword123")

class LoginRequest(BaseModel):
    email: EmailStr = Field(..., example="dev@example.com")
    password: str = Field(..., example="securepassword123")

class OTPVerifyRequest(BaseModel):
    email: EmailStr
    otp_code: str = Field(..., min_length=6, max_length=6, example="123456")

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

# --- Predict Schemas ---
class PredictRequest(BaseModel):
    total_spend: float = Field(..., ge=0, le=5000, description="Total dollar spend", example=450.0)
    days_inactive: int = Field(..., ge=0, le=365, description="Days since last activity", example=45)
    satisfaction_score: int = Field(..., ge=1, le=5, description="1 to 5 rating", example=2)

class PredictResponse(BaseModel):
    cluster_id: int
    persona_title: str
    status_badge: str
    description: str
    strategies: List[str]
    input_summary: dict

# --- Contact Form Schemas ---
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    message: str = Field(..., min_length=5)

class ContactResponse(BaseModel):
    status: str
    message: str
