import { Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Icon, Text, useTheme } from "react-native-paper";
import i18nConfig from "../locales/i18n-config";

const EmptyList = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.empty}>
      <Icon source="note-multiple" color={colors.primary} size={80} />
      <View>
        <Text
          variant="headlineLarge"
          style={[styles.text, { color: colors.text }]}
        >
          {i18nConfig.translate("emptyList.noNotes")}
        </Text>
        <Text variant="bodyLarge" style={[styles.text, { color: colors.text }]}>
          {i18nConfig.translate("emptyList.subNoNotes")}
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
