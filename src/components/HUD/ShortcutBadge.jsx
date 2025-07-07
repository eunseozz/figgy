import styled from "styled-components";

const ShortcutBadge = ({ currentKey, onClick }) => {
  return <BadgeButton onClick={onClick}>⌨ {currentKey}</BadgeButton>;
};

const BadgeButton = styled.button`
  font-size: 12px;
  background-color: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 6px;
  padding: 2px 6px;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export default ShortcutBadge;
