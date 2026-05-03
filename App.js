import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer, DarkTheme as NavDarkTheme } from "@react-navigation/native";
import { ActivityIndicator, Provider as PaperProvider } from "react-native-paper";
import RootNavigator from "./src/navigation/RootNavigator";
import { appTheme } from "./src/theme/theme";

export default function App() {
  // App-level state for auth and initial boot
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Simulate restoring auth state on app launch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBootstrapping(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auth callbacks used by screens
  const handleAuthSuccess = (userInfo) => {
    setUser(userInfo);
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsSignedIn(false);
  };

  // Navigation colors aligned to the Paper dark theme
  const navTheme = {
    ...NavDarkTheme,
    colors: {
      ...NavDarkTheme.colors,
      background: appTheme.colors.background,
      card: appTheme.colors.surface,
      primary: appTheme.colors.primary,
      text: appTheme.colors.onSurface,
      border: appTheme.colors.outline,
      notification: appTheme.colors.primary,
    },
  };

  if (isBootstrapping) {
    return (
      <PaperProvider theme={appTheme}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: appTheme.colors.background,
          }}
        >
          <ActivityIndicator animating size="large" color={appTheme.colors.primary} />
        </View>
      </PaperProvider>
    );
  }

  // Root app shell with theme + navigation
  return (
    <PaperProvider theme={appTheme}>
      <NavigationContainer theme={navTheme}>
        <StatusBar barStyle="light-content" />
        <RootNavigator
          isSignedIn={isSignedIn}
          user={user}
          onAuthSuccess={handleAuthSuccess}
          onSignOut={handleSignOut}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
