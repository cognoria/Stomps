import { create } from "zustand";
import useFormDataStore from "./chat_bot_store";

const initialState = {
  loading: false,
  error: null,
};

const useSitemapStore = create((set) => ({
  ...initialState,
  fetchSitemapAndUpdateInclude: async (sitemapUrl) => {
    console.log("Fetching sitemap...");
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
       links: html,
       loading: false,
     }));

      extractedLinks.forEach((link) => {
        useFormDataStore.getState().addDataToInclude(link);
      });
      useFormDataStore.getState().addDataToUrls(sitemapUrl);

      set({ loading: false });
      console.log("Include:", useFormDataStore.getState().formData.include);
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching sitemap:", error);
    }
  },
}));

export default useSitemapStore;
