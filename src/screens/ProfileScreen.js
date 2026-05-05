import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, List, Switch, Text, useTheme } from "react-native-paper";
import { signOut } from "../services/firebase";
import { mockUser } from "../data/mockData";

export default function ProfileScreen({ navigation, user, onSignOut }) {
  const theme = useTheme();

  // Profile state derived from auth
  const [profile, setProfile] = useState(mockUser);
  const [loading, setLoading] = useState(false);

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Keep profile synced with auth state
  useEffect(() => {
    setProfile(user || mockUser);
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    onSignOut();
    navigation.reset({
      index: 0,
      routes: [{ name: "Auth" }],
    });
    setLoading(false);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Profile header */}
      <Card style={[styles.card, { backgroundColor: "#1E1E1E" }]}
      >
        <Card.Content>
          <View style={styles.header}>
            <Avatar.Text
              size={72}
              label={profile.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
              style={{ backgroundColor: theme.colors.primary }}
              color="#000000"
            />
            <View>
              <Text variant="titleLarge" style={styles.title}>
                {profile.name}
              </Text>
              <Text variant="bodyMedium" style={styles.mutedText}>
                {profile.email}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Stats row */}
      <Card style={[styles.card, { backgroundColor: "#1E1E1E" }]}
      >
        <Card.Content>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>340 km</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18h</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Settings list */}
      <Card style={[styles.card, { backgroundColor: "#1E1E1E" }]}
      >
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Settings
          </Text>
          <List.Item
            title="Edit Profile"
            left={() => <List.Icon icon="account-edit" />}
            right={() => <List.Icon icon="chevron-right" />}
          />
          <List.Item
            title="Notifications"
            left={() => <List.Icon icon="bell" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                color="#00C853"
              />
            )}
          />
          <List.Item
            title="App Theme"
            description="Dark"
            left={() => <List.Icon icon="theme-light-dark" />}
          />
          <List.Item
            title="About App"
            description="Version 1.0.0"
            left={() => <List.Icon icon="information" />}
          />
        </Card.Content>
      </Card>

      {/* Logout action */}
      <Button
        mode="contained"
        onPress={handleLogout}
        loading={loading}
        disabled={loading}
        buttonColor="#EF5350"
        textColor="#000000"
        style={styles.logoutButton}
      >
        Log out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  mutedText: {
    color: "#B0B0B0",
  },
  title: {
    color: "#FFFFFF",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    color: "#B0B0B0",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: "#2A2A2A",
  },
  sectionTitle: {
    color: "#FFFFFF",
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 8,
  },
});
