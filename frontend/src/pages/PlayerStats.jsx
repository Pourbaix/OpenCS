import Header from "../components/Header.jsx";
import Profile from "../components/Profile.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../assets/styles/pages/accounts_details.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getUserInfo } from "../services/api_calls.js";

function PlayerStats() {
	const userID = useRef(null);
	const [userInfo, setUserInfo] = useState(null);

	const handleChange = async () => {
		if (userID.current.value) {
			let reponse = await getUserInfo(userID.current.value);
			setUserInfo(reponse.data.response.players[0]);
		}
	};

	// Exécuté au chargement du composant
	useEffect(() => {
		// 76561198074295219
	}, []);
	return (
		<>
			<Sidebar highlighted={"Player"} />
			<div className="player_stats_page">
				<Header />
				<div className="player_stats_content">
					<h1>WELCOME TO ACCOUNTS DETAILS PAGE</h1>
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
			</div>
		</>
	);
}

export default PlayerStats;
