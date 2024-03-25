// useAuthStore.js
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useUserApiKey = create(
  devtools((set) => ({
    error: null,
    loading: false,
    fetched: false,
    key_val: undefined,
    userApiKeyCheck: async (onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/v1/user/global`, {
          method: "GET",
          // headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }
        console.log(data);
        set({ loading: false, key_val: data, fetched: true });
        // return data;
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to fetch!");
        console.error("fetch failed:", error);
      }
    },
  }))
);

export default useUserApiKey;
