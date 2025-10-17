"""Script pour créer les tables de la base de données"""
import sys
from pathlib import Path

# Ajouter le dossier courant au path
sys.path.insert(0, str(Path(__file__).parent))

from app.db.base import Base, engine
from app.models.user import User
from app.models.zone import Zone
from app.models.observation import Observation
from app.core.security import get_password_hash

print("🔧 Création des tables dans la base de données...")

try:
    # Créer toutes les tables
    Base.metadata.create_all(bind=engine)
    print("✅ Tables créées avec succès!")

    # Vérifier les tables créées
    from sqlalchemy import inspect

    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"✅ Tables présentes: {', '.join(tables)}")

    # Créer un utilisateur admin de test
    from app.db.base import SessionLocal

    db = SessionLocal()

    # Vérifier si l'admin existe déjà
    existing_admin = db.query(User).filter(User.email == "admin@gendarmerie.fr").first()

    if not existing_admin:
        admin = User(
            email="admin@gendarmerie.fr",
            password_hash=get_password_hash("admin123"),
            name="Admin Test",
            role="admin",
            unit="GGD Nord",
            active=True
        )
        db.add(admin)
        db.commit()
        print("✅ Utilisateur admin créé: admin@gendarmerie.fr / admin123")
    else:
        print("ℹ️  Utilisateur admin existe déjà")

    # Créer des zones de test
    existing_zones = db.query(Zone).count()

    if existing_zones == 0:
        zones = [
            Zone(name="Calais Nord", latitude=50.95, longitude=1.85, radius_km=5, priority="high"),
            Zone(name="Baie de Somme", latitude=50.2, longitude=1.6, radius_km=8, priority="high"),
            Zone(name="Dunkerque Est", latitude=51.03, longitude=2.37, radius_km=6, priority="medium"),
            Zone(name="Berck-sur-Mer", latitude=50.4, longitude=1.6, radius_km=4, priority="medium"),
            Zone(name="Boulogne-sur-Mer", latitude=50.73, longitude=1.61, radius_km=5, priority="low"),
        ]

        for zone in zones:
            db.add(zone)

        db.commit()
        print(f"✅ {len(zones)} zones créées")
    else:
        print(f"ℹ️  {existing_zones} zones existent déjà")

    db.close()

    print("\n🎉 Base de données initialisée avec succès!")
    print("\n📝 Vous pouvez maintenant:")
    print("   1. Lancer le backend: uvicorn app.main:app --reload")
    print("   2. Se connecter avec: admin@gendarmerie.fr / admin123")

except Exception as e:
    print(f"❌ Erreur: {e}")
    import traceback

    traceback.print_exc()