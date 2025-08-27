import styled from "styled-components";
import type { ReactNode } from "react";

import SlidingToggle from "@/components/HUD/SlidingToggle";

export type ToggleOption<T extends string | number | boolean = string> = {
  value: T;
  label: ReactNode;
};

export type ToggleOptionGroupProps<
  T extends string | number | boolean = string,
> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
  rightSlot?: ReactNode;
};

function ToggleOptionGroup<T extends string | number | boolean = string>({
  label,
  value,
  onChange,
  options,
  rightSlot,
}: ToggleOptionGroupProps<T>) {
  return (
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
}

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
