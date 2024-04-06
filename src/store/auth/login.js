"use client";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useUserStore } from "./userState";
import useKeysStore from "../chatbot/useKeysStore";

const useLoginAuthStore = create(
  devtools((set) => ({
    user: null,
    error: null,
    loading: false,
    loginUser: async ({ email, password }, onSuccess, onFailure) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

        set({
          user: data,
          loading: false,
          isLoggedIn: true,
        });
        useUserStore.getState().setUser(data);
        await useKeysStore.getState().checkKeys();

        const { hasKeys } = useKeysStore.getState();

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
        });

        if (!hasKeys) {
          onFailure();
        } else {
          onSuccess();
        }

        // if (onSuccess)
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to login!");
      }
    },
  }))
);

export default useLoginAuthStore;
