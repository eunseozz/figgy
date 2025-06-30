import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EmptyDropHint from "@/components/EmptyDropHint";
import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useFigmaImagePages from "@/hooks/useFigmaImagePages";
import useProjectStore from "@/stores/useProjectStore";

const Pages = () => {
  const { fileKey } = useParams();
  const pages = useFigmaImagePages(fileKey);
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [selectedPages, setSelectedPages] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { projects, updateProjectPagesByFileKey } = useProjectStore();
  const project = projects.find((p) => p.fileKey === fileKey);

  const isInitTarget = project && project.projectPages.length === 0;

  useEffect(() => {
    if (isInitTarget && pages.length > 0) {
      const initialGroups = [
        { title: "PC", minWidth: 1024, items: pages },
        { title: "TABLET", minWidth: 768, items: [] },
        { title: "MOBILE", minWidth: 0, items: [] },
      ];

      updateProjectPagesByFileKey(fileKey, initialGroups);
    }
  }, [isInitTarget, pages]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (clickedItem) => {
    const group = project.projectPages.find((group) =>
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

  const handleDragStart = (_, item) => {
    setDraggedItem(item);
  };

  const handleDrop = (e, targetMinWidth) => {
    e.preventDefault();

    if (!draggedItem) return;

    const updated = project.projectPages
      .map((group) => {
        const withoutItem = group.items.filter((i) => i.id !== draggedItem.id);

        return { ...group, items: withoutItem };
      })
      .map((group) => {
        if (group.minWidth === targetMinWidth) {
          return { ...group, items: [...group.items, draggedItem] };
        }

        return group;
      });

    updateProjectPagesByFileKey(fileKey, updated);
    setDraggedItem(null);
  };

  if (!project) return null;

  return (
    <>
      <Panel
        isShowToolBar={true}
        primaryButton={{
          label: "폴더 추가하기",
          onClick: () => console.log("폴더 추가"),
        }}
      >
        {project.projectPages.map((group) => {
          const selectedId = selectedPages[group.minWidth]?.id;
          const decoratedItems = group.items.map((item) => ({
            ...item,
            isActive: item.id === selectedId,
          }));

          return (
            <PanelList
              key={group.title}
              title={group.title}
              items={decoratedItems}
              onItemClick={handleItemClick}
              isToggle={true}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, group.minWidth)}
              emptyHint={
                <EmptyDropHint text="프레임을 끌어다 놓으면 여기에 추가돼요" />
              }
            />
          );
        })}
      </Panel>

      {isShowOverlay && <Overlay imageUrl={getOverlayImageUrl()} />}
    </>
  );
};

export default Pages;
