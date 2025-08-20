import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SCALE_MODE, VIEW_MODE } from "@/constants/hudOptions";
import { chromeStorage } from "@/utils/chromeStorage";
import { hexToRgba } from "@/utils/setting";

type ScaleMode = (typeof SCALE_MODE)[keyof typeof SCALE_MODE];
type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];

interface HUDState {
  scaleMode: ScaleMode;
  viewMode: ViewMode;
  isShowOverlay: boolean;
  showOverlayShortcutKey: string;
  opacity: number;
  isOpenPanel: boolean;
  matchGap: number;

  bgColor: string;
  borderColor: string;
  warnBgColor: string;
  warnBorderColor: string;
  borderStyle: string;

  setScaleMode: (scaleMode: ScaleMode) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setIsShowOverlay: (isShowOverlay: boolean) => void;
  setShowOverlayShortcutKey: (key: string) => void;
  setOpacity: (opacity: number) => void;
  setIsOpenPanel: (isOpenPanel: boolean) => void;
  setMatchGap: (matchGap: number) => void;

  setBgColor: (bgColor: string) => void;
  setBorderColor: (borderColor: string) => void;
  setWarnBgColor: (warnBgColor: string) => void;
  setWarnBorderColor: (warnBorderColor: string) => void;
  setBorderStyle: (borderStyle: string) => void;
}

const useHUDStore = create<HUDState>()(
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
