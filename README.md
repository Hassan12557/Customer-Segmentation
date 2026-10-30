# 🧠 Customer Segmentation & Prediction Platform (CustomerPredictor)

An end-to-end, containerized full-stack machine learning application designed to deliver real-time consumer persona predictions based on customer engagement metrics, spend behavior, and satisfaction scores. Built with a decoupled microservice architecture using **FastAPI** and **React**.

---

## 🚀 Key Features

* **Real-Time Persona Prediction**: Machine learning inference pipeline processing user behavioral metrics to classify customer segments.
* **Secure Authentication & OTP**: User registration and login flow protected by hashed passwords (`bcrypt`), JWT session tokens, and asynchronous email verification via One-Time Passcodes (OTP).
* **Fully Containerized Environment**: Standardized multi-container orchestration using **Docker Compose** for seamless local development and cloud deployment.
* **Developer-Friendly Workspace**: Fully optimized for **GitHub Codespaces** with automated proxy routing and hot-reloading.

---

## 🛠️ Tech Stack & Architecture

### **Backend (`/backend`)**
* **Language & Framework**: Python 3.11-slim, FastAPI
* **Database & ORM**: SQLite, SQLAlchemy
* **Security & Auth**: Passlib (`bcrypt`), UUID-based token sessions
* **Server**: Uvicorn (ASGI)

### **Frontend (`/frontend`)**
* **Framework**: React.js (Vite build tool)
* **Styling**: Tailwind CSS
* **HTTP Client**: Axios with dynamic request interceptors
* **Server**: Node.js 20-slim

### **Infrastructure & Deployment**
* **Orchestration**: Docker & Docker Compose
* **Proxy Routing**: Vite Development Server Proxy (routing `/api` to backend container)
* **Development Environment**: GitHub Codespaces

---

## ⚙️ Engineering Highlights & Solutions Implemented

During the end-to-end containerization and deployment of this application, several complex architectural challenges were successfully resolved:

1. **Native Binary Compatibility**: Replaced Alpine Linux base images with Debian-based `node:20-slim` containers to resolve missing native binary bindings for Vite and Rolldown build tools.
2. **Seamless Network Proxying**: Configured the Vite dev server proxy (`vite.config.js`) to route `/api/v1` requests directly to the internal Docker backend service (`http://backend:8000`), completely eliminating cross-origin connection refusals (`ERR_CONNECTION_REFUSED`) and gateway errors.
3. **Codespaces Port Visibility**: Adjusted GitHub Codespaces port forwarding configurations from private to public visibility to prevent authentication interception (`pf-signin`) loops on frontend-backend communication.
4. **Asynchronous Non-Blocking Auth**: Optimized the user signup pipeline by offloading synchronous SMTP email operations to FastAPI `BackgroundTasks`, ensuring instant HTTP responses and eliminating 504 Gateway Timeouts.

---

## 📁 Project Structure

```text
Customer-Segmentation/
├── backend/
│   ├── app/
│   │   ├── db/              # Database configuration & models (SQLite / SQLAlchemy)
│   │   ├── routers/         # API endpoints (Auth, Predictions)
│   │   ├── schemas/         # Pydantic validation schemas
│   │   └── services/        # ML inference and email OTP services
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (Auth modals, dashboards)
│   │   ├── services/        # Axios API integration (`api.js`)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```
 🚀 Getting Started Locally
Prerequisites
Docker & Docker Compose installed on your machine (or use GitHub Codespaces).

Installation & Running
Clone the repository:
Clone the repository:

Bash
git clone [https://github.com/Hassan12557/Customer-Segmentation.git](https://github.com/Hassan12557/Customer-Segmentation.git)
cd Customer-Segmentation
Build and launch the container stack:

Bash
docker compose up --build -d
Access the application:

Frontend UI: Open http://localhost:5173 (or via your Codespaces forwarded port).

Backend API Docs: Open http://localhost:8000/docs to explore interactive Swagger documentation.

👤 Author
Muhammad Hassan Raza

here is snapshot of my project
 <img width="1308" height="623" alt="1" src="https://github.com/user-attachments/assets/40639afa-0b4e-4d80-a360-6c8158c0021a" />
 <img width="1280" height="592" alt="2" src="https://github.com/user-attachments/assets/6583767c-f5c6-43d6-a473-0d26b9cc3252" />
<img width="1343" height="479" alt="3" src="https://github.com/user-attachments/assets/831d8bb2-8280-4645-bf5e-77b7594a824f" />
<img width="1326" height="632" alt="4" src="https://github.com/user-attachments/assets/3d31388f-0aa8-43ba-b94f-ae09a1cf3461" />
<img width="1217" height="621" alt="5" src="https://github.com/user-attachments/assets/4fb67f96-5531-45c4-b107-21a561d8570e" />
<img width="368" height="511" alt="6" src="https://github.com/user-attachments/assets/5a10f0bc-a016-44c2-89af-20798de9875e" />




