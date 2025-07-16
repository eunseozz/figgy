import styled from "styled-components";

const ViewportSize = ({ label = "PC" }) => {
  return (
    <Wrapper>
      <StatusDot />
      <Label>{label}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  padding: 6px 12px;
  background-color: #ffffff;
  color: #333333;
  font-size: 13px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10002;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const StatusDot = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: #2ecc71;
`;

const Label = styled.span`
  font-weight: 500;
`;

export default ViewportSize;
