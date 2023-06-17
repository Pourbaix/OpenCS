import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

import "./layout.scss";

function Layout() {
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
