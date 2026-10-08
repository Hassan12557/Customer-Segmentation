from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import uuid

from app.db.database import get_db
from app.db.models import User
from app.schemas.schemas import SignUpRequest, SignUpResponse, OTPVerifyRequest, TokenResponse, LoginRequest
from app.services.email_service import generate_otp, verify_otp_code, send_otp_email

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Temporary cache for unverified signups prior to OTP verification
pending_users = {}

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/signup", response_model=SignUpResponse)
def signup(req: SignUpRequest, db: Session = Depends(get_db)):
    email = req.email.strip().lower()

    # Check database for existing registered user
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists. Please log in instead."
        )

    name = getattr(req, "name", None) or getattr(req, "full_name", None) or email.split("@")[0]

    # Cache user details until OTP verification completes
    pending_users[email] = {
        "full_name": name,
        "email": email,
        "password": req.password
    }

    otp_code = generate_otp(email)
    send_otp_email(email, otp_code)

    return SignUpResponse(
        status="success",
        message=f"Verification OTP sent to {email}",
        email=email
    )

@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(req: OTPVerifyRequest, db: Session = Depends(get_db)):
    email = req.email.strip().lower()

    if not verify_otp_code(email, req.otp_code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP code"
        )

    user_data = pending_users.pop(email, None)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Signup session expired or not found. Please sign up again."
        )

    # Persist verified user into SQLite database
    new_user = User(
        full_name=user_data["full_name"],
        email=email,
        hashed_password=hash_password(user_data["password"]),
        is_verified=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return TokenResponse(
        access_token=str(uuid.uuid4()),
        token_type="bearer",
        user={"name": new_user.full_name, "email": new_user.email}
    )

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    email = req.email.strip().lower()
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account found with this email. Please sign up first."
        )

    if not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password. Please try again."
        )

    return TokenResponse(
        access_token=str(uuid.uuid4()),
        token_type="bearer",
        user={"name": user.full_name, "email": user.email}
    )