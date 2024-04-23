import { create } from "zustand";
import useFormDataStore from "./useChatbotSource";
import { redirect } from "next/navigation";

export default create((set) => ({
  links: [],
  loading: false,
  error: null,

  fetchSitemapAndUpdateInclude: async (sitemapUrl) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `/api/v1/data/links?type=sitemap&url=${sitemapUrl}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        if (response.status === 401) return redirect("/signin");
        throw new Error(data.message || "An error occurred");
      }
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
      if (!response.ok) {
        if (response.status === 401) return redirect("/signin");
        throw new Error(data.message || "An error occurred");
      }
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
