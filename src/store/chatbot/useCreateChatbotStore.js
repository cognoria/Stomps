import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initState = {
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
}

export default create(
    devtools((set) => ({
        ...initState,

        addQuestion: (newQuestion) => {
            set((state) => ({
                ...state,
                questions: [...state.questions, newQuestion],
            }));
        },
        clearStates: () =>{
            set({...initState})
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
                    throw new Error(response.message || "An error occurred");
                }
                const links = await response.json();

                set((state) => {
                    const uniqueLinks = new Set([...state.include, ...links]);
                    const uniqueLinksArray = Array.from(uniqueLinks);
                    return {
                        ...state,
                        fetching: false,
                        include: uniqueLinksArray,
                        urls: [...state.urls, website]
                    }
                });
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
                    throw new Error(response.message || "An error occurred");
                }
                const links = await response.json();

                set((state) => {
                    const uniqueLinks = new Set([...state.include, ...links]);
                    const uniqueLinksArray = Array.from(uniqueLinks);
                    return {
                        ...state,
                        fetching: false,
                        include: uniqueLinksArray,
                        urls: [...state.urls, website]
                    }
                });
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
        deleteUrl: (index) => {
            set((state) => {
                const exempt = state.urls[index]
                // console.log({ exempt })
                return {
                    ...state,
                    urls: state.urls.filter((_, i) => i !== index),
                    include: state.include.filter(link => !link.includes(exempt.replace(/^https:\/\//, '')))
                }
            });
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
