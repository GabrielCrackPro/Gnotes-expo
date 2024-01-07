import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as LocalNotifications from "expo-notifications";
import { getNotifications } from "../utils/notifications";
import NotificationCard from "../components/NotificationCard";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<
    LocalNotifications.Notification[]
  >([]);

  useEffect(() => {
    const getSavedNotifications = async () => {
      const savedNotifications = await getNotifications();
      setNotifications(savedNotifications);
    };
    getSavedNotifications();
  }, []);
  return (
    <View style={styles.notifications}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => item.request.identifier}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  notifications: {
    flex: 1,
  },
});
