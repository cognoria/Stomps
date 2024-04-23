import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export default create(
  devtools((set) => ({
    website: "",
    text: "",
    sitemap: "",
    urls: [],
    include: [],
    exclude: [],
    questions: [],
    files: [],
    gettingKnowledgebase: false,
    fetching: false,

    getKnowledgebase: async (botId) => {
      set({ gettingKnowledgebase: true, error: null });
      try {
        const response = await fetch(`/api/v1/chatbot/${botId}/source`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) return redirect("/signin");
          throw new Error(data.message || "An error occurred");
        }
        const updatedState = { ...data.knowledgebase };
        const files = [];
        data.knowledgebase.contents.forEach(({ url, content }) => {
          if (url === "Q&A") {
            updatedState.questions = JSON.parse(content);
          } else if (url === "TXT") {
            updatedState.text = content;
          } else {
            files.push({ name: url, content });
          }
        });

        set((state) => ({
          ...state,
          ...updatedState,
          files,
          gettingKnowledgebase: false,
        }));
        return data;
      } catch (error) {
        set({ gettingKnowledgebase: false, error: error.message });
        toast.error(error.message);
        // console.error(error.message);
        throw error;
      }
    },
    addQuestion: (newQuestion) => {
      set((state) => ({
        ...state,
        questions: [...state.questions, newQuestion],
      }));
    },
    deleteQuestion: (index) => {
      set((state) => ({
        ...state,
        questions: state.questions.filter((_, i) => i !== index),
      }));
    },
    deleteAllQuestions: () => {
      set((state) => ({ ...state, questions: [] }));
    },
    updateText: (text) => {
      set((state) => ({ ...state, text: text }));
    },
    updateWebsite: (text) => {
      set((state) => ({ ...state, website: text }));
    },
    updateSiteMap: (text) => {
      set((state) => ({ ...state, sitemap: text }));
    },
    addLinksWithSitemap: async (website) => {
      set({ fetching: true });
      try {
        const response = await fetch(
          `/api/v1/data/links?type=sitemap&url=${website}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          if (response.status === 401) return redirect("/signin");
          throw new Error(data.message || "An error occurred");
        }
        const links = await response.json();

        set((state) => ({
          ...state,
          fetching: false,
          include: [...state.include, ...links],
        }));
      } catch (e) {
        set({ fetching: false });
        toast.error(e.message);
      }
    },
    addLinksWithWebsite: async (website) => {
      set({ fetching: true });
      try {
        const response = await fetch(
          `/api/v1/data/links?type=web&url=${website}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          if (response.status === 401) return redirect("/signin");
          throw new Error(data.message || "An error occurred");
        }
        const links = await response.json();

        set((state) => ({
          ...state,
          fetching: false,
          include: [...state.include, ...links],
        }));
      } catch (e) {
        set({ fetching: false });
        toast.error(e.message);
      }
    },
    deleteInclude: (index) => {
      set((state) => ({
        ...state,
        include: state.include.filter((_, i) => i !== index),
      }));
    },
    deleteAllInclude: () => {
      set((state) => ({ ...state, include: [] }));
    },
    addFiles: (newFile) => {
      set((state) => ({ ...state, files: [...state.files, newFile] }));
    },
    deleteFile: (index) => {
      set((state) => ({
        ...state,
        files: state.files.filter((_, i) => i !== index),
      }));
    },
    deleteAllFiles: () => {
      set((state) => ({ ...state, files: [] }));
    },
  }))
);
