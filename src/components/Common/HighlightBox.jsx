import styled from "styled-components";

import useHUDStore from "@/stores/useHUDStore";

const HighlightBox = ({ top, left, width, height, isMatched }) => {
  const borderStyle = useHUDStore((state) => state.borderStyle);
  const matchBorderColor = useHUDStore((state) => state.borderColor);
  const warnBorderColor = useHUDStore((state) => state.warnBorderColor);
  const matchBgColor = useHUDStore((state) => state.bgColor);
  const warnBgColor = useHUDStore((state) => state.warnBgColor);

  if (top == null || left == null || width == null || height == null)
    return null;

  return (
    <Box
      style={{ top, left, width, height }}
      $borderStyle={borderStyle}
      $borderColor={isMatched ? matchBorderColor : warnBorderColor}
      $bgColor={isMatched ? matchBgColor : warnBgColor}
    />
  );
};

const Box = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10001;
  box-sizing: border-box;
  border: 3px ${({ $borderStyle }) => $borderStyle}
    ${({ $borderColor }) => $borderColor};
  background-color: ${({ $bgColor }) => $bgColor};
`;

export default HighlightBox;
