
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSingleChatbot = create(
  devtools((set) => ({
    error: null,
    loading: false,
    chatbot: null,
    singleChatBot: async (id, onSuccess) => {
      // Accept id parameter
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/v1/chatbot/${id}`, {
          method: "GET",
          // headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

        if (onSuccess) onSuccess(data); // Pass data to onSuccess callback if provided
        set({ loading: false, chatbot: data }); // Update chatbot instead of chatbots
        return data; // Return data after successful fetching
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to fetch!");
        console.error("fetch failed:", error);
        throw error; // Rethrow error for handling outside of this function if needed
      }
    },
  }))
);

export default useSingleChatbot;
