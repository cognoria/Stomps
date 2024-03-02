// useAuthStore.js
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useRegisterAuthStore = create(
  devtools((set) => ({
    user: null,
    error: null,
    loading: false, // Add loading state
    registerUser: async ({ email, password }, onSuccess) => {
      console.log(`store hitted ${email}, ${password}`);
      set({ loading: true, error: null }); // Start loading and reset any previous errors
      try {
        const response = await fetch("/api/v1/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred");
        }

        set({ user: data, loading: false });
        toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (onSuccess) onSuccess();
      } catch (error) {
        set({ error: error.message, loading: false });
        toast.error(error.message || "Registration failed!");
        console.error("Registration failed:", error);
      }
    },
  }))
);

export default useRegisterAuthStore;
