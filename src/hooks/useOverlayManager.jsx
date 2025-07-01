import { useState } from "react";
import { useParams } from "react-router-dom";

import useWindowWidth from "@/hooks/useWindowWidth";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const useOverlayPages = () => {
  const { fileKey } = useParams();

  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [selectedPages, setSelectedPages] = useState({});

  const project = useProjectStore(selectedProject(fileKey));

  const windowWidth = useWindowWidth();

  const handleItemClick = (clickedItem) => {
    const group = project.pages.find((group) =>
      group.items.some((item) => item.id === clickedItem.id),
    );

    if (!group) return;

    setSelectedPages((prev) => ({
      ...prev,
      [group.minWidth]: clickedItem,
    }));

    setIsShowOverlay(true);
  };

  const getOverlayImageUrl = () => {
    const sortedMinWidths = Object.keys(selectedPages)
      .map(Number)
      .sort((a, b) => b - a);

    const matchedMinWidth = sortedMinWidths.find(
      (minWidth) => windowWidth >= minWidth,
    );

    return selectedPages[matchedMinWidth]?.imageUrl;
  };

  return {
    isShowOverlay,
    selectedPages,
    handleItemClick,
    getOverlayImageUrl,
  };
};

export default useOverlayPages;
