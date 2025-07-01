import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components";

import OpacityControl from "@/components/OpacityControl";
import ToggleOptionGroup from "@/components/ToggleOptionGroup";
import { toggleGroups } from "@/constants/hudOptions";
import useHUDStore from "@/stores/useHUDStore";

const OverlayHUD = () => {
  const alignment = useHUDStore((state) => state.alignment);
  const scaleMode = useHUDStore((state) => state.scaleMode);
  const viewMode = useHUDStore((state) => state.viewMode);
  const opacity = useHUDStore((state) => state.opacity);

  const { setAlignment, setScaleMode, setViewMode, setOpacity } =
    useHUDStore.getState();

  const [isOpen, setIsOpen] = useState(false);

  const stateMap = { alignment, scaleMode, viewMode };
  const setStateMap = {
    alignment: setAlignment,
    scaleMode: setScaleMode,
    viewMode: setViewMode,
  };

  return (
    <Container>
      <IconWrapper onClick={() => setIsOpen((prev) => !prev)}>
        <FiSettings />
      </IconWrapper>

      {isOpen && (
        <HUDContainer>
          <HUDWrapper>
            {toggleGroups.map(({ label, stateKey, options }) => (
              <ToggleOptionGroup
                key={stateKey}
                label={label}
                value={stateMap[stateKey]}
                onChange={setStateMap[stateKey]}
                options={options}
              />
            ))}
            <OpacityControl
              opacity={opacity}
              setOpacity={setOpacity}
            />
          </HUDWrapper>
        </HUDContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 10000;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #6dbbbf;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    font-size: 20px;
  }
`;

const HUDContainer = styled.div`
  margin-top: 12px;
  width: 230px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const HUDWrapper = styled.div`
  background-color: #ffffff;
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

export default OverlayHUD;
