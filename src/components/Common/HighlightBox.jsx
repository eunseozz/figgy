import React from "react";
import styled from "styled-components";

const HighlightBox = ({ top, left, width, height, isMatched }) => {
  if (top == null || left == null || width == null || height == null)
    return null;

  return (
    <Box
      style={{ top, left, width, height }}
      $isMatched={isMatched}
    />
  );
};

const Box = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10000;
  box-sizing: border-box;
  border: 3px dashed ${({ $isMatched }) => ($isMatched ? "green" : "red")};
`;

export default HighlightBox;
