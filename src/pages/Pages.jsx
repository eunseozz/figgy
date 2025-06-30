import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    const width = window.innerWidth;

    const sortedMinWidths = Object.keys(selectedPages)
      .map(Number)
      .sort((a, b) => b - a);

    const matchedMinWidth = sortedMinWidths.find(
      (minWidth) => width >= minWidth,
    );

    return selectedPages[matchedMinWidth]?.imageUrl;
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
            />
          );
        })}
      </Panel>

      {isShowOverlay && <Overlay imageUrl={getOverlayImageUrl()} />}
    </>
  );
};

export default Pages;
