import { createPortal } from "react-dom";
import styled from "styled-components";

import useGlobalPortal from "@/hooks/useGlobalPortal";

const Overlay = ({ imageUrl }) => {
  const portalContainer = useGlobalPortal();

  if (!portalContainer || !imageUrl) return null;

  return createPortal(
    <OverlayWrapper>
      <OverlayImage
        src={imageUrl}
        alt="Overlay"
      />
    </OverlayWrapper>,
    portalContainer,
  );
};

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  justify-content: center;
`;

const OverlayImage = styled.img`
  display: block;
  width: auto;
  max-width: none;
  height: auto;
  opacity: 0.3;
`;

export default Overlay;
