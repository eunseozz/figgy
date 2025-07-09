import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { useParams } from "react-router-dom";

import Panel from "@/components/Common/Panel/Panel";
import PanelList from "@/components/Common/Panel/PanelList";
import Spinner from "@/components/Common/Spinner";
import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import SelectFrameModal from "@/components/Modal/SelectFrameModal/SelectFrameModal";
import Overlay from "@/components/Overlay";
import useSaveFigmaFrames from "@/hooks/queries/useSaveFigmaFrames";
import useDomClickComparator from "@/hooks/useDomClickComparator";
import useDragAndDropPages from "@/hooks/useDragAndDropPages";
import useFigmaFrameData from "@/hooks/useFigmaFrameData";
import useOverlayManager from "@/hooks/useOverlayManager";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const Pages = () => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));
  const deletePage = useProjectStore((state) => state.deletePage);

  const { handleDragStart, handleDrop } = useDragAndDropPages();
  const { isShowOverlay, handleItemClick, getOverlayNode } =
    useOverlayManager();

  const overlayNode = getOverlayNode();

  const { figmaNodes, imgRef, figmaOriginalWidthRef, frameOffsetRef } =
    useFigmaFrameData(overlayNode?.nodeId);

  useDomClickComparator({
    imgRef,
    figmaNodes,
    figmaOriginalWidthRef,
    frameOffsetRef,
  });

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

  const selectedPages = project.activePageMap ?? {};

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
            icon: <FiFileText />,
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
              onDeleteClick={(item) => {
                deletePage(fileKey, item.id);
              }}
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
          imgRef={imgRef}
        />
      )}
    </>
  );
};

export default Pages;
