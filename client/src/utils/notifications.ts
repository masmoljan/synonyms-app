import { notifications } from "@mantine/notifications";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationOptions {
	title?: string;
	message: string;
	type?: NotificationType;
	autoClose?: number;
}

export const showNotification = ({
	title,
	message,
	type = "info",
	autoClose = 5000,
}: NotificationOptions) => {
	const colors = {
		success: "green",
		error: "red",
		warning: "yellow",
		info: "blue",
	} as const;

	const defaultTitles = {
		success: "Success",
		error: "Error",
		warning: "Warning",
		info: "Info",
	} as const;

	notifications.show({
		title: title || defaultTitles[type],
		message,
		color: colors[type],
		autoClose,
	});
};

export const showSuccessNotification = (message: string, title?: string) =>
	showNotification({ title, message, type: "success" });

export const showErrorNotification = (message: string, title?: string) =>
	showNotification({ title, message, type: "error" });

export const showWarningNotification = (message: string, title?: string) =>
	showNotification({ title, message, type: "warning" });

export const showInfoNotification = (message: string, title?: string) =>
	showNotification({ title, message, type: "info" });
