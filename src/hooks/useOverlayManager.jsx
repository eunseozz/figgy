import { useParams } from "react-router-dom";

import useWindowWidth from "@/hooks/useWindowWidth";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const useOverlayManager = () => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));

  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);
  const setIsShowOverlay = useHUDStore((state) => state.setIsShowOverlay);

  const setActivePage = useProjectStore((state) => state.setActivePage);
  const windowWidth = useWindowWidth();

  const handleItemClick = (clickedItem) => {
    const group = project?.pages.find((group) =>
      group.items.some((item) => item.id === clickedItem.id),
    );

    if (!group) return;

    clearFeedback();
    setActivePage(fileKey, group.minWidth, clickedItem);
    setIsShowOverlay(true);
  };

  const getOverlayNode = () => {
    const selectedPages = project?.activePageMap ?? {};
    const availableWidths = Object.keys(selectedPages)
      .map(Number)
      .sort((a, b) => b - a);

    const bestFit = availableWidths.find((w) => windowWidth >= w);

    if (bestFit) return selectedPages[bestFit];

    return selectedPages[availableWidths[availableWidths.length - 1]] ?? null;
  };

  return {
    handleItemClick,
    getOverlayNode,
  };
};

export default useOverlayManager;
