import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./components/Navigation";
import { darkTheme, lightTheme } from "./constants/themes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppContext from "./AppContext";
import { useDarkMode } from "./hooks/useDarkMode";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useAppLocked } from "./hooks/useAppLocked";

export default function App() {
  const { isDark, toggleDark } = useDarkMode();
  const { isAppLocked, toggleAppLocked } = useAppLocked();

  const globals = {
    isDark,
    isAppLocked,
    toggleAppLocked,
    toggleDark,
  };

  return (
    <AppContext.Provider value={globals}>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <StatusBar animated style={isDark ? "light" : "dark"} />
          <NavigationContainer theme={isDark ? darkTheme : lightTheme}>
            <Navigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </AppContext.Provider>
  );
}
