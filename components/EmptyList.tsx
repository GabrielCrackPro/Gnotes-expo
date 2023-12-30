import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Icon, Text, useTheme } from "react-native-paper";

const EmptyList = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.empty}>
      <Icon source="note-multiple" color={colors.primary} size={80} />
      <View>
        <Text
          variant="headlineLarge"
          style={[styles.text, { color: colors.onPrimary }]}
        >
          No notes
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.text, { color: colors.onPrimary }]}
        >
          Press the + symbol to add new notes
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
