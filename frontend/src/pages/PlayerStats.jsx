import Profile from "../components/Profile.jsx";
import "../assets/styles/pages/player_stats.scss";
import { useEffect, useRef, useState } from "react";
import { getUserInfo } from "../services/actions.js";

function PlayerStats() {
	const userID = useRef(null);
	const [userInfo, setUserInfo] = useState(null);

	const handleChange = async () => {
		if (userID.current.value) {
			let reponse = await getUserInfo(false, userID.current.value);
			setUserInfo(reponse.data.response.players[0]);
		}
	};

	// Exécuté au chargement du composant
	useEffect(() => {
		// 76561198074295219
	}, []);
	return (
		<div className="player_stats_container">
			<h1>Player Stats</h1>
			<div className="search">
				<input
					type="text"
					placeholder="Type steamID here..."
					ref={userID}
				/>
				<button onClick={handleChange}>Search</button>
			</div>
			{userInfo ? <Profile data={userInfo} /> : ""}
		</div>
	);
}

export default PlayerStats;
