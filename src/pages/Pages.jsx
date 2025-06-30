import { useState } from "react";

import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useFigmaFrames from "@/hooks/useFigmaFrames";

const Pages = () => {
  const pages = useFigmaFrames();
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [selectedPages, setSelectedPages] = useState({});

  const pageGroups = [
    {
      title: "PC",
      minWidth: 1024,
      items: pages,
    },
    {
      title: "TABLET",
      minWidth: 768,
      items: [],
    },
    {
      title: "MOBILE",
      minWidth: 0,
      items: [],
    },
  ];

  const handleItemClick = (clickedItem) => {
    const group = pageGroups.find((group) =>
      group.items.some((groupItem) => groupItem.id === clickedItem.id),
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

  return (
    <>
      <Panel
        isShowToolBar={true}
        primaryButton={{
          label: "폴더 추가하기",
          onClick: () => console.log("폴더 추가"),
        }}
      >
        {pageGroups.map((group, index) => {
          const selectedId = selectedPages[group.minWidth]?.id;
          const decoratedItems = group.items.map((item) => ({
            ...item,
            isActive: item.id === selectedId,
          }));

          return (
            <PanelList
              key={index}
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
