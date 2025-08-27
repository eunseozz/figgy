import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { getFigmaFile } from "@/api/figma";
import { findNodeById, flattenNodes } from "@/utils/comparator/nodeMatching";

const DEFAULT_FIGMA_WIDTH = 1440;

type FigmaNode = {
  id: string;
  name: string;
  type: string;
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  children?: FigmaNode[];
};

const useFigmaFrameData = (frameNodeId: string | null) => {
  const { fileKey } = useParams<{ fileKey: string }>();

  const imgRef = useRef<HTMLImageElement | null>(null);
  const figmaOriginalWidthRef = useRef<number>(DEFAULT_FIGMA_WIDTH);
  const frameOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [figmaNodes, setFigmaNodes] = useState<FigmaNode[]>([]);

  useEffect(() => {
    const fetchFigmaNodes = async () => {
      if (!imgRef.current || !fileKey || !frameNodeId) return;

      try {
        const result: any = await getFigmaFile(fileKey);
        const pageNode: FigmaNode | undefined = result.document.children.find(
          (page: FigmaNode) => findNodeById(page, frameNodeId),
        );

        if (!pageNode) return;

        const targetFrame: FigmaNode | null = findNodeById(
          pageNode,
          frameNodeId,
        );

        if (!targetFrame) return;

        const flattened: FigmaNode[] = flattenNodes(targetFrame);
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
