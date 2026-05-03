import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Text, useTheme } from "react-native-paper";
import { fetchRideHistory } from "../services/firebase";
import { mockUser } from "../data/mockData";

export default function RideHistoryScreen() {
  const theme = useTheme();

  // Ride history state
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch rides from Firestore or mock data
  useEffect(() => {
    let isMounted = true;

    fetchRideHistory(mockUser.id)
      .then((data) => {
        if (isMounted) {
          setRides(data);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderRide = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}
    >
      <Card.Content>
        <Text variant="titleMedium">{item.date}</Text>
        <View style={styles.row}>
          <Text>Distance</Text>
          <Text>{item.distanceKm} km</Text>
        </View>
        <View style={styles.row}>
          <Text>Duration</Text>
          <Text>{item.durationMin} min</Text>
        </View>
        <View style={styles.row}>
          <Text>Mode</Text>
          <Text>{item.mode}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {loading ? (
        <ActivityIndicator style={styles.loader} animating color={theme.colors.primary} />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={rides}
          keyExtractor={(item) => item.id}
          renderItem={renderRide}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 32,
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
