import styled from "styled-components";

const Overlay = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <OverlayWrapper>
      <OverlayImage
        src={imageUrl}
        alt="Overlay"
      />
    </OverlayWrapper>
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
