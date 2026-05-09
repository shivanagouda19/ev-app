# Rivot Motors EV Companion

React Native (Expo SDK 54) demo app with React Navigation, React Native Paper, maps, and mock-friendly Firebase services.

## Features

- Auth flow with login/signup screens (mock auth enabled)
- Bottom tabs: Dashboard, Live Map, Ride History, Profile
- Live map with location permissions and marker
- Mock ride history and telemetry data

## Getting Started

1) Install dependencies:

```bash
npm install
```

2) Start the app:

```bash
npm run start
```

## Optional Firebase Configuration

To use Firebase services, add environment values in `.env`:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_DATABASE_URL=
```

## Scripts

- `npm run start` - Start the Expo dev server
- `npm run android` - Launch on Android
- `npm run ios` - Launch on iOS
- `npm run web` - Launch in web browser

## Notes

- Auth is mocked in `src/services/firebase.js` while testing other screens.
- If any Firebase env value is missing, services fall back to mock data.
- Restart the Expo dev server after changing `.env`.
