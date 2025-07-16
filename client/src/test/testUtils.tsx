import { MantineProvider } from "@mantine/core";
import { configureStore } from "@reduxjs/toolkit";
import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { apiSlice } from "@/api/apiSlice";

// Create a test store
const createTestStore = () =>
	configureStore({
		reducer: {
			[apiSlice.reducerPath]: apiSlice.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
	});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	const store = createTestStore();

	return (
		<Provider store={store}>
			<MantineProvider>{children}</MantineProvider>
		</Provider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
