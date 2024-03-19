import { toast } from "react-toastify";
import { create } from "zustand";
const useBotChatStore = create((set) => ({
  creatingBot: false,
  loading: false,
  error: null,
  createBot: async (botData) => {
    set({ creatingBot: true, loading: true, error: null });
    try {
      const response = await fetch("api/v1/chatbot/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) {
        throw new Error("Failed to create bot");
      }

      set({ creatingBot: false, loading: false });
      toast.success("Bot created successfully");
      return response.json();
    } catch (error) {
      set({ creatingBot: false, loading: false, error: error.message });
      toast.error(`Failed to create bot ${error.message}`);
      console.log(error.message);
    }
  },
}));

export default useBotChatStore;
