from gevent import monkey
monkey.patch_all()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Utils.api_calls import SteamAPI
from Utils.demo import CsgoDemo
from csgo.sharecode import decode

import json
from google.protobuf.json_format import MessageToJson

# On charge les variables d'environement du fichier .env dans les variables d'env globales
import os 
from dotenv import load_dotenv

load_dotenv()


# Liste des origines acceptées pour les requêtes 
origins = [
    "*"
]

app = FastAPI()

# Surcouche middleware pour les CORS (les trucs chiants en gros :) )
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Instanciating the demo info extractor class + loggin in 
demo_class = CsgoDemo()
demo_class.doSteamLogin(os.getenv("ACCOUNT_USERNAME"), os.getenv("ACCOUNT_PASSWORD"))


@app.get("/user/getInfo/{userId}")
def getUserInfo(userId: int) -> dict:
    instance = SteamAPI(os.getenv("STEAM_API_KEY"))
    data = dict(instance.getUserProfile(userId).json())
    return data

## Might be removed
@app.get("/match/decodeSharingCode/{sharingCode}")
def getDecodedSahringCode(sharingCode: str) -> dict:
    return decode(sharingCode)

@app.get("/match/retrieveInformations/{sharingCode}")
def getMatchInfo(sharingCode: str) -> dict:
    decoded = demo_class.decodeShareCode(sharingCode)
    match = demo_class.getMatch(decoded)
    if (match):
        return json.loads(MessageToJson(match))
    return {"error": "Something went wrong when extracting match data"}
