from fastapi import APIRouter, Request
from Utils.demo import CsgoDemo
from csgo.sharecode import decode

from google.protobuf.json_format import MessageToJson

import json

# On charge les variables d'environement du fichier .env dans les variables d'env globales
import os 
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

## Instanciating the demo info extractor class + loggin in 
demo_class = CsgoDemo()
demo_class.doSteamLogin(os.getenv("ACCOUNT_USERNAME"), os.getenv("ACCOUNT_PASSWORD"))

@router.on_event("shutdown")
def shutdown():
     demo_class.disconnect()


@router.get("/retrieveInformations/{sharingCode}")
async def getMatchInfo(sharingCode: str) -> dict:
    decoded = demo_class.decodeShareCode(sharingCode)
    match = demo_class.getMatch(decoded)
    if (match):
        return json.loads(MessageToJson(match))
    return {"error": "Something went wrong when extracting match data"}
