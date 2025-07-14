import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { RiEdit2Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Panel from "@/components/Common/Panel/Panel";
import PanelList from "@/components/Common/Panel/PanelList";
import Spinner from "@/components/Common/Spinner";
import SuspenseWrapper from "@/components/Common/SuspenseWrapper";
import ConfirmDeleteModal from "@/components/Modal/ConfirmDeleteModal";
import FolderSettingsModal from "@/components/Modal/FolderSettingsModal";
import SelectFrameModal from "@/components/Modal/SelectFrameModal/SelectFrameModal";
import Overlay from "@/components/Overlay";
import { SETTING_MODE } from "@/constants/folderSettingModes";
import useSaveFigmaFrames from "@/hooks/queries/useSaveFigmaFrames";
import useDomClickComparator from "@/hooks/useDomClickComparator";
import useDragAndDropPages from "@/hooks/useDragAndDropPages";
import useFigmaFrameData from "@/hooks/useFigmaFrameData";
import useOverlayManager from "@/hooks/useOverlayManager";
import useHUDStore from "@/stores/useHUDStore";
import useProjectStore from "@/stores/useProjectStore";
import { selectedProject } from "@/utils/project";

const Pages = () => {
  const { fileKey } = useParams();
  const project = useProjectStore(selectedProject(fileKey));
  const deletePage = useProjectStore((state) => state.deletePage);
  const updatePageFolder = useProjectStore((state) => state.updatePageFolder);
  const deletePageFolder = useProjectStore((state) => state.deletePageFolder);
  const isShowOverlay = useHUDStore((state) => state.isShowOverlay);

  const { handleDragStart, handleDrop } = useDragAndDropPages();
  const { handleItemClick, getOverlayNode } = useOverlayManager();

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
    {
      key: "delete",
      Component: ConfirmDeleteModal,
      isOpen: openModalKey === "delete",
      props: {
        title: "페이지 폴더를 삭제할까요?",
        text: "삭제하면 이 폴더 안의 모든 프레임이 함께 사라지고 복구할 수 없어요.",
        onCancel: handleCloseModal,
        onConfirm: () => {
          deletePageFolder(project.projectId, targetFolder?.minWidth);
          handleCloseModal();
        },
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
                <TitleExtraWrap>
                  <Label
                    onClick={() => {
                      setOpenModalKey("updateFolder");
                      setTargetFolder(group);
                    }}
                  >
                    <RiEdit2Fill />
                    {group.minWidth}
                  </Label>
                  <DeleteButton
                    className="delete-icon"
                    onClick={() => {
                      setTargetFolder(group);
                      setOpenModalKey("delete");
                    }}
                  >
                    <IoMdClose />
                  </DeleteButton>
                </TitleExtraWrap>
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

const TitleExtraWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover button {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Label = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 4px;
  background-color: #f0f0f0;
  color: #aaa;
  border-radius: 3px;
  font-size: 11px;
  line-height: 18px;
  height: 18px;
`;

const DeleteButton = styled.button`
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    font-size: 14px;
    color: #aaa;
  }

  &:hover svg {
    color: #e76e6e;
  }
`;

export default Pages;
