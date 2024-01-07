import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import {
  getNotifications as getSavedNotifications,
  saveNotification,
} from "../utils/notifications";

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
      async (notification) => {
        console.log("Notification received:", notification);
        await saveNotification(notification);
      },
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
    trigger: Notifications.NotificationTriggerInput,
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

  const getNotifications = async (): Promise<Notifications.Notification[]> => {
    const notifications = await getSavedNotifications();
    return notifications;
  };

  const getNotificationsCount = async (): Promise<number> => {
    const notifications = await getSavedNotifications();
    return notifications.length;
  };

  return {
    scheduleNotification,
    getNotifications,
    getNotificationsCount,
  };
};
