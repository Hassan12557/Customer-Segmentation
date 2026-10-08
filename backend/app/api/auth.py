from fastapi import APIRouter, HTTPException, status
from app.schemas.schemas import SignUpRequest, SignUpResponse, OTPVerifyRequest, TokenResponse, LoginRequest
from app.services.email_service import generate_otp, verify_otp_code, send_otp_email
import uuid

router = APIRouter()

# Registered users database: { "email": { "name": ..., "email": ..., "password": ... } }
users_db = {}

# Pending registrations waiting for OTP verification
pending_users = {}

@router.post("/signup", response_model=SignUpResponse)
def signup(req: SignUpRequest):
    email = req.email.strip().lower()

    # 1. Check if an account is already fully registered
    if email in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists. Please log in instead."
        )

    # 2. Extract name
    name = getattr(req, "name", None) or getattr(req, "full_name", None) or email.split("@")[0]

    # 3. Store in pending users until OTP is verified
    pending_users[email] = {
        "name": name,
        "email": email,
        "password": req.password
    }

    # 4. Generate & send OTP
    otp_code = generate_otp(email)
    send_otp_email(email, otp_code)

    return SignUpResponse(
        status="success",
        message=f"Verification OTP sent to {email}",
        email=email
    )

@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(req: OTPVerifyRequest):
    email = req.email.strip().lower()

    if not verify_otp_code(email, req.otp_code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP code"
        )

    # Move user from pending to active registered users
    user_data = pending_users.pop(email, {
        "name": email.split("@")[0],
        "email": email,
        "password": ""
    })
    
    users_db[email] = user_data

    return TokenResponse(
        access_token=str(uuid.uuid4()),
        token_type="bearer",
        user={"name": user_data["name"], "email": email}
    )

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest):
    email = req.email.strip().lower()
    user = users_db.get(email)

    # Validate existing account & credentials
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account found with this email. Please sign up first."
        )

    if user.get("password") != req.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please try again."
        )

    return TokenResponse(
        access_token=str(uuid.uuid4()),
        token_type="bearer",
        user={"name": user["name"], "email": email}
    )