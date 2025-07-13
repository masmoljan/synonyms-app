import { useEffect } from 'react';
import { notifications } from '@mantine/notifications';

export default function useErrorNotification(error: any) {
  useEffect(() => {
    if (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching data';

      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        autoClose: 5000,
      });
    }
  }, [error]);
}
