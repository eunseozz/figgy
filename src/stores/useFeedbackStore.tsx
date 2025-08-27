import { create } from "zustand";

export type HighlightBoxProps = {
  top: number;
  left: number;
  width: number;
  height: number;
  isMatched: boolean;
};

export type TooltipProps = {
  top: number | null;
  left: number | null;
  text: string | null;
};

interface FeedbackState {
  tooltip: TooltipProps | null;
  highlightBox: HighlightBoxProps | null;

  setTooltip: (tooltip: TooltipProps | null) => void;
  setHighlightBox: (highlightBox: HighlightBoxProps | null) => void;
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
