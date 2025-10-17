import { create } from 'zustand';

export const useStore = create((set) => ({
  user: null,
  zones: [],
  alerts: [],
  
  setUser: (user) => set({ user }),
  setZones: (zones) => set({ zones }),
  setAlerts: (alerts) => set({ alerts }),
  
  logout: () => set({ user: null, zones: [], alerts: [] }),
}));