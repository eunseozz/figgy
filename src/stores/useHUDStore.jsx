import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SCALE_MODE, VIEW_MODE } from "@/constants/hudOptions";
import { chromeStorage } from "@/utils/chromeStorage";
import { hexToRgba } from "@/utils/setting";

const useHUDStore = create(
  persist(
    (set) => ({
      scaleMode: SCALE_MODE.ACTUAL,
      viewMode: VIEW_MODE.DIFF,
      isShowOverlay: true,
      showOverlayShortcutKey: "K",
      opacity: 0.3,
      isOpenPanel: true,
      matchGap: 5,

      bgColor: hexToRgba("#dfffe0"),
      borderColor: "#4caf50",
      warnBgColor: hexToRgba("#ffe3e3"),
      warnBorderColor: "#f44336",
      borderStyle: "solid",

      setScaleMode: (scaleMode) => set({ scaleMode }),
      setViewMode: (viewMode) => set({ viewMode }),
      setIsShowOverlay: (isShowOverlay) => set({ isShowOverlay }),
      setShowOverlayShortcutKey: (key) => set({ showOverlayShortcutKey: key }),
      setOpacity: (opacity) => set({ opacity }),
      setIsOpenPanel: (isOpenPanel) => set({ isOpenPanel }),
      setMatchGap: (matchGap) => set({ matchGap }),

      setBgColor: (bgColor) => set({ bgColor }),
      setBorderColor: (borderColor) => set({ borderColor }),
      setWarnBgColor: (warnBgColor) => set({ warnBgColor }),
      setWarnBorderColor: (warnBorderColor) => set({ warnBorderColor }),
      setBorderStyle: (borderStyle) => set({ borderStyle }),
    }),
    {
      name: "figgy-hud",
      storage: chromeStorage,
    },
  ),
);

export default useHUDStore;
