import type {
  Project,
  PageFolder,
  PageItem,
  ActivePageMap,
} from "@/stores/useProjectStore";

export const getActivePageGroupLabel = (
  activePageMap: ActivePageMap | undefined,
  projectPages: PageFolder[] | undefined,
  windowWidth: number,
): string | null => {
  if (!activePageMap || !projectPages || projectPages.length === 0) return null;

  const matchedPage = getOverlayNodeByWidth(activePageMap, windowWidth);

  if (!matchedPage?.id) return null;

  const targetId = matchedPage.id;
  const matchedGroup = projectPages.find((group) =>
    group.items?.some((item) => item.id === targetId),
  );

  return matchedGroup?.title ?? null;
};

export const getOverlayNodeByWidth = (
  activePageMap: ActivePageMap | undefined,
  windowWidth: number,
): PageItem | null => {
  if (!activePageMap || Object.keys(activePageMap).length === 0) return null;

  const availableWidths = Object.keys(activePageMap)
    .map(Number)
    .sort((a, b) => b - a);

  const bestFit = availableWidths.find((w) => windowWidth >= w);

  return bestFit != null
    ? activePageMap[bestFit]
    : (activePageMap[availableWidths[availableWidths.length - 1]] ?? null);
};

type ProjectStore = {
  projects: Project[];
};

export const selectedProject =
  (fileKey: string | undefined) =>
  (state: ProjectStore): Project | null => {
    return (
      state.projects.find((project) => project.fileKey === fileKey) || null
    );
  };
