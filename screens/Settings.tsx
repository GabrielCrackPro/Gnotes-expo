import { FlatList } from "react-native";
import React from "react";
import { clearStorage } from "../utils/storage";
import { useAppContext } from "../AppContext";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";
import { SCREEN_NAMES } from "../constants/screens";
import { GITHUB_URL } from "../constants/text";
import { SettingsTile } from "../components";
import * as Browser from "expo-web-browser";

interface SettingsTile {
  title: string;
  description: string;
  icon: string;
  onPress?: () => void;
}

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const { isAppLocked, toggleAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation: navigation,
    authMessage: i18nConfig.translate("auth.verify"),
  });

  const handleClear = () => {
    clearStorage(() => navigation.openDrawer());
  };

  const handleAppLock = () => {
    requestAuth(
      { authMessage: i18nConfig.translate("auth.verify") },
      toggleAppLocked,
    );
  };

  const handleAbout = () => Browser.openBrowserAsync(GITHUB_URL);

  const settingsTiles: SettingsTile[] = [
    {
      title: i18nConfig.translate("onboarding.navigate.title"),
      description: i18nConfig.translate("onboarding.navigate.description"),
      icon: "information-variant",
      onPress: () => navigation.goToStackScreen(SCREEN_NAMES.ONBOARDING),
    },
    {
      title: isAppLocked
        ? i18nConfig.translate("settings.unlockApp")
        : i18nConfig.translate("settings.lockApp"),
      description: isAppLocked
        ? i18nConfig.translate("settings.unlockDescription")
        : i18nConfig.translate("settings.lockDescription"),
      icon: isAppLocked ? "lock" : "lock-open-variant",
      onPress: handleAppLock,
    },
    {
      title: i18nConfig.translate("settings.customizeTitle"),
      description: i18nConfig.translate("settings.customizeDescription"),
      icon: "palette",
      onPress: () => navigation.goToStackScreen(SCREEN_NAMES.CUSTOMIZE),
    },
    {
      title: i18nConfig.translate("settings.deleteAll"),
      description: i18nConfig.translate("settings.deleteDescription"),
      icon: "delete",
      onPress: handleClear,
    },
    {
      title: i18nConfig.translate("settings.aboutTitle"),
      description: i18nConfig.translate("settings.aboutDescription"),
      icon: "github",
      onPress: handleAbout,
    },
  ];

  return (
    <FlatList
      data={settingsTiles}
      renderItem={({ item }) => (
        <SettingsTile
          title={item.title}
          description={item.description}
          icon={item.icon}
          onPress={item.onPress}
        />
      )}
    />
  );
};

export default Settings;
