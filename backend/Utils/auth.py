from fastapi import Request, HTTPException, status
from datetime import datetime, timedelta
from typing import Annotated, Union
from jose import JWTError, jwt
from functools import wraps

## loading env
import os 
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("JWT_ALGORITHM")

## Exceptions 

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
)

## Utils methods

def create_access_token(data: dict, expires_delta: timedelta):
    ## TODO: Au lieu de stocker le steam id, stocker le userID de la DB ?
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str):
    try:
        ## It checks token validaty and exp date  
        decoded = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
    except JWTError:
        raise credentials_exception
    return decoded

def get_current_user(token: str):
    decoded = verify_access_token(token)
    return decoded.get("user")

## Used by frontend to know if connected 
def check_if_connected(request: Request):
    if ("token" in request.cookies):
        try:
            connected = True if jwt.decode(request.cookies["token"], SECRET_KEY, algorithms=ALGORITHM) else False
        except:
            connected= False
    else:
        connected = False
    return connected

## Decorator

def auth_required(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        if("request" not in kwargs.keys()):
            raise Exception("The route should have a Request object in his parameters")
        request = kwargs["request"]
        if("token" in request.cookies):
            if verify_access_token(request.cookies["token"]):
                print("all ok")
                return await func(*args, **kwargs)
        else:
            raise credentials_exception
    return wrapper