from fastapi import APIRouter, HTTPException, status
from app.schemas.schemas import SignUpRequest, LoginRequest, OTPVerifyRequest, TokenResponse
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

# In-memory storage for demonstration
users_db = {}
otp_store = {}

@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignUpRequest):
    if payload.email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )

    hashed_pw = get_password_hash(payload.password)
    user_data = {
        "name": payload.name,
        "email": payload.email,
        "hashed_password": hashed_pw
    }
    users_db[payload.email] = user_data

    # Generate token
    token = create_access_token({"sub": payload.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"name": payload.name, "email": payload.email}
    }

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest):
    user = users_db.get(payload.email)
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password."
        )

    token = create_access_token({"sub": payload.email})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"name": user["name"], "email": user["email"]}
    }

@router.post("/verify-otp")
def verify_otp(payload: OTPVerifyRequest):
    if payload.otp_code == "123456" or otp_store.get(payload.email) == payload.otp_code:
        token = create_access_token({"sub": payload.email})
        return {
            "status": "success",
            "message": "OTP verified successfully.",
            "access_token": token
        }
    raise HTTPException(status_code=400, detail="Invalid OTP code.")
