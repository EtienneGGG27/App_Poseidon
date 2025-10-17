from sqlalchemy import Column, Float, Integer, DateTime, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from ..db.base import Base


class Observation(Base):
    __tablename__ = "observations"

    time = Column(DateTime, primary_key=True)
    zone_id = Column(UUID(as_uuid=True), ForeignKey("zones.id"), primary_key=True)
    departures = Column(Integer)
    wave_height = Column(Float)
    wind_speed = Column(Float)
    wind_direction = Column(String(10))
    tide_coefficient = Column(Integer)
    tide_time = Column(DateTime)
    source = Column(String(50))