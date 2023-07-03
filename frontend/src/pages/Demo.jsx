import { useEffect, useState, useRef } from "react";

import "../assets/styles/pages/demo.scss";

import {
	getSteamSigninUrl,
	postMatchTrackingConfig,
} from "../services/actions.js";

import SteamLogin from "../assets/img/sits_small.png";
import AuthCodeTuto from "../assets/img/auth_code_tuto.gif";

function Demo() {
	const [logged, setLogged] = useState(
		localStorage.getItem("logged") === "true"
	);
	const [autoMatchConfig, setAutoMatchConfig] = useState(false);
	const [historicConfigError, setHistoricConfigError] = useState("");

	const helpDiv = useRef(null);
	const authCode = useRef(null);
	const matchSharecode = useRef(null);

	const steamLoging = async () => {
		console.log("Login with steam");
		let response = await getSteamSigninUrl("demo");
		let url = response.data.uri;
		window.location.replace(url);
	};

	const validateAuthCode = async () => {
		// Clear previous errors
		setHistoricConfigError("");

		// Validate auth code
		if (!authCode.current.value) {
			setHistoricConfigError("Please enter an authentication code");
			return false;
		}

		// Validate match sharecode
		if (matchSharecode.current.value) {
			if (!checkSharecode(matchSharecode.current.value)) {
				setHistoricConfigError("Invalid match sharecode");
				return false;
			}
		} else {
			setHistoricConfigError("Please enter a match sharecode");
			return false;
		}

		// If everything is valid continue by setting up match tracking with given info
		console.log("Validate auth code");
		let res = await postMatchTrackingConfig(
			authCode.current.value,
			matchSharecode.current.value
		);
		console.log(res);
	};

	const checkSharecode = (sharecode) => {
		let valid = true;
		let destruct = sharecode.split("-");
		if (destruct.length) {
			if (destruct.length != 6 || destruct[0] != "CSGO") {
				valid = false;
			}
		} else {
			valid = false;
		}
		return valid;
	};

	const showHelp = () => {
		helpDiv.current.style.height = "270px";
	};

	useEffect(() => {
		setLogged(localStorage.getItem("logged") === "true");
	}, [localStorage.getItem("logged")]);

	return (
		<div className="demo_container">
			<h1>Demo viewer</h1>
			<div className="demo_content">
				<div className="section match_history">
					<h1>Your match history</h1>
					{logged ? (
						autoMatchConfig ? (
							<p>Your match list:</p>
						) : (
							<div className="match_tracking_config">
								<h2>Configure match tracking</h2>
								<p>
									Please enter your match authentification
									code and last match sharecode:
								</p>
								<div className="code_area">
									<div className="input_text">
										<input
											type="text"
											placeholder="Enter authentication code..."
											ref={authCode}
										/>
									</div>
									<div className="input_text">
										<input
											type="text"
											placeholder="Enter last match sharecode..."
											ref={matchSharecode}
										/>
									</div>
									{historicConfigError ? (
										<p className="error">
											{historicConfigError}
										</p>
									) : (
										""
									)}
									<button onClick={validateAuthCode}>
										Validate
									</button>
								</div>
								<h4 onClick={showHelp}>
									How to find those informations ?
								</h4>
								<div className="help_div" ref={helpDiv}>
									<h3>
										How to generate authentification code
										for csgo ?
									</h3>
									<div className="explanation">
										<div className="text">
											<ol>
												<li>Go to steam web page</li>
												<li>
													Browse to the "support"
													category
												</li>
												<li>Click on CS:GO</li>
												<li>
													Then on "manage
													authentification code"
												</li>
												<li>
													Finally, generate an auth
													code to access match history
												</li>
												<li>
													(You can also find your last
													match sharecode in the same
													section)
												</li>
											</ol>
										</div>
										<div className="gif_display">
											<img
												src={AuthCodeTuto}
												alt="Tuto on how to generate auth codes"
											/>
										</div>
									</div>
								</div>
							</div>
						)
					) : (
						<div className="login_request">
							<p>
								Login to your steam account to enable match
								tracking:
							</p>
							<button onClick={steamLoging}>
								<img src={SteamLogin} alt="" />
							</button>
						</div>
					)}
				</div>
				<div className="section">
					<h1>Load demo by sharecode</h1>
					<p>Enter match sharcode</p>
				</div>
			</div>
		</div>
	);
}

export default Demo;
