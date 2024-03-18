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
    console.log(url);
    try {
      set({ loading: true, error: null });
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const anchorElements = doc.querySelectorAll("a");
      const extractedLinks = Array.from(anchorElements).map((a) => a.href);
      console.log(extractedLinks);
      set((state) => ({
        ...state,
        links: extractedLinks,
        loading: false,
      }));
      extractedLinks.forEach((link) => {
        useFormDataStore.getState().addDataToInclude(link);
      });
      useFormDataStore.getState().addDataToUrls(url);
      useFormDataStore.getState().addWebsite(url);
    } catch (error) {
      set({ error: error.message, loading: false });
      console.error("Error fetching links:", error);
    }
  },
}));

export default useLinkStore;
