import axios from "axios";

let base_url = "http://localhost:8000/";

async function getUserInfo(steamID) {
	let response = await axios.get(base_url + "user/getInfo/" + steamID, {
		headers: { "Acess-Control-Allow-Origin": "*" },
	});
	return response;
}

async function getSteamSigninUrl() {
	let response = await axios.get(base_url + "auth/", {
		headers: { "Acess-Control-Allow-Origin": "*" },
	});
	return response;
}

async function testToken() {
	let response = { status: "", message: "" };
	let url = base_url + "auth/testToken/";
	axios
		.get(url, {
			headers: {
				"Acess-Control-Allow-Origin": "*",
			},
			withCredentials: true,
		})
		.then(async (res) => {
			response.status = "OK";
			response.message = await res.data;
		})
		.catch((err) => {
			response.status = "ERROR";
			response.message = err;
		});
	return response;
}

export { getUserInfo, getSteamSigninUrl, testToken };
