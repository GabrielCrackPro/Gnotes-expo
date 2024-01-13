import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/Navigation";
import { darkTheme, lightTheme } from "./constants/themes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContext from "./AppContext";
import { useDarkMode } from "./hooks/useDarkMode";
import { PaperProvider } from "react-native-paper";
import * as StatusBar from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import * as Localization from "expo-localization";
import * as Notifications from "expo-notifications";
import { useAppLocked } from "./hooks/useAppLocked";
import { darkThemeColors, lightThemeColors } from "./constants/colors";
import { useEffect } from "react";
import { Platform } from "react-native";
import i18nConfig from "./locales/i18n-config";
import { useNotifications } from "./hooks/useNotifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const { isDark, toggleDark } = useDarkMode();
  const { isAppLocked, toggleAppLocked } = useAppLocked();
  const notifications = useNotifications();

  useNotifications();

  const globals = {
    isDark,
    isAppLocked,
    toggleAppLocked,
    toggleDark,
  };

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(
        isDark ? darkThemeColors.background : lightThemeColors.background,
      );
      NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
      StatusBar.setStatusBarBackgroundColor(
        isDark ? darkThemeColors.background : lightThemeColors.background,
        false,
      );
    }
  }, [isDark]);

  useEffect(() => {
    i18nConfig.locale = Localization.locale;
    i18nConfig.enableFallback = true;
  }, []);

  return (
    <AppContext.Provider value={globals}>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <StatusBar.StatusBar animated style={isDark ? "light" : "dark"} />
            <NavigationContainer theme={isDark ? darkTheme : lightTheme}>
              <Navigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </AppContext.Provider>
  );
}
