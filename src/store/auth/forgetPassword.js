import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useForgetPasswordAuthStore = create(
  devtools((set) => ({
    user: null,
    error: null,
    loading: false,
    forgetPassword: async ({ email, password }, onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`api/v1/auth/password/forget/${email}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

        if (onSuccess) onSuccess();
        set({ loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Failed to login!");
        console.error("reset failed:", error);
      }
    },
  }))
);

export default useForgetPasswordAuthStore;
