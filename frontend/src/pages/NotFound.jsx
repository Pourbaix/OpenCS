import SadFace from "../assets/logo/sad.svg";

import "../assets/styles/pages/not_found.scss";

function NotFound() {
	return (
		<div className="not_found_container">
			<img
				src={SadFace}
				alt="Not found emoji"
				className="not_found_emoji"
			/>
			<h1>Error 404, page not found!</h1>
		</div>
	);
}

export default NotFound;
