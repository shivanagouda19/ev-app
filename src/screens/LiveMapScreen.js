import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Card, Text, useTheme } from "react-native-paper";
import { mockLiveRoute } from "../data/mockData";

export default function LiveMapScreen() {
  const theme = useTheme();

  // Location and route state
  const [routeIndex, setRouteIndex] = useState(0);
  const [location, setLocation] = useState(mockLiveRoute.path[0]);
  const [speedKph, setSpeedKph] = useState(18);

  // Simulate GPS updates along the mock route
  useEffect(() => {
    const interval = setInterval(() => {
      setRouteIndex((prev) => {
        const nextIndex = (prev + 1) % mockLiveRoute.path.length;
        setLocation(mockLiveRoute.path[nextIndex]);
        setSpeedKph(14 + (nextIndex % 6) * 2);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mockLiveRoute.origin.latitude,
          longitude: mockLiveRoute.origin.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={mockLiveRoute.path} strokeWidth={4} strokeColor={theme.colors.primary} />
        <Marker coordinate={location} title="Scooter" description="Live location" />
      </MapView>

      <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium">Live Telemetry</Text>
          <View style={styles.infoRow}>
            <Text>Speed</Text>
            <Text>{speedKph} kph</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Latitude</Text>
            <Text>{location.latitude.toFixed(4)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Longitude</Text>
            <Text>{location.longitude.toFixed(4)}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoCard: {
    margin: 16,
    borderRadius: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
