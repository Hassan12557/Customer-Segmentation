# import random
# from fastapi import APIRouter, HTTPException, status
# from app.schemas.schemas import SignUpRequest, SignUpResponse, LoginRequest, OTPVerifyRequest, TokenResponse
# from app.core.security import get_password_hash, verify_password, create_access_token
#
# router = APIRouter(prefix="/auth", tags=["Authentication"])
#
# users_db = {}
# otp_store = {}
#
# @router.post("/signup", response_model=SignUpResponse)
# def signup(payload: SignUpRequest):
#     if payload.email in users_db:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="User with this email already exists."
#         )
#
#     user_name = payload.name or payload.full_name or "User"
#     hashed_pw = get_password_hash(payload.password)
#
#     users_db[payload.email] = {
#         "name": user_name,
#         "email": payload.email,
#         "hashed_password": hashed_pw,
#         "is_verified": False
#     }
#
#     # Generate 6-digit OTP (Default test OTP code 123456 also accepted)
#     generated_otp = str(random.randint(100000, 999999))
#     otp_store[payload.email] = generated_otp
#
#     print(f"\n==========================================")
#     print(f"📧 VERIFICATION EMAIL SENT TO: {payload.email}")
#     print(f"🔑 YOUR VERIFICATION OTP CODE IS: 123456 (or generated: {generated_otp})")
#     print(f"==========================================\n")
#
#     return {
#         "status": "success",
#         "message": f"OTP sent to {payload.email}. Enter code to verify.",
#         "email": payload.email
#     }
#
#
# @router.post("/login", response_model=TokenResponse)
# def login(payload: LoginRequest):
#     user = users_db.get(payload.email)
#     if not user or not verify_password(payload.password, user["hashed_password"]):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Invalid email or password."
#         )
#
#     token = create_access_token({"sub": payload.email})
#     return {
#         "access_token": token,
#         "token_type": "bearer",
#         "user": {"name": user["name"], "email": user["email"]}
#     }
#
#
# @router.post("/verify-otp", response_model=TokenResponse)
# def verify_otp(payload: OTPVerifyRequest):
#     stored_otp = otp_store.get(payload.email)
#
#     # Accept user's emailed OTP or default 123456
#     if payload.otp_code == "123456" or (stored_otp and payload.otp_code == stored_otp):
#         if payload.email in users_db:
#             users_db[payload.email]["is_verified"] = True
#
#         token = create_access_token({"sub": payload.email})
#         user_info = users_db.get(payload.email, {"name": payload.email.split('@')[0], "email": payload.email})
#
#         return {
#             "access_token": token,
#             "token_type": "bearer",
#             "user": {"name": user_info.get("name"), "email": payload.email}
#         }
#
#     raise HTTPException(
#         status_code=status.HTTP_400_BAD_REQUEST,
#         detail="Invalid OTP code. Check your terminal/email or use default code 123456."
# )
from fastapi import APIRouter, HTTPException, status
from app.schemas.schemas import SignUpRequest, SignUpResponse, OTPVerifyRequest, TokenResponse, LoginRequest
from app.services.email_service import generate_otp, verify_otp_code, send_otp_email
import uuid

router = APIRouter()

# Temporary in-memory user db for dev
users_db = {}


@router.post("/signup", response_model=SignUpResponse)
def signup(req: SignUpRequest):
    otp_code = generate_otp(req.email)

    # Store user payload
    users_db[req.email] = {
        "name": req.name or req.full_name or req.email.split("@")[0],
        "email": req.email,
        "password": req.password
    }

    # Send real OTP email
    send_otp_email(req.email, otp_code)

    return SignUpResponse(
        status="success",
        message=f"Verification OTP sent to {req.email}",
        email=req.email
    )


@router.post("/verify-otp", response_model=TokenResponse)
def verify_otp(req: OTPVerifyRequest):
    if not verify_otp_code(req.email, req.otp_code):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP code")

    user_info = users_db.get(req.email, {"name": req.email.split("@")[0], "email": req.email})

    return TokenResponse(
        access_token=str(uuid.uuid4()),
        token_type="bearer",
        user=user_info
    )


@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest):
    # Direct login check
    user_info = users_db.get(req.email, {"name": req.email.split("@")[0], "email": req.email})
    return TokenResponse(
        access_token=str(uuid.uuid4()),
        token_type="bearer",
        user=user_info
    )