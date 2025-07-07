import styled from "styled-components";

import SlidingToggle from "@/components/HUD/ToggleOptionGroup";

const ToggleOptionGroup = ({ label, value, onChange, options, rightSlot }) => (
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
