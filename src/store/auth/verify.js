import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useVerifyStore = create(
    devtools((set) => ({
        verified: false,
        error: null,
        loading: false,
        message: null,
        verifyUser: async (token, onSuccess) => {
            set({ loading: true, error: null, message: null });
            try {
                const response = await fetch("/api/v1/auth/verify/" + token, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "An error occurred");
                }

                set({ loading: false, verified: true, message: data.message });
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
                toast.error(error.message || "Verification failed!");
            }
        },
        resend: async (email, onSuccess) => {
            set({ loading: true, error: null, message: null, verified: false });
            try {
                const response = await fetch("/api/v1/auth/verify/resend/" + email, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "An error occurred");
                }

                set({ loading: false, message: data.message });
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
                toast.error(error.message || "Verification failed!");
            }
        }
    }))
);

export default useVerifyStore;
