import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Panel from "@/components/Common/Panel/Panel";
import PanelList from "@/components/Common/Panel/PanelList";
import Spinner from "@/components/Common/Spinner";
import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import FolderSettingsModal from "@/components/Modal/FolderSettingsModal";
import SelectFrameModal from "@/components/Modal/SelectFrameModal/SelectFrameModal";
import Overlay from "@/components/Overlay";
import { SETTING_MODE } from "@/constants/folderSettingModes";
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
  const updatePageFolder = useProjectStore((state) => state.updatePageFolder);

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

  const [openModalKey, setOpenModalKey] = useState(null);
  const handleCloseModal = () => setOpenModalKey(null);

  const [isLoading, setIsLoading] = useState(false);
  const [targetFolder, setTargetFolder] = useState(null);

  const { mutate } = useSaveFigmaFrames({
    onSuccessAfterSave: () => {
      setIsLoading(false);
    },
  });

  if (!project) return null;

  const selectedPages = project.activePageMap ?? {};

  const modals = [
    {
      key: "selectFrame",
      Component: SelectFrameModal,
      isOpen: openModalKey === "selectFrame",
      props: {
        closeModal: handleCloseModal,
        onConfirm: (frames) => {
          handleCloseModal();
          setIsLoading(true);
          mutate(frames);
        },
      },
    },
    {
      key: "updateFolder",
      Component: FolderSettingsModal,
      isOpen: openModalKey === "updateFolder",
      props: {
        closeModal: handleCloseModal,
        onConfirm: (newTitle, newWidth) => {
          updatePageFolder(
            project.projectId,
            targetFolder?.minWidth,
            newTitle,
            newWidth,
          );
          handleCloseModal();
        },
        name: targetFolder?.title,
        width: targetFolder?.minWidth,
        mode: SETTING_MODE.EDIT,
      },
    },
  ];

  return (
    <>
      <Panel
        isShowToolBar={true}
        addButton={{
          text: "불러올 프레임을 선택해보세요",
          onClick: () => setOpenModalKey("selectFrame"),
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
              titleExtras={
                <>
                  <Label
                    onClick={() => {
                      setOpenModalKey("updateFolder");
                      setTargetFolder(group);
                    }}
                  >
                    <RiEdit2Fill />
                    {group.minWidth}
                  </Label>
                </>
              }
              labelText={group.minWidth}
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

      {modals.map((modal) => (
        <SuspenseWrapper>
          {modal.isOpen ? (
            <modal.Component
              key={modal.key}
              {...modal.props}
            />
          ) : null}
        </SuspenseWrapper>
      ))}

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

const Label = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
  background-color: #6ebbbf;
  color: #fff;
  border-radius: 3px;
  font-size: 11px;
  line-height: 18px;
  height: 18px;
`;

export default Pages;
