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
import i18nConfig from "../locales/i18n-config";

const Settings: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { isAppLocked, toggleAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation: navigation,
    authMessage: i18nConfig.translate("auth.verify"),
  });

  const defaultSettingsItemStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
  };
  const defaultSettingsTextStyle: StyleProp<TextStyle> = {
    color: colors.text,
  };

  const handleClear = () => {
    clearStorage(() => navigation.dispatch(DrawerActions.openDrawer()));
  };

  const handleAppLock = () => {
    requestAuth(
      { authMessage: i18nConfig.translate("auth.verify") },
      toggleAppLocked,
    );
  };

  return (
    <View>
      <List.Item
        title={
          isAppLocked
            ? i18nConfig.translate("settings.unlockApp")
            : i18nConfig.translate("settings.lockApp")
        }
        description={
          isAppLocked
            ? i18nConfig.translate("settings.unlockDescription")
            : i18nConfig.translate("settings.lockDescription")
        }
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
      <List.Item
        title={i18nConfig.translate("settings.deleteAll")}
        description={i18nConfig.translate("settings.deleteDescription")}
        style={[defaultSettingsItemStyle, styles.row]}
        titleStyle={[defaultSettingsTextStyle, styles.text]}
        centered
        left={() => <List.Icon icon="delete" color={colors.primary} />}
        onPress={handleClear}
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
