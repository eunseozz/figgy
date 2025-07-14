import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getFigmaFile } from "@/api/figma";
import { findNodeById, flattenNodes } from "@/utils/comparator/nodeMatching";

const DEFAULT_FIGMA_WIDTH = 1440;

const useFigmaFrameData = (frameNodeId) => {
  const { fileKey } = useParams();

  const imgRef = useRef(null);
  const figmaOriginalWidthRef = useRef(DEFAULT_FIGMA_WIDTH);
  const frameOffsetRef = useRef({ x: 0, y: 0 });

  const [figmaNodes, setFigmaNodes] = useState([]);

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

        figmaOriginalWidthRef.current = originalWidth ?? DEFAULT_FIGMA_WIDTH;
        frameOffsetRef.current = { x: offsetX, y: offsetY };

        setFigmaNodes(flattened);
      } catch (error) {
        console.error("Figma fetch 실패:", error);
      }
    };

    fetchFigmaNodes();
  }, [fileKey, frameNodeId]);

  return {
    figmaNodes,
    imgRef,
    figmaOriginalWidthRef,
    frameOffsetRef,
  };
};

export default useFigmaFrameData;
