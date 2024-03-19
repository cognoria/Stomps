// useBotMessagingStore.js
import { create } from "zustand";

const useBotMessagingStore = create((set) => ({
  chatting: false,
  loading: false,
  error: null,
  chatMessages: [],
  chat_messaging: async ({ id, data }) => {
    set({ chatting: true, loading: true, error: null });

    // Push chatData into chatMessages
    set((state) => ({
      chatMessages: [...state.chatMessages, data],
    }));

    try {
      console.log(id);
      const response = await fetch(`/api/v1/chatbot/${id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const updatedMessage = await response.json();

      set((state) => ({
        chatting: false,
        loading: false,
        error: null,
        chatMessages: [...state.chatMessages, updatedMessage], // Add updatedMessage to chatMessages
      }));

      return updatedMessage;
    } catch (error) {
      set({ chatting: false, loading: false, error: error.message });
      console.error("Failed to send message:", error);
      throw error;
    }
  },
}));

export default useBotMessagingStore;
