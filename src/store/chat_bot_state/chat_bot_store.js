import { create } from "zustand";

// Define the initial state
const initialState = {
  website: "",
  name: "",
  text: "",
  sitemap: "",
  urls: [],
  doc_count: 0,
  include: [],
  exclude: [],
  contents: [],
  questions: [],
  files: [],
};

const useFormDataStore = create((set) => ({
  formData: initialState,
  setFormData: (newData) => {
    set((state) => ({
      formData: { ...state.formData, ...newData },
    }));
    triggerUpdate(set);
  },
  clearFormData: async(botId) => {
    set({ formData: initialState })
    const response = await fetch(`/api/v1/chatbot/${botId}/train`, {
      method: "GET",
    });
    console.log(await response.json())
  },
  addText: (newText) => {
    set((state) => ({
      formData: {
        ...state.formData,
        text: newText,
      },
    }));
    triggerUpdate(set);
  },
  addDataToUrls: (newUrl) => {
    set((state) => ({
      formData: {
        ...state.formData,
        urls: [...state.formData.urls, newUrl],
      },
    }));
    triggerUpdate(set);
  },
  addDataToInclude: (newInclude) => {
    set((state) => {
      const linksSet = new Set([...state.formData.include, ...newInclude]);

      return {
      formData: {
        ...state.formData,
        include: Array.from(linksSet),
      },
    }});
    triggerUpdate(set);
  },
  addDataToExclude: (newExclude) => {
    set((state) => ({
      formData: {
        ...state.formData,
        exclude: [...state.formData.exclude, newExclude],
      },
    }));
    triggerUpdate(set);
  },
  addFileToContents: (newContent) => {
    const { name, content } = newContent;

    set((state) => ({
      formData: {
        ...state.formData,
        files: [...state.formData.files, newContent],
        doc_count: state.formData.doc_count + content.length,
      },
    }));

    triggerUpdate(set);

    const fileIndex = useFormDataStore.getState().formData.files.length - 1;
    
    return { name, index: fileIndex };
  },
  deleteFileFromContent: (index) => {
    set((state) => {
      const fileToDelete = state.formData.files[index];
      const newFormData = {
        ...state.formData,
        files: state.formData.files.filter((_, i) => i !== index),
        doc_count: state.formData.doc_count - fileToDelete.content.length,
      };
      return { formData: newFormData };
    });
  
    triggerUpdate(set);
  },
  addDataToContents: (newContent) => {
    set((state) => ({
      formData: {
        ...state.formData,
        contents: [...state.formData.contents, newContent],
      },
    }));
    triggerUpdate(set);
  },
  addQuestion: (newQuestion) => {
    set((state) => ({
      formData: {
        ...state.formData,
        questions: [...state.formData.questions, newQuestion],
      },
    }));
    triggerUpdate(set);
  },
  deleteQuestion: (index) => {
    set((state) => ({
      formData: {
        ...state.formData,
        questions: state.formData.questions.filter((_, i) => i !== index),
      },
    }));
    triggerUpdate(set);
  },
  deleteUrl: (index) => {
    set((state) => ({
      formData: {
        ...state.formData,
        urls: state.formData.urls.filter((_, i) => i !== index),
      },
    }));
    triggerUpdate(set);
  },
  deleteInclude: (index) => {
    set((state) => ({
      formData: {
        ...state.formData,
        include: state.formData.include.filter((_, i) => i !== index),
      },
    }));
    triggerUpdate(set);
  },
  deleteExclude: (index) => {
    set((state) => ({
      formData: {
        ...state.formData,
        exclude: state.formData.exclude.filter((_, i) => i !== index),
      },
    }));
    triggerUpdate(set);
  },
  deleteContent: (index) => {
    set((state) => ({
      formData: {
        ...state.formData,
        contents: state.formData.contents.filter((_, i) => i !== index),
      },
    }));
    triggerUpdate(set);
  },
  addWebsite: (newWebsite) => {
    set((state) => ({
      formData: {
        ...state.formData,
        website: newWebsite,
      },
    }));
    triggerUpdate(set);
  },

  addSitemap: (newSitemap) => {
    set((state) => ({
      formData: {
        ...state.formData,
        sitemap: newSitemap,
      },
    }));
    triggerUpdate(set);
  },

  deleteAll: (arrayNames) => {
    set((state) => {
      const newState = { ...state.formData };
      arrayNames.forEach((arrayName) => {
        newState[arrayName] = [];
      });
      return { formData: newState };
    });
    triggerUpdate(set);
  },

  getTextLength: () => {
    return useFormDataStore.getState().formData.text.length;
  },
  getIncludeCount: () => {
    return useFormDataStore.getState().formData.include.length;
  },
  getQuestionCount: () => {
    return useFormDataStore.getState().formData.questions.length;
  },
}));

const triggerUpdate = (set) => {
  set((state) => state); // Trigger update by setting the same state
};

export default useFormDataStore;
