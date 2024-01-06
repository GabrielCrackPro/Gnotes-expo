import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export const useNotifications = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to show notifications denied!");
      }
    };

    requestNotificationPermission();

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received:", notification);
        // Handle the received notification as needed
      }
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        // Handle user interaction with the notification
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const scheduleNotification = async (
    title: string,
    body: any,
    trigger: Notifications.NotificationTriggerInput
  ) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return {
    scheduleNotification,
  };
};
