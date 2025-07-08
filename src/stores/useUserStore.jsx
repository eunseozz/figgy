import { create } from "zustand";
import { persist } from "zustand/middleware";

import { chromeStorage } from "@/utils/chromeStorage";

const useUserStore = create(
  persist(
    (set) => ({
      accessToken: "",
      setAccessToken: (token) => set({ accessToken: token }),
    }),
    {
      name: "figgy-user",
      storage: chromeStorage,
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);

export default useUserStore;
