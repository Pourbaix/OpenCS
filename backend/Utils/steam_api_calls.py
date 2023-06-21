import requests

STEAM_API_BASE_URL = "https://api.steampowered.com/";

class SteamAPI:
    def __init__(self, apiKey) -> None:
        self.apiKey = apiKey
        self.baseUrl = STEAM_API_BASE_URL

        self.httpClient = requests.Session()


    def getUserProfile(self, userId):
        url = self.baseUrl + "ISteamUser/GetPlayerSummaries/v2/"
        params = {
            "key": self.apiKey,
            "steamids": userId
        }
        response = self.httpClient.get(url, params=params)
        return response
