import { create } from "zustand";

import { ALIGNMENT, SCALE_MODE, VIEW_MODE } from "@/constants/hudOptions";

const useHUDStore = create((set) => ({
  alignment: ALIGNMENT.ORIGINAL,
  scaleMode: SCALE_MODE.ACTUAL,
  viewMode: VIEW_MODE.DESIGN,
  opacity: 0.3,

  setAlignment: (alignment) => set({ alignment }),
  setScaleMode: (scaleMode) => set({ scaleMode }),
  setViewMode: (viewMode) => set({ viewMode }),
  setOpacity: (opacity) => set({ opacity }),
}));

export default useHUDStore;
