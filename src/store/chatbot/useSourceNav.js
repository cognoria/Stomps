// store.js
import { create } from "zustand";

export default create((set) => ({
  currentPage: "File",
  setCurrentPage: (pageName) => set({ currentPage: pageName }),
}));

