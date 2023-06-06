from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Utils.api_calls import SteamAPI

# On charge les varaibles d'environement du fichier .env dans les variables d'env globales
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

@app.get("/user/getInfo/{userId}")
def getUserInfo(userId: int) -> dict:
    instance = SteamAPI(os.getenv("STEAM_API_KEY"))
    data = dict(instance.getUserProfile(userId).json())
    return data