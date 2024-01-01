import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import React from "react";
import { IconButton, Text, useTheme } from "react-native-paper";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";

const LockedView: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { checkAuth } = useAuth({
    authMessage: i18nConfig.translate("auth.reauth"),
    navigation: navigation,
  });

  const defaultTextStyle: StyleProp<TextStyle> = {
    color: colors.text,
  };
  return (
    <View style={styles.locked}>
      <IconButton
        icon="lock"
        size={100}
        iconColor={colors.primary}
        onPress={checkAuth}
      />
      <Text variant="titleLarge" style={[defaultTextStyle, styles.text]}>
        {i18nConfig.translate("auth.screenLocked")}
      </Text>
      <Text variant="bodyLarge" style={[defaultTextStyle, styles.text]}>
        {i18nConfig.translate("auth.reauth")}
      </Text>
    </View>
  );
};

export default LockedView;

const styles = StyleSheet.create({
  locked: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 150,
  },
  text: {
    marginHorizontal: 20,
    textAlign: "center",
  },
});
