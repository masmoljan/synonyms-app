import { useEffect } from "react";
import i18n from "@/localization/i18n.json";
import { showErrorNotification } from "@/utils/notifications";

export function useErrorNotification(isError: boolean) {
	useEffect(() => {
		if (isError) {
			const errorMessage = i18n.ERROR_MESSAGES.GENERIC_ERROR;
			showErrorNotification(errorMessage);
		}
	}, [isError]);
}
