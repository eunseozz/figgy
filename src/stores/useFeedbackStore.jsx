import { createRef } from "react";
import { create } from "zustand";

const HIGHLIGHT_STYLE = {
  MATCHED: {
    outline: "2px solid green",
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
  MISMATCHED: {
    outline: "2px solid red",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
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
      element.style.backgroundColor = style.backgroundColor;

      activeElementRef.current = element;
    },

    clearFeedback: () => {
      if (activeElementRef.current) {
        activeElementRef.current.style.outline = "";
        activeElementRef.current.style.backgroundColor = "";
        activeElementRef.current = null;
      }
      set({ tooltip: null });
    },
  };
});

export default useFeedbackStore;
