import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { TbMoodEdit } from "react-icons/tb";
import styled from "styled-components";

import CustomHighlightBox from "@/components/HUD/CustomHighlightBox";
import HUDToolboxItem from "@/components/HUD/HUDToolboxItem";
import SliderControl from "@/components/HUD/SliderControl";
import ToggleOptionGroup from "@/components/HUD/ToggleOptionGroup";
import ShortcutModal from "@/components/Modal/ShortcutModal";
import { SETTING_TOGGLE_GROUPS, VIEW_MODE } from "@/constants/hudOptions";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useHUDStore from "@/stores/useHUDStore";
import { getAssetUrl } from "@/utils/chrome";

const TOOL_BOX_KEY = {
  SETTING: "setting",
  CUSTOM: "custom",
};

const OverlayHUD = () => {
  const scaleMode = useHUDStore((state) => state.scaleMode);
  const viewMode = useHUDStore((state) => state.viewMode);
  const opacity = useHUDStore((state) => state.opacity);
  const matchGap = useHUDStore((state) => state.matchGap);
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
    setScaleMode,
    setViewMode,
    setOpacity,
    setMatchGap,
    setIsShowOverlay,
  } = useHUDStore.getState();

  const stateMap = { scaleMode, viewMode, isShowOverlay };
  const setStateMap = {
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
        <HUDToolboxItem
          icon={<LogoImage src={logoImage} />}
          isActive={isOpenPanel}
          onClick={() => setIsOpenPanel(!isOpenPanel)}
        />

        <HUDToolboxItem
          icon={<IoMdSettings />}
          isActive={openToolboxKey === TOOL_BOX_KEY.SETTING}
          onClick={() => handleToggleToolBox(TOOL_BOX_KEY.SETTING)}
        >
          {SETTING_TOGGLE_GROUPS.map(
            ({ label, stateKey, options, rightSlot }) => (
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
            ),
          )}
          <SliderControl
            min={0.05}
            max={1}
            step={0.05}
            label="투명도"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
          >
            <ValueText>{Math.round(opacity * 100)}%</ValueText>
          </SliderControl>
          <SliderControl
            min={0}
            max={20}
            step={1}
            label="오차 허용 범위"
            value={matchGap}
            onChange={(e) => {
              clearFeedback();
              setMatchGap(e.target.value);
            }}
          >
            <ValueText>{matchGap}px</ValueText>
          </SliderControl>
        </HUDToolboxItem>

        <HUDToolboxItem
          icon={<TbMoodEdit />}
          isActive={openToolboxKey === TOOL_BOX_KEY.CUSTOM}
          onClick={() => handleToggleToolBox(TOOL_BOX_KEY.CUSTOM)}
        >
          <CustomHighlightBox />
        </HUDToolboxItem>
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
  z-index: 10005;
`;

const HUDBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const LogoImage = styled.img`
  width: 22px;
`;

const ValueText = styled.span`
  font-size: 11px;
  color: #6b7280;
  width: 36px;
  text-align: right;
`;

export default OverlayHUD;
