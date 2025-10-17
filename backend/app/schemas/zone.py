from pydantic import BaseModel, UUID4
from datetime import datetime
from typing import Optional


class ZoneBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    radius_km: float
    priority: str
    active: bool = True


class ZoneCreate(ZoneBase):
    pass


class Zone(ZoneBase):
    id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ZoneWithRisk(Zone):
    current_probability: float
    risk_level: str
    active_patrols: int
    active_alerts: int