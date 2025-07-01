import { useRef } from "react";
import styled from "styled-components";

import { ALIGNMENT, SCALE_MODE } from "@/constants/hudOptions";
import useHUDStore from "@/stores/useHUDStore";

const Overlay = ({ imageUrl }) => {
  const alignment = useHUDStore((state) => state.alignment);
  const scaleMode = useHUDStore((state) => state.scaleMode);

  const imgRef = useRef(null);

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
      />
    </OverlayWrapper>
  );
};

const OverlayWrapper = styled.div`
  width: 100%;
  height: auto;
  pointer-events: none;

  ${({ $isCenter, $isFitMode }) =>
    $isCenter &&
    !$isFitMode &&
    `
    display: flex;
    justify-content: center;
  `}
`;

const OverlayImage = styled.img`
  display: block;
  pointer-events: none;
  user-select: none;

  width: ${({ $isFitMode }) => ($isFitMode ? "100%" : "auto")};
  height: auto;
  max-width: none;
  opacity: 0.3;
`;

export default Overlay;
