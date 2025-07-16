import "./styles/App.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes";

function App() {
	return <RouterProvider router={Routes} />;
}

export default App;
