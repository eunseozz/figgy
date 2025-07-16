import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ALIGNMENT, SCALE_MODE, VIEW_MODE } from "@/constants/hudOptions";
import { chromeStorage } from "@/utils/chromeStorage";

const useHUDStore = create(
  persist(
    (set) => ({
      alignment: ALIGNMENT.CENTER,
      scaleMode: SCALE_MODE.ACTUAL,
      viewMode: VIEW_MODE.DIFF,
      isShowOverlay: true,
      showOverlayShortcutKey: "K",
      opacity: 0.3,
      isOpenPanel: true,

      bgColor: "#dfffe0",
      borderColor: "#4caf50",
      warnBgColor: "#ffe3e3",
      warnBorderColor: "#f44336",
      borderStyle: "solid",

      setAlignment: (alignment) => set({ alignment }),
      setScaleMode: (scaleMode) => set({ scaleMode }),
      setViewMode: (viewMode) => set({ viewMode }),
      setIsShowOverlay: (isShowOverlay) => set({ isShowOverlay }),
      setShowOverlayShortcutKey: (key) => set({ showOverlayShortcutKey: key }),
      setOpacity: (opacity) => set({ opacity }),
      setIsOpenPanel: (isOpenPanel) => set({ isOpenPanel }),

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
