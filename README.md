# Rivot Motors EV Companion

React Native (Expo SDK 51) app with Firebase Auth, Firestore, Realtime Database, React Navigation, Google Maps, and React Native Paper.

## Setup

1) Install dependencies:

```bash
npm install
```

2) Add Firebase env values in `.env`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=
```

3) Start the app:

```bash
npm run start
```

## Notes

- If any Firebase env value is missing, the app uses mock data.
- Restart the Expo dev server after changing `.env`.
