export const getActivePageGroupLabel = (
  activePageMap,
  projectPages,
  windowWidth,
) => {
  if (!activePageMap || !projectPages || projectPages.length === 0) return null;

  const matchedPage = getOverlayNodeByWidth(activePageMap, windowWidth);

  if (!matchedPage?.id) return null;

  const targetId = matchedPage.id;
  const matchedGroup = projectPages.find((group) =>
    group.items?.some((item) => item.id === targetId),
  );

  return matchedGroup?.title ?? null;
};

export const getOverlayNodeByWidth = (activePageMap, windowWidth) => {
  if (!activePageMap || Object.keys(activePageMap).length === 0) return null;

  const availableWidths = Object.keys(activePageMap)
    .map(Number)
    .sort((a, b) => b - a);

  const bestFit = availableWidths.find((w) => windowWidth >= w);

  return bestFit != null
    ? activePageMap[bestFit]
    : (activePageMap[availableWidths[availableWidths.length - 1]] ?? null);
};

export const selectedProject = (fileKey) => (state) => {
  return state.projects.find((project) => project.fileKey === fileKey) || null;
};
