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

  const domX = domData.x;
  const domY = domData.y;
  const domWidth = domData.width;
  const domHeight = domData.height;
  const domText = (domData.text ?? "").trim().toLowerCase();
  const isMessy = domData.isMessy;
  const isTextLikeOnly = domData.isTextLikeOnly;

  const domBox = {
    x1: domX,
    y1: domY,
    x2: domX + domWidth,
    y2: domY + domHeight,
  };

  const tag = domData.tagName?.toLowerCase?.();
  const shouldExcludeTextNode =
    isMessy || (["a", "button"].includes(tag) && !isTextLikeOnly);

  const candidates = figmaNodes
    .map((node) => {
      const box = node.absoluteBoundingBox;

      if (!box) return null;

      const x1 = (box.x - frameOffset.x) * scale + offsetX;
      const y1 = (box.y - frameOffset.y) * scale + offsetY;
      const x2 = x1 + box.width * scale;
      const y2 = y1 + box.height * scale;

      const isOverlapping =
        domX >= x1 - GAP &&
        domX <= x2 + GAP &&
        domY >= y1 - GAP &&
        domY <= y2 + GAP;

      if (!isOverlapping) return null;
      if (shouldExcludeTextNode && node.type === "TEXT") return null;

      const dx1 = Math.abs(domBox.x1 - x1);
      const dx2 = Math.abs(domBox.x2 - x2);
      const dy1 = Math.abs(domBox.y1 - y1);
      const dy2 = Math.abs(domBox.y2 - y2);
      const offsetSum = dx1 + dx2 + dy1 + dy2;

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

  if (!shouldExcludeTextNode && domText && domText.length >= 2) {
    const exactMatch = narrowed.filter(
      (c) =>
        c.node.type === "TEXT" &&
        typeof c.node.characters === "string" &&
        c.node.characters.trim().toLowerCase() === domText,
    );

    if (exactMatch.length > 0) {
      narrowed = exactMatch;
    } else {
      const partialMatch = narrowed.filter(
        (c) =>
          c.node.type === "TEXT" &&
          typeof c.node.characters === "string" &&
          c.node.characters.trim().toLowerCase().includes(domText),
      );

      if (partialMatch.length > 0) {
        narrowed = partialMatch;
      } else {
        const similarMatch = narrowed
          .filter(
            (c) =>
              c.node.type === "TEXT" && typeof c.node.characters === "string",
          )
          .map((c) => {
            const figmaText = c.node.characters.trim().toLowerCase();
            const similarity = computeTextSimilarity(domText, figmaText);

            return { ...c, similarity };
          })
          .filter((c) => c.similarity > 0.8)
          .sort((a, b) => b.similarity - a.similarity);

        if (similarMatch.length > 0) {
          narrowed = [similarMatch[0]];
        }
      }
    }
  }

  narrowed.sort((a, b) => {
    if (a.offsetSum !== b.offsetSum) return a.offsetSum - b.offsetSum;

    return b.__depth - a.__depth;
  });

  return narrowed[0].node ?? null;
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
  const pixelLimit = 3;

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

const computeTextSimilarity = (a = "", b = "") => {
  const tokenize = (str) => {
    const clean = str.replace(/\s+/g, "").toLowerCase();

    return [...Array(clean.length - 2)].map((_, i) => clean.slice(i, i + 3));
  };

  const aGrams = tokenize(a);
  const bGrams = tokenize(b);

  const freqMap = new Map();

  aGrams.forEach((gram) => {
    freqMap.set(gram, (freqMap.get(gram) || 0) + 1);
  });

  let dotProduct = 0;
  let bMagnitude = 0;
  let aMagnitude = 0;

  bGrams.forEach((gram) => {
    const aFreq = freqMap.get(gram) || 0;

    dotProduct += aFreq * 1;
    bMagnitude += 1;
  });

  aMagnitude = aGrams.length;

  const denominator = Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude);

  return denominator === 0 ? 0 : dotProduct / denominator;
};

export const isMultiBlockParent = (el) => {
  if (!el || !el.children || el.children.length === 0) return false;

  let blockCount = 0;
  let textOnly = true;

  for (const child of el.children) {
    const display = window.getComputedStyle(child).display;

    if (display !== "inline") {
      blockCount++;
    }

    if (child.children.length > 0 || (child.textContent?.trim() ?? "") === "") {
      textOnly = false;
    }

    if (blockCount > 1 && !textOnly) return true;
  }

  return false;
};

export const isTextSizedBox = (el) => {
  if (!el || !el.textContent?.trim()) return false;

  const tag = el.tagName.toLowerCase();

  if (tag !== "a" && tag !== "button") return false;

  const elRect = el.getBoundingClientRect();

  if (elRect.width === 0 || elRect.height === 0) return false;

  const range = document.createRange();

  range.selectNodeContents(el);
  const textRect = range.getBoundingClientRect();

  const elArea = elRect.width * elRect.height;
  const textArea = textRect.width * textRect.height;
  const areaRatio = textArea / elArea;

  return areaRatio > 0.9;
};
