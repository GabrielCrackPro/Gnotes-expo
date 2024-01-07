import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "../navigators/HomeNavigator";
import Auth from "../screens/Auth";
import NoteDetails from "../screens/NoteDetails";
import { IconButton, useTheme } from "react-native-paper";
import { View } from "react-native";
import NoteDetailsHeader from "./NoteDetailsHeader";
import Notifications from "../screens/Notifications";
import i18nConfig from "../locales/i18n-config";

const Navigation: React.FC = () => {
  const Stack = createNativeStackNavigator();

  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotesDetails"
        component={NoteDetails}
        options={({ route }) => ({
          headerLeft: () => <NoteDetailsHeader route={route} side="left" />,
          headerRight: () => <NoteDetailsHeader route={route} side="right" />,
          title: i18nConfig.translate(`header[${route.name}]`),
          headerTitleStyle: {
            color: colors.primary,
            fontWeight: "bold",
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
        })}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={({ route }) => ({
          headerLeft: () => <NoteDetailsHeader route={route} side="left" />,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.primary,
            fontWeight: "bold",
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
