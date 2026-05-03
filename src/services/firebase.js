import { initializeApp, getApps } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { get, getDatabase, ref } from "firebase/database";
import { mockRideHistory, mockUser } from "../data/mockData";

// Firebase config from Expo public env vars
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "",
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL || "",
};

const hasFirebaseConfig = Object.values(firebaseConfig).every((value) => Boolean(value));

const app = hasFirebaseConfig
  ? getApps().length > 0
    ? getApps()[0]
    : initializeApp(firebaseConfig)
  : null;

const auth = app ? getAuth(app) : null;
const firestore = app ? getFirestore(app) : null;
const realtimeDb = app ? getDatabase(app) : null;

// Auth helpers with mock fallback
export const signIn = async (email, password) => {
  if (auth) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { ...mockUser, id: result.user.uid, email: result.user.email || email };
  }
  return { ...mockUser, email };
};

export const signUp = async (email, password) => {
  if (auth) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { ...mockUser, id: result.user.uid, email: result.user.email || email };
  }
  return { ...mockUser, email };
};

export const signOut = async () => {
  if (auth) {
    await firebaseSignOut(auth);
  }
};

// Firestore ride history with mock fallback
export const fetchRideHistory = async (userId) => {
  if (firestore) {
    const snapshot = await getDocs(collection(firestore, "users", userId, "rides"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  return mockRideHistory;
};

// Realtime telemetry with mock fallback
export const fetchTelemetry = async (scooterId) => {
  if (realtimeDb) {
    const snapshot = await get(ref(realtimeDb, `scooters/${scooterId}`));
    if (snapshot.exists()) {
      return snapshot.val();
    }
  }
  return {
    batteryPct: 86,
    rangeKm: 42,
    rideMode: "Eco",
    speedKph: 18,
    isCharging: false,
  };
};
