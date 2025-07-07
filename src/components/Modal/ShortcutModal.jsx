import styled from "styled-components";

import ModalOverlay from "@/components/Common/ModalOverlay";
import ModalLayout from "@/components/Modal/ModalLayout/ModalLayout";

const ShortcutModal = ({ closeModal }) => {
  const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <ModalOverlay closeModal={closeModal}>
      <ModalLayout
        title="단축키를 선택해볼까요?"
        text="원하는 키를 누르거나 클릭해서 단축키로 설정할 수 있어요."
      >
        <KeyboardContainer>
          {KEYBOARD_ROWS.map((row, i) => (
            <KeyboardRow key={i}>
              {row.map((key) => (
                <KeyButton
                  key={key}
                  onClick={() => console.log("key 입력")}
                >
                  {key}
                </KeyButton>
              ))}
            </KeyboardRow>
          ))}
        </KeyboardContainer>
      </ModalLayout>
    </ModalOverlay>
  );
};

const KeyboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const KeyboardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const KeyButton = styled.button`
  padding: 8px 12px;
  min-width: 40px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #6dbbbf;
    color: white;
  }
`;

export default ShortcutModal;
