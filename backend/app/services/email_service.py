import smtplib
import random
import ssl
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# In-memory OTP storage
otp_store = {}

# Gmail SMTP Configuration using SSL (Port 465)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465

# REPLACEMENT REQUIRED: Put your real Gmail address and 16-character App Password here
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "muhammadhassanrazabscs@gmail.com")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "ksoj htzr zfpw qktq")

def generate_otp(email: str) -> str:
    otp = f"{random.randint(100000, 999999)}"
    otp_store[email] = otp
    return otp

def verify_otp_code(email: str, code: str) -> bool:
    stored_otp = otp_store.get(email)
    if stored_otp and stored_otp == str(code).strip():
        del otp_store[email]  # Clear OTP after successful single use
        return True
    return False

def send_otp_email(to_email: str, otp_code: str):
    subject = "Your CustomerPredictor Verification Code"
    body = f"""Hello,

Your verification code for CustomerPredictor is: {otp_code}

Please enter this code on the website to complete your account setup.

Best regards,
CustomerPredictor Team"""

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT, context=context) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
        print(f"[SMTP SUCCESS] Real OTP email sent to {to_email}")
        return True
    except Exception as e:
        print(f"[SMTP ERROR] Could not send email via SMTP: {e}")
        print(f"[DEV FALLBACK] Verification OTP for {to_email} is: {otp_code}")
        return False