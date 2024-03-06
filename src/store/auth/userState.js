import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null, // Initial state
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // unique name for localStorage key
      getStorage: () => localStorage, // specify storage type
    }
  )
);
