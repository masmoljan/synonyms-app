import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler", { target: "19" }]],
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@store": path.resolve(__dirname, "./src/store"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@config": path.resolve(__dirname, "./src/config"),
			"@layout": path.resolve(__dirname, "./src/layout"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
});
