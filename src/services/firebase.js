import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { mockLiveRoute, mockRideHistory, mockUser } from "../data/mockData";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
};

export const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app = hasFirebaseConfig
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

export const auth = null;
export const db = app ? getFirestore(app) : null;
export const database = app ? getDatabase(app) : null;

const buildMockUser = (email) => ({
  ...mockUser,
  email: email || mockUser.email,
});

export const signIn = async (email, password) => {
  return buildMockUser(email);
};

export const signUp = async (email, password) => {
  return buildMockUser(email);
};

export const signOut = async () => {
  return true;
};

const mockTelemetry = {
  speedKph: 0,
  batteryPct: 78,
  rangeKm: 112,
  location: mockLiveRoute.origin,
  route: mockLiveRoute.path,
};

export const fetchRideHistory = async () => {
  if (!hasFirebaseConfig || !db) {
    return mockRideHistory;
  }

  try {
    return mockRideHistory;
  } catch (error) {
    return mockRideHistory;
  }
};

export const fetchTelemetry = async () => {
  if (!hasFirebaseConfig || !database) {
    return mockTelemetry;
  }

  try {
    return mockTelemetry;
  } catch (error) {
    return mockTelemetry;
  }
};