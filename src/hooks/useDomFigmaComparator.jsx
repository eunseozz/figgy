import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getFigmaFile } from "@/api/figma";
import {
  compareDomWithFigma,
  findNodeById,
  flattenNodes,
  getClosestFigmaNode,
} from "@/utils/comparator";

const IGNORED_TAGS = ["HTML", "BODY"];
const DEFAULT_FIGMA_WIDTH = 1440;

const useDomFigmaComparator = ({ frameNodeId, onCompareResult }) => {
  const { fileKey } = useParams();

  const imgRef = useRef(null);
  const lastHighlightedRef = useRef(null);

  const [figmaNodes, setFigmaNodes] = useState([]);
  const [frameOffset, setFrameOffset] = useState({ x: 0, y: 0 });
  const [figmaOriginalWidth, setFigmaOriginalWidth] =
    useState(DEFAULT_FIGMA_WIDTH);

  useEffect(() => {
    const fetchFigmaNodes = async () => {
      if (!imgRef.current || !fileKey || !frameNodeId) return;

      try {
        const result = await getFigmaFile(fileKey);
        const pageNode = result.document.children.find((page) =>
          findNodeById(page, frameNodeId),
        );

        if (!pageNode) return;

        const targetFrame = findNodeById(pageNode, frameNodeId);

        if (!targetFrame) return;

        const flattened = flattenNodes(targetFrame);
        const originalWidth = targetFrame.absoluteBoundingBox?.width;
        const offsetX = targetFrame.absoluteBoundingBox?.x || 0;
        const offsetY = targetFrame.absoluteBoundingBox?.y || 0;

        setFigmaNodes(flattened);
        setFigmaOriginalWidth(originalWidth ?? DEFAULT_FIGMA_WIDTH);
        setFrameOffset({ x: offsetX, y: offsetY });
      } catch (error) {
        console.error("Figma fetch 실패:", error);
      }
    };

    fetchFigmaNodes();
  }, [fileKey, frameNodeId]);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;

      if (IGNORED_TAGS.includes(clickedElement.tagName)) return;
      if (clickedElement.closest("#figgy-dashboard")) return;

      if (lastHighlightedRef.current) {
        lastHighlightedRef.current.style.outline = "";
        lastHighlightedRef.current.style.backgroundColor = "";
      }

      clickedElement.style.outline = "2px solid red";
      clickedElement.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      lastHighlightedRef.current = clickedElement;

      const rect = clickedElement.getBoundingClientRect();

      const domData = {
        x: rect.x,
        y: rect.y,
      };

      const closestNode = getClosestFigmaNode(
        domData,
        figmaNodes,
        imgRef,
        figmaOriginalWidth,
        frameOffset,
      );

      const comparison = compareDomWithFigma(
        domData,
        closestNode,
        imgRef,
        figmaOriginalWidth,
        frameOffset,
      );

      if (onCompareResult) {
        onCompareResult({ dom: domData, figma: closestNode, comparison });
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [figmaNodes, figmaOriginalWidth, frameOffset]);

  return { imgRef };
};

export default useDomFigmaComparator;
