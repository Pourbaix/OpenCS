from gevent import monkey
monkey.patch_all()

import json

## Loading .env variables
import os 
from dotenv import load_dotenv

#########################################################
## External lib import 

## Used to convert extracted message to JSON
from google.protobuf.json_format import MessageToJson

## Used to emulate steam and csgo
from steam.client import SteamClient
from steam.guard import SteamAuthenticator
from steam.steamid import SteamID
from csgo.client import CSGOClient
from csgo.sharecode import decode
#########################################################

load_dotenv()

class CsgoDemo():
    def __init__(self) -> None:
        self.steam = client = SteamClient()
        self.cs = CSGOClient(self.steam)

        @client.on('logged_on')
        def start_csgo():
            self.cs.launch()

        @client.on("logged_on")
        def handle_after_logon():
            print("Connected!!")
            client.run_forever()

    def getSteamGuardCode(self, secrets: dict) -> str:
        """
        Method to recover the steam guard code from the account's secrets.
        This code can then be used to connect to the account.
        """
        return SteamAuthenticator(secrets=secrets).get_code()

    def doSteamLogin(self, accountUsername: str, accountPassword: str) -> None:
        """
        Method to connect to a steam account with no 2FA enabled. 
        """
        self.steam.cli_login(username=accountUsername, password=accountPassword)
    
    def doSteamLoginWithSG(self, accountUsername: str, accountPassword: str, SGCode: str) -> None:
        """
        Method to connect to a steam account with 2FA enabled.
        """
        self.steam.login(username=accountUsername, password=accountPassword, two_factor_code=SGCode)

    def disconnect(self) -> None:
        """
        Method to disconnect from the logged account.
        """
        self.steam.logout()
        print("disconnected !")

    def decodeShareCode(self, shareCode: str) -> dict:
        """
        Method to retrieve match informations from a shareCode.
        Those shareCodes can be retrieved in-game in the "Watch matches and tournaments" section of the main menu.
        """
        return decode(shareCode)
    
    def getMatch(self, matchInfo: dict) -> dict:
        mid = matchInfo["matchid"]
        od = matchInfo["outcomeid"]
        tok = matchInfo["token"]

        self.cs.request_full_match_info(matchid=mid, outcomeid=od, token=tok)
        data, = self.cs.wait_event('full_match_info', timeout=10)
        return data
    
    def getLiveGameForUser(self, steamId): 
        identifier = SteamID(steamId)
        self.cs.request_current_live_games()
        data, = self.cs.wait_event("current_live_games", timeout=5)
        return data
    
    def getPlayerProfile(self, steamId):
        ## Converting steamid to accountid to recover csgo player stats
        identifier = SteamID(steamId)
        print(identifier.account_id, self.cs.account_id)
        ## Requesting informations
        self.cs.request_player_profile(identifier.account_id, request_level=64)
        data, = self.cs.wait_event('player_profile', timeout=3)
        print(data)
        return data
    
###################################################################   
########################## USAGE EXAMPLE ##########################

# demo_class = CsgoDemo()

# demo_class.doSteamLogin(os.getenv("ACCOUNT_USERNAME"), os.getenv("ACCOUNT_PASSWORD"))

# ## Change this with the demo's sharecode you want to get info of
# sharecode = "CSGO-JFAGi-7yk95-Vcetu-kscqU-JRRyL"

# decoded = demo_class.decodeShareCode(sharecode)

# match = demo_class.getMatch(decoded)
# if (match):
#     json.dump(json.loads(MessageToJson(match)), open(f'./backend/temp/{sharecode}.json', 'w'))
# demo_class.disconnect()
###################################################################