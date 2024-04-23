import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useKeysStore = create(
  devtools((set) => ({
    error: null,
    loading: false,
    hasKeys: false,
    fetched: false,
    addKeys: async ({ openaikey, pineconeKey }, onSuccess) => {
      set({ loading: true, error: null });

      try {
        const response = await fetch("/api/v1/user/global", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ openaiKey: openaikey, pineconeKey }),
        });
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) return redirect("/signin");
          throw new Error(data.message || "An error occurred");
        }

        set({ loading: false, hasKeys: true, fetched: true });
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
    checkKeys: async (onSuccess) => {
      set({ loading: true, error: null });
      try {
        const response = await fetch(`/api/v1/user/global`, {
          method: "GET",
        });
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) return redirect("/signin");
          throw new Error(data.message || "An error occurred");
        }
        set({ loading: false, hasKeys: data, fetched: true });
        if (onSuccess) await onSuccess(await useKeysStore.getState().hasKeys);
      } catch (error) {
        set({ error: error.message, loading: false });
        // toast.error(error.message || "Failed to fetch!");
        // console.error("fetch failed:", error);
      }
    },
  }))
);

export default useKeysStore;
