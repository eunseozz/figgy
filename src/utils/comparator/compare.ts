import useHUDStore from "@/stores/useHUDStore";
import type { DomData } from "@/utils/comparator/domUtil";
import type { AbsoluteBoundingBox } from "@/utils/comparator/nodeMatching";

export const MAX_MISMATCH_GAP = 50;

export interface FigmaNodeWithBox {
  absoluteBoundingBox?: AbsoluteBoundingBox;
  type?: string;
  characters?: string;
  __depth?: number;
}

export interface Mismatch {
  key: string;
  dom: number;
  figma: number;
}

export interface CompareResult {
  matched: boolean;
  mismatches: Mismatch[];
}

export const compareDomWithFigma = (
  dom: DomData,
  figmaNode: FigmaNodeWithBox | null,
  imageRef: React.RefObject<HTMLImageElement>,
  figmaOriginalWidth: number,
  frameOffset: { x: number; y: number },
): CompareResult => {
  const result: CompareResult = { matched: true, mismatches: [] };

  if (!figmaNode || !figmaNode.absoluteBoundingBox || !imageRef.current) {
    return result;
  }

  const figmaBox = figmaNode.absoluteBoundingBox;
  const pixelLimit = useHUDStore.getState().matchGap;

  const imageRect = imageRef.current.getBoundingClientRect();
  const scale = imageRef.current.width / figmaOriginalWidth;
  const offsetX = imageRect.left;
  const offsetY = imageRect.top;

  const figmaX = (figmaBox.x - frameOffset.x) * scale + offsetX;
  const figmaY = (figmaBox.y - frameOffset.y) * scale + offsetY;

  const comparePairs: Array<{ key: "x" | "y"; dom: number; figma: number }> = [
    { key: "x", dom: dom.x, figma: figmaX },
    { key: "y", dom: dom.y, figma: figmaY },
  ];

  for (const { key, dom: domVal, figma } of comparePairs) {
    const isOverGap = Math.abs(domVal - figma) > pixelLimit;

    if (isOverGap) {
      result.matched = false;
      result.mismatches.push({ key, dom: domVal, figma });
    }
  }

  return result;
};

export const generateDiffText = (mismatches: Mismatch[]): string => {
  const getDirectionText = (key: string, diff: number): string => {
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

export const computeTextSimilarity = (
  a: string = "",
  b: string = "",
): number => {
  const tokenize = (str: string): string[] => {
    const clean = str.replace(/\s+/g, "").toLowerCase();
    return [...Array(clean.length - 2)].map((_, i) => clean.slice(i, i + 3));
  };

  const aGrams = tokenize(a);
  const bGrams = tokenize(b);

  const freqMap = new Map<string, number>();

  aGrams.forEach((gram) => {
    freqMap.set(gram, (freqMap.get(gram) || 0) + 1);
  });

  let dotProduct = 0;
  let bMagnitude = 0;
  let aMagnitude = aGrams.length;

  bGrams.forEach((gram) => {
    const aFreq = freqMap.get(gram) || 0;
    dotProduct += aFreq * 1;
    bMagnitude += 1;
  });

  const denominator = Math.sqrt(aMagnitude) * Math.sqrt(bMagnitude);

  return denominator === 0 ? 0 : dotProduct / denominator;
};

export const shouldSkipFeedback = (mismatches: Mismatch[]): boolean => {
  return mismatches.some(({ dom, figma }) => {
    const diff = +(dom - figma).toFixed(1);
    return Math.abs(diff) > MAX_MISMATCH_GAP;
  });
};
