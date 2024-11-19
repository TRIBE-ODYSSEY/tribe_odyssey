# app/api/endpoints/health.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.base import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Sprawdź połączenie z bazą danych
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "details": {
                "database_status": "up",
                "api_version": "1.0.0"
            }
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }