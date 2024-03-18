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
      if (
        !sitemapUrl.startsWith("http://") &&
        !sitemapUrl.startsWith("https://")
      ) {
        sitemapUrl = "https://" + sitemapUrl;
      }
      const response = await fetch(sitemapUrl);
      const xmlData = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      const urls = xmlDoc.getElementsByTagName("url");
      const extractedLinks = Array.from(urls).map(
        (urlNode) => urlNode.querySelector("loc").textContent
      );

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
