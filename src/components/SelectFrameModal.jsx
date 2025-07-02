import { FiFileText, FiFolder } from "react-icons/fi";
import styled from "styled-components";

import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";

const SelectFrameModal = ({ figmaTree, closeModal, onConfirm }) => {
  const renderTree = (nodes, depth = 0) =>
    nodes.map((node, i) => {
      if (node.type === "group") {
        return (
          <TreeGroup
            key={i}
            depth={depth}
          >
            <GroupHeader depth={depth}>
              <Checkbox />
              <FolderIcon />
              <GroupLabel>{node.name}</GroupLabel>
            </GroupHeader>
            {renderTree(node.children, depth + 1)}
          </TreeGroup>
        );
      }

      return (
        <TreeFrame
          key={i}
          depth={depth}
        >
          <Checkbox />
          <PageIcon />
          <FrameLabel>{node.name}</FrameLabel>
        </TreeFrame>
      );
    });

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="불러올 프레임을 선택해주세요"
        text="아래 그룹과 프레임에서 원하는 항목만 골라서 불러올 수 있어요."
        onConfirm={onConfirm}
        onCancel={closeModal}
      >
        <TreeWrapper>{renderTree(figmaTree)}</TreeWrapper>
      </ModalLayout>
    </ModalOverlay>
  );
};

const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: 4px 0;
  padding-left: ${({ depth }) => (depth === 0 ? 0 : depth * 24)}px;
`;

const TreeFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: ${({ depth }) => (depth === 0 ? 0 : depth * 24)}px;
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
