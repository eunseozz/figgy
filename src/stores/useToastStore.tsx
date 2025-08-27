import { create } from "zustand";

export type ToastState = {
  message: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
};

const useToastStore = create<ToastState>((set) => ({
  message: null,
  showToast: (message) => set({ message }),
  clearToast: () => set({ message: null }),
}));

export default useToastStore;
