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

export const computeTextSimilarity = (a = "", b = "") => {
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
