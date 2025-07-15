import { create } from "zustand";

const useFeedbackStore = create((set) => ({
  tooltip: null,
  highlightBox: null,

  setTooltip: (tooltip) => set({ tooltip }),

  setHighlightBox: (highlightBox) => set({ highlightBox }),

  clearFeedback: () => {
    set({ tooltip: null, highlightBox: null });
  },

  setActiveElement: (element, isMatched = true) => {
    if (!element) return;

    const rect = element.getBoundingClientRect();

    set({
      highlightBox: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        isMatched,
      },
    });
  },
}));

export default useFeedbackStore;
