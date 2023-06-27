import { useEffect, useRef, useState } from "react";
import "../assets/styles/components/home_profile.scss";
import Banner from "../atoms/Banner.jsx";
import Loading from "../atoms/Loading";
import ProfileStatus from "../atoms/ProfileStatus";

function HomeProfile(props) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [playerGameStats, setPlayerGameStats] = useState([]);
	const [userInfo, setUserInfo] = useState({});

	const csgoStats = useRef({});

	const extractCSGOStats = (array) => {
		if (array) {
			let result = array.find((element) => {
				return element.appid == 730;
			});
			return result;
		} else {
			return undefined;
		}
	};

	useEffect(() => {
		if (props.profileStats && Object.keys(props.userInfo).length) {
			console.log(props);
			if (props.profileStats.error || props.userInfo.error) {
				setError("Something wrong appened while fecthing user data...");
			} else {
				setPlayerGameStats(props.profileStats);
				setUserInfo(props.userInfo);
				csgoStats.current = extractCSGOStats(props.profileStats.games);
				setLoading(false);
			}
		} else {
			console.log("Not yet ready");
		}
	}, [props.profileStats, props.userInfo]);

	return (
		<div className="home_profile_container">
			{loading ? (
				<>
					<Banner title={"Loading account data..."} />
					<div className="loading_container">
						<Loading />
					</div>
				</>
			) : (
				<>
					<Banner
						title={"Welcome back " + userInfo.personaname + "!"}
					/>
					<div className="profile_content">
						<a
							className="profile_picture"
							href={userInfo.profileurl}
							target="_blank"
						>
							<img
								src={userInfo.avatarfull}
								alt="Your Steam profile picture"
							/>
						</a>
						<div className="profile_info">
							<h1>{userInfo.personaname}</h1>
							<p className="profile_steamid">
								{userInfo.steamid}
							</p>
							<div className="profile_status">
								<p>Account Status: </p>
								<ProfileStatus status={userInfo.personastate} />
							</div>
							{csgoStats.current ? (
								<div className="profile_hours_played">
									<p>
										{Math.round(
											csgoStats.current.playtime_forever /
												60
										)}{" "}
										hours played in total
									</p>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default HomeProfile;
