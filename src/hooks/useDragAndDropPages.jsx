import { useState } from "react";
import { useParams } from "react-router-dom";

import useProjectStore from "@/stores/useProjectStore";
import { selectedProject } from "@/utils/project";

const useDragAndDropPages = () => {
  const { fileKey } = useParams();
  const [draggedItem, setDraggedItem] = useState(null);

  const updateProjects = useProjectStore((state) => state.updateProjects);
  const removeActivePage = useProjectStore((state) => state.removeActivePage);

  const project = useProjectStore(selectedProject(fileKey));

  const handleDragStart = (_, item) => {
    setDraggedItem(item);
  };

  const handleDrop = (event, targetMinWidth) => {
    event.preventDefault();

    if (!draggedItem) return;

    const groupsWithoutDragged = project.pages.map((group) => {
      const filteredItems = group.items.filter(
        (item) => item.id !== draggedItem.id,
      );

      return { ...group, items: filteredItems };
    });

    const updatedGroups = groupsWithoutDragged.map((group) => {
      if (group.minWidth === targetMinWidth) {
        return { ...group, items: [...group.items, draggedItem] };
      }

      return group;
    });

    for (const [minWidth, page] of Object.entries(
      project.activePageMap ?? {},
    )) {
      if (page.id === draggedItem.id) {
        removeActivePage(fileKey, minWidth);
      }
    }

    updateProjects(fileKey, updatedGroups);
    setDraggedItem(null);
  };

  return { handleDragStart, handleDrop };
};

export default useDragAndDropPages;
