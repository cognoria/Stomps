import { toast } from "react-toastify";
import { create } from "zustand";
export const useBotRetrainStore = create((set) => ({
  retrainingBot: false,
  loading: false,
  error: null,
  retrainBot: async ({ botData, bot_id }) => {
    set({ retrainingBot: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${bot_id}/source`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) {
        throw new Error("Failed to retrain bot");
      }
      const data = await response.json();
      set({ retrainingBot: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ retrainingBot: false, loading: false, error: error.message });
      toast.error(` ${error.message}`);
      console.log(error.message);
    }
  },
}));
