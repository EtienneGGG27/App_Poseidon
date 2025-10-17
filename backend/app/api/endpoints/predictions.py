from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends

from ...db.base import get_db

router = APIRouter()


@router.get("/")
def get_predictions(
        zone_id: UUID = None,
        horizon: str = "7d",
        db: Session = Depends(get_db)
):
    # TODO: Implémenter avec le modèle ML

    # Données simulées pour le développement
    predictions = []
    days = 7

    for i in range(days):
        date = (datetime.now() + timedelta(days=i)).date()
        predictions.append({
            "date": date.isoformat(),
            "time_slots": [
                {
                    "start": "06:00",
                    "end": "12:00",
                    "probability": 85 + i * 2,
                    "confidence": 0.87,
                    "predicted_departures": {
                        "min": 8,
                        "max": 15,
                        "expected": 12
                    },
                    "risk_level": "high" if i < 3 else "medium"
                }
            ]
        })

    return {
        "zone_id": str(zone_id) if zone_id else None,
        "predictions": predictions,
        "model_version": "2.3.1",
        "accuracy": 87.3
    }