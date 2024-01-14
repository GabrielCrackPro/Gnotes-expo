import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { List, useTheme } from "react-native-paper";

interface SettingsTileProps {
  title: string;
  description: string;
  icon: string;
  onPress?: () => void;
}

const SettingsTile: React.FC<SettingsTileProps> = ({
  title,
  description,
  icon,
  onPress,
}) => {
  const { colors } = useTheme();

  const defaultSettingsItemStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
  };
  const defaultSettingsTextStyle: StyleProp<TextStyle> = {
    color: colors.text,
  };

  return (
    <List.Item
      title={title}
      description={description}
      style={[defaultSettingsItemStyle, styles.row]}
      titleStyle={[defaultSettingsTextStyle]}
      onPress={onPress}
      left={() => (
        <List.Icon icon={icon} color={colors.primary} style={{ padding: 8 }} />
      )}
    />
  );
};

export default SettingsTile;

const styles = StyleSheet.create({
  row: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
