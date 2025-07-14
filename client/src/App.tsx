import "./styles/App.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { Routes } from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
	return <RouterProvider router={Routes} />;
}

export default App;
