import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { testToken } from "./services/actions";

import "./layout.scss";
import { useEffect, useState } from "react";

function Layout() {
	const [isVerifying, setIsVerifying] = useState(true);

	// Used to verify cookie validity
	const validateToken = async () => {
		try {
			let response = await testToken();
			if (response.statusText === "OK") {
				return true;
			}
			return false;
		} catch (err) {
			console.log(err);
			return false;
		}
	};

	// Check cookie and connection state
	useEffect(() => {
		const checkAuthSystem = async () => {
			setIsVerifying(true);
			if (!localStorage.getItem("logged")) {
				localStorage.setItem("logged", false);
			}
			if (
				localStorage.getItem("logged") == "false" &&
				document.cookie.includes("token")
			) {
				// TODO: Delete cookie if not valid
				(await validateToken())
					? localStorage.setItem("logged", true)
					: "";
			} else if (
				localStorage.getItem("logged") == "true" &&
				!document.cookie.includes("token")
			) {
				localStorage.setItem("logged", false);
			}
			setIsVerifying(false);
		};
		checkAuthSystem();
	}, [localStorage.getItem("logged")]); // Not sure
	return (
		<div className="layout_container">
			<Sidebar />
			<div className="layout_content">
				<Header />
				{isVerifying ? "" : <Outlet />}
			</div>
		</div>
	);
}

export default Layout;
