import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWidgetStore = create(
  persist(
    (set, get) => ({
      chatbotStates: {},
      userData: null,

      // Function to initialize state for a specific chatbot ID
      initializeChatbotState: (botId) => {
        if (!get().chatbotStates[botId]) {
          set((state) => ({
            chatbotStates: {
              ...state.chatbotStates,
              [botId]: {
                chatting: false,
                loading: false,
                error: null,
                messages: [],
                chatbotStyle: null,
                lastMsgTime: null,
              },
            },
          }));
        }
      },

      // Function to get state for a specific chatbot ID
      getChatbotState: (botId) => {
        get().initializeChatbotState(botId);
        return get().chatbotStates[botId] || {};
      },

      // Function to update state for a specific chatbot ID
      updateChatbotState: (botId, newState) => {
        set((state) => ({
          chatbotStates: {
            ...state.chatbotStates,
            [botId]: {
              ...state.chatbotStates[botId],
              ...newState,
            },
          },
        }));
      },

      // Function to reset state for a specific chatbot ID
      resetChatbotState: (botId) => {
        set((state) => ({
          chatbotStates: {
            ...state.chatbotStates,
            [botId]: {
              chatting: false,
              loading: false,
              error: null,
              messages: [],
              chatbotStyle: null,
              lastMsgTime: null,
            },
          },
        }));
      },

      // Function to start chatting for a specific chatbot ID
      startChatting: (botId) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, { chatting: true, ...currentState });
      },

      // Function to stop chatting for a specific chatbot ID
      stopChatting: (botId) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, { chatting: false, ...currentState });
      },

      resetError: (botId) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, { error: null, ...currentState });
      },

      setUserData: async () => {
        const userData = get().userData;
        if (userData !== null && userData !== undefined) return;

        try {
          const ipResponse = await fetch("/api/v1/data/ip", { method: "POST" });
          const ip = await ipResponse.json();

          const dataResponse = await fetch(
            "https://qwo6ei9p45.execute-api.us-east-1.amazonaws.com/dev",
            {
              method: "POST",
              mode: "cors",
              body: ip.ip,
            }
          );
          const data = await dataResponse.json();

          const country =
            data.done.json.WhoisRecord.registryData.registrant.country;
          const countryCode =
            data.done.json.WhoisRecord.registryData.registrant.countryCode;

          set({ userData: { ...ip, country, countryCode } });
        } catch (error) {
          console.error("Failed to set user data:", error);
        }
      },

      // Function to get chat style for a specific chatbot ID
      getChatStyle: async (botId) => {
        get().updateChatbotState(botId, { loading: true, error: null });
        try {
          const response = await fetch(`/api/v1/embed/${botId}/widget-style`, {
            method: "GET",
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch chat style");
          }

          get().updateChatbotState(botId, {
            loading: false,
            chatbotStyle: data,
          });
        } catch (error) {
          get().updateChatbotState(botId, {
            loading: false,
            error: error.message,
          });
          console.error("Failed to get chat style:", error);
        }
      },

      refreshChat: async (botId, automatic) => {
        const { messages, lastMsgTime } = get().getChatbotState(botId);
        const currentTime = new Date().getTime();

        if (automatic) {
          get().updateChatbotState(botId, {
            messages: messages.length >= 1 ? messages.slice(0, 1) : [],
          });
        } else {
          if (
            lastMsgTime != null &&
            currentTime > lastMsgTime + 2 * 60 * 60 * 1000
          ) {
            get().updateChatbotState(botId, {
              messages: [],
            });
          }
        }
      },

      // Function to set initial message for a specific chatbot ID
      setInitialMsg: (botId, msg) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, {
          messages: [
            ...currentState.messages,
            { role: "assistant", content: msg },
          ],
        });
      },

      // Function to send message for a specific chatbot ID
      chat: async (botId, data) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, {
          messages: [...currentState.messages, data],
        });

        get().updateChatbotState(botId, {
          loading: true,
          chatting: true,
          error: null,
          lastMsgTime: new Date().getTime(),
        });
        get().startChatting(botId);
        try {
          const { messages } = get().getChatbotState(botId);
          let { userData } = get();

          if (userData == null || userData == undefined) {
            await get().setUserData();
            userData = get().userData;
          }

          const requestBody = { messages };
          if (userData !== null || userData !== undefined) {
            requestBody.user = userData;
          }
          
          const response = await fetch(`/api/v1/embed/${botId}/chat`, {
            method: "POST",
            credentials: 'same-origin',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          });

          const updatedMessage = await response.json();
          if (!response.ok) {
            throw new Error(updatedMessage.message || "Failed to send message");
          }

          get().updateChatbotState(botId, {
            chatting: false,
            loading: false,
            error: null,
            messages: [
              ...get().getChatbotState(botId).messages,
              updatedMessage,
            ],
          });

          return updatedMessage;
        } catch (error) {
          get().updateChatbotState(botId, {
            chatting: false,
            loading: false,
            error: error.message,
          });
          console.error("Failed to send message:", error);
          throw error;
        }
      },
    }),
    { name: "wgt-chat-store" }
  )
);

export default useWidgetStore;
