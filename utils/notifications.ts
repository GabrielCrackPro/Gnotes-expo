import { getValue, setValue } from "./storage";
import * as Notifications from "expo-notifications";

const getNotifications = async (): Promise<Notifications.Notification[]> => {
  try {
    const savedNotifications = await getValue("notifications");
    return JSON.parse(savedNotifications ?? "[]");
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

const saveNotification = async (
  notification: Notifications.Notification,
): Promise<void> => {
  try {
    const savedNotifications = await getNotifications();
    const newNotifications = [...savedNotifications, notification];
    setValue("notifications", JSON.stringify(newNotifications));
  } catch (error) {
    console.error("Error saving notification:", error);
  }
};

const deleteNotification = async (
  notification: Notifications.Notification,
): Promise<void> => {
  try {
    const notifications = await getNotifications();
    const newNotifications = notifications.filter(
      (n: Notifications.Notification) =>
        n.request.identifier !== notification.request.identifier,
    );
    setValue("notifications", JSON.stringify(newNotifications));
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};

export { getNotifications, saveNotification, deleteNotification };
