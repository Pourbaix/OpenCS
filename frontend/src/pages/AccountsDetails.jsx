import Header from "../components/Header.jsx";
import Profile from "../components/Profile.jsx";
import "../assets/styles/pages/accounts_details.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function AccountsDetails() {
	const userID = useRef(null);
	const [userInfo, setUserInfo] = useState(null);

	const handleChange = () => {
		if (userID.current.value) {
			axios
				.get(
					"http://127.0.0.1:8000/user/getInfo/" +
						userID.current.value,
					{
						headers: { "Acess-Control-Allow-Origin": "*" },
					}
				)
				.then((res) => {
					console.log(res);
					setUserInfo(res.data.response.players[0]);
				});
		}
	};

	// Exécuté au chargement du composant
	useEffect(() => {
		// 76561198074295219
	}, []);
	return (
		<div className="page">
			<Header />
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
	);
}

export default AccountsDetails;
