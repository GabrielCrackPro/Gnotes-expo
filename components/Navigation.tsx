import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "../navigators/HomeNavigator";
import NoteDetailsHeader from "./NoteDetailsHeader";
import { getHeaderTitle } from "../utils/common";
import { useTheme } from "react-native-paper";
import {
  Auth,
  Customize,
  NoteDetails,
  Notifications,
  Onboarding,
} from "../screens";
import { SCREEN_NAMES } from "../constants/screens";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

const Navigation: React.FC = () => {
  const Stack = createNativeStackNavigator();

  const { colors } = useTheme();

  const stackHeaderStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.background,
  };

  const stackHeaderTextStyle: StyleProp<TextStyle> = {
    color: colors.primary,
    fontWeight: "bold",
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.AUTH}
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ONBOARDING}
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.HOME_NAVIGATOR}
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAMES.CUSTOMIZE}
        component={Customize}
        options={({ route }) => ({
          headerLeft: () => <NoteDetailsHeader route={route} side="left" />,
          title: getHeaderTitle(route.name),
          headerStyle: stackHeaderStyle,
          headerTitleStyle: stackHeaderTextStyle,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.NOTES_DETAILS}
        component={NoteDetails}
        options={({ route }) => ({
          headerLeft: () => <NoteDetailsHeader route={route} side="left" />,
          headerRight: () => <NoteDetailsHeader route={route} side="right" />,
          title: getHeaderTitle(route.name),
          headerTitleStyle: stackHeaderTextStyle,
          headerStyle: stackHeaderStyle,
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.NOTIFICATIONS}
        component={Notifications}
        options={({ route }) => ({
          headerLeft: () => <NoteDetailsHeader route={route} side="left" />,
          title: getHeaderTitle(route.name),
          headerTitleStyle: stackHeaderTextStyle,
          headerStyle: stackHeaderStyle,
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
