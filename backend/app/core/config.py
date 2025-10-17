from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "Poseidon API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/poseidon"
    DATABASE_URL_ASYNC: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/poseidon"

    # Security
    SECRET_KEY: str = "votre_secret_key_changez_moi_en_production_12345678"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # CORS
    FRONTEND_URL: str = "http://localhost:5173"

    # External APIs (optionnels pour l'instant)
    OPENMETEO_API_KEY: Optional[str] = None
    SHOM_API_KEY: Optional[str] = None

    # Redis (optionnel pour l'instant)
    REDIS_URL: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True
        # Autoriser les champs extras si besoin (optionnel)
        extra = "ignore"  # Ignore les variables du .env non définies ici


settings = Settings()