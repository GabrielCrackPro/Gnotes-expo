import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import React, { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import Dropdown from "./Dropdown";
import { Notification, NotificationTrigger } from "../models/Notification";
import { Button, useTheme } from "react-native-paper";
import i18nConfig from "../locales/i18n-config";
import TextInput from "../atoms/TextInput";

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
      notificationToSend?.trigger,
    );
  };

  return visible ? (
    <View>
      <TextInput
        type="input"
        placeholder={i18nConfig.translate("notificationScheduler.title")}
        onChangeText={(text: string) => setNotificationTitle(text)}
      />
      <View style={styles.row}>
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
            const trigger: NotificationTrigger = {
              channelId: "default",
              [select]: notificationFrom,
            };
            setNotificationTrigger(trigger);
          }}
        />
      </View>
      <TextInput
        type="textarea"
        placeholder={i18nConfig.translate("notificationScheduler.body")}
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
