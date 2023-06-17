import { useState } from "react";
import "../assets/styles/components/account_login.scss";
import Steam from "../assets/logo/steam.svg";

function AccountLogin() {
	// const [mode, setMode] = useState(false);

	const steamLoging = () => {
		console.log("Login with steam");
	};

	return (
		<div className="account_login_container">
			<div className="main_header">
				<div className="gradient_bg_layer"></div>
				<div className="content_layer">
					<h2>Login to your account</h2>
				</div>
			</div>
			<div className="login_methods">
				<div className="method" id="steam" onClick={steamLoging}>
					<img src={Steam} alt="Steam logo" />
					<p>Login with STEAM</p>
				</div>
			</div>
		</div>
	);
}

export default AccountLogin;
