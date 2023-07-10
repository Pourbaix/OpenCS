from Utils.steam_api_calls import SteamAPI
from fastapi import APIRouter, Request, Depends, Header
from fastapi.responses import JSONResponse
from typing import Annotated
from pydantic import BaseModel
from Utils.auth import auth_required, get_current_user

from Database.queries import get_user, configure_user_match_tracking
from Database.database import Session

# On charge les variables d'environement du fichier .env dans les variables d'env globales
import os 
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

db = Session()

## Defining a "SteamAPI" class instance 
instance = SteamAPI(os.getenv("STEAM_API_KEY"))

## Pydentic Models 
class MatchHistoryConfig(BaseModel):
    matchShareCode: str
    authenticationCode: str

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
    return JSONResponse(status_code=200, content=data)

@router.get("/matchTrackingConfig/")
@auth_required
async def getMatchTrackingConfig(request: Request):
    userId = get_current_user(request.cookies["token"])
    target_user = get_user(db, userId)
    config = {
        "auth_code": "",
        "last_match": ""
    }
    config["auth_code"] = target_user.match_tracking_code
    config["last_match"] = target_user.last_match_code
    return {"config": config}
    

@router.post("/setCSGOMatchHistory/")
@auth_required
async def setMatchHistory(config: MatchHistoryConfig, request: Request):
    ## MAZEPPA 76561198074295219
    ## CORONADO 76561198355498302

    userId = get_current_user(request.cookies["token"])

    matchCode: str | bool = config.matchShareCode
    matchList: list = [config.matchShareCode]
    while(matchCode):
        response = instance.getNextMatch(userId, config.authenticationCode, matchCode).json()
        if response:
            nextcode = response["result"]["nextcode"]
            if(nextcode != "n/a"):
                matchList.append(nextcode)
                matchCode = nextcode
            else:
                matchCode = False
        else: 
            matchCode = False
    print(matchList)

    status = configure_user_match_tracking(db, config.authenticationCode, matchList[-1], userId)
    if status:
        return {"status": matchList}
    else:
        return {"status": "error"}