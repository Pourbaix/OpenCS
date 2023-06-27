import { useEffect, useState } from "react";
import "../assets/styles/atoms/profile_status.scss";

function ProfileStatus(props) {
	const [statusText, setStatusText] = useState("Unknown status");
	const [statusColor, setStatusColor] = useState("grey");

	useEffect(() => {
		switch (props.status) {
			case 0:
				setStatusText("Offline");
				setStatusColor("#c9c9c9");
				break;
			case 1:
				setStatusText("Online");
				setStatusColor("#4aff68");
				break;
			case 2:
				break;
			case 3:
				setStatusText("Away");
				setStatusColor("#ffba4a");
				break;
		}
	}, [props.status]);
	return (
		<div className="profile_status_container">
			<div
				className="status_point"
				style={{ background: statusColor }}
			></div>
			<p className="status_indicator" style={{ color: statusColor }}>
				{statusText}
			</p>
		</div>
	);
}

export default ProfileStatus;
