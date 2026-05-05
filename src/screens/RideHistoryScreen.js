import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Badge, Card, Text, useTheme } from "react-native-paper";

export default function RideHistoryScreen() {
  const theme = useTheme();

  // Mock ride history data
  const [rides] = useState([
    {
      id: "ride-1",
      date: "2026-05-01",
      distanceKm: 12.4,
      durationMin: 28,
      mode: "Eco",
    },
    {
      id: "ride-2",
      date: "2026-05-02",
      distanceKm: 8.9,
      durationMin: 19,
      mode: "Normal",
    },
    {
      id: "ride-3",
      date: "2026-05-03",
      distanceKm: 16.2,
      durationMin: 34,
      mode: "Sport",
    },
    {
      id: "ride-4",
      date: "2026-05-04",
      distanceKm: 10.7,
      durationMin: 24,
      mode: "Eco",
    },
    {
      id: "ride-5",
      date: "2026-05-05",
      distanceKm: 14.1,
      durationMin: 31,
      mode: "Normal",
    },
    {
      id: "ride-6",
      date: "2026-05-06",
      distanceKm: 6.3,
      durationMin: 15,
      mode: "Sport",
    },
  ]);

  // Badge colors for ride modes
  const modeColors = {
    Eco: "#42A5F5",
    Normal: "#FFFFFF",
    Sport: "#EF5350",
  };

  const renderRide = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: "#1E1E1E" }]}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            {item.date}
          </Text>
          <Badge
            style={[
              styles.modeBadge,
              { backgroundColor: modeColors[item.mode] || "#FFFFFF" },
            ]}
          >
            {item.mode}
          </Badge>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance</Text>
          <Text style={styles.value}>{item.distanceKm} km</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Duration</Text>
          <Text style={styles.value}>{item.durationMin} min</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header */}
      <Text variant="headlineSmall" style={styles.header}>
        Your Rides
      </Text>

      {/* Ride list or empty state */}
      {rides.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No rides found yet.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    color: "#FFFFFF",
    marginBottom: 12,
  },
  list: {
    gap: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    color: "#FFFFFF",
  },
  modeBadge: {
    color: "#000000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  label: {
    color: "#B0B0B0",
  },
  value: {
    color: "#FFFFFF",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#B0B0B0",
  },
});
