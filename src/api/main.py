from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.auth import router as auth_router
from src.api.predict import router as predict_router

app = FastAPI(
    title="Customer Segmentation AI API",
    description="FastAPI Backend serving real-time ML customer persona predictions",
    version="1.0.0"
)

# Enable CORS for React frontend (default Vite dev server running on port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(auth_router)
app.include_router(predict_router)

@app.get("/")
def root():
    return {"status": "online", "message": "Customer Segmentation API is running."}

@app.get("/health")
def health_check():
    return {"status": "healthy"}