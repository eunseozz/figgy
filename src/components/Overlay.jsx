import styled from "styled-components";

import { ALIGNMENT, SCALE_MODE } from "@/constants/hudOptions";
import useDomFigmaComparator from "@/hooks/useDomFigmaComparator";
import useHUDStore from "@/stores/useHUDStore";

const Overlay = ({ imageUrl, frameNodeId }) => {
  const alignment = useHUDStore((state) => state.alignment);
  const scaleMode = useHUDStore((state) => state.scaleMode);
  const opacity = useHUDStore((state) => state.opacity);

  const { imgRef } = useDomFigmaComparator({
    frameNodeId,
  });

  if (!imageUrl) return null;

  const isFitMode = scaleMode === SCALE_MODE.FIT;
  const isCenter = alignment === ALIGNMENT.CENTER;

  return (
    <OverlayWrapper
      $isCenter={isCenter}
      $isFitMode={isFitMode}
    >
      <OverlayImage
        ref={imgRef}
        src={imageUrl}
        alt="Overlay"
        $isCenter={isCenter}
        $isFitMode={isFitMode}
        $opacity={opacity}
      />
    </OverlayWrapper>
  );
};

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 9999;

  ${({ $isCenter, $isFitMode }) =>
    $isCenter &&
    !$isFitMode &&
    `
    display: flex;
    justify-content: center;
    overflow-x: hidden;
  `}
`;

const OverlayImage = styled.img`
  display: block;
  pointer-events: none;
  user-select: none;

  width: ${({ $isFitMode }) => ($isFitMode ? "100%" : "auto")};
  height: auto;
  max-width: none;
  opacity: ${({ $opacity }) => $opacity};
`;

export default Overlay;
