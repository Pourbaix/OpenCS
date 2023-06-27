import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import "../assets/styles/pages/home.scss";

// Components
import TryButton from "../atoms/TryButton";
import ContentBlock from "../components/ContentBlock";
import AccountLogin from "../components/AccountLogin";
import HomeProfile from "../components/HomeProfile";

// API functions
import {
	getUserInfo,
	getPlayerRecentlyPlayedGames,
} from "../services/actions.js";

function Home() {
	const [logged, setLogged] = useState(
		localStorage.getItem("logged") === "true"
	);
	const [playerGameStats, setPlayerGameStats] = useState({});
	const [userInfo, setUserInfo] = useState({});
	let navigate = useNavigate();

	// Navigate callbacks
	const redirectToDemo = () => {
		console.log("Redirect to demo");
		navigate("/demo");
	};
	const redirectToPlayerStats = () => {
		console.log("Redirect to player stats");
		navigate("/playerStats");
	};
	const redirectToTricks = () => {
		console.log("Redirect to tricks");
		navigate("/tricks");
	};

	// Player games data recovery
	const recoverPlayerPlayedGames = async () => {
		let res = await getPlayerRecentlyPlayedGames(true);
		if (await res.data.response) {
			return await res.data.response;
		} else {
			return { error: "error" };
		}
	};

	// User info recovery
	const recoverUserInfo = async () => {
		let res = await getUserInfo(true);
		if (await res.data) {
			return res.data.response.players[0];
		} else {
			return { error: "error" };
		}
	};

	const recoverUserProfile = async () => {
		if (logged) {
			setPlayerGameStats(await recoverPlayerPlayedGames());
			setUserInfo(await recoverUserInfo());
		}
	};

	useEffect(() => {
		setLogged(localStorage.getItem("logged") === "true");
	}, [localStorage.getItem("logged")]);

	useEffect(() => {
		recoverUserProfile();
	}, []);

	return (
		<div className="home_page_container">
			<div className="presentation_block">
				<ContentBlock>
					<div className="introduction">
						<h2>Welcome to OpenCS!</h2>
						<p style={{ fontSize: "20px" }}>
							The new free tool that you need to analyse your
							counter-strike games and improve your skill set
						</p>
						<div className="description_block">
							<div className="heading">
								<h3>Demo Analyser</h3>
							</div>
							<p>
								Import any demo you want by sharecode and start
								analyzing now. Take a look at the scoreboard and
								the statistics and then deep dive in the demo
								viewer tool to find your team's weaknesses and
								strenghts.
							</p>
							<div className="image">Insert image</div>
							<div className="link">
								<TryButton
									text={"Analyse now"}
									callBack={redirectToDemo}
								/>
							</div>
						</div>
						<div className="description_block">
							<div className="heading">
								<h3>Player Stats</h3>
							</div>
							<p>
								Explore the statistics of any player and compare
								them with yours to see were you perform the
								most. Analyze your best and worst positions on
								each map and learn to play new ones.
							</p>
							<div className="image">Insert image</div>
							<div className="link">
								<TryButton
									text={"Check your stats"}
									callBack={redirectToPlayerStats}
								/>
							</div>
						</div>
						<div className="description_block">
							<div className="heading">
								<h3>Tricks</h3>
							</div>
							<p>
								Learn new things about the game from other
								players and rate their posts. You can find new
								grenade linups, wallbangs and much more !
							</p>
							<div className="image">Insert image</div>
							<div className="link">
								<TryButton
									text={"Check best tips"}
									callBack={redirectToTricks}
								/>
							</div>
						</div>
					</div>
				</ContentBlock>
			</div>
			<div className="login_block">
				<div className="sticky_div">
					{logged ? (
						<HomeProfile
							profileStats={playerGameStats}
							userInfo={userInfo}
						/>
					) : (
						<AccountLogin />
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
