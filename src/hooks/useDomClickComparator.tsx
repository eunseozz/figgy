import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore, { Project } from "@/stores/useProjectStore";
import useToastStore from "@/stores/useToastStore";
import {
  compareDomWithFigma,
  generateDiffText,
  shouldSkipFeedback,
} from "@/utils/comparator/compare";
import { getDomData, isDiffTarget } from "@/utils/comparator/domUtil";
import { getClosestFigmaNode } from "@/utils/comparator/nodeMatching";
import { selectedProject } from "@/utils/project";
import type { AbsoluteBoundingBox } from "@/utils/comparator/nodeMatching";

type FigmaNode = {
  id: string;
  type: string;
  name: string;
  characters?: string;
  absoluteBoundingBox?: AbsoluteBoundingBox;
  children?: FigmaNode[];
  __depth?: number;
};

interface UseDomClickComparatorParams {
  figmaNodes: FigmaNode[];
  imgRef: React.RefObject<HTMLImageElement>;
  figmaOriginalWidthRef: React.MutableRefObject<number>;
  frameOffsetRef: React.MutableRefObject<{ x: number; y: number }>;
}

const useDomClickComparator = ({
  figmaNodes,
  imgRef,
  figmaOriginalWidthRef,
  frameOffsetRef,
}: UseDomClickComparatorParams) => {
  const { fileKey } = useParams<{ fileKey: string }>();
  const project: Project | null = useProjectStore(selectedProject(fileKey));

  const setTooltip = useFeedbackStore((state) => state.setTooltip);
  const setActiveElement = useFeedbackStore((state) => state.setActiveElement);
  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);
  const setHighlightBox = useFeedbackStore((state) => state.setHighlightBox);
  const isShowOverlay = useHUDStore((state) => state.isShowOverlay);
  const viewMode = useHUDStore((state) => state.viewMode);

  const clickedElementRef = useRef<HTMLElement | null>(null);
  const comparisonRef = useRef<{
    matched: boolean;
    mismatches: { key: string; dom: number; figma: number }[];
  } | null>(null);

  const updateFeedbackPosition = () => {
    const el = clickedElementRef.current;
    const comparison = comparisonRef.current;

    if (!el || !comparison) return;

    const rect = el.getBoundingClientRect();

    setHighlightBox({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
      isMatched: comparison.matched,
    });

    if (!comparison.matched) {
      setTooltip({
        top: rect.top + window.scrollY + rect.height + 7,
        left: rect.left - 3,
        text: generateDiffText(comparison.mismatches),
      });
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement) return;

      if (!isDiffTarget(clickedElement, project, viewMode, isShowOverlay))
        return;

      clearFeedback();

      const prevElement = clickedElementRef.current;

      if (prevElement && prevElement.isSameNode(clickedElement)) {
        clickedElementRef.current = null;
        comparisonRef.current = null;
        return;
      }

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

      if (shouldSkipFeedback(comparison.mismatches)) {
        clickedElementRef.current = null;
        comparisonRef.current = null;

        useToastStore
          .getState()
          .showToast("❌ 일치하는 Figma 노드를 찾을 수 없습니다.");

        return;
      }

      clickedElementRef.current = clickedElement;
      comparisonRef.current = comparison;

      setActiveElement(clickedElement, comparison.matched);

      setHighlightBox({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        isMatched: comparison.matched,
      });

      if (!comparison.matched) {
        setTooltip({
          top: rect.top + window.scrollY + rect.height + 7,
          left: rect.left - 3,
          text: generateDiffText(comparison.mismatches),
        });
      }
    };

    const handleResizeOrScroll = () => {
      updateFeedbackPosition();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
    };
  }, [figmaNodes, project?.activePageMap, isShowOverlay, viewMode]);
};

export default useDomClickComparator;
