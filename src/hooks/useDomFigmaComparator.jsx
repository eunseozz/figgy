import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getFigmaFile } from "@/api/figma";
import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";
import {
  compareDomWithFigma,
  findNodeById,
  flattenNodes,
  getClosestFigmaNode,
} from "@/utils/comparator";

const IGNORED_TAGS = ["HTML", "BODY"];

const useDomFigmaComparator = ({ frameNodeId, onCompareResult }) => {
  const { fileKey } = useParams();
  const imgRef = useRef(null);

  const [figmaNodes, setFigmaNodes] = useState([]);
  const [figmaOriginalWidth, setFigmaOriginalWidth] = useState(1440);

  useEffect(() => {
    const fetchFigmaNodes = async () => {
      if (!imgRef.current) return;
      if (!fileKey || !frameNodeId) return;

      try {
        const result = await getFigmaFile(fileKey);
        const pageNode = result.document.children.find(
          (node) => node.type === FIGMA_NODE_TYPE.CANVAS,
        );

        if (!pageNode) return;

        const targetFrame = findNodeById(pageNode, frameNodeId);

        if (!targetFrame) return;

        const flattened = flattenNodes(targetFrame);
        const originalWidth = targetFrame.absoluteBoundingBox?.width;

        if (!originalWidth) return;

        setFigmaNodes(flattened);
        setFigmaOriginalWidth(originalWidth);
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

      const rect = clickedElement.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(clickedElement);

      const domData = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        fontSize: computedStyle.fontSize,
        fontFamily: computedStyle.fontFamily,
        fontWeight: computedStyle.fontWeight,
        letterSpacing: computedStyle.letterSpacing,
        lineHeight: computedStyle.lineHeight,
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        text: clickedElement.innerText,
      };

      const closestNode = getClosestFigmaNode(
        domData,
        figmaNodes,
        imgRef,
        figmaOriginalWidth,
      );
      const comparison = compareDomWithFigma(domData, closestNode);

      if (onCompareResult) {
        onCompareResult({ dom: domData, figma: closestNode, comparison });
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [figmaNodes, figmaOriginalWidth]);

  return { imgRef };
};

export default useDomFigmaComparator;
