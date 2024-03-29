import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useAppContext } from "../AppContext";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";
import { getValue } from "../utils/storage";
import { LockedView } from "../components";
import { SCREEN_NAMES } from "../constants/screens";

const Auth = () => {
  const navigation = useNavigation();
  const { isAppLocked } = useAppContext();
  const { requestAuth } = useAuth({
    navigation,
    authMessage: i18nConfig.translate("auth.appLocked"),
  });

  useEffect(() => {
    const handleScreens = async () => {
      await getValue("showOnboarding")?.then((showOnboarding) => {
        if (showOnboarding === null) {
          navigation.goToStackScreen(SCREEN_NAMES.ONBOARDING);
        } else {
          navigation.goHome();
        }
      });
    };
    if (isAppLocked) {
      requestAuth(
        {
          authMessage: i18nConfig.translate("auth.appLocked"),
          persistent: true,
        },
        navigation.goHome,
      );
    } else {
      handleScreens();
    }
  }, [isAppLocked]);

  return isAppLocked ? <LockedView /> : null;
};

export default Auth;
