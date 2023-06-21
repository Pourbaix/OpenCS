import "../assets/styles/atoms/banner.scss";

function Banner(props) {
	return (
		<div className="banner_container">
			<div className="gradient_bg_layer"></div>
			<div className="content_layer">
				<h2>{props.title}</h2>
			</div>
		</div>
	);
}

export default Banner;
