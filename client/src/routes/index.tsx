import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import NotFoundPage from "../pages/not-found";

export const Routes = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <NotFoundPage />,
	},
]);
