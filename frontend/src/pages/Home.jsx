import { useNavigate } from "react-router-dom";
import "../assets/styles/pages/home.scss";
import TryButton from "../atoms/TryButton";
import ContentBlock from "../components/ContentBlock";
import AccountLogin from "../components/AccountLogin";

function Home() {
	let navigate = useNavigate();
	const redirectToDemo = () => {
		console.log("Redirect to demo");
		navigate("/demo");
	};
	const redirectToPlayerStats = () => {
		console.log("Redirect to player stats");
		navigate("/playerStats");
	};
	return (
		<div className="home_page_container">
			<div className="presentation_block">
				<ContentBlock>
					<div className="introduction">
						<h2>Welcome to OpenCS!</h2>
						<p style={{ fontSize: "20px" }}>
							The new free tool that you need to analyse your
							counter-strike games and improve your skill set
						</p>
						<div className="description_block">
							<div className="heading">
								<h3>Demo Analyser</h3>
							</div>
							<p>
								Import any demo you want by sharecode and start
								analyzing now. Take a look at the scoreboard and
								the statistics and then deep dive in the demo
								viewer tool to find your team's weaknesses and
								strenghts.
							</p>
							<div className="image">Insert image</div>
							<div className="link">
								<TryButton
									text={"Analyse now"}
									callBack={redirectToDemo}
								/>
							</div>
						</div>
						<div className="description_block">
							<div className="heading">
								<h3>Player Stats</h3>
							</div>
							<p>
								Explore the statistics of any player and compare
								them with yours to see were you perform the
								most. Analyze your best and worst positions on
								each map and learn to play new ones.
							</p>
							<div className="image">Insert image</div>
							<div className="link">
								<TryButton
									text={"Check your stats"}
									callBack={redirectToPlayerStats}
								/>
							</div>
						</div>
					</div>
				</ContentBlock>
			</div>
			<div className="login_block">
				<div>
					<AccountLogin />
				</div>
			</div>
		</div>
	);
}

export default Home;
