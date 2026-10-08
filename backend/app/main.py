# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import JSONResponse
# from app.api import auth, predict, contact
#
# app = FastAPI(
#     title="CustomerPredictor AI API",
#     description="REST API for customer segmentation inference and user authentication.",
#     version="1.0.0"
# )
#
# # Enable CORS for React Frontend Development
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:5173",  # Vite Dev Server
#         "http://127.0.0.1:5173",
#         "http://localhost:3000",
#         "http://127.0.0.1:3000",
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
#
# # Global Exception Handler to capture backend crashes and preserve CORS headers
# @app.exception_handler(Exception)
# async def global_exception_handler(request: Request, exc: Exception):
#     return JSONResponse(
#         status_code=500,
#         content={"detail": f"Internal Server Error: {str(exc)}"},
#         headers={"Access-Control-Allow-Origin": "*"}
#     )
#
# # Register API v1 Routers
# app.include_router(auth.router, prefix="/api/v1")
# app.include_router(predict.router, prefix="/api/v1")
# app.include_router(contact.router, prefix="/api/v1")
#
# @app.get("/")
# def root_check():
#     return {
#         "status": "online",
#         "service": "CustomerPredictor AI Engine",
#         "version": "1.0.0"
#     }
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, predict, contact

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