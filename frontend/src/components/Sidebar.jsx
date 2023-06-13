import "../assets/styles/components/sidebar.scss";
import HomeLogo from "../atoms/HomeLogo.jsx";
import DemoLogo from "../atoms/DemoLogo.jsx";
import PlayerStatsLogo from "../atoms/PlayerStatsLogo.jsx";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
	const [navsHighlight, setNavsHighlight] = useState({
		Home: false,
		Demo: false,
		Player: false,
	});
	useEffect(() => {
		if (props.highlighted) {
			let local = {
				Home: false,
				Demo: false,
				Player: false,
			};
			for (let i of Object.keys(local)) {
				if (props.highlighted == i) {
					local[i] = true;
				}
			}
			setNavsHighlight(local);
		}
	}, []);
	return (
		<div className="sidebar_container">
			<div className="content">
				<Link className="nav_element" to="/">
					<HomeLogo highlight={navsHighlight.Home} />
				</Link>
				<Link className="nav_element" to="/demo">
					<DemoLogo highlight={navsHighlight.Demo} />
				</Link>
				<Link className="nav_element" to="/playerStats">
					<PlayerStatsLogo highlight={navsHighlight.Player} />
				</Link>
			</div>
		</div>
	);
}

export default Sidebar;
