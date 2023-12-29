import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { List, useTheme } from "react-native-paper";
import { clearStorage } from "../utils/storage";
import { DrawerActions } from "@react-navigation/native";
import { useAppContext } from "../AppContext";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";

const Settings: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { isAppLocked, toggleAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation: navigation,
    authMessage: "Authenticate",
  });

  const defaultSettingsItemStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.onSurface,
  };
  const defaultSettingsTextStyle: StyleProp<TextStyle> = {
    color: colors.text,
  };

  const handleClear = () => {
    clearStorage(() => navigation.dispatch(DrawerActions.openDrawer()));
  };

  const handleAppLock = () => {
    requestAuth(
      { authMessage: "Verify your identity to continue" },
      toggleAppLocked,
    );
  };

  return (
    <View>
      <List.Item
        title="Delete notes and books"
        style={[defaultSettingsItemStyle, styles.row]}
        titleStyle={[defaultSettingsTextStyle, styles.text]}
        centered
        left={() => <List.Icon icon="delete" color={colors.primary} />}
        onPress={handleClear}
      />
      <List.Item
        title={isAppLocked ? "Unlock App" : "Lock App"}
        style={[defaultSettingsItemStyle, styles.row]}
        titleStyle={[defaultSettingsTextStyle, styles.text]}
        centered
        onPress={handleAppLock}
        left={() => (
          <List.Icon
            icon={isAppLocked ? "lock" : "lock-open-variant"}
            color={colors.primary}
          />
        )}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  text: {},
});
