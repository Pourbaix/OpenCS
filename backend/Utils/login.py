import json

from steam.webauth import MobileWebAuth 
from steam.guard import SteamAuthenticator

## Loading .env variables
import os 
from dotenv import load_dotenv

load_dotenv()

## This piece of code can be used to recover the secrets from an account 
## Those can then be used to generate 2FA SteamGuard codes

wa = MobileWebAuth(os.getenv("ACCOUNT_USERNAME"))
wa.cli_login(os.getenv("ACCOUNT_PASSWORD"))

sa = SteamAuthenticator(backend=wa)
sa.add()    
sa.secrets  # dict with authenticator secrets (SAVE THEM!!)
print(sa.secrets)

# save the secrets, for example to a file
json.dump(sa.secrets, open('./mysecrets.json', 'w'))