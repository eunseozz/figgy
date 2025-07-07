import { useState } from "react";
import { useParams } from "react-router-dom";

import useWindowWidth from "@/hooks/useWindowWidth";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const useOverlayManager = () => {
  const { fileKey } = useParams();

  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [selectedPages, setSelectedPages] = useState({});

  const project = useProjectStore(selectedProject(fileKey));
  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);

  const windowWidth = useWindowWidth();

  const handleItemClick = (clickedItem) => {
    const group = project.pages.find((group) =>
      group.items.some((item) => item.id === clickedItem.id),
    );

    if (!group) return;

    clearFeedback();

    setSelectedPages((prev) => ({
      ...prev,
      [group.minWidth]: clickedItem,
    }));

    setIsShowOverlay(true);
  };

  const getOverlayNode = () => {
    if (!selectedPages || Object.keys(selectedPages).length === 0) return null;

    const sortedMinWidths = Object.keys(selectedPages)
      .map(Number)
      .sort((a, b) => b - a);

    const matchedMinWidth = sortedMinWidths.find(
      (minWidth) => windowWidth >= minWidth,
    );

    return selectedPages[matchedMinWidth];
  };

  return {
    isShowOverlay,
    selectedPages,
    handleItemClick,
    getOverlayNode,
  };
};

export default useOverlayManager;
