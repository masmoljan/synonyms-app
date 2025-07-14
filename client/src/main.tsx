import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import App from "./App";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({
	fontFamily: "Inter, sans-serif",
	primaryColor: "blue",
	colors: {
		brand: [
			"#f0f9ff",
			"#e0f2fe",
			"#bae6fd",
			"#7dd3fc",
			"#38bdf8",
			"#0ea5e9", // Primary
			"#0284c7",
			"#0369a1",
			"#075985",
			"#0c4a6e",
		],
	},
	headings: {
		fontFamily: "Inter, sans-serif",
		fontWeight: "600",
	},
	components: {
		Paper: {
			defaultProps: {
				shadow: "sm",
				radius: "md",
			},
		},
		Button: {
			defaultProps: {
				radius: "md",
			},
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<MantineProvider theme={theme}>
				<Notifications position="top-right" limit={2} />
				<App />
			</MantineProvider>
		</Provider>
	</StrictMode>,
);
