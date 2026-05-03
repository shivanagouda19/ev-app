import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, List, Text, useTheme } from "react-native-paper";
import { signOut } from "../services/firebase";
import { mockUser } from "../data/mockData";

export default function ProfileScreen({ user, onSignOut }) {
  const theme = useTheme();

  // Profile state derived from auth
  const [profile, setProfile] = useState(mockUser);
  const [loading, setLoading] = useState(false);

  // Keep profile synced with auth state
  useEffect(() => {
    setProfile(user || mockUser);
  }, [user]);

  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    onSignOut();
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}
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
              <Text variant="titleLarge">{profile.name}</Text>
              <Text variant="bodyMedium" style={styles.mutedText}>
                {profile.email}
              </Text>
            </View>
          </View>

          <List.Section>
            <List.Item title="Phone" description={profile.phone} left={() => <List.Icon icon="phone" />} />
            <List.Item
              title="Scooter ID"
              description={profile.scooterId}
              left={() => <List.Icon icon="scooter" />}
            />
          </List.Section>

          <Button
            mode="contained"
            onPress={handleLogout}
            loading={loading}
            disabled={loading}
            style={styles.logoutButton}
          >
            Log out
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  logoutButton: {
    marginTop: 16,
  },
});
