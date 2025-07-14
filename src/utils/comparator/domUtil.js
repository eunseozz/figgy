import { VIEW_MODE } from "@/constants/hudOptions";

const IGNORED_TAGS = ["HTML", "BODY"];

export const getDomData = (el) => {
  const rect = el.getBoundingClientRect();

  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    text: el.innerText || el.textContent || "",
    isMessy: isMessyTextBlock(el),
    isTextLikeOnly: isTextSizedBox(el),
    tagName: el.tagName,
  };
};

export const isDiffTarget = (el, project, viewMode, isShowOverlay) => {
  const hasActivePages =
    project?.activePageMap && Object.keys(project.activePageMap).length > 0;
  const isDiffMode = viewMode === VIEW_MODE.DIFF;
  const isIgnoredTag = IGNORED_TAGS.includes(el.tagName);
  const isInsideDashboard = el.closest("#figgy-dashboard");
  const isInline = getComputedStyle(el).display === "inline";

  return (
    isShowOverlay &&
    hasActivePages &&
    isDiffMode &&
    !isIgnoredTag &&
    !isInsideDashboard &&
    !isInline
  );
};

export const isMessyTextBlock = (el) => {
  if (!el || !el.children || el.children.length === 0) return false;

  let hasBlock = false;
  let hasExtraText = false;

  for (const child of el.children) {
    const display = window.getComputedStyle(child).display;

    if (display !== "inline") hasBlock = true;

    const text = child.textContent?.trim() ?? "";

    if (text.length > 0) hasExtraText = true;

    if (hasBlock && hasExtraText) return true;
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
