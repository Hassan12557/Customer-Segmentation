from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, predict, contact

app = FastAPI(
    title="CustomerPredictor AI API",
    description="REST API for customer segmentation inference and user authentication.",
    version="1.0.0"
)

# Enable CORS for React Frontend Development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite Dev Server
        "http://localhost:3000",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 Routers
app.include_router(auth.router, prefix="/api/v1")
app.include_router(predict.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")

@app.get("/")
def root_check():
    return {
        "status": "online",
        "service": "CustomerPredictor AI Engine",
        "version": "1.0.0"
    }
