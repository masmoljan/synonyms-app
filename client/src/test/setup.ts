import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock notifications
vi.mock("@/utils/notifications", () => ({
	showSuccessNotification: vi.fn(),
	showErrorNotification: vi.fn(),
	showWarningNotification: vi.fn(),
	showInfoNotification: vi.fn(),
	showNotification: vi.fn(),
}));

// Mock API config
vi.mock("@/config", () => ({
	default: "http://localhost:8082/api/v1",
}));

// Mock @mantine/notifications
vi.mock("@mantine/notifications", () => ({
	notifications: {
		show: vi.fn(),
	},
}));

if (!window.matchMedia) {
	window.matchMedia = () => ({
		matches: false,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
		onchange: null,
		media: "",
	});
}
