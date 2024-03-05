// useAuthStore.js
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useUserStore } from "./userState";
const useLoginAuthStore = create(
  devtools((set) => ({
    user: null,
    error: null,
    loading: false, // Add loading state
    loginUser: async ({ email, password }, onSuccess) => {
      console.log(`store hitted ${email}, ${password}`);
      set({ loading: true, error: null }); // Start loading and reset any previous errors
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
        toast.success("Login successful!", {
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
        toast.error(error.message || "Login failed!");
        console.error("Login failed:", error);
      }
    },
  }))
);

export default useLoginAuthStore;
