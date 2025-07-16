import { useEffect } from "react";
import { ERROR_MESSAGES } from "@/constants/messages";
import { showErrorNotification } from "@/utils/notifications";

export function useErrorNotification(isError: boolean) {
  useEffect(() => {
    if (isError) {
      const errorMessage = ERROR_MESSAGES.GENERIC_ERROR;
      showErrorNotification(errorMessage);
    }
  }, [isError]);
}
