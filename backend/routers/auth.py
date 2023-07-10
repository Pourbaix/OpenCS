from datetime import datetime, timedelta

from pysteamsignin.steamsignin import SteamSignIn
from fastapi import APIRouter, Request
from fastapi.responses  import RedirectResponse

from Utils.auth import create_access_token, verify_access_token, auth_required

from Database.queries import get_user, create_user
from Database.database import Session

## loading env
import os 
from dotenv import load_dotenv

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 1440

## Defining endpoints 
router = APIRouter()

db = Session()

@router.get("/")
async def authentificate(request: Request): 
    ## Used to generate the steam link and allow the user to auth via steam service 
    steamlogin = SteamSignIn()
    frontendRoute = request.query_params.get("frontendRouter")
    if (frontendRoute):
        return {"uri": f"https://steamcommunity.com/openid/login?{steamlogin.ConstructURL(os.getenv('BACKEND_DOMAIN') + '/auth/validate/' + frontendRoute)}"}
    return {"uri": f"https://steamcommunity.com/openid/login?{steamlogin.ConstructURL(os.getenv('BACKEND_DOMAIN') + '/auth/validate/undefined')}"}


@router.get("/validate/{frontendRoute}", response_class=RedirectResponse)
async def validateAuth(request: Request, frontendRoute):
    ## This is called once the steam auth is done 
    steamLogin = SteamSignIn()
    ## Verify information send from steam after auth 
    steamID = steamLogin.ValidateResults(request.query_params)
    if steamID:
            if not get_user(db, steamID):     
                print(f"New user {steamID} detected!")
                response = create_user(db, steamID)
                if not response:
                    return RedirectResponse(url=f"{os.getenv('FRONTEND_DOMAIN')}/fail2auth", status_code=303)
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(
                data={"user": steamID}, expires_delta=access_token_expires
            )
            if frontendRoute == "undefined":
                response = RedirectResponse(url=f"{os.getenv('FRONTEND_DOMAIN')}", status_code=303)
            else:
                response = RedirectResponse(url=f"{os.getenv('FRONTEND_DOMAIN')}/{frontendRoute}", status_code=303)                 
            response.set_cookie("token", value=access_token, max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60, domain="localhost")
            return response
    else:
            return RedirectResponse(url=f"{os.getenv('FRONTEND_DOMAIN')}/fail2auth", status_code=303)

@router.get("/testToken/")
@auth_required
async def testAuth(request: Request):
    return {"logged": True}