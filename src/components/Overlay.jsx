import styled from "styled-components";

import { SCALE_MODE } from "@/constants/hudOptions";
import useHUDStore from "@/stores/useHUDStore";

const Overlay = ({ imageUrl, imgRef }) => {
  const scaleMode = useHUDStore((state) => state.scaleMode);
  const opacity = useHUDStore((state) => state.opacity);

  if (!imageUrl) return null;

  const isFitMode = scaleMode === SCALE_MODE.FIT;

  return (
    <OverlayWrapper>
      <OverlayImage
        ref={imgRef}
        src={imageUrl}
        alt="Overlay"
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
  z-index: 10000;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
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
