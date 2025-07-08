import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ALIGNMENT, SCALE_MODE, VIEW_MODE } from "@/constants/hudOptions";
import { chromeStorage } from "@/utils/chromeStorage";

const useHUDStore = create(
  persist(
    (set) => ({
      alignment: ALIGNMENT.CENTER,
      scaleMode: SCALE_MODE.ACTUAL,
      viewMode: VIEW_MODE.DESIGN,
      isShowOverlay: true,
      showOverlayShortcutKey: "K",
      opacity: 0.3,
      isOpenPanel: true,

      setAlignment: (alignment) => set({ alignment }),
      setScaleMode: (scaleMode) => set({ scaleMode }),
      setViewMode: (viewMode) => set({ viewMode }),
      setIsShowOverlay: (isShowOverlay) => set({ isShowOverlay }),
      setShowOverlayShortcutKey: (key) => set({ showOverlayShortcutKey: key }),
      setOpacity: (opacity) => set({ opacity }),
      setIsOpenPanel: (isOpenPanel) => set({ isOpenPanel }),
    }),
    {
      name: "figgy-hud",
      storage: chromeStorage,
    },
  ),
);

export default useHUDStore;
