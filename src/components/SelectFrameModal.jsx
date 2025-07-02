import { FiFileText } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getFigmaImageUrls } from "@/api/figma";
import FrameTree from "@/components/FrameTree";
import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";
import useFigmaTree from "@/hooks/queries/useFigmaTree";
import { useCheckboxTree } from "@/hooks/useCheckboxTree";
import useProjectStore from "@/stores/useProjectStore";

const SelectFrameModal = ({ closeModal }) => {
  const { fileKey } = useParams();
  const updateProjects = useProjectStore((state) => state.updateProjects);

  const { data: tree } = useFigmaTree(fileKey);
  const { checkedMap, handleGroupToggle, handleFrameToggle, getCheckedFrames } =
    useCheckboxTree();

  const selectedFrames = getCheckedFrames(tree);

  const handleConfirm = async () => {
    if (!getCheckedFrames.length) return;

    if (fileKey && selectedFrames?.length > 0) {
      const result = await getFigmaImageUrls(fileKey, selectedFrames);

      const decoratedPages = result.map((item) => ({
        ...item,
        icon: <FiFileText />,
      }));

      const initialGroups = [
        { title: "PC", minWidth: 1024, items: decoratedPages },
        { title: "TABLET", minWidth: 768, items: [] },
        { title: "MOBILE", minWidth: 0, items: [] },
      ];

      updateProjects(fileKey, initialGroups);
      closeModal();
    }
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="불러올 프레임을 선택해주세요"
        text="아래 그룹과 프레임에서 원하는 항목만 골라서 불러올 수 있어요."
        isConfirmDisabled={selectedFrames.length === 0}
        onConfirm={handleConfirm}
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
