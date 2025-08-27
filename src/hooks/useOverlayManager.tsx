import { useParams } from "react-router-dom";

import useWindowWidth from "@/hooks/useWindowWidth";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore from "@/stores/useProjectStore";
import { getOverlayNodeByWidth, selectedProject } from "@/utils/project";
import type { PageItem } from "@/stores/useProjectStore";

const useOverlayManager = () => {
  const { fileKey } = useParams<{ fileKey: string }>();
  const project = useProjectStore(selectedProject(fileKey));

  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);
  const setIsShowOverlay = useHUDStore((state) => state.setIsShowOverlay);

  const setActivePage = useProjectStore((state) => state.setActivePage);
  const windowWidth = useWindowWidth();

  const handleItemClick = (clickedItem: PageItem) => {
    const group = project?.pages.find((group) =>
      group.items.some((item: PageItem) => item.id === clickedItem.id),
    );

    if (!group) return;

    clearFeedback();
    if (fileKey) {
      setActivePage(fileKey, group.minWidth, clickedItem);
      setIsShowOverlay(true);
    }
  };

  const getOverlayNode = () => {
    return getOverlayNodeByWidth(project?.activePageMap, windowWidth);
  };

  return {
    handleItemClick,
    getOverlayNode,
  };
};

export default useOverlayManager;
