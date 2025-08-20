import ShortcutBadge from "@/components/HUD/ShortcutBadge";
import type { JSX } from "react";

export const SCALE_MODE = {
  ACTUAL: "actual",
  FIT: "fit",
} as const;

export const VIEW_MODE = {
  DESIGN: "design",
  DIFF: "diff",
} as const;

type ScaleMode = (typeof SCALE_MODE)[keyof typeof SCALE_MODE];
type ViewMode = (typeof VIEW_MODE)[keyof typeof VIEW_MODE];
type OptionValue = boolean | ScaleMode | ViewMode;

type StateKey = "isShowOverlay" | "scaleMode" | "viewMode";

interface SettingOption {
  label: string;
  value: OptionValue;
}

interface SettingToggleGroup {
  label: string;
  stateKey: StateKey;
  options: SettingOption[];
  rightSlot?: (args: {
    value: OptionValue;
    onClick: () => void;
  }) => JSX.Element;
}

export const SETTING_TOGGLE_GROUPS: SettingToggleGroup[] = [
  {
    label: "오버레이",
    stateKey: "isShowOverlay",
    options: [
      { label: "표시", value: true },
      { label: "숨김", value: false },
    ],
    rightSlot: ({ value, onClick }) =>
      typeof value === "string" ? (
        <ShortcutBadge
          currentKey={value}
          onClick={onClick}
        />
      ) : null,
  },
  {
    label: "보기 모드",
    stateKey: "scaleMode",
    options: [
      { label: "실제 크기", value: SCALE_MODE.ACTUAL },
      { label: "화면 맞춤", value: SCALE_MODE.FIT },
    ],
  },
  {
    label: "시각화",
    stateKey: "viewMode",
    options: [
      { label: "오차 보기", value: VIEW_MODE.DIFF },
      { label: "디자인만 보기", value: VIEW_MODE.DESIGN },
    ],
  },
];
