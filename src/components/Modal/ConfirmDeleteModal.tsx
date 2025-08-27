import { MdErrorOutline } from "react-icons/md";
import type { MouseEventHandler, ReactNode } from "react";

import ModalOverlay from "@/components/Common/ModalOverlay";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";

type ConfirmDeleteModalProps = {
  title: string;
  text?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  title,
  text,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
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
