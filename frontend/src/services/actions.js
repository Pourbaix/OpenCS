import axios from "axios";

let base_url = "http://localhost:8000/";

async function getUserInfo(current, steamID = "") {
	// "current" defines if we want to recover info about the current logged user
	if (current) {
		let url = base_url + "user/getCurrentUserInfo/";
		let response = await axios.get(url, {
			withCredentials: true,
		});
		return response;
	} else {
		let url = base_url + "user/getUserInfo/" + steamID;
		let response = await axios.get(url);
		return response;
	}
}

async function getUserPlayerOverallStats(current, steamID = "") {
	if (current) {
		let url = base_url + "user/getCurrentPlayerOverallStats/";
		let response = await axios.get(url, {
			withCredentials: true,
		});
		return response;
	} else {
		// When requesting for another user
	}
}

async function getPlayerRecentlyPlayedGames(current, steamID = "") {
	if (current) {
		let url = base_url + "user/getCurrentPlayerRecentlyPlayedGames/";
		let response = await axios.get(url, {
			withCredentials: true,
		});
		return response;
	} else {
		// When requesting for another user
	}
}

async function getSteamSigninUrl() {
	let response = await axios.get(base_url + "auth/");
	return response;
}

async function testToken() {
	let url = base_url + "auth/testToken/";
	let response = await axios.get(url, {
		withCredentials: true,
	});
	return response;
}

export {
	getUserInfo,
	getUserPlayerOverallStats,
	getPlayerRecentlyPlayedGames,
	getSteamSigninUrl,
	testToken,
};
