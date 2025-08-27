import styled from "styled-components";
import type { ReactNode } from "react";

import SlidingToggle from "@/components/HUD/SlidingToggle";

type ToggleOption<T extends string | number = string> = {
  value: T;
  label: ReactNode;
};

type ToggleOptionGroupProps<T extends string | number = string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  rightSlot?: ReactNode;
};

const ToggleOptionGroup = <T extends string | number = string>({
  label,
  value,
  onChange,
  options,
  rightSlot,
}: ToggleOptionGroupProps<T>) => (
  <div>
    <LabelRow>
      <GroupLabel>{label}</GroupLabel>
      {rightSlot && <RightSlotWrapper>{rightSlot}</RightSlotWrapper>}
    </LabelRow>
    <SlidingToggle
      options={options}
      value={value}
      onChange={onChange}
    />
  </div>
);

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const GroupLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #111827;
`;

const RightSlotWrapper = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export default ToggleOptionGroup;
