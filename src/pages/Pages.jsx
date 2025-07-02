import { useState } from "react";
import { useParams } from "react-router-dom";

import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import SelectFrameModal from "@/components/SelectFrameModal";
import useDragAndDropPages from "@/hooks/useDragAndDropPages";
import useFigmaImagePages from "@/hooks/useFigmaImagePages";
import useInitPageGroups from "@/hooks/useInitPageGroups";
import useOverlayManager from "@/hooks/useOverlayManager";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const figmaTree = [
  {
    name: "Main Section",
    type: "group",
    children: [
      { name: "Hero", type: "frame" },
      {
        name: "Sub Section",
        type: "group",
        children: [{ name: "Pricing", type: "frame" }],
      },
    ],
  },
];

const Pages = () => {
  const { fileKey } = useParams();

  const project = useProjectStore(selectedProject(fileKey));
  const pages = useFigmaImagePages(fileKey);

  useInitPageGroups(pages);

  const { handleDragStart, handleDrop } = useDragAndDropPages();
  const { isShowOverlay, handleItemClick, selectedPages, getOverlayImageUrl } =
    useOverlayManager();

  const [isShowModal, setIsShowModal] = useState(false);

  if (!project) return null;

  return (
    <>
      <Panel
        isShowToolBar={true}
        addButton={{
          text: "불러올 프레임을 선택해보세요",
          onClick: () => setIsShowModal(true),
        }}
      >
        {project?.pages.map((group) => {
          const selectedId = selectedPages[group.minWidth]?.id ?? null;
          const markedItems = group.items.map((item) => ({
            ...item,
            isActive: item.id === selectedId,
          }));

          return (
            <PanelList
              key={group.title}
              title={group.title}
              items={markedItems}
              onItemClick={handleItemClick}
              isToggle={true}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, group.minWidth)}
              emptyText="프레임을 끌어다 놓으면 여기에 추가돼요"
            />
          );
        })}
      </Panel>

      {isShowModal && (
        <SelectFrameModal
          figmaTree={figmaTree}
          closeModal={() => setIsShowModal(false)}
          onConfirm={() => setIsShowModal(false)}
        />
      )}

      {isShowOverlay && <Overlay imageUrl={getOverlayImageUrl()} />}
    </>
  );
};

export default Pages;
