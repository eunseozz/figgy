import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";
import {
  compareDomWithFigma,
  generateDiffText,
} from "@/utils/comparator/compare";
import { getDomData, isDiffTarget } from "@/utils/comparator/domUtil";
import { getClosestFigmaNode } from "@/utils/comparator/nodeMatching";

const useDomClickComparator = ({
  figmaNodes,
  imgRef,
  figmaOriginalWidthRef,
  frameOffsetRef,
}) => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));

  const setTooltip = useFeedbackStore((state) => state.setTooltip);
  const setActiveElement = useFeedbackStore((state) => state.setActiveElement);
  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);
  const isShowOverlay = useHUDStore((state) => state.isShowOverlay);
  const viewMode = useHUDStore((state) => state.viewMode);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;

      if (!isDiffTarget(clickedElement, project, viewMode, isShowOverlay))
        return;

      clearFeedback();

      const rect = clickedElement.getBoundingClientRect();
      const domData = getDomData(clickedElement);

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
  }, [figmaNodes, project?.activePageMap, isShowOverlay, viewMode]);
};

export default useDomClickComparator;
