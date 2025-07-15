import { create } from "zustand";

const useToastStore = create((set) => ({
  message: null,
  showToast: (message) => set({ message }),
  clearToast: () => set({ message: null }),
}));

export default useToastStore;
