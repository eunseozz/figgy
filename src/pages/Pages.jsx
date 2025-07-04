import { useState } from "react";
import { useParams } from "react-router-dom";

import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import SelectFrameModal from "@/components/SelectFrameModal";
import Spinner from "@/components/Spinner";
import SuspenseWrapper from "@/components/SuspenseWrapper";
import useSaveFigmaFrames from "@/hooks/queries/useSaveFigmaFrames";
import useDragAndDropPages from "@/hooks/useDragAndDropPages";
import useOverlayManager from "@/hooks/useOverlayManager";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const Pages = () => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));

  const { handleDragStart, handleDrop } = useDragAndDropPages();
  const { isShowOverlay, handleItemClick, selectedPages, getOverlayNode } =
    useOverlayManager();

  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useSaveFigmaFrames({
    onSuccessAfterSave: () => {
      setIsLoading(false);
    },
  });

  const handleConfirmFrames = (frames) => {
    setIsShowModal(false);
    setIsLoading(true);
    mutate(frames);
  };

  if (!project) return null;

  const overlayNode = getOverlayNode();

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
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, group.minWidth)}
              emptyText="프레임을 끌어다 놓으면 여기에 추가돼요"
            />
          );
        })}
      </Panel>

      {isShowModal && (
        <SuspenseWrapper>
          <SelectFrameModal
            closeModal={() => setIsShowModal(false)}
            onConfirm={handleConfirmFrames}
          />
        </SuspenseWrapper>
      )}

      {isLoading && <Spinner />}

      {isShowOverlay && (
        <Overlay
          imageUrl={overlayNode?.imageUrl}
          frameNodeId={overlayNode?.nodeId}
        />
      )}
    </>
  );
};

export default Pages;
