import { create } from "zustand";

interface HighlightBox {
  top: number;
  left: number;
  width: number;
  height: number;
  isMatched: boolean;
}

interface FeedbackState {
  tooltip: string | null;
  highlightBox: HighlightBox | null;

  setTooltip: (tooltip: string | null) => void;
  setHighlightBox: (highlightBox: HighlightBox | null) => void;
  clearFeedback: () => void;
  setActiveElement: (element: HTMLElement | null, isMatched?: boolean) => void;
}

const useFeedbackStore = create<FeedbackState>((set) => ({
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
