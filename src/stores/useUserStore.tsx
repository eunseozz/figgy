import { create } from "zustand";
import { persist } from "zustand/middleware";

import { chromeStorage } from "@/utils/chromeStorage";

interface UserState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const useUserStore = create<UserState>()(
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
