import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

// Pages & Components
import Layout from "./Layout.jsx";
import PlayerStats from "./pages/PlayerStats.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Demo from "./pages/Demo.jsx";
import Tricks from "./pages/Tricks.jsx";

// Main CSS
import "./index.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "",
				element: <Home />,
			},
			{
				path: "playerStats",
				element: <PlayerStats />,
			},
			{
				path: "demo",
				element: <Demo />,
			},
			{
				path: "tricks",
				element: <Tricks />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
