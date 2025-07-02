import styled from "styled-components";

const ModalButton = ({
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}) => {
  const isDualButton = !!onCancel;

  return (
    <ButtonWrapper $isDualButton={isDualButton}>
      {isDualButton && (
        <CancelButton onClick={onCancel}>{cancelText}</CancelButton>
      )}
      <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: ${({ $isDualButton }) =>
    $isDualButton ? "space-between" : "center"};
  gap: 12px;
  margin-top: 20px;
  padding-top: 20px;
`;

const BaseButton = styled.button`
  font-size: 14px;
  border-radius: 6px;
  height: 38px;
  padding: 0 24px;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
`;

const ConfirmButton = styled(BaseButton)`
  background-color: #6dbbbf;
  color: white;
  border: none;
`;

const CancelButton = styled(BaseButton)`
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
`;

export default ModalButton;
