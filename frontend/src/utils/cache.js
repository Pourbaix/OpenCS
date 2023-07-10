function readCache(serviceName) {
	let cache = window.localStorage.getItem("cache");
	if (cache) {
		let target_element = JSON.parse(cache)[serviceName];
		// If we find the element and if the data isnt expired, we return the cached data.
		if (target_element && new Date(target_element["expire"]) > new Date()) {
			return target_element["data"];
		} else {
			return false;
		}
	} else {
		initCache();
		return false;
	}
}

function writeCache(serviceName, response, expire) {
	if (!window.localStorage.getItem("cache")) {
		initCache();
	}
	let cache = window.localStorage.getItem("cache");
	let parsed = JSON.parse(cache);
	let expire_date = new Date();
	expire_date.setTime(new Date().getTime() + expire);
	parsed[serviceName] = {
		data: response,
		expire: expire_date.toISOString(),
	};
	window.localStorage.setItem("cache", JSON.stringify(parsed));
}

function initCache() {
	window.localStorage.setItem("cache", JSON.stringify({}));
}

export { readCache, writeCache, initCache };
