import { useEffect } from "react";
import "../assets/styles/atoms/try_button.scss";

function TryButton(props) {
	const callBackFunction = () => {
		if (props.callBack) {
			props.callBack();
		}
	};
	return (
		<div className="try_button_container">
			<div className="outer_div">
				<button onClick={callBackFunction}>
					<p>{props.text}</p>
					<div className="btn_bg"></div>
				</button>
			</div>
		</div>
	);
}

export default TryButton;
