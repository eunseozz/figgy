import styled from "styled-components";

import useHUDStore from "@/stores/useHUDStore";
import type { HighlightBoxProps } from "@/stores/useFeedbackStore";

const HighlightBox = ({
  top,
  left,
  width,
  height,
  isMatched,
}: HighlightBoxProps) => {
  const borderStyle = useHUDStore((state) => state.borderStyle as string);
  const matchBorderColor = useHUDStore((state) => state.borderColor as string);
  const warnBorderColor = useHUDStore(
    (state) => state.warnBorderColor as string,
  );
  const matchBgColor = useHUDStore((state) => state.bgColor as string);
  const warnBgColor = useHUDStore((state) => state.warnBgColor as string);

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

const Box = styled.div<{
  $borderStyle: string;
  $borderColor: string;
  $bgColor: string;
}>`
  position: absolute;
  pointer-events: none;
  z-index: 10001;
  box-sizing: border-box;
  border: 3px ${({ $borderStyle }) => $borderStyle}
    ${({ $borderColor }) => $borderColor};
  background-color: ${({ $bgColor }) => $bgColor};
`;

export default HighlightBox;
