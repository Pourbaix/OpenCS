import requests

STEAM_API_BASE_URL = "https://api.steampowered.com/";

class SteamAPI:
    def __init__(self, apiKey) -> None:
        self.apiKey = apiKey
        self.baseUrl = STEAM_API_BASE_URL

        self.httpClient = requests.Session()

    ## Get user basic profile informations 
    def getUserProfile(self, userId):
        url = self.baseUrl + "ISteamUser/GetPlayerSummaries/v2/"
        params = {
            "key": self.apiKey,
            "steamids": userId
        }
        response = self.httpClient.get(url, params=params)
        return response

    def getUserStatsForGame(self, userId, appid):
        url = self.baseUrl + "ISteamUserStats/GetUserStatsForGame/v2/"
        params = {
            "key": self.apiKey,
            "steamid": userId,
            "appid": appid
        }
        response = self.httpClient.get(url, params=params)
        print(response.status_code)
        return response

    def getRecentlyPlayedGames(self, userId, appid):
        url = self.baseUrl + "IPlayerService/GetRecentlyPlayedGames/v1/"
        params = {
            "key": self.apiKey,
            "steamid": userId,
            "appid": appid
        }
        response = self.httpClient.get(url, params=params)
        return response

    def checkIfGameOwned(self, userId, appid):
        url = self.baseUrl + "IPlayerService/GetOwnedGames/v1/"
        params = {
            "key": self.apiKey,
            "steamid": userId,
            "include_appinfo": True,
            "include_played_free_games": True,
            "appid": appid 
        }
        response = self.httpClient.get(url, params=params)
        return response