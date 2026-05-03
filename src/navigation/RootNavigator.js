import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LiveMapScreen from "../screens/LiveMapScreen";
import RideHistoryScreen from "../screens/RideHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Map tab names to icons
const getTabIcon = (routeName, color, size) => {
  const iconByRoute = {
    Dashboard: "speedometer",
    LiveMap: "map-marker",
    RideHistory: "history",
    Profile: "account-circle",
  };
  const iconName = iconByRoute[routeName] || "circle";
  return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
};

// Bottom tabs for the signed-in experience
function MainTabs({ user, onSignOut }) {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.onSurface,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarIcon: ({ color, size }) => getTabIcon(route.name, color, size),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: "Dashboard" }} />
      <Tab.Screen name="LiveMap" component={LiveMapScreen} options={{ title: "Live Map" }} />
      <Tab.Screen
        name="RideHistory"
        component={RideHistoryScreen}
        options={{ title: "Ride History" }}
      />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} user={user} onSignOut={onSignOut} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

// Root navigator switching between auth and app
export default function RootNavigator({ isSignedIn, onAuthSuccess, onSignOut, user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <Stack.Screen name="Main">
          {(props) => <MainTabs {...props} user={user} onSignOut={onSignOut} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {(props) => <LoginScreen {...props} onAuthSuccess={onAuthSuccess} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
