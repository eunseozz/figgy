import { useParams } from "react-router-dom";

import FrameTree from "@/components/FrameTree";
import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";
import { useCheckboxTree } from "@/hooks/useCheckboxTree";
import useFigmaTree from "@/hooks/useFigmaTree";

const SelectFrameModal = ({ closeModal, onConfirm }) => {
  const { fileKey } = useParams();
  const { tree } = useFigmaTree(fileKey);

  const { checkedMap, handleGroupToggle, handleFrameToggle, getCheckedIds } =
    useCheckboxTree();

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="불러올 프레임을 선택해주세요"
        text="아래 그룹과 프레임에서 원하는 항목만 골라서 불러올 수 있어요."
        onConfirm={() => {
          onConfirm(getCheckedIds());
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
