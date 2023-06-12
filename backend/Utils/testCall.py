## Loading .env variables
import os 
from dotenv import load_dotenv

from steam.client import SteamClient
from csgo.client import CSGOClient
from csgo.sharecode import decode

########################################
## Script used to test basic gc calls 
########################################

client = SteamClient()
cs = CSGOClient(client)

match_info = decode("CSGO-JFAGi-7yk95-Vcetu-kscqU-JRRyL")
print(match_info)

@client.on('logged_on')
def start_csgo():
    print("CS Launch")
    cs.launch()

@cs.on('ready')
def gc_ready():
    # send messages to gc
    print("CS READY")
    cs.request_full_match_info(match_info['matchid'], match_info['outcomeid'], match_info['token'])
    response, = cs.wait_event('full_match_info')
    print(str(response))
    pass

client.cli_login(username=os.getenv("ACCOUNT_USERNAME"), password=os.getenv("ACCOUNT_PASSWORD"))
client.run_forever()