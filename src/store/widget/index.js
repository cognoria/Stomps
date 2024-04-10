import { create } from "zustand";

const useWidgetMessagingStore = create((set) => ({
  chatting: false,
  loading: false,
  error: null,
  widgetChatMessages: [],
  chat: async ({ botId, data }) => {
    // Push chatData into chatMessages
    set((state) => ({
      widgetChatMessages: [...state.widgetChatMessages, data],
    }));
    set({ chatting: true, loading: true, error: null });
    try {
      console.log(botId);
      const msg = await useWidgetMessagingStore.getState().widgetChatMessages;
      console.log(msg);
      const response = await fetch(`/api/v1/chatbot/${botId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: msg }),
      });

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      const updatedMessage = await response.json();

      set((state) => ({
        chatting: false,
        loading: false,
        error: null,
        widgetChatMessages: [...state.widgetChatMessages, updatedMessage], // Add updatedMessage to chatMessages
      }));

      return updatedMessage;
    } catch (error) {
      set({ chatting: false, loading: false, error: error.message });
      console.error("Failed to send message:", error);
      throw error;
    }
  },
}));

export default useWidgetMessagingStore;
