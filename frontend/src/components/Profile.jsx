import { useEffect, useState } from "react";
import "../assets/styles/components/profile.scss";

function Profile(props) {
	const [playerData, setPlayerData] = useState({});

	useEffect(() => {
		if (props.data) {
			setPlayerData(props.data);
			console.log(props.data);
		}
	}, []);

	return (
		<a className="card" href={playerData.profileurl} target="_blank_">
			<div className="pp">
				<img src={playerData.avatarfull} alt="" />
			</div>
			<div className="info">
				<h3>{playerData.personaname}</h3>
				<p>SteamID: {playerData.steamid}</p>
				<p>Real Name: {playerData.realname}</p>
				<p>Country: {playerData.loccountrycode}</p>
			</div>
		</a>
	);
}

export default Profile;
