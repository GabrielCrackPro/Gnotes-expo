import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import LockedView from "../components/LockedView";
import { useAppContext } from "../AppContext";
import { useNavigation } from "../hooks/useNavigation";

const Auth = () => {
  const navigation = useNavigation();
  const { isAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation,
    authMessage: "Authentificate",
  });

  const redirectToHome = () => navigation.goHome();

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
