import { useEffect } from "react";

import useFeedbackStore from "@/stores/useFeedbackStore";
import {
  compareDomWithFigma,
  generateDiffText,
  getClosestFigmaNode,
} from "@/utils/comparator";

const IGNORED_TAGS = ["HTML", "BODY"];

const useDomClickComparator = ({
  figmaNodes,
  imgRef,
  figmaOriginalWidthRef,
  frameOffsetRef,
}) => {
  const setTooltip = useFeedbackStore((state) => state.setTooltip);
  const setActiveElement = useFeedbackStore((state) => state.setActiveElement);
  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;

      if (IGNORED_TAGS.includes(clickedElement.tagName)) return;
      if (clickedElement.closest("#figgy-dashboard")) return;

      clearFeedback();

      const rect = clickedElement.getBoundingClientRect();

      const domData = {
        x: rect.x,
        y: rect.y,
      };

      const closestNode = getClosestFigmaNode(
        domData,
        figmaNodes,
        imgRef,
        figmaOriginalWidthRef.current,
        frameOffsetRef.current,
      );

      const comparison = compareDomWithFigma(
        domData,
        closestNode,
        imgRef,
        figmaOriginalWidthRef.current,
        frameOffsetRef.current,
      );

      setActiveElement(clickedElement, comparison.matched);

      if (!comparison.matched) {
        setTooltip({
          top: rect.top + window.scrollY + rect.height + 7,
          left: rect.left - 3,
          text: generateDiffText(comparison.mismatches),
        });
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [figmaNodes]);
};

export default useDomClickComparator;
