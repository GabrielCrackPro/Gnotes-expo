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
import { SCREEN_NAMES } from "../constants/screens";
import { GITHUB_URL } from "../constants/text";
import * as Browser from "expo-web-browser";

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

  const handleAbout = () => {
    Browser.openBrowserAsync(GITHUB_URL);
  };

  return (
    <View>
      <List.Item
        title={i18nConfig.translate("onboarding.navigate.title")}
        description={i18nConfig.translate("onboarding.navigate.description")}
        style={[defaultSettingsItemStyle, styles.row]}
        titleStyle={[defaultSettingsTextStyle, styles.text]}
        onPress={() => navigation.goToStackScreen(SCREEN_NAMES.ONBOARDING)}
        left={() => (
          <List.Icon
            icon="information-variant"
            color={colors.primary}
            style={{ padding: 8 }}
          />
        )}
      />
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
        onPress={handleAppLock}
        left={() => (
          <List.Icon
            icon={isAppLocked ? "lock" : "lock-open-variant"}
            color={colors.primary}
            style={{ padding: 8 }}
          />
        )}
      />
      <List.Item
        title={i18nConfig.translate("settings.deleteAll")}
        description={i18nConfig.translate("settings.deleteDescription")}
        style={[defaultSettingsItemStyle, styles.row]}
        titleStyle={[defaultSettingsTextStyle, styles.text]}
        left={() => (
          <List.Icon
            icon="delete"
            color={colors.primary}
            style={{ padding: 8 }}
          />
        )}
        onPress={handleClear}
      />
      <List.Item
        title={i18nConfig.translate("settings.aboutTitle")}
        description={i18nConfig.translate("settings.aboutDescription")}
        style={[defaultSettingsItemStyle, styles.row]}
        titleStyle={[defaultSettingsTextStyle, styles.text]}
        onPress={handleAbout}
        left={() => (
          <List.Icon
            icon="github"
            color={colors.primary}
            style={{ padding: 8 }}
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
