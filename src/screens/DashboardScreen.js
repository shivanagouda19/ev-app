import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, ProgressBar, SegmentedButtons, Text, useTheme } from "react-native-paper";
import { fetchTelemetry } from "../services/firebase";

export default function DashboardScreen() {
  const theme = useTheme();

  // Scooter telemetry state
  const [batteryPct, setBatteryPct] = useState(86);
  const [rideMode, setRideMode] = useState("Eco");
  const [speedKph, setSpeedKph] = useState(18);
  const [isCharging, setIsCharging] = useState(false);
  const [rangeKm, setRangeKm] = useState(42);

  // Fetch initial telemetry (Firebase or mock)
  useEffect(() => {
    let isMounted = true;
    fetchTelemetry("RVT-42").then((data) => {
      if (!isMounted) {
        return;
      }
      setBatteryPct(data.batteryPct ?? 86);
      setRideMode(data.rideMode ?? "Eco");
      setSpeedKph(data.speedKph ?? 18);
      setIsCharging(Boolean(data.isCharging));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update range based on battery and ride mode
  useEffect(() => {
    const baseRange = rideMode === "Eco" ? 52 : rideMode === "Normal" ? 45 : 36;
    const computedRange = Math.max(0, Math.round((batteryPct / 100) * baseRange * 10) / 10);
    setRangeKm(computedRange);
  }, [batteryPct, rideMode]);

  // Simulate live telemetry drift
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryPct((prev) => Math.max(0, Number((prev - 0.3).toFixed(1))));
      setSpeedKph((prev) => (prev + 3) % 35);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Battery
          </Text>
          <View style={styles.row}>
            <Text variant="displaySmall" style={styles.statText}>
              {batteryPct}%
            </Text>
            <Chip icon={isCharging ? "flash" : "power"} style={styles.chip}>
              {isCharging ? "Charging" : "On road"}
            </Chip>
          </View>
          <ProgressBar progress={batteryPct / 100} color={theme.colors.primary} />
        </Card.Content>
      </Card>

      <View style={styles.grid}>
        <Card style={[styles.card, styles.halfCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium">Range</Text>
            <Text variant="headlineLarge" style={styles.statText}>
              {rangeKm} km
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, styles.halfCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium">Speed</Text>
            <Text variant="headlineLarge" style={styles.statText}>
              {speedKph} kph
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Ride Mode
          </Text>
          <SegmentedButtons
            value={rideMode}
            onValueChange={setRideMode}
            buttons={[
              { value: "Eco", label: "Eco" },
              { value: "Normal", label: "Normal" },
              { value: "Sport", label: "Sport" },
            ]}
          />
        </Card.Content>
      </Card>
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
  sectionTitle: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statText: {
    color: "#FFFFFF",
  },
  chip: {
    backgroundColor: "#2A2A2A",
  },
  grid: {
    flexDirection: "row",
    gap: 16,
  },
  halfCard: {
    flex: 1,
  },
});
