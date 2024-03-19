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
  clearFormData: () => set({ formData: initialState }),
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
    set((state) => ({
      formData: {
        ...state.formData,
        include: [...state.formData.include, newInclude],
      },
    }));
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
    console.log(newContent)
    const stringFile = JSON.stringify(newContent);

    set((state) => ({
      formData: {
        ...state.formData,
        files: [...state.formData.files, stringFile],
        doc_count: state.formData.doc_count + contentLength,
      },
    }));

    triggerUpdate(set);

    const fileIndex = files.length - 1;
    return { name, index: fileIndex };
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
  deleteFileFromContent: (index) => {
    const fileToDelete = state.formData.files[index];
    const { content } = JSON.parse(fileToDelete);
    set((state) => ({
      formData: {
        ...state.formData,
        files: state.formData.files.filter((_, i) => i !== index),
        doc_count: state.formData.doc_count - contentLength,
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
