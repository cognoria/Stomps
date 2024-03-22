import { toast } from "react-toastify";
import { create } from "zustand";
const useBotCreationStore = create((set) => ({
  creatingBot: false,
  loading: false,
  error: null,
  createBot: async (botData) => {
    set({ creatingBot: true, loading: true, error: null });
    try {
      const response = await fetch("/api/v1/chatbot/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) {
        throw new Error("Failed to create bot");
      }
      const data = await response.json();
      set({ creatingBot: false, loading: false });
      toast.success(data.nessage);
      return data;
    } catch (error) {
      set({ creatingBot: false, loading: false, error: error.message });
      toast.error(` ${error.message}`);
      console.log(error.message);
    }
  },
}));

export default useBotCreationStore;
