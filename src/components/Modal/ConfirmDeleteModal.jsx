import { MdErrorOutline } from "react-icons/md";

import ModalOverlay from "@/components/Common/ModalOverlay";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";

const ConfirmDeleteModal = ({ title, text, onCancel, onConfirm }) => {
  return (
    <ModalOverlay closeModal={onCancel}>
      <ModalLayout
        icon={<MdErrorOutline style={{ color: "#ef4444" }} />}
        title={title}
        text={text}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </ModalOverlay>
  );
};

export default ConfirmDeleteModal;
