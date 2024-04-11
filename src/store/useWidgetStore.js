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
              userData: null,
              messages: [],
              chatbotStyle: null,
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

          get().updateChatbotState(botId, { loading: false, chatbotStyle: data });
        } catch (error) {
          get().updateChatbotState(botId, { loading: false, error: error.message });
          console.error("Failed to get chat style:", error);
        }
      },

      refreshChat: async (botId) => {
        const { messages } = get().getChatbotState(botId)
        get().updateChatbotState(botId, {
          messages: messages.length >= 1 ? messages.slice(0, 1) : [],
        })
      },

      // Function to set user data
      setUserData: async () => {
        const currentState = get()
        if (currentState.userData && currentState.userData.ip) return;
        try {
          const ipRes = await fetch("/api/v1/data/ip");
          if (!ipRes.ok) {
            throw new Error("Failed to fetch IP data");
          }

          const ipData = await ipRes.json();
          const ipDetailsRes = await fetch(`http://ip-api.com/json/${ipData.ip}`);
          if (!ipDetailsRes.ok) {
            throw new Error("Failed to fetch IP details");
          }

          const ipDetailsData = await ipDetailsRes.json();
          const { query, ...rest } = ipDetailsData;
          const ipDetails = { ip: query, ...rest };
          delete ipDetails.status;

          set({ userData: ipDetails });
        } catch (error) {
          console.error("Error setting user data:", error);
        }
      },

      // Function to set initial message for a specific chatbot ID
      setInitialMsg: (botId, msg) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, {
          messages: [...currentState.messages, { role: "assistant", content: msg }],
        });
      },

      // Function to send message for a specific chatbot ID
      chat: async (botId, data) => {
        const currentState = get().getChatbotState(botId);
        get().updateChatbotState(botId, { messages: [...currentState.messages, data] });

        get().updateChatbotState(botId, { loading: true, chatting: true, error: null });
        get().startChatting(botId)
        try {
          const { messages } = get().getChatbotState(botId);
          const userData = get().userData;

          const response = await fetch(`/api/v1/embed/${botId}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages, userData }),
          });

          const updatedMessage = await response.json();
          if (!response.ok) {
            throw new Error(updatedMessage.message || "Failed to send message");
          }

          get().updateChatbotState(botId, {
            chatting: false,
            loading: false,
            error: null,
            messages: [...get().getChatbotState(botId).messages, updatedMessage],
          });

          return updatedMessage;
        } catch (error) {
          get().updateChatbotState(botId, { chatting: false, loading: false, error: error.message });
          console.error("Failed to send message:", error);
          throw error;
        }
      },
    }),
    { name: "wgt-chat-store" }
  )
);

export default useWidgetStore;

// const useWidgetStore_ = (chatbotId) =>
//   create(
//     persist(
//       (set, get) => ({
//         chatting: false,
//         loading: false,
//         error: null,
//         userData: null,
//         messages: [],
//         chatbotStyle: null,

//         chat: async ({ data }) => {
//           set((state) => ({ messages: [...state.messages, data] }));
//           set({ chatting: true, loading: true, error: null });

//           try {
//             const { messages, userData } = get();
//             const response = await fetch(`/api/v1/embed/${chatbotId}/chat`, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ messages, userData }),
//             });

//             if (!response.ok) {
//               throw new Error(data.message || "An error occurred");
//             }

//             const updatedMessage = await response.json();
//             set((state) => ({
//               chatting: false,
//               loading: false,
//               error: null,
//               messages: [...state.messages, updatedMessage],
//             }));

//             return updatedMessage;
//           } catch (error) {
//             set({ chatting: false, loading: false, error: error.message });
//             console.error("Failed to send message:", error);
//             throw error;
//           }
//         },

//         setUserData: async () => {
//           const { userData } = get();
//           if (userData && userData.ip) return;

//           try {
//             const ipRes = await fetch("/api/v1/data/ip");
//             if (!ipRes.ok) {
//               throw new Error("Failed to fetch IP data");
//             }

//             const ipData = await ipRes.json();
//             const ipDetailsRes = await fetch(`http://ip-api.com/json/${ipData.ip}`);
//             if (!ipDetailsRes.ok) {
//               throw new Error("Failed to fetch IP details");
//             }

//             const ipDetailsData = await ipDetailsRes.json();
//             const { query, ...rest } = ipDetailsData;
//             const ipDetails = { ip: query, ...rest };
//             delete ipDetails.status;
//             set({ userData: ipDetails });
//           } catch (error) {
//             console.error("Error:", error);
//           }
//         },

//         setIntialMsg: async (msg) => {
//           set((state) => ({
//             messages: [...state.messages, { role: "assistant", content: msg }],
//           }));
//         },

//         getChatStyle: async () => {
//           set({ loading: true, error: null });

//           try {
//             const response = await fetch(`/api/v1/embed/${chatbotId}/widget-style`, {
//               method: "GET",
//             });

//             if (!response.ok) {
//               throw new Error(data.message || "An error occurred");
//             }

//             const data = await response.json();
//             set({ loading: false, chatbotStyle: data });
//           } catch (error) {
//             set({ chatting: false, loading: false, error: error.message });
//             console.error("Failed to send message:", error);
//             throw error;
//           }
//         },
//       }),
//       { name: `wgt-chat-store-${chatbotId}` }
//     )
//   );
