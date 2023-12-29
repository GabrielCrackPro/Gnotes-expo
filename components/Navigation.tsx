import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeNavigator from "../navigators/HomeNavigator";
import Auth from "../screens/Auth";

const Navigation: React.FC = () => {
  const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
};

export default Navigation;
