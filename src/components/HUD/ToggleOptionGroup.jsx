import styled from "styled-components";

import SlidingToggle from "./SlidingToggle";

const ToggleOptionGroup = ({ label, value, onChange, options }) => (
  <div>
    <GroupLabel>{label}</GroupLabel>
    <SlidingToggle
      options={options}
      value={value}
      onChange={onChange}
    />
  </div>
);

const GroupLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #111827;
`;

export default ToggleOptionGroup;
