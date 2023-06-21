import "../assets/styles/components/sidebar.scss";
import HomeLogo from "../atoms/HomeLogo.jsx";
import DemoLogo from "../atoms/DemoLogo.jsx";
import PlayerStatsLogo from "../atoms/PlayerStatsLogo.jsx";
import TricksLogo from "../atoms/TricksLogo";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
	const [navsHighlight, setNavsHighlight] = useState({
		Home: false,
		Demo: false,
		Player: false,
	});
	let location = useLocation();

	// Small piece of code to change the style of the current page
	useEffect(() => {
		console.log(location);
		let local = {
			Home: false,
			Demo: false,
			Player: false,
			Tricks: false,
		};
		let transcript = {
			Home: ["/"],
			Demo: ["/demo"],
			Player: ["/playerStats"],
			Tricks: ["/tricks"],
		};
		for (let i of Object.keys(transcript)) {
			if (transcript[i].includes(location.pathname)) {
				local[i] = true;
			}
		}
		setNavsHighlight(local);
	}, [location]);
	return (
		<div className="sidebar_container">
			<div className="content">
				<Link className="nav_element" to="/">
					<div className="nav">
						<HomeLogo highlight={navsHighlight.Home} />
					</div>
				</Link>
				<Link className="nav_element" to="/demo">
					<div className="nav">
						<DemoLogo highlight={navsHighlight.Demo} />
					</div>
				</Link>
				<Link className="nav_element" to="/playerStats">
					<div className="nav">
						<PlayerStatsLogo highlight={navsHighlight.Player} />
					</div>
				</Link>
				<Link className="nav_element" to="/tricks">
					<div className="nav">
						<TricksLogo highlight={navsHighlight.Tricks} />
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Sidebar;
