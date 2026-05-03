import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Card, HelperText, Text, TextInput, useTheme } from "react-native-paper";
import { signIn, signUp } from "../services/firebase";

export default function LoginScreen({ onAuthSuccess }) {
  const theme = useTheme();

  // Form state and UX flags
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("rider@rivot.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear errors as the user edits input
  useEffect(() => {
    setError("");
  }, [email, password, isLogin]);

  // Submit auth request using Firebase or mock fallback
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = isLogin ? await signIn(email, password) : await signUp(email, password);
      onAuthSuccess(user);
    } catch (err) {
      setError(err?.message || "Unable to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Rivot Motors
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          EV Companion App
        </Text>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              {isLogin ? "Welcome back" : "Create account"}
            </Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry
              style={styles.input}
            />

            <HelperText type="error" visible={Boolean(error)}>
              {error}
            </HelperText>

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={styles.primaryButton}
            >
              {isLogin ? "Log in" : "Sign up"}
            </Button>

            <Button
              mode="text"
              onPress={() => setIsLogin((prev) => !prev)}
              textColor={theme.colors.primary}
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#B0B0B0",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    borderRadius: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 8,
    marginBottom: 8,
  },
});
