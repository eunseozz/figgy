import { createRef } from "react";
import { create } from "zustand";

const HIGHLIGHT_STYLE = {
  MATCHED: {
    outline: "3px dashed green",
  },
  MISMATCHED: {
    outline: "3px dashed red",
  },
};

const useFeedbackStore = create((set) => {
  const activeElementRef = createRef();

  return {
    tooltip: null,
    setTooltip: (tooltip) => set({ tooltip }),

    activeElementRef,
    setActiveElement: (element, isMatched = true) => {
      if (!element) return;

      const style = isMatched
        ? HIGHLIGHT_STYLE.MATCHED
        : HIGHLIGHT_STYLE.MISMATCHED;

      element.style.outline = style.outline;

      activeElementRef.current = element;
    },

    clearFeedback: () => {
      if (activeElementRef.current) {
        activeElementRef.current.style.outline = "";
        activeElementRef.current = null;
      }
      set({ tooltip: null });
    },
  };
});

export default useFeedbackStore;
