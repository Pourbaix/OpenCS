from Utils.steam_api_calls import SteamAPI
from fastapi import APIRouter, Request, Depends, Header
from typing import Annotated
from Utils.auth import auth_required, get_current_user

# On charge les variables d'environement du fichier .env dans les variables d'env globales
import os 
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

## Defining a "SteamAPI" class instance 
instance = SteamAPI(os.getenv("STEAM_API_KEY"))

@router.get("/getUserInfo/{userId}")
async def getUserInfo(userId: int) -> dict:
    data = dict(instance.getUserProfile(userId).json())
    return data

@router.get("/getCurrentUserInfo/")
@auth_required
async def getUserInfo(request: Request) -> dict:
    userId = get_current_user(request.cookies["token"])
    data = dict(instance.getUserProfile(userId).json())
    return data

@router.get("/getCurrentPlayerOverallStats/")
@auth_required
async def getCurrentPlayerOverallStats(request: Request):
    userId = get_current_user(request.cookies["token"])
    data = dict(instance.getUserStatsForGame(userId, 730).json())
    return data

@router.get("/getCurrentPlayerRecentlyPlayedGames/")
@auth_required
async def getCurrentPlayerRecentlyPlayedGames(request: Request):
    userId = get_current_user(request.cookies["token"])
    data = dict(instance.getRecentlyPlayedGames(userId, 730).json())
    return data