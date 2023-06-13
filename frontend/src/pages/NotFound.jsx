import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

import SadFace from "../assets/logo/sad.svg";

import "../assets/styles/pages/not_found.scss";

function NotFound() {
	return (
		<>
			<Sidebar />
			<div className="not_found_container">
				<Header />
				<div className="not_found_content">
					<img
						src={SadFace}
						alt="Not found emoji"
						className="not_found_emoji"
					/>
					<h1>Error 404, page not found!</h1>
				</div>
			</div>
		</>
	);
}

export default NotFound;
