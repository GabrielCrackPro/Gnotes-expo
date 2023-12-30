import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/Navigation";
import { darkTheme, lightTheme } from "./constants/themes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContext from "./AppContext";
import { useDarkMode } from "./hooks/useDarkMode";
import { PaperProvider } from "react-native-paper";
import * as StatusBar from "expo-status-bar";
import { useAppLocked } from "./hooks/useAppLocked";
import { darkThemeColors, lightThemeColors } from "./constants/colors";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function App() {
  const { isDark, toggleDark } = useDarkMode();
  const { isAppLocked, toggleAppLocked } = useAppLocked();

  const globals = {
    isDark,
    isAppLocked,
    toggleAppLocked,
    toggleDark,
  };

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

  return (
    <AppContext.Provider value={globals}>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <StatusBar.StatusBar animated style={isDark ? "light" : "dark"} />
          <NavigationContainer theme={isDark ? darkTheme : lightTheme}>
            <Navigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </AppContext.Provider>
  );
}
