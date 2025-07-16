import ShortcutBadge from "@/components/HUD/ShortcutBadge";

export const SCALE_MODE = {
  ACTUAL: "actual",
  FIT: "fit",
};

export const VIEW_MODE = {
  DESIGN: "design",
  DIFF: "diff",
};

export const toggleGroups = [
  {
    label: "오버레이",
    stateKey: "isShowOverlay",
    options: [
      { label: "표시", value: true },
      { label: "숨김", value: false },
    ],
    rightSlot: ({ value, onClick }) => (
      <ShortcutBadge
        currentKey={value}
        onClick={onClick}
      />
    ),
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
