// store.js
import { create } from "zustand";

const useModalStore = create((set) => ({
  isModalShown: false,
  modalContent: "",
  showModal: (content) => set({ isModalShown: true, modalContent: content }),
  hideModal: () => set({ isModalShown: false }),
}));

export default useModalStore;
