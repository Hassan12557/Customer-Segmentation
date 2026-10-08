from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, predict, contact
from app.db.database import Base, engine
# Create database tables automatically
Base.metadata.create_all(bind=engine)
app = FastAPI(title="Customer Segmentation API", version="1.0.0")

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api/v1
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(predict.router, prefix="/api/v1", tags=["Predictions"])
app.include_router(contact.router, prefix="/api/v1", tags=["Contact"])

@app.get("/")
def root():
    return {"status": "Backend running successfully"}