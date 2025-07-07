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

  const GAP = 20;
  const imageRect = imageRef.current.getBoundingClientRect();
  const scale = imageRef.current.width / figmaOriginalWidth;
  const offsetX = imageRect.left;
  const offsetY = imageRect.top;

  const domX = domData.x;
  const domY = domData.y;

  const candidates = figmaNodes.filter((node) => {
    const box = node.absoluteBoundingBox;

    if (!box) return false;
    const x1 = (box.x - frameOffset.x) * scale + offsetX - GAP;
    const y1 = (box.y - frameOffset.y) * scale + offsetY - GAP;
    const x2 = x1 + box.width * scale + GAP * 2;
    const y2 = y1 + box.height * scale + GAP * 2;

    return domX >= x1 && domX <= x2 && domY >= y1 && domY <= y2;
  });

  const sorted = candidates.sort((a, b) => b.__depth - a.__depth);
  const closest = sorted[0] ?? null;

  return closest;
};

export const compareDomWithFigma = (
  dom,
  figmaNode,
  imageRef,
  figmaOriginalWidth,
  frameOffset,
) => {
  const result = { matched: true, mismatches: [] };

  if (!figmaNode || !figmaNode.absoluteBoundingBox || !imageRef.current) {
    return result;
  }

  const figmaBox = figmaNode.absoluteBoundingBox;
  const pixelLimit = 5;

  const imageRect = imageRef.current.getBoundingClientRect();
  const scale = imageRef.current.width / figmaOriginalWidth;
  const offsetX = imageRect.left;
  const offsetY = imageRect.top;

  const figmaX = (figmaBox.x - frameOffset.x) * scale + offsetX;
  const figmaY = (figmaBox.y - frameOffset.y) * scale + offsetY;

  const comparePairs = [
    { key: "x", dom: dom.x, figma: figmaX },
    { key: "y", dom: dom.y, figma: figmaY },
  ];

  for (const { key, dom, figma } of comparePairs) {
    const isOverGap = Math.abs(dom - figma) > pixelLimit;

    if (isOverGap) {
      result.matched = false;
      result.mismatches.push({ key, dom, figma });
    }
  }

  return result;
};

export const generateDiffText = (mismatches) => {
  const getDirectionText = (key, diff) => {
    if (key === "x") return diff > 0 ? "왼쪽으로" : "오른쪽으로";
    if (key === "y") return diff > 0 ? "위로" : "아래로";

    return "";
  };

  const parts = mismatches.map(({ key, dom, figma }) => {
    const diff = +(dom - figma).toFixed(1);
    const direction = getDirectionText(key, diff);

    return `${direction} 약 ${Math.abs(diff)}px`;
  });

  return `⚠️ 위치 조정 필요 (${parts.join(", ")})`;
};
