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
  if (node.absoluteBoundingBox) acc.push({ ...node, __depth: depth });

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
) => {
  const imageRect = imageRef.current.getBoundingClientRect();
  const scale = imageRef.current.width / figmaOriginalWidth;
  const offsetX = imageRect.left;

  let closestNode = null;
  let minDist = Infinity;

  const sorted = [...figmaNodes].sort((a, b) => b.__depth - a.__depth);

  for (const node of sorted) {
    if (!node.absoluteBoundingBox) continue;

    const box = node.absoluteBoundingBox;

    const adjustedX = box.x * scale + offsetX;
    const adjustedY = box.y * scale;
    const dist = Math.hypot(domData.x - adjustedX, domData.y - adjustedY);

    if (dist < minDist) {
      minDist = dist;
      closestNode = node;
    }
  }

  return closestNode;
};

export const compareDomWithFigma = (dom, figmaNode) => {
  const result = { matched: true, mismatches: [] };
  const isTextMismatch =
    figmaNode.characters && figmaNode.characters.trim() !== dom.text.trim();

  if (isTextMismatch) {
    result.matched = false;
    result.mismatches.push({
      key: "text",
      dom: dom.text,
      figma: figmaNode.characters,
    });
  }

  const pixelLimit = 5;
  const figmaBox = figmaNode.absoluteBoundingBox;

  if (figmaBox) {
    const positionKeys = ["x", "y", "width", "height"];

    positionKeys.forEach((key) => {
      const domValue = dom[key];
      const figmaValue = figmaBox[key];

      const isOverGap =
        figmaValue != null && Math.abs(domValue - figmaValue) > pixelLimit;

      if (isOverGap) {
        result.mismatches.push({ key, dom: domValue, figma: figmaValue });
      }
    });

    if (result.mismatches.length > 0) {
      result.matched = false;
    }
  }

  return result;
};
