import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import Dropdown from "./Dropdown";
import { Notification, NotificationTrigger } from "../models/Notification";
import { Button, useTheme } from "react-native-paper";
import i18nConfig from "../locales/i18n-config";

interface NotificationSchedulerProps {
  visible: boolean;
}

const NotificationScheduler: React.FC<NotificationSchedulerProps> = ({
  visible,
}) => {
  const { scheduleNotification } = useNotifications();
  const { colors } = useTheme();

  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [notificationFrom, setNotificationFrom] = useState(0);
  const [notificationTrigger, setNotificationTrigger] =
    useState<NotificationTrigger | null>(null);

  const defaultInputStyles: StyleProp<TextStyle> = {
    backgroundColor: colors.surfaceVariant,
    color: colors.text,
  };

  const handleNotification = () => {
    const notificationToSend: Notification = {
      title: notificationTitle,
      body: notificationBody,
      trigger: {
        ...notificationTrigger,
        channelId: "default",
      },
    };

    scheduleNotification(
      notificationToSend?.title,
      notificationToSend?.body,
      notificationToSend?.trigger
    );
  };

  return visible ? (
    <View>
      <TextInput
        style={[defaultInputStyles, styles.textInput]}
        placeholder="Notification title"
        placeholderTextColor={colors.placeholder}
        onChangeText={(text: string) => setNotificationTitle(text)}
      />
      <View style={styles.row}>
        <TextInput
          style={[defaultInputStyles, styles.fromTextInput]}
          placeholder="From"
          placeholderTextColor={colors.placeholder}
          onChangeText={(text: string) => setNotificationFrom(Number(text))}
        />
        <Dropdown
          data={["seconds", "minutes", "hours"]}
          onSelect={(select: string) => {
            const trigger: NotificationTrigger = {
              channelId: "default",
              [select]: notificationFrom,
            };
            setNotificationTrigger(trigger);
          }}
        />
      </View>
      <TextInput
        style={[defaultInputStyles, styles.textArea]}
        placeholder="Notification body"
        placeholderTextColor={colors.placeholder}
        onChangeText={(text: string) => setNotificationBody(text)}
      />
      <Button onPress={handleNotification} mode="text">
        {i18nConfig.translate("buttons.accept")}
      </Button>
    </View>
  ) : null;
};

export default NotificationScheduler;

const styles = StyleSheet.create({
  textInput: {
    width: 340,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
    flexWrap: "wrap",
  },
  fromTextInput: {
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
    flexWrap: "wrap",
    width: 100,
    textAlign: "center",
  },
  textArea: {
    width: 340,
    height: 100,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 8,
  },
});
