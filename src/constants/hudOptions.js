export const ALIGNMENT = {
  ORIGINAL: "original",
  CENTER: "center",
};

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
    label: "정렬 방식",
    stateKey: "alignment",
    options: [
      { label: "원본 위치", value: ALIGNMENT.ORIGINAL },
      { label: "가운데 정렬", value: ALIGNMENT.CENTER },
    ],
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
      { label: "디자인만 보기", value: VIEW_MODE.DESIGN },
      { label: "오차 보기", value: VIEW_MODE.DIFF },
    ],
  },
  {
    label: "오버레이",
    stateKey: "isShowOverlay",
    options: [
      { label: "표시", value: true },
      { label: "숨김", value: false },
    ],
  },
];
