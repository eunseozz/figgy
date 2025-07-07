import { create } from "zustand";

import { ALIGNMENT, SCALE_MODE, VIEW_MODE } from "@/constants/hudOptions";

const useHUDStore = create((set) => ({
  alignment: ALIGNMENT.CENTER,
  scaleMode: SCALE_MODE.ACTUAL,
  viewMode: VIEW_MODE.DESIGN,
  isShowOverlay: true,
  opacity: 0.3,
  isOpenPanel: true,

  setAlignment: (alignment) => set({ alignment }),
  setScaleMode: (scaleMode) => set({ scaleMode }),
  setViewMode: (viewMode) => set({ viewMode }),
  setIsShowOverlay: (isShowOverlay) => set({ isShowOverlay }),
  setOpacity: (opacity) => set({ opacity }),
  setIsOpenPanel: (isOpenPanel) => set({ isOpenPanel }),
}));

export default useHUDStore;
