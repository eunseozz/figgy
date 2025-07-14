import { FIGMA_NODE_TYPE } from "@/constants/figmaNodeTypes";
import { computeTextSimilarity } from "@/utils/comparator/compare";

export const findNodeById = (node, targetId) => {
  if (node.id === targetId) return node;
  if (!node.children) return null;

  for (const child of node.children) {
    const found = findNodeById(child, targetId);

    if (found) return found;
  }

  return null;
};

export const flattenNodes = (node, acc = [], depth = 0) => {
  if (node.absoluteBoundingBox) {
    acc.push({ ...node, __depth: depth });
  }

  if (node.children) {
    node.children.forEach((child) => flattenNodes(child, acc, depth + 1));
  }

  return acc;
};

export const getClosestFigmaNode = (
  domData,
  figmaNodes,
  imageRef,
  figmaOriginalWidth,
  frameOffset,
) => {
  if (!imageRef.current) return null;

  const GAP = 50;
  const imageRect = imageRef.current.getBoundingClientRect();
  const scale = imageRef.current.width / figmaOriginalWidth;
  const offsetX = imageRect.left;
  const offsetY = imageRect.top;

  const domBox = {
    x1: domData.x,
    y1: domData.y,
    x2: domData.x + domData.width,
    y2: domData.y + domData.height,
  };

  const shouldExcludeTextNode = shouldExcludeText(domData);

  const candidates = figmaNodes
    .map((node) => {
      const box = node.absoluteBoundingBox;

      if (!box) return null;

      const x1 = (box.x - frameOffset.x) * scale + offsetX;
      const y1 = (box.y - frameOffset.y) * scale + offsetY;
      const x2 = x1 + box.width * scale;
      const y2 = y1 + box.height * scale;

      const isOverlapping = isNodeOverlapping(
        domData.x,
        domData.y,
        x1,
        y1,
        x2,
        y2,
        GAP,
      );

      if (!isOverlapping) return null;
      if (shouldExcludeTextNode && node.type === FIGMA_NODE_TYPE.TEXT)
        return null;

      const offsetSum = calculateOffsetSum(domBox, { x1, y1, x2, y2 });

      return {
        node,
        offsetSum,
        __depth: node.__depth ?? 0,
        box,
      };
    })
    .filter(Boolean);

  if (candidates.length === 0) return null;

  let narrowed = candidates;

  const domText = (domData.text ?? "").trim().toLowerCase();

  if (!shouldExcludeTextNode && domText.length >= 2) {
    const matches = candidates.filter(
      (c) =>
        c.node.type === FIGMA_NODE_TYPE.TEXT &&
        typeof c.node.characters === "string",
    );
    const exact = matches.filter(
      (c) => c.node.characters.trim().toLowerCase() === domText,
    );
    const partial = matches.filter((c) =>
      c.node.characters.trim().toLowerCase().includes(domText),
    );

    if (exact.length > 0) narrowed = exact;
    else if (partial.length > 0) narrowed = partial;
    else {
      const similar = matches
        .map((c) => ({
          ...c,
          similarity: computeTextSimilarity(
            domText,
            c.node.characters.trim().toLowerCase(),
          ),
        }))
        .filter((c) => c.similarity > 0.8)
        .sort((a, b) => b.similarity - a.similarity);

      if (similar.length > 0) narrowed = [similar[0]];
    }
  }

  narrowed.sort((a, b) => a.offsetSum - b.offsetSum || b.__depth - a.__depth);

  return narrowed[0].node ?? null;
};

const shouldExcludeText = (domData) => {
  const tag = domData.tagName?.toLowerCase?.();

  return (
    domData.isMessy ||
    (["a", "button"].includes(tag) && !domData.isTextLikeOnly)
  );
};

const isNodeOverlapping = (domX, domY, x1, y1, x2, y2, GAP) => {
  return (
    domX >= x1 - GAP && domX <= x2 + GAP && domY >= y1 - GAP && domY <= y2 + GAP
  );
};

export const calculateOffsetSum = (domBox, figmaBox) => {
  const dx = Math.abs(domBox.x1 - figmaBox.x1);
  const dy = Math.abs(domBox.y1 - figmaBox.y1);

  return dx + dy;
};
