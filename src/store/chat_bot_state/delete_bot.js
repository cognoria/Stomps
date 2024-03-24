// useAuthStore.js
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useDeleteChatbot = create(
  devtools((set) => ({
    error: null,
    loading: false,
    chatbot: null,
    deleteChatBot: async (id, onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/v1/chatbot/${id}/delete`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

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
  }))
);

export default useDeleteChatbot;
