// Mock data used when hardware or backend data is unavailable
export const mockUser = {
  id: "rivot-001",
  name: "Ava Rider",
  email: "rider@rivot.com",
  phone: "+1 555 0109",
  scooterId: "RVT-42",
};

export const mockRideHistory = [
  {
    id: "ride-1",
    date: "2026-04-28",
    distanceKm: 12.4,
    durationMin: 28,
    mode: "Eco",
  },
  {
    id: "ride-2",
    date: "2026-04-30",
    distanceKm: 8.9,
    durationMin: 19,
    mode: "Normal",
  },
  {
    id: "ride-3",
    date: "2026-05-02",
    distanceKm: 16.2,
    durationMin: 34,
    mode: "Sport",
  },
];

export const mockLiveRoute = {
  origin: {
    latitude: 37.7749,
    longitude: -122.4194,
  },
  path: [
    { latitude: 37.7749, longitude: -122.4194 },
    { latitude: 37.7761, longitude: -122.4182 },
    { latitude: 37.7775, longitude: -122.417 },
    { latitude: 37.779, longitude: -122.4161 },
    { latitude: 37.7804, longitude: -122.4152 },
    { latitude: 37.7816, longitude: -122.4145 },
  ],
};
