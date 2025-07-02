import styled from "styled-components";

import ModalButton from "@/components/ModalButton";
import ModalHeader from "@/components/ModalHeader";

const ModalLayout = ({
  icon,
  title,
  text,
  children,
  onConfirm,
  onCancel,
  isConfirmDisabled,
}) => {
  return (
    <>
      <ModalHeader
        icon={icon}
        title={title}
        text={text}
      />
      {children && <ModalContent>{children}</ModalContent>}
      <ModalButton
        onConfirm={onConfirm}
        onCancel={onCancel}
        isConfirmDisabled={isConfirmDisabled}
      />
    </>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
`;

export default ModalLayout;
