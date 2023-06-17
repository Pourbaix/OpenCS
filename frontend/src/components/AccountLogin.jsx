import { useState } from "react";
import "../assets/styles/components/account_login.scss";

function AccountLogin() {
	const [mode, setMode] = useState(false);

	return (
		<div className="account_login_container">
			{/* <div className="nav">
				<button
					onClick={() => {
						setMode(false);
					}}
				>
					Login
				</button>
				<button
					onClick={() => {
						setMode(true);
					}}
				>
					Signup
				</button>
			</div> */}
			<div className="main_content">
				<div className="gradient_bg_layer"></div>
				<div className="content_layer">
					<h2>Login to your account</h2>
				</div>
			</div>
		</div>
	);
}

export default AccountLogin;
