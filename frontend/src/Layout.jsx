import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import { testToken } from "./services/actions";

import "./layout.scss";
import { useEffect } from "react";

function Layout() {
	// Used to verify cookie validity
	const validateToken = async () => {
		let response = await testToken();
		if (response.status === "OK") {
			return true;
		}
		return false;
	};
	// Check cookie and connection state
	useEffect(() => {
		if (!localStorage.getItem("logged")) {
			localStorage.setItem("logged", false);
		}
		if (
			localStorage.getItem("logged") == "false" &&
			document.cookie.includes("token")
		) {
			// TODO: Delete cookie if not valid
			validateToken() ? localStorage.setItem("logged", true) : "";
		} else if (
			localStorage.getItem("logged") == "true" &&
			!document.cookie.includes("token")
		) {
			localStorage.setItem("logged", false);
		}
	}, [localStorage.getItem("logged")]); // Not sure
	return (
		<div className="layout_container">
			<Sidebar />
			<div className="layout_content">
				<Header />
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
