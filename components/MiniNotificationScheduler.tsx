import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import TextInput from "../atoms/TextInput";
import i18nConfig from "../locales/i18n-config";
import * as Notifications from "expo-notifications";
import { Button, useTheme } from "react-native-paper";
import { useNotifications } from "../hooks/useNotifications";
import { deleteNotification } from "../utils/notifications";

interface MiniNotificationSchedulerProps {
  notification: Notifications.Notification;
  visible: boolean;
}

const MiniNotificationScheduler: React.FC<MiniNotificationSchedulerProps> = ({
  notification,
  visible,
}) => {
  const { colors } = useTheme();
  const { scheduleNotification } = useNotifications();

  const [notificationFrom, setNotificationFrom] = useState(0);
  const [notificationTrigger, setNotificationTrigger] =
    useState<Notifications.NotificationTrigger>(notification.request.trigger);

  const handleNotification = async () => {
    scheduleNotification(
      notification.request.content.title as string,
      notification.request.content.body as string,
      notificationTrigger as Notifications.NotificationTriggerInput,
    );
    await deleteNotification(notification);
  };

  return visible ? (
    <View style={[styles.row, { backgroundColor: colors.surfaceVariant }]}>
      <TextInput
        type="input"
        style={styles.fromTextInput}
        placeholder={i18nConfig.translate("notificationScheduler.in")}
        onChangeText={(text: string) => setNotificationFrom(Number(text))}
        keyboardType="numeric"
      />
      <Dropdown
        placeholder={i18nConfig.translate("notificationScheduler.select")}
        data={["seconds", "minutes", "hours"]}
        onSelect={(select: string) => {
          const trigger: Notifications.NotificationTrigger = {
            channelId: "default",
            [select]: notificationFrom,
          };
          setNotificationTrigger(trigger);
        }}
      />
      <Button icon="check" onPress={handleNotification}>
        {i18nConfig.translate("buttons.accept")}
      </Button>
    </View>
  ) : null;
};

export default MiniNotificationScheduler;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  fromTextInput: {
    width: 100,
    textAlign: "center",
  },
});
