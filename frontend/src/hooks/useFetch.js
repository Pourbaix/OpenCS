import { useEffect, useState } from "react";
import axios from "axios";

export const useFetch = (url, headersParam = {}) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(url, { headers: headersParam })
			.then((res) => setResponse(res))
			.catch((e) => setError(e))
			.finally(() => setLoading(false));
	}, [url]);

	return { response, error, loading };
};
