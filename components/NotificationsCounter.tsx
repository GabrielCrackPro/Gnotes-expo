import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useNotifications } from "../hooks/useNotifications";
import { useNavigation } from "../hooks/useNavigation";

const NotificationsCounter: React.FC = () => {
  const { colors } = useTheme();
  const { getNotificationsCount } = useNotifications();
  const navigation = useNavigation();

  const [count, setCount] = useState(0);
  let notificationsCount;

  useEffect(() => {
    const isAnyNotification = async () => {
      notificationsCount = await getNotificationsCount();
      setCount(notificationsCount);
    };

    isAnyNotification();
  }, [notificationsCount]);

  return (
    <View style={styles.notificationsCounter}>
      <IconButton
        icon={count === 0 ? "bell" : "bell-badge"}
        size={18}
        iconColor={colors.primary}
        onPress={() => navigation.goToNotifications()}
      />
      {count > 0 && (
        <Text
          style={{ color: colors.primary, fontSize: 18, fontWeight: "bold" }}
        >
          {count}
        </Text>
      )}
    </View>
  );
};

export default NotificationsCounter;

const styles = StyleSheet.create({
  notificationsCounter: {
    flexDirection: "row",
    alignItems: "center",
  },
});
