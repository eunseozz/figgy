import React from "react";
import styled from "styled-components";

const Tooltip = ({ top, left, text }) => {
  if (top == null || left == null || !text) return null;

  return (
    <TooltipWrapper
      top={top}
      left={left}
    >
      {text}
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  padding: 6px 10px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  font-size: 13px;
  border-radius: 6px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 10000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export default Tooltip;
