import { create } from "zustand";
import useFormDataStore from "./chat_bot_store";

const initialState = {
  links: [],
  loading: false,
  error: null,
};

const useLinkStore = create((set) => ({
  ...initialState,
  fetchLinksAndUpdateInclude: async (url) => {
    try {
      set({ loading: true, error: null });
      const response = await fetch(`/api/v1/data/links?type=web&url=${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const html = await response.json();

      set((state) => ({
        ...state,
        links: html.data,
        loading: false,
      }));

      useFormDataStore.getState().addDataToInclude(html.data);

      console.log(links);
      useFormDataStore.getState().addDataToUrls(url);
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching links:", error);
    }
  },
}));

export default useLinkStore;
