import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBotMessagingStore = create(
  persist(
    (set) => ({
      bots: {}, // Object to store chat data for each bot
      chat: async ({ id, data }) => {
        // Ensure bots[id] exists, initialize it if not
        if (!useBotMessagingStore.getState().bots[id]) {
          set((state) => ({
            bots: {
              ...state.bots,
              [id]: {
                chatMessages: [], // Initialize chatMessages array for the bot
                chatting: false,
                loading: false,
                error: null,
              },
            },
          }));
        }
        // Update chatMessages and set loading and chatting to true
        set((state) => ({
          bots: {
            ...state.bots,
            [id]: {
              ...state.bots[id],
              chatMessages: [...state.bots[id].chatMessages, data],
              chatting: true,
              loading: true,
              error: null,
            },
          },
        }));
        try {
          // Access chatMessages after the state update
          const msg = useBotMessagingStore.getState().bots[id].chatMessages;
          const response = await fetch(`/api/v1/chatbot/${id}/chat`, {
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

          // Update state with the response and set loading and chatting to false
          set((state) => ({
            bots: {
              ...state.bots,
              [id]: {
                ...state.bots[id],
                chatMessages: [...state.bots[id].chatMessages, updatedMessage],
                chatting: false,
                loading: false,
                error: null,
              },
            },
          }));

          return updatedMessage;
        } catch (error) {
          // Handle error, set loading and chatting to false
          set((state) => ({
            bots: {
              ...state.bots,
              [id]: {
                ...state.bots[id],
                chatting: false,
                loading: false,
                error: error.message,
              },
            },
          }));

          throw error;
        }
      },
      // remove a bot message when bot is deleted
      removeBot: (id) => {
        set((state) => {
          const newBots = { ...state.bots };
          delete newBots[id];
          return { bots: newBots };
        });
      },
    }),
    {
      name: "bot-messaging-store", 
    }
  )
);

export default useBotMessagingStore;
