import styled from "styled-components";

const HUDToolboxItem = ({ icon, isActive, onClick, children }) => {
  return (
    <IconGroup>
      <IconWrapper
        $isActive={isActive}
        onClick={onClick}
      >
        {icon}
      </IconWrapper>
      {isActive && children && (
        <HUDContainer>
          <HUDWrapper>{children}</HUDWrapper>
        </HUDContainer>
      )}
    </IconGroup>
  );
};

const IconGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ $isActive }) => ($isActive ? "#ede8fe" : "#ffffff")};
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #6dbbbf;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    font-size: 24px;
  }
`;

const HUDContainer = styled.div`
  position: absolute;
  top: 4px;
  left: 54px;
  width: 230px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #ffffff;
`;

const HUDWrapper = styled.div`
  padding: 16px 18px;
  color: #111827;
  display: flex;
  flex-direction: column;
  gap: 20px;

  animation: revealHUD 0.3s ease-out forwards;
  clip-path: inset(0 100% 100% 0);

  @keyframes revealHUD {
    to {
      clip-path: inset(0 0 0 0);
    }
  }
`;

export default HUDToolboxItem;
