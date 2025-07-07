import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import styled from "styled-components";

import OpacityControl from "@/components/HUD/OpacityControl";
import ShortcutBadge from "@/components/HUD/ShortcutBadge";
import ToggleOptionGroup from "@/components/HUD/ToggleOptionGroup";
import ShortcutModal from "@/components/Modal/ShortcutModal";
import { toggleGroups } from "@/constants/hudOptions";
import useHUDStore from "@/stores/useHUDStore";
import { getAssetUrl } from "@/utils/chrome";

const OverlayHUD = () => {
  const alignment = useHUDStore((state) => state.alignment);
  const scaleMode = useHUDStore((state) => state.scaleMode);
  const viewMode = useHUDStore((state) => state.viewMode);
  const opacity = useHUDStore((state) => state.opacity);
  const isShowOverlay = useHUDStore((state) => state.isShowOverlay);

  const isOpenPanel = useHUDStore((state) => state.isOpenPanel);
  const setIsOpenPanel = useHUDStore((state) => state.setIsOpenPanel);

  const [isShowShortcutModal, setIsShowShortcutModal] = useState(false);

  const {
    setAlignment,
    setScaleMode,
    setViewMode,
    setOpacity,
    setIsShowOverlay,
  } = useHUDStore.getState();

  const [isOpen, setIsOpen] = useState(false);

  const stateMap = { alignment, scaleMode, viewMode, isShowOverlay };
  const setStateMap = {
    alignment: setAlignment,
    scaleMode: setScaleMode,
    viewMode: setViewMode,
    isShowOverlay: setIsShowOverlay,
  };

  const logoImage = getAssetUrl("images/logos/size_48.png");

  return (
    <Container>
      <HUDBox>
        <IconColumn>
          <IconWrapper
            $isActive={isOpenPanel}
            onClick={() => setIsOpenPanel(!isOpenPanel)}
          >
            <LogoImage src={logoImage} />
          </IconWrapper>
          <IconWrapper
            $isActive={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <IoMdSettings />
          </IconWrapper>
        </IconColumn>

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
      </HUDBox>
      {isShowShortcutModal && (
        <ShortcutModal closeModal={() => setIsShowShortcutModal(false)} />
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

const HUDBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const IconColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const LogoImage = styled.img`
  width: 22px;
`;

const HUDContainer = styled.div`
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
