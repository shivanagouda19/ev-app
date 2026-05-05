import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";

const ACCENT_COLOR = "#00C853";
const CARD_COLOR = "#1E1E1E";

const CircularProgress = ({ progress, size, strokeWidth, label, sublabel }) => {
  const rotation = progress * 360;
  const rightRotation = rotation > 180 ? 180 : rotation;
  const leftRotation = rotation > 180 ? rotation - 180 : 0;
  const showLeft = rotation > 180;

  return (
    <View style={[styles.circleContainer, { width: size, height: size }]}
    >
      <View
        style={[
          styles.circleBase,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
          },
        ]}
      />
      <View
        style={[
          styles.halfWrap,
          {
            width: size / 2,
            height: size,
            right: 0,
          },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: ACCENT_COLOR,
              left: -size / 2,
              transform: [{ rotateZ: `${rightRotation}deg` }],
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.halfWrap,
          {
            width: size / 2,
            height: size,
            left: 0,
            opacity: showLeft ? 1 : 0,
          },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: ACCENT_COLOR,
              transform: [{ rotateZ: `${leftRotation}deg` }],
            },
          ]}
        />
      </View>
      <View style={styles.circleCenter}>
        <Text variant="headlineLarge" style={styles.circleValue}>
          {label}
        </Text>
        <Text variant="labelMedium" style={styles.circleLabel}>
          {sublabel}
        </Text>
      </View>
    </View>
  );
};

export default function DashboardScreen() {
  const theme = useTheme();

  // Mock data for the dashboard
  const userName = "Akshay";
  const batteryPct = 78;
  const rangeKm = 112;
  const [rideMode, setRideMode] = useState("Eco");

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.content}
    >
      {/* Greeting section */}
      <View style={styles.greeting}>
        <Text variant="headlineSmall" style={styles.greetingText}>
          Hey {userName}, Ready to Ride?
        </Text>
      </View>

      {/* Battery card with circular progress */}
      <Card style={[styles.card, { backgroundColor: CARD_COLOR }]}
      >
        <Card.Content style={styles.batteryCardContent}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Battery
          </Text>
          <CircularProgress
            progress={batteryPct / 100}
            size={150}
            strokeWidth={10}
            label={`${batteryPct}%`}
            sublabel="Charge"
          />
        </Card.Content>
      </Card>

      {/* Range card */}
      <Card style={[styles.card, { backgroundColor: CARD_COLOR }]}
      >
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Range Remaining
          </Text>
          <Text variant="displaySmall" style={styles.rangeValue}>
            {rangeKm} km
          </Text>
        </Card.Content>
      </Card>

      {/* Ride mode selector */}
      <Card style={[styles.card, { backgroundColor: CARD_COLOR }]}
      >
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Ride Mode
          </Text>
          <View style={styles.modeRow}>
            {["Eco", "Normal", "Sport"].map((mode) => {
              const isSelected = rideMode === mode;
              return (
                <Button
                  key={mode}
                  mode={isSelected ? "contained" : "outlined"}
                  onPress={() => setRideMode(mode)}
                  buttonColor={isSelected ? ACCENT_COLOR : "transparent"}
                  textColor={isSelected ? "#000000" : "#FFFFFF"}
                  style={styles.modeButton}
                >
                  {mode}
                </Button>
              );
            })}
          </View>
        </Card.Content>
      </Card>

      {/* Bottom stats row */}
      <Card style={[styles.card, { backgroundColor: CARD_COLOR }]}
      >
        <Card.Content>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>612 km</Text>
              <Text style={styles.statLabel}>Total Distance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>28 hrs</Text>
              <Text style={styles.statLabel}>Total Hours</Text>
            </View>
          </View>
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
  greeting: {
    paddingHorizontal: 4,
  },
  greetingText: {
    color: "#FFFFFF",
  },
  card: {
    borderRadius: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    marginBottom: 12,
  },
  batteryCardContent: {
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleBase: {
    position: "absolute",
    borderColor: "#2A2A2A",
  },
  halfWrap: {
    position: "absolute",
    top: 0,
    overflow: "hidden",
  },
  halfCircle: {
    position: "absolute",
    top: 0,
  },
  circleCenter: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  circleValue: {
    color: "#FFFFFF",
  },
  circleLabel: {
    color: "#B0B0B0",
  },
  rangeValue: {
    color: "#FFFFFF",
  },
  modeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modeButton: {
    flex: 1,
    borderColor: ACCENT_COLOR,
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
});
