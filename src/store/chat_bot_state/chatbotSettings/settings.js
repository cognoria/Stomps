import { toast } from "react-toastify";
import { create } from "zustand";
export const useBotModelStore = create((set) => ({
  updatingModel: false,
  loading: false,
  error: null,
  botModel: async ({ botData, botId }) => {
    set({ updatingModel: true, loading: true, error: null });
    try {
      const response = await fetch(`api/v1/chatbot/${botId}/setting/model`, {
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
