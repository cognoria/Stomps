import { create } from "zustand";
import useFormDataStore from "./useChatbotSource";

export default create((set) => ({
  links: [],
  loading: false,
  error: null,

  fetchSitemapAndUpdateInclude: async (sitemapUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/data/links?type=sitemap&url=${sitemapUrl}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.json();

      set((state) => ({
        links: Array.from(new Set([...state.links, ...html])),
        loading: false,
      }));

      useFormDataStore.getState().addDataToInclude(html);
      useFormDataStore.getState().addDataToUrls(sitemapUrl);
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching sitemap:", error);
    }
  },

  fetchLinksAndUpdateInclude: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/data/links?type=web&url=${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const html = await response.json();

      set((state) => ({
        links: Array.from(new Set([...state.links, ...html])),
        loading: false,
      }));

      useFormDataStore.getState().addDataToInclude(html);
      useFormDataStore.getState().addDataToUrls(url);
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching links:", error);
    }
  },
}));
