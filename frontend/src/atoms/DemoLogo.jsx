import "../assets/styles/atoms/demo_logo.scss";

function DemoLogo(props) {
	return (
		<div className="demo_logo_container">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 43.485 43.28"
				className={props.highlight ? "enabled" : "disabled"}
			>
				<g
					id="Groupe_1"
					data-name="Groupe 1"
					transform="translate(-14.045 -171.995)"
				>
					<g
						id="map-svgrepo-com"
						transform="translate(13.045 170.951)"
					>
						<path
							id="Tracé_1"
							data-name="Tracé 1"
							d="M3,16.1c0-2.153,0-3.229.463-4.156S4.787,10.375,6.51,9.084l5.265-3.948h0a10.255,10.255,0,0,1,3.137-1.944,4.387,4.387,0,0,1,2.429.062,10.257,10.257,0,0,1,3.034,2.1L23.993,8.37c2.558,2.132,3.837,3.2,5.362,3.237s2.857-.96,5.52-2.958l1.03-.772h0a4.113,4.113,0,0,1,6.581,3.29v18.1c0,2.153,0,3.229-.463,4.156s-1.324,1.572-3.047,2.864L33.71,40.233h0a10.254,10.254,0,0,1-3.137,1.944,4.388,4.388,0,0,1-2.429-.062,10.255,10.255,0,0,1-3.034-2.1l-4.736-3.946a10.256,10.256,0,0,0-3.034-2.1,4.388,4.388,0,0,0-2.429-.062,10.253,10.253,0,0,0-3.137,1.944h0a15.468,15.468,0,0,1-2.814,1.9,4.387,4.387,0,0,1-5.793-2.9A15.463,15.463,0,0,1,3,31.458V16.1Z"
							fill="none"
							stroke="#707070"
							strokeLinejoin="round"
							strokeWidth="3"
							className="logo"
						/>
						<path
							id="Tracé_2"
							data-name="Tracé 2"
							d="M15,7.229V36.34"
							transform="translate(14.323 4.99)"
							fill="none"
							stroke="#707070"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="3"
							className="logo"
						/>
						<path
							id="Tracé_3"
							data-name="Tracé 3"
							d="M9,3.5V32.474"
							transform="translate(7.162 0.538)"
							fill="none"
							stroke="#707070"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="3"
							className="logo"
						/>
					</g>
					<g
						id="play-circle-svgrepo-com"
						transform="translate(24 182)"
					>
						<path
							id="Tracé_4"
							data-name="Tracé 4"
							d="M12,21a9,9,0,1,0-9-9A9,9,0,0,0,12,21Zm3.224-7.983a1.171,1.171,0,0,0,0-2.034L10.782,8.444a1.024,1.024,0,0,0-1.532.889v5.333a1.024,1.024,0,0,0,1.532.889Z"
							fill="#272727"
							fillRule="evenodd"
							className="logo"
						/>
						<path
							id="Tracé_5"
							data-name="Tracé 5"
							d="M21,12a9,9,0,1,1-9-9A9,9,0,0,1,21,12Z"
							fill="#272727"
							stroke="#707070"
							strokeWidth="3"
							className="logo"
						/>
						<path
							id="Tracé_6"
							data-name="Tracé 6"
							d="M10.9,8.8l-.242-.138A.774.774,0,0,0,9.5,9.333v5.333a.774.774,0,0,0,1.158.672L10.9,15.2l4.2-2.4a.921.921,0,0,0,0-1.6Z"
							fill="#272727"
							stroke="#707070"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="3"
							className="logo"
						/>
					</g>
				</g>
			</svg>
		</div>
	);
}

export default DemoLogo;
