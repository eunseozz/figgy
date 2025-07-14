import { createRef } from "react";
import { create } from "zustand";

const useFeedbackStore = create((set) => {
  const activeElementRef = createRef();

  return {
    tooltip: null,
    highlightBox: null,
    activeElementRef,

    setTooltip: (tooltip) => set({ tooltip }),

    setHighlightBox: (highlight) => set({ highlightBox: highlight }),

    clearFeedback: () => {
      activeElementRef.current = null;
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

      activeElementRef.current = element;
    },
  };
});

export default useFeedbackStore;
