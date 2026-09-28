from fastapi import APIRouter
from app.schemas.schemas import ContactRequest, ContactResponse

router = APIRouter(tags=["Contact Form"])

@router.post("/contact", response_model=ContactResponse)
def submit_contact_form(payload: ContactRequest):
    print(f"Message received from {payload.name} ({payload.email}): {payload.message}")
    return {
        "status": "success",
        "message": "Thank you for reaching out! Your message has been received."
    }
