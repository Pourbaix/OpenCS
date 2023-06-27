import { getSteamSigninUrl, testToken } from "../services/actions";
import "../assets/styles/components/account_login.scss";
import Steam from "../assets/logo/steam.svg";
import Banner from "../atoms/Banner.jsx";

function AccountLogin() {
	const steamLoging = async () => {
		console.log("Login with steam");
		let response = await getSteamSigninUrl();
		let url = response.data.uri;
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
