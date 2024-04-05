import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export default create(
  devtools((set) => ({
    creatingBot: false,
    loading: false,
    error: null,
    chatbot: null,
    chatbots: null,

    createChatbot: async (botData) => {
      set({ creatingBot: true, loading: true, error: null });
      try {
        const response = await fetch("/api/v1/chatbot/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(botData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "An error occurred");
        set({ creatingBot: false, loading: false });
        toast.success(data.message);
        return data;
      } catch (error) {
        set({ creatingBot: false, loading: false, error: error.message });
        toast.error(error.message);
        console.error(error.message);
        throw error;
      }
    },

    deleteChatBot: async (id, onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/v1/chatbot/${id}/delete`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "An error occurred");
        if (onSuccess) onSuccess(data);
        set({ loading: false });
        toast.success(data.message);
        return data;
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to delete!");
        console.error("delete failed:", error);
        throw error;
      }
    },

    getChatbot: async (id, onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/v1/chatbot/${id}`, {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "An error occurred");
        set({ loading: false, chatbot: data });
        if (onSuccess) onSuccess(data);
        return data;
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to fetch!");
        console.error("fetch failed:", error);
        throw error;
      }
    },

    getUserChatBots: async (onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/v1/chatbot", {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "An error occurred");
        if (onSuccess) onSuccess(data);
        set({ loading: false, chatbots: data });
        return data;
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to fetch!");
        console.error("fetch failed:", error);
        throw error;
      }
    },
  }))
);
