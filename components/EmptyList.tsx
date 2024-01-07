import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Icon, Text, useTheme } from "react-native-paper";

interface EmptyListProps {
  icon: string;
  title: string;
  description: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ icon, title, description }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.empty}>
      <Icon source={icon} color={colors.primary} size={80} />
      <View>
        <Text
          variant="headlineLarge"
          style={[styles.text, { color: colors.text }]}
        >
          {title}
        </Text>
        <Text variant="bodyLarge" style={[styles.text, { color: colors.text }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  empty: {
    height: Dimensions.get("screen").height - 270,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
