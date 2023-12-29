import { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthParams } from "../models/auth";

const useAuth = ({ navigation, authMessage, redirectRoute }: AuthParams) => {
  const [isCompatible, setIsCompatible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    setIsCompatible(compatible);
    if (!compatible || !enrolled) {
      return;
    }
    authUser();
  };

  const authUser = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: authMessage || "App is blocked, authenticate",
      });
      setIsAuthenticated(result.success === true);
      if (result.success && redirectRoute) {
        navigation.navigate("HomeNavigator", {
          screen: redirectRoute,
        });
      }
    } catch (error) {
      console.log("Auth error", error);
    }
  };

  const requestAuth = async (
    { authMessage, persistent }: Partial<AuthParams>,
    callback: () => void,
  ) => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: authMessage,
    });

    if (result.success) {
      callback();
    } else if (persistent) {
      await requestAuth({ authMessage, persistent }, callback);
    }
  };

  return { isCompatible, isAuthenticated, checkAuth, requestAuth };
};

export default useAuth;
