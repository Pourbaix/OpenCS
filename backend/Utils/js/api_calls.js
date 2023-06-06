// We will be testing here some API calls to the Steam API
const axios = require("axios");
const axiosCookiejarSupport = require("axios-cookiejar-support");
const toughCookie = require("tough-cookie");

require("dotenv").config();

const main_route = "https://api.steampowered.com/";

let payload = {
	key: process.env.STEAM_API_KEY,
	steamid: "hultryme",
	appid: "730",
};

class SteamAPI {
	constructor(key) {
		this.api_key = key;
	}

	async getPlayerAchievements(userid, appid) {
		let response = await axios.get(
			main_route + "ISteamUserStats/GetPlayerAchievements/v1/",
			{
				params: {
					key: this.api_key,
					steamid: userid,
					appid: appid,
				},
			}
		);
		return response;
	}

	async getUserStatsForGame(userid, appid) {
		let response = await axios.get(
			main_route + "ISteamUserStats/GetUserStatsForGame/v2/",
			{
				params: {
					key: this.api_key,
					steamid: userid,
					appid: appid,
				},
			}
		);
		return response;
	}

	// async getCsStats(userid) {
	// 	let response = await axios.get(
	// 		"https://public-api.tracker.gg/v2/csgo/standard/profile/steam/76561198074295219",
	// 		{
	// 			params: {
	// 				key: this.api_key,
	// 			},
	// 		}
	// 	);
	// }

	async getUserSummary(userid) {
		let response = await axios.get(
			main_route + "ISteamUser/GetPlayerSummaries/v2/",
			{
				params: {
					key: this.api_key,
					steamids: userid,
				},
			}
		);
		return response;
	}
}

async function testClass() {
	let test = new SteamAPI(process.env.STEAM_API_KEY);
	let res = await test.getUserSummary("76561198074295219");
	console.log(res.data.response);
}

testClass();
