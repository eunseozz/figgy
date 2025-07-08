import styled from "styled-components";

const ShortcutBadge = ({ currentKey = "K", onClick }) => {
  return (
    <>
      단축키: <Keycap onClick={onClick}>{currentKey}</Keycap>
    </>
  );
};

const Keycap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  box-shadow: inset 0 -1px 0 #e5e7eb;
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  margin-left: 2px;
`;

export default ShortcutBadge;
