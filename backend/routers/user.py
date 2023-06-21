from Utils.steam_api_calls import SteamAPI
from fastapi import APIRouter

# On charge les variables d'environement du fichier .env dans les variables d'env globales
import os 
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

@router.get("/getInfo/{userId}")
def getUserInfo(userId: int) -> dict:
    instance = SteamAPI(os.getenv("STEAM_API_KEY"))
    data = dict(instance.getUserProfile(userId).json())
    return data