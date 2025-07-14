import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { VIEW_MODE } from "@/constants/hudOptions";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";
import {
  compareDomWithFigma,
  generateDiffText,
  getClosestFigmaNode,
  isMultiBlockParent,
  isTextSizedBox,
} from "@/utils/comparator";

const IGNORED_TAGS = ["HTML", "BODY"];

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

      const hasActivePages =
        project?.activePageMap && Object.keys(project.activePageMap).length > 0;
      const isDiffMode = viewMode === VIEW_MODE.DIFF;

      const isIgnoredTag = IGNORED_TAGS.includes(clickedElement.tagName);
      const isInsideDashboard = clickedElement.closest("#figgy-dashboard");
      const computedStyle = getComputedStyle(clickedElement);
      const isInline = computedStyle.display === "inline";

      if (!isShowOverlay || !hasActivePages || !isDiffMode) return;
      if (isIgnoredTag || isInsideDashboard || isInline) return;

      clearFeedback();

      const rect = clickedElement.getBoundingClientRect();
      const domData = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        text: clickedElement.innerText || clickedElement.textContent || "",
        isMessy: isMultiBlockParent(clickedElement),
        isTextLikeOnly: isTextSizedBox(clickedElement),
        tagName: clickedElement.tagName,
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
  }, [figmaNodes, project?.activePageMap, isShowOverlay, viewMode]);
};

export default useDomClickComparator;
