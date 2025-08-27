import { useState } from "react";
import { useParams } from "react-router-dom";

import useProjectStore from "@/stores/useProjectStore";
import { selectedProject } from "@/utils/project";
import type { PageItem } from "@/stores/useProjectStore";

const useDragAndDropPages = () => {
  const { fileKey } = useParams<{ fileKey: string }>();
  const [draggedItem, setDraggedItem] = useState<PageItem | null>(null);

  const updateProjects = useProjectStore((state) => state.updateProjects);
  const removeActivePage = useProjectStore((state) => state.removeActivePage);

  const project = useProjectStore(selectedProject(fileKey));

  const handleDragStart = (_: React.DragEvent, item: PageItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (event: React.DragEvent, targetMinWidth: number) => {
    event.preventDefault();

    if (!draggedItem || !project) return;

    const groupsWithoutDragged = project.pages.map((group: any) => {
      const filteredItems = group.items.filter(
        (item: PageItem) => item.id !== draggedItem.id,
      );

      return { ...group, items: filteredItems };
    });

    const updatedGroups = groupsWithoutDragged.map((group: any) => {
      if (group.minWidth === targetMinWidth) {
        return { ...group, items: [...group.items, draggedItem] };
      }
      return group;
    });

    for (const [minWidth, page] of Object.entries(
      project.activePageMap ?? {},
    )) {
      if ((page as PageItem).id === draggedItem.id) {
        removeActivePage(fileKey!, Number(minWidth));
      }
    }

    updateProjects(fileKey!, updatedGroups);
    setDraggedItem(null);
  };

  return { handleDragStart, handleDrop };
};

export default useDragAndDropPages;
