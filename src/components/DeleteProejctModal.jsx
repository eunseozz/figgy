import { MdErrorOutline } from "react-icons/md";

import ModalLayout from "@/components/ModalLayout";
import ModalOverlay from "@/components/ModalOverlay";

const DeleteProjectModal = ({ onCancel, onConfirm }) => {
  return (
    <ModalOverlay closeModal={onCancel}>
      <ModalLayout
        icon={<MdErrorOutline style={{ color: "#ef4444" }} />}
        title="프로젝트 삭제를 진행할게요"
        text="삭제하면 이 프로젝트의 모든 정보가 사라지고 복구할 수 없어요."
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </ModalOverlay>
  );
};

export default DeleteProjectModal;
