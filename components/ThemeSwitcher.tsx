import React from "react";
import { useAppContext } from "../AppContext";
import { useTheme, IconButton } from "react-native-paper";

const ThemeSwitcher: React.FC = () => {
  const { colors } = useTheme();
  const { isDark, toggleDark } = useAppContext();

  return (
    <IconButton
      icon={isDark ? "white-balance-sunny" : "moon-waxing-crescent"}
      iconColor={colors.primary}
      size={15}
      onPress={toggleDark}
      animated
    />
  );
};

export default ThemeSwitcher;
