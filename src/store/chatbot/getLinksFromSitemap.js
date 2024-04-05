import { create } from "zustand";
import useFormDataStore from "./chatbotSource";

const initialState = {
  links: [],
  loading: false,
  error: null,
};

const useSitemapStore = create((set) => ({
  ...initialState,
  fetchSitemapAndUpdateInclude: async (sitemapUrl) => {
    console.log("Fetching sitemap...");
    try {
      set({ loading: true, error: null });
      const response = await fetch(
        `/api/v1/data/links?type=sitemap&url=${sitemapUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const html = await response.json();

      set((state) => {
        const linksSet = new Set();
        linksSet.add(...state.links, ...html);
        console.log(linksSet);
        return {
          ...state,
          links: Array.from(linksSet),
          loading: false,
        };
      });

      useFormDataStore.getState().addDataToInclude(html);
      useFormDataStore.getState().addDataToUrls(sitemapUrl);

      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching sitemap:", error);
    }
  },
}));

export default useSitemapStore;
