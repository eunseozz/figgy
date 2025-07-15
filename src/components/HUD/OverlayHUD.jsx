import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { TbMoodEdit } from "react-icons/tb";
import styled from "styled-components";

import OpacityControl from "@/components/HUD/OpacityControl";
import ToggleOptionGroup from "@/components/HUD/ToggleOptionGroup";
import ShortcutModal from "@/components/Modal/ShortcutModal";
import { toggleGroups, VIEW_MODE } from "@/constants/hudOptions";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import { getAssetUrl } from "@/utils/chrome";

const TOOL_BOX_KEY = {
  SETTING: "setting",
  CUSTOM: "custom",
};

const OverlayHUD = () => {
  const alignment = useHUDStore((state) => state.alignment);
  const scaleMode = useHUDStore((state) => state.scaleMode);
  const viewMode = useHUDStore((state) => state.viewMode);
  const opacity = useHUDStore((state) => state.opacity);
  const isShowOverlay = useHUDStore((state) => state.isShowOverlay);
  const showOverlayShortcutKey = useHUDStore(
    (state) => state.showOverlayShortcutKey,
  );

  const clearFeedback = useFeedbackStore((state) => state.clearFeedback);

  const isOpenPanel = useHUDStore((state) => state.isOpenPanel);
  const setIsOpenPanel = useHUDStore((state) => state.setIsOpenPanel);

  const [isShowShortcutModal, setIsShowShortcutModal] = useState(false);
  const [openToolboxKey, setOpenToolboxKey] = useState(null);

  const {
    setAlignment,
    setScaleMode,
    setViewMode,
    setOpacity,
    setIsShowOverlay,
  } = useHUDStore.getState();

  const stateMap = { alignment, scaleMode, viewMode, isShowOverlay };
  const setStateMap = {
    alignment: setAlignment,
    scaleMode: setScaleMode,
    viewMode: setViewMode,
    isShowOverlay: setIsShowOverlay,
  };

  useEffect(() => {
    const shouldClearFeedback = viewMode !== VIEW_MODE.DIFF || !isShowOverlay;

    if (shouldClearFeedback) {
      clearFeedback();
    }
  }, [viewMode, isShowOverlay]);

  const logoImage = getAssetUrl("images/logos/size_48.png");

  const handleToggleToolBox = (key) => {
    setOpenToolboxKey((prevKey) => (prevKey === key ? null : key));
  };

  return (
    <Container>
      <HUDBox>
        <IconGroup>
          <IconWrapper
            $isActive={isOpenPanel}
            onClick={() => setIsOpenPanel(!isOpenPanel)}
          >
            <LogoImage src={logoImage} />
          </IconWrapper>
        </IconGroup>

        <IconGroup>
          <IconWrapper
            $isActive={openToolboxKey === TOOL_BOX_KEY.SETTING}
            onClick={() => handleToggleToolBox(TOOL_BOX_KEY.SETTING)}
          >
            <IoMdSettings />
          </IconWrapper>

          {openToolboxKey === TOOL_BOX_KEY.SETTING && (
            <HUDContainer>
              <HUDWrapper>
                {toggleGroups.map(({ label, stateKey, options, rightSlot }) => (
                  <ToggleOptionGroup
                    key={stateKey}
                    label={label}
                    value={stateMap[stateKey]}
                    onChange={setStateMap[stateKey]}
                    options={options}
                    rightSlot={rightSlot?.({
                      value: showOverlayShortcutKey,
                      onClick: () => setIsShowShortcutModal(true),
                    })}
                  />
                ))}
                <OpacityControl
                  opacity={opacity}
                  setOpacity={setOpacity}
                />
              </HUDWrapper>
            </HUDContainer>
          )}
        </IconGroup>

        <IconGroup>
          <IconWrapper
            $isActive={openToolboxKey === TOOL_BOX_KEY.CUSTOM}
            onClick={() => handleToggleToolBox(TOOL_BOX_KEY.CUSTOM)}
          >
            <TbMoodEdit />
          </IconWrapper>

          {openToolboxKey === TOOL_BOX_KEY.CUSTOM && (
            <HUDContainer>
              <HUDWrapper>
                <div style={{ fontSize: "14px", color: "#333" }}>
                  🎨 피드백 커스터마이징 설정이 여기에 들어갈 예정입니다.
                </div>
              </HUDWrapper>
            </HUDContainer>
          )}
        </IconGroup>
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

const LogoImage = styled.img`
  width: 22px;
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

export default OverlayHUD;
