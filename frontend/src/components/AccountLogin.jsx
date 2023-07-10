import { getSteamSigninUrl, testToken } from "../services/actions";
import "../assets/styles/components/account_login.scss";
import Steam from "../assets/logo/steam.svg";
import Banner from "../atoms/Banner.jsx";

import { initCache } from "../utils/cache";

function AccountLogin() {
	const steamLoging = async () => {
		let response = await getSteamSigninUrl("");
		let url = response.data.uri;
		initCache();
		window.location.replace(url);
	};

	const testCookieToken = async () => {
		let response = await testToken();
		console.log(response);
	};

	return (
		<div className="account_login_container">
			<Banner title={"Login to your account"} />
			<div className="login_methods">
				<div className="method" id="steam" onClick={steamLoging}>
					<img src={Steam} alt="Steam logo" />
					<p>Login with STEAM</p>
				</div>
			</div>
			<div className="login_methods">
				<div className="method" onClick={testCookieToken}>
					TestToken
				</div>
			</div>
		</div>
	);
}

export default AccountLogin;
