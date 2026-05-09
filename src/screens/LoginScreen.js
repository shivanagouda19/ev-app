import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, hasFirebaseConfig } from "../services/firebase";
import { mockUser } from "../data/mockData";

export default function LoginScreen({ navigation, onAuthSuccess }) {
  const theme = useTheme();

  // Tab selection state
  const [authMode, setAuthMode] = useState("login");

  // Form state and UX flags
  const [name, setName] = useState("Ava Rider");
  const [email, setEmail] = useState("rider@rivot.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Clear errors as the user edits input
  useEffect(() => {
    setError("");
  }, [name, email, password, authMode]);

  // Firebase auth: login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = hasFirebaseConfig && auth
        ? await signInWithEmailAndPassword(auth, email, password).then((result) => ({
            id: result.user.uid,
            name: result.user.displayName || mockUser.name,
            email: result.user.email || email,
            phone: mockUser.phone,
            scooterId: mockUser.scooterId,
          }))
        : { ...mockUser, email };
      onAuthSuccess(user);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (err) {
      setError(err?.message || "Unable to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  // Firebase auth: signup
  const handleSignup = async () => {
    setLoading(true);
    try {
      const user = hasFirebaseConfig && auth
        ? await createUserWithEmailAndPassword(auth, email, password).then((result) => ({
            id: result.user.uid,
            name: name || mockUser.name,
            email: result.user.email || email,
            phone: mockUser.phone,
            scooterId: mockUser.scooterId,
          }))
        : { ...mockUser, name: name || mockUser.name, email };
      onAuthSuccess(user);
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (err) {
      setError(err?.message || "Unable to create account.");
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
              {authMode === "login" ? "Welcome back" : "Create account"}
            </Text>

            {/* Auth mode tabs */}
            <SegmentedButtons
              value={authMode}
              onValueChange={setAuthMode}
              style={styles.tabs}
              buttons={[
                { value: "login", label: "Login" },
                { value: "signup", label: "Signup" },
              ]}
            />

            {/* Signup-only name field */}
            {authMode === "signup" ? (
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
              />
            ) : null}

            {/* Shared email + password fields */}
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

            {/* Inline error message */}
            <HelperText type="error" visible={Boolean(error)}>
              {error}
            </HelperText>

            {/* Primary action */}
            <Button
              mode="contained"
              onPress={authMode === "login" ? handleLogin : handleSignup}
              loading={loading}
              disabled={loading}
              style={styles.primaryButton}
            >
              {authMode === "login" ? "Log in" : "Sign up"}
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
  tabs: {
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
