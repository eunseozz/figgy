import { FiFileText, FiFolder } from "react-icons/fi";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";
import useFigmaTree from "@/hooks/useFigmaTree";

const SelectFrameModal = ({ closeModal, onConfirm }) => {
  const { fileKey } = useParams();
  const { tree } = useFigmaTree(fileKey);

  const renderTree = (nodes, depth = 0) => {
    return nodes.map((node, index) => {
      if (node.type === "group") {
        return (
          <TreeGroup key={index}>
            <GroupHeader $depth={depth}>
              <Checkbox />
              <FolderIcon />
              <GroupLabel>{node.name}</GroupLabel>
            </GroupHeader>

            <TreeChildrenWrapper>
              {renderTree(node.children, depth + 1)}
            </TreeChildrenWrapper>
          </TreeGroup>
        );
      }

      return (
        <TreeFrame
          key={index}
          $depth={depth}
        >
          <Checkbox />
          <PageIcon />
          <FrameLabel>{node.name}</FrameLabel>
        </TreeFrame>
      );
    });
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="불러올 프레임을 선택해주세요"
        text="아래 그룹과 프레임에서 원하는 항목만 골라서 불러올 수 있어요."
        onConfirm={onConfirm}
      >
        <TreeWrapper>{renderTree(tree)}</TreeWrapper>
      </ModalLayout>
    </ModalOverlay>
  );
};

const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const TreeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
  padding-left: ${({ $depth }) => ($depth === 0 ? 0 : $depth * 24)}px;
`;

const TreeChildrenWrapper = styled.div`
  max-height: 100px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const TreeFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: ${({ $depth }) => ($depth === 0 ? 0 : $depth * 24)}px;
`;

const FolderIcon = styled(FiFolder)`
  font-size: 16px;
  color: #6dbbbf;
  fill: #6dbbbf;
`;

const PageIcon = styled(FiFileText)`
  font-size: 16px;
  color: #777;
`;

const GroupLabel = styled.span`
  font-size: 14px;
`;

const FrameLabel = styled.div`
  font-size: 14px;
  color: #777;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  accent-color: #16a1b7;
`;

export default SelectFrameModal;
