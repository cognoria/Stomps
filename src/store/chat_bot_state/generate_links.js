import { create } from "zustand";
import useFormDataStore from "./chat_bot_store";

const initialState = {
  links: [],
  loading: false,
  error: null,
};

const useLinkStore = create((set, get) => ({
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


      set((state) =>{
        const linksSet = new Set()
        linksSet.add(...state.links, ...html)
        console.log(linksSet)
        return {
          ...state,
          links: Array.from(linksSet),
          loading: false,
        };
      });

      useFormDataStore.getState().addDataToInclude(html);

      // console.log(links);
      useFormDataStore.getState().addDataToUrls(url);
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching links:", error);
    }
  },
}));

export default useLinkStore;
