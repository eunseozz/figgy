import { useEffect, useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { TbMoodEdit } from "react-icons/tb";
import styled from "styled-components";

import CustomHighlightBox from "@/components/HUD/CustomHighlightBox";
import HUDToolboxItem from "@/components/HUD/HUDToolboxItem";
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
  z-index: 10000;
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

export default OverlayHUD;
