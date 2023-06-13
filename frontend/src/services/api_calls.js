import axios from "axios";

let base_url = "http://127.0.0.1:8000/";

async function getUserInfo(steamID) {
	let response = await axios.get(base_url + "user/getInfo/" + steamID, {
		headers: { "Acess-Control-Allow-Origin": "*" },
	});
	return response;
}

export { getUserInfo };
