import styled, { keyframes } from "styled-components";

const Spinner = ({ size = 32 }) => {
  return (
    <Overlay>
      <StyledSpinner size={size} />
    </Overlay>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20000;
  pointer-events: all;
`;

const StyledSpinner = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => size / 8}px solid #e0e0e0;
  border-top: ${({ size }) => size / 8}px solid #6dbbbf;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;
