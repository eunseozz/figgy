import { useRef } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import styled from "styled-components";

import useGlobalPortal from "@/hooks/useGlobalPortal";
import useOnClickOutSide from "@/hooks/useOnClickOutSide";

const ModalOverlay = ({ closeModal, children }) => {
  const modalRef = useRef(null);
  const portalContainer = useGlobalPortal();

  useOnClickOutSide(modalRef, closeModal);

  return (
    portalContainer &&
    createPortal(
      <BackScreeen>
        <ModalContainer ref={modalRef}>
          <CloseButton
            onClick={closeModal}
            title="닫기"
          >
            <IoCloseOutline />
          </CloseButton>
          {children}
        </ModalContainer>
      </BackScreeen>,
      portalContainer,
    )
  );
};

const BackScreeen = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10004;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  padding: 24px 20px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 430px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 22px;
  right: 24px;

  svg {
    font-size: 20px;
    color: #71717a;
  }
`;

export default ModalOverlay;
