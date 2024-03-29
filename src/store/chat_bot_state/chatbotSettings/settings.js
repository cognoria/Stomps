import { toast } from "react-toastify";
import { create } from "zustand";

export const useBotModelStore = create((set) => ({
  updatingModel: false,
  loading: false,
  error: null,
  botModel: async ({ botData, bot_id }) => {
    console.log({ botData, bot_id });
    set({ updatingModel: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${bot_id}/setting/model`, {
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
  botSecuritySettings: async ({ botSecurityData, bot_id }) => {
    console.log({ botSecurityData, bot_id });
    set({ updatingSecuritySettings: true, loading: true, error: null });
    try {
      const response = await fetch(
        `/api/v1/chatbot/${bot_id}/setting/security`,
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
  botLeadsSettings: async ({ botLeadsData, bot_id }) => {
    console.log({ botLeadsData, bot_id });
    set({ updatingLeadsSettings: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${bot_id}/setting/lead`, {
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
  botName: async ({ botName, bot_id }) => {
    console.log({ botName, bot_id });
    set({ updatingBotName: true, loading: true, error: null });
    try {
      const response = await fetch(`/api/v1/chatbot/${bot_id}/setting/name`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botName),
      });
      console.log("update bot name fetch");
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
