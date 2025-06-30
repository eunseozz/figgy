import { useState } from "react";

import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useFigmaFrames from "@/hooks/useFigmaFrames";

const Pages = () => {
  const pages = useFigmaFrames();
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [overlayImageUrl, setOverlayImageUrl] = useState("");

  const handleItemClick = (item) => {
    setIsShowOverlay(true);
    setOverlayImageUrl(item.imageUrl);
  };

  const pageGroups = [
    {
      title: "PC",
      minWidth: 1024,
      items: pages,
    },
    {
      title: "TABLET",
      minWidth: 768,
      items: pages,
    },
    {
      title: "MOBILE",
      minWidth: 0,
      items: pages,
    },
  ];

  return (
    <>
      <Panel
        isShowToolBar={true}
        primaryButton={{
          label: "폴더 추가하기",
          onClick: () => console.log("폴더 추가"),
        }}
      >
        {pageGroups.map((group, index) => (
          <PanelList
            key={index}
            title={group.title}
            items={group.items}
            onItemClick={handleItemClick}
            isToggle={true}
          />
        ))}
      </Panel>

      {isShowOverlay && <Overlay imageUrl={overlayImageUrl} />}
    </>
  );
};

export default Pages;
