import { FiPlusCircle } from "react-icons/fi";
import styled from "styled-components";

const GrayDashAddButton = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      $isClickable={!!onClick}
    >
      <FiPlusCircle />
      <span>{text}</span>
    </Button>
  );
};

const Button = styled.button`
  display: block;
  width: 100%;
  height: 44px;
  border: 2px dashed #ddd;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 12px;
  margin-top: 8px;
  gap: 4px;
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};

  &:hover {
    background: ${({ $isClickable }) =>
      $isClickable ? "#f9f9f9" : "transparent"};
  }

  svg {
    font-size: 14px;
  }

  span {
    transform: translateY(0.5px);
  }
`;

export default GrayDashAddButton;
