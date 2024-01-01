import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import LockedView from "../components/LockedView";
import { useAppContext } from "../AppContext";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";

const Auth = () => {
  const navigation = useNavigation();
  const { isAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation,
    authMessage: i18nConfig.translate("auth.appLocked"),
  });

  const redirectToHome = () => navigation.goHome();

  useEffect(() => {
    if (isAppLocked) {
      requestAuth(
        {
          authMessage: i18nConfig.translate("auth.appLocked"),
          persistent: true,
        },
        redirectToHome,
      );
    } else {
      redirectToHome();
    }
  }, [isAppLocked]);

  return isAppLocked ? <LockedView /> : null;
};

export default Auth;
