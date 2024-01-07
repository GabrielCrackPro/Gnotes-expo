import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { IconButton, Text, useTheme } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { deleteNotification } from "../utils/notifications";

interface NotificationCardProps {
  notification: Notifications.Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  const { colors } = useTheme();

  const defaultNotificationCardStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
  };

  const defaultNotificationTitleStyle: StyleProp<TextStyle> = {
    color: colors.text,
  };

  const defaultNotificationDescriptionStyle: StyleProp<TextStyle> = {
    color: colors.text,
  };

  const handleDeleteNotification = async () => {
    await deleteNotification(notification);
    console.log("deleted");
  };

  return (
    <View style={[defaultNotificationCardStyle, styles.notificationCard]}>
      <IconButton
        icon="close"
        iconColor={colors.primary}
        size={18}
        onPress={handleDeleteNotification}
      />
      <Text
        variant="titleMedium"
        style={[defaultNotificationTitleStyle, styles.notificatioTitle]}
      >
        {notification.request.content.title}
      </Text>
      <Text
        variant="bodyMedium"
        style={[
          defaultNotificationDescriptionStyle,
          styles.notificationDescription,
        ]}
      >
        {notification.request.content.body}
      </Text>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  notificationCard: {
    marginVertical: 10,
    padding: 15,
    position: "relative",
  },
  notificatioTitle: {
    fontWeight: "bold",
  },
  notificationDescription: {},
  deleteIcon: {
    position: "absolute",
    right: 10,
  },
});
