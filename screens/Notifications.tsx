import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as LocalNotifications from "expo-notifications";
import NotificationCard from "../components/NotificationCard";
import { useNotifications } from "../hooks/useNotifications";
import EmptyList from "../components/EmptyList";
import i18nConfig from "../locales/i18n-config";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<
    LocalNotifications.Notification[]
  >([]);

  const { getNotifications } = useNotifications();

  useEffect(() => {
    const getSavedNotifications = async () => {
      const savedNotifications = await getNotifications();
      setNotifications(savedNotifications);
    };
    getSavedNotifications();
  }, [notifications]);
  return (
    <View style={styles.notifications}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => item.request.identifier}
        ListEmptyComponent={() => (
          <EmptyList
            icon="bell-off"
            title={i18nConfig.translate("notifications.emptyTitle")}
            description={i18nConfig.translate("notifications.emptyDescription")}
          />
        )}
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
