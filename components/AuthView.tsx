import React, { useCallback } from "react";
import { View, ViewProps } from "react-native";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import LockedView from "./LockedView";
import { useNavigation } from "../hooks/useNavigation";

interface AuthViewProps extends ViewProps {
  children: React.ReactNode;
  authMessage: string;
  authEnabled: boolean;
}

const AuthView: React.FC<AuthViewProps> = ({
  children,
  authEnabled,
  authMessage,
  ...props
}) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const { checkAuth, isAuthenticated } = useAuth({
    navigation,
    authMessage,
  });

  const handleScreenFocus = useCallback(() => {
    if (authEnabled && isFocused) {
      checkAuth();
    }
  }, [authEnabled, isFocused]);

  useFocusEffect(
    useCallback(() => {
      handleScreenFocus();
      return () => {};
    }, [handleScreenFocus]),
  );

  return (authEnabled && isAuthenticated) || !authEnabled ? (
    <View {...props}>{children}</View>
  ) : (
    <LockedView />
  );
};

export default AuthView;
