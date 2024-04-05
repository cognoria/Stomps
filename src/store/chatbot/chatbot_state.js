// store.js
import { create } from "zustand";

const bot_nav = create((set) => ({
  currentPage: "File",
  setCurrentPage: (pageName) => set({ currentPage: pageName }),
}));

export default bot_nav;
