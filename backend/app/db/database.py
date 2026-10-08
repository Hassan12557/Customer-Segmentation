import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Uses local SQLite by default, or DATABASE_URL from cloud environment in production
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./customer_segmentation.db")

# SQLite needs check_same_thread=False; PostgreSQL does not
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()