import { toast } from "react-toastify";
import { create } from "zustand";

export default create((set) => ({
  updatingModel: false,
  updatingSecuritySettings: false,
  updatingLeadsSettings: false,
  updatingBotName: false,
  updatingKnowledgebase: false,
  updatingInterface: false,
  loading: false,
  error: null,
  knowledgebase: null,
  gettingKnowledgebase: false,

  updateModel: async ({ botData, botId }) => {
    set({ updatingModel: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");
      set({ updatingModel: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingModel: false, loading: false, error: error.message });
      toast.error(error.message);
      // console.error(error.message);
    }
  },

  updateSecuritySettings: async ({ botSecurityData, botId }) => {
    set({ updatingSecuritySettings: true, loading: true, error: null });
    try {
      const response = await fetch(
        `/api/v1/chatbot/${botId}/setting/security`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(botSecurityData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");
      set({ updatingSecuritySettings: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingSecuritySettings: false,
        loading: false,
        error: error.message,
      });
      toast.error(error.message);
      // console.error(error.message);
    }
  },

  updateLeadsSettings: async ({ botLeadsData, botId }) => {
    set({ updatingLeadsSettings: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/lead`, {
        method: "POST",
        body: JSON.stringify(botLeadsData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");
      set({ updatingLeadsSettings: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingLeadsSettings: false,
        loading: false,
        error: error.message,
      });
      toast.error(error.message);
      // console.error(error.message);
    }
  },

  updateBotName: async ({ botName, botId }) => {
    set({ updatingBotName: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/name`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botName),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");
      set({ updatingBotName: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingBotName: false, loading: false, error: error.message });
      toast.error(error.message);
      // console.error(error.message);
    }
  },

  updateKnowledgebase: async ({ botData, botId }) => {
    set({ updatingKnowledgebase: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/source`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");
      set({ updatingKnowledgebase: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingKnowledgebase: false,
        loading: false,
        error: error.message,
      });
      toast.error(error.message);
      console.error(error.message);
      throw error;
    }
  },

  updateInterface: async ({ botData, botId }) => {
    set({ updatingInterface: true, loading: true, error: null });
    // console.log({ botData, botId });
    try {
      const response = await fetch(
        `/api/v1/chatbot/${botId}/setting/interface`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(botData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "An error occurred");
      set({ updatingInterface: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingInterface: false,
        loading: false,
        error: error.message,
      });
      toast.error(error.message);
      // console.error(error.message);
      throw error;
    }
  },
}));
