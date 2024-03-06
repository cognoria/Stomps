// useAuthStore.js
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useResetPasswordAuthStore = create(
  devtools((set) => ({
    user: null,
    error: null,
    loading: false, // Add loading state
    resetPassword: async ({ password, confirmPassword, token }, onSuccess) => {
      console.log(`store hitted ${confirmPassword}, ${password}, ${token}`);
      set({ loading: true, error: null }); // Start loading and reset any previous errors
      try {
        const response = await fetch(`/api/v1/auth/password/reset/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password, confirmPassword }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }
        toast.success("reset successful!", {
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
        toast.error(error.message || "Failed to Reset!");
      }
    },
  }))
);

export default useResetPasswordAuthStore;
