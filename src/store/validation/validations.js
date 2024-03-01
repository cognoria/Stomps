import { create } from "zustand";

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export const usePasswordValidationStore = create((set) => ({
  hasUppercase: false,
  hasNumber: false,
  isLongEnough: false,
  updateValidation: (password = "") =>
    set((state) => ({
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      isLongEnough: password.length >= 6,
    })),
}));
