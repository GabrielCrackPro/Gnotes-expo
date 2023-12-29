import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigation } from "../models/navigation";
import useAuth from "../hooks/useAuth";
import LockedView from "../components/LockedView";
import { useAppContext } from "../AppContext";

const Auth = () => {
  const navigation = useNavigation<DrawerNavigation>();
  const { isAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation,
    authMessage: "Authentificate",
  });

  const redirectToHome = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Home",
      params: { add: false },
    });
  };

  useEffect(() => {
    if (isAppLocked) {
      requestAuth(
        { authMessage: "App is locked", persistent: true },
        redirectToHome,
      );
    } else {
      redirectToHome();
    }
  }, [isAppLocked]);

  return isAppLocked ? <LockedView /> : null;
};

export default Auth;
