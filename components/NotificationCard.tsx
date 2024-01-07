import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text, Icon, useTheme, Button } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { deleteNotification } from "../utils/notifications";
import MiniNotificationScheduler from "./MiniNotificationScheduler";
import i18nConfig from "../locales/i18n-config";

interface NotificationCardProps {
  notification: Notifications.Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const { colors } = useTheme();

  const [schedulerVisible, setSchedulerVisible] = useState(false);

  const handleDeleteNotification = async () => {
    await deleteNotification(notification);
  };

  return (
    <>
      <View style={{ backgroundColor: colors.surfaceVariant }}>
        <View style={styles.row}>
          <View>
            <Icon source="bell" color={colors.primary} size={22} />
          </View>
          <View style={{ marginLeft: 30, marginRight: 240 }}>
            <Text variant="titleMedium" style={styles.notificationTitle}>
              {notification.request.content.title}
            </Text>
            <Text
              variant="bodySmall"
              style={{ color: colors.onSurfaceVariant }}
            >
              {notification.request.content.body}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            icon="clock"
            onPress={() => setSchedulerVisible((prev) => !prev)}
          >
            {schedulerVisible
              ? i18nConfig.translate("sheet.hideScheduler")
              : i18nConfig.translate("sheet.rescheduleNotification")}
          </Button>
          <Button icon="close" onPress={handleDeleteNotification}>
            {i18nConfig.translate("notifications.delete")}
          </Button>
        </View>
      </View>
      <MiniNotificationScheduler
        notification={notification}
        visible={schedulerVisible}
      />
    </>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notificationTitle: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});
