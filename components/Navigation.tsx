import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "../navigators/HomeNavigator";
import Auth from "../screens/Auth";
import NoteDetails from "../screens/NoteDetails";
import NoteDetailsHeader from "./NoteDetailsHeader";
import Notifications from "../screens/Notifications";
import { getHeaderTitle } from "../utils/common";
import { useTheme } from "react-native-paper";
import Onboarding from "../screens/Onboarding";
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
        name="Onboarding"
        component={Onboarding}
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
          title: getHeaderTitle(route.name),
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
          title: getHeaderTitle(route.name),
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
