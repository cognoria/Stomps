import { toast } from "react-toastify";
import { create } from "zustand";


export default create((set) => ({
  updatingModel: false,
  updatingSecuritySettings: false,
  updatingLeadsSettings: false,
  updatingBotName: false,
  loading: false,
  error: null,

  updateModel: async ({ botData, botId }) => {
    set({ updatingModel: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botData),
      });
      if (!response.ok) throw new Error("Failed to update model");
      const data = await response.json();
      set({ updatingModel: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingModel: false, loading: false, error: error.message });
      toast.error(error.message);
      console.error(error.message);
    }
  },

  updateSecuritySettings: async ({ botSecurityData, botId }) => {
    set({ updatingSecuritySettings: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/security`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(botSecurityData),
      });
      if (!response.ok) throw new Error("Failed to update settings");
      const data = await response.json();
      set({ updatingSecuritySettings: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingSecuritySettings: false, loading: false, error: error.message });
      toast.error(error.message);
      console.error(error.message);
    }
  },

  updateLeadsSettings: async ({ botLeadsData, botId }) => {
    set({ updatingLeadsSettings: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/lead`, {
        method: "POST",
        body: JSON.stringify(botLeadsData),
      });
      if (!response.ok) throw new Error("Failed to update Lead");
      const data = await response.json();
      set({ updatingLeadsSettings: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingLeadsSettings: false, loading: false, error: error.message });
      toast.error(error.message);
      console.error(error.message);
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
      if (!response.ok) throw new Error("Failed to update Lead");
      const data = await response.json();
      set({ updatingBotName: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingBotName: false, loading: false, error: error.message });
      toast.error(error.message);
      console.error(error.message);
    }
  },
}));


export const useBotModelStore = create((set) => ({
  updatingModel: false,
  loading: false,
  error: null,
  botModel: async ({ botData, botId }) => {
    console.log({ botData, botId });
    set({ updatingModel: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botData),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to update model");
      }
      const data = await response.json();
      set({ updatingModel: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({ updatingModel: false, loading: false, error: error.message });
      toast.error(` ${error.message}`);
      console.log(error.message);
    }
  },
}));

export const useBotSecuritySettingsStore = create((set) => ({
  updatingSecuritySettings: false,
  loading: false,
  error: null,
  botSecuritySettings: async ({ botSecurityData, botId }) => {
    console.log({ botSecurityData, botId });
    set({ updatingSecuritySettings: true, loading: true, error: null });
    try {
      const response = await fetch(
        `/api/v1/chatbot/${botId}/setting/security`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(botSecurityData),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to update settings");
      }
      const data = await response.json();
      set({ updatingSecuritySettings: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingSecuritySettings: false,
        loading: false,
        error: error.message,
      });
      toast.error(` ${error.message}`);
      console.log(error.message);
    }
  },
}));

export const useBotLeadsSettingsStore = create((set) => ({
  updatingLeadsSettings: false,
  loading: false,
  error: null,
  botLeadsSettings: async ({ botLeadsData, botId }) => {
    console.log({ botLeadsData, botId });
    set({ updatingLeadsSettings: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/lead`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(botLeadsData),
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to update Lead");
      }
      const data = await response.json();
      set({ updatingLeadsSettings: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingLeadsSettings: false,
        loading: false,
        error: error.message,
      });
      toast.error(` ${error.message}`);
      console.log(error.message);
    }
  },
}));

export const useBotNameSettingsStore = create((set) => ({
  updatingBotName: false,
  loading: false,
  error: null,
  botName: async ({ botName, botId }) => {
    console.log({ botName, botId });
    set({ updatingBotName: true, loading: true, error: null });
    try {
      console.log("update bot name fetch")
      const response = await fetch(`/api/v1/chatbot/${botId}/setting/name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botName),
      });
      console.log("update bot name fetch")
      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        throw new Error("Failed to update Lead");
      }
      const data = await response.json();
      set({ updatingBotName: false, loading: false });
      toast.success(data.message);
      return data;
    } catch (error) {
      set({
        updatingBotName: false,
        loading: false,
        error: error.message,
      });
      toast.error(` ${error.message}`);
      console.log(error.message);
    }
  },
}));
