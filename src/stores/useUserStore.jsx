import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      accessToken: "figd_QNKnCZH8IkzOgT4Dy0OxsHRT_4jswn2m5Y3-ePcf",
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "figgy-user",
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);

export default useUserStore;
