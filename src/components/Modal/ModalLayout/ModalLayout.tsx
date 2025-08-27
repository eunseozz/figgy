import styled from "styled-components";
import type { ReactNode, MouseEventHandler } from "react";

import ModalButton from "@/components/Modal/ModalLayout/ModalButton";
import ModalHeader from "@/components/Modal/ModalLayout/ModalHeader";

type ModalLayoutProps = {
  icon?: ReactNode;
  title: string;
  text?: string;
  children?: ReactNode;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  isConfirmDisabled?: boolean;
};

const ModalLayout = ({
  icon,
  title,
  text,
  children,
  onConfirm,
  onCancel,
  isConfirmDisabled,
}: ModalLayoutProps) => {
  const isShowButton = !!onConfirm || !!onCancel;

  return (
    <>
      <ModalHeader
        icon={icon}
        title={title}
        text={text}
      />
      {children && <ModalContent>{children}</ModalContent>}
      {isShowButton && (
        <ModalButton
          onConfirm={onConfirm!}
          onCancel={onCancel}
          isConfirmDisabled={isConfirmDisabled}
        />
      )}
    </>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export default ModalLayout;
