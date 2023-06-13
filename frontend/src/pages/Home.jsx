import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../assets/styles/pages/home.scss";

function Home() {
	return (
		<>
			<Sidebar highlighted={"Home"} />
			<div className="home_page_container">
				<Header />
				<div className="home_page_content">
					<h2>Home page</h2>
				</div>
			</div>
		</>
	);
}

export default Home;
