from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI application instance Uvicorn looks for
app = FastAPI(
    title="Customer Segmentation & Persona AI API",
    description="Backend service for ML customer segmentation and authentication",
    version="1.0.0"
)

# Enable CORS for React frontend interaction (http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Route
@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Customer Segmentation API is running smoothly!"
    }