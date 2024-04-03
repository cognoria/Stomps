// useAuthStore.js
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import useUserApiKey from "./api_key_check";
const useAddApiKeyStore = create(
  devtools((set) => ({
    error: null,
    loading: false, // Add loading state
    add_api_key: async ({ openaikey, pineconeKey }, onSuccess) => {
      set({ loading: true, error: null }); // Start loading and reset any previous errors

      try {
        const response = await fetch("/api/v1/user/global", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ openaiKey: openaikey, pineconeKey }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

        set({
          loading: false,
        });
        useUserApiKey.setState({ key_val: true });
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
        });

        if (onSuccess) onSuccess();
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to add key!");
      }
    },
  }))
);

export default useAddApiKeyStore;
