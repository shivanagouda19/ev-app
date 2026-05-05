import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ActivityIndicator, Button, Card, Text, useTheme } from "react-native-paper";

const ACCENT_COLOR = "#00C853";
const DEFAULT_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#1b1b1b" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2c2c2c" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#232323" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6f6f6f" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1a1a1a" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#121212" }] },
];

export default function LiveMapScreen() {
  const theme = useTheme();

  // Location and permission state
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock speed for now
  const speedKph = 0;

  // Request permission and fetch the current GPS location
  useEffect(() => {
    let isMounted = true;

    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        if (isMounted) {
          setError("Location permission denied. Enable it in settings to use Live Map.");
          setIsLoading(false);
        }
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (isMounted) {
        setLocation({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        });
        setAccuracy(current.coords.accuracy ?? null);
        setIsLoading(false);
      }
    };

    requestLocation().catch(() => {
      if (isMounted) {
        setError("Unable to fetch location.");
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const mapRegion = location
    ? { ...DEFAULT_REGION, ...location }
    : DEFAULT_REGION;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Map layer with dark styling */}
      <MapView
        style={styles.map}
        region={mapRegion}
        customMapStyle={DARK_MAP_STYLE}
      >
        {location ? (
          <Marker coordinate={location} pinColor={ACCENT_COLOR} title="You" />
        ) : null}
      </MapView>

      {/* Permission error banner */}
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {/* Loading overlay while fetching location */}
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator animating size="large" color={ACCENT_COLOR} />
          <Text style={styles.loadingText}>Fetching location...</Text>
        </View>
      ) : null}

      {/* Floating telemetry card and start button */}
      <View style={styles.bottomOverlay}>
        <Card style={[styles.infoCard, { backgroundColor: "#1E1E1E" }]}
        >
          <Card.Content>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Live Telemetry
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Speed</Text>
              <Text style={styles.infoValue}>{speedKph} km/h</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>GPS Accuracy</Text>
              <Text style={styles.infoValue}>
                {accuracy ? `${Math.round(accuracy)} m` : "Unknown"}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          buttonColor={ACCENT_COLOR}
          textColor="#000000"
          style={styles.startButton}
        >
          Start Ride
        </Button>
      </View>
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
  errorBanner: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#2B1A1A",
  },
  errorText: {
    color: "#FF8A80",
    textAlign: "center",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  loadingText: {
    marginTop: 12,
    color: "#FFFFFF",
  },
  bottomOverlay: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
    gap: 12,
  },
  infoCard: {
    borderRadius: 16,
  },
  cardTitle: {
    color: "#FFFFFF",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  infoLabel: {
    color: "#B0B0B0",
  },
  infoValue: {
    color: "#FFFFFF",
  },
  startButton: {
    alignSelf: "center",
    paddingHorizontal: 24,
  },
});
