from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from ...db.base import get_db
from ...models.zone import Zone
from ...schemas.zone import Zone as ZoneSchema, ZoneWithRisk, ZoneCreate

router = APIRouter()


@router.get("/", response_model=List[ZoneWithRisk])
def get_zones(db: Session = Depends(get_db)):
    zones = db.query(Zone).filter(Zone.active == True).all()

    # Enrichir avec les données de risque (à implémenter)
    zones_with_risk = []
    for zone in zones:
        zone_dict = {
            "id": zone.id,
            "name": zone.name,
            "latitude": zone.latitude,
            "longitude": zone.longitude,
            "radius_km": zone.radius_km,
            "priority": zone.priority.value,
            "active": zone.active,
            "created_at": zone.created_at,
            "updated_at": zone.updated_at,
            "current_probability": 85.0,  # TODO: Calculer depuis le modèle ML
            "risk_level": "high",
            "active_patrols": 2,
            "active_alerts": 1
        }
        zones_with_risk.append(zone_dict)

    return zones_with_risk


@router.get("/{zone_id}", response_model=ZoneWithRisk)
def get_zone(zone_id: UUID, db: Session = Depends(get_db)):
    zone = db.query(Zone).filter(Zone.id == zone_id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Zone not found")

    # Enrichir avec risque
    return {
        **zone.__dict__,
        "current_probability": 85.0,
        "risk_level": "high",
        "active_patrols": 2,
        "active_alerts": 1
    }


@router.post("/", response_model=ZoneSchema)
def create_zone(zone: ZoneCreate, db: Session = Depends(get_db)):
    db_zone = Zone(**zone.dict())
    db.add(db_zone)
    db.commit()
    db.refresh(db_zone)
    return db_zone