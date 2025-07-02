import { useParams } from "react-router-dom";

import FrameTree from "@/components/FrameTree";
import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";
import useFigmaTree from "@/hooks/queries/useFigmaTree";
import { useCheckboxTree } from "@/hooks/useCheckboxTree";

const SelectFrameModal = ({ closeModal, onConfirm }) => {
  const { fileKey } = useParams();

  const { data: tree } = useFigmaTree(fileKey);
  const { checkedMap, handleGroupToggle, handleFrameToggle, getCheckedFrames } =
    useCheckboxTree();

  const selectedFrames = getCheckedFrames(tree);

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="불러올 프레임을 선택해주세요"
        text="아래 그룹과 프레임에서 원하는 항목만 골라서 불러올 수 있어요."
        isConfirmDisabled={selectedFrames.length === 0}
        onConfirm={() => {
          if (selectedFrames.length === 0) return;
          onConfirm(selectedFrames);
        }}
      >
        <FrameTree
          nodes={tree}
          checkedMap={checkedMap}
          onGroupToggle={handleGroupToggle}
          onFrameToggle={handleFrameToggle}
        />
      </ModalLayout>
    </ModalOverlay>
  );
};

export default SelectFrameModal;
