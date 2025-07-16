import styled from "styled-components";

const SliderControl = ({
  min,
  max,
  step,
  label,
  value,
  onChange,
  children,
}) => (
  <div>
    <GroupLabel>{label}</GroupLabel>
    <SliderWrapper>
      <Slider
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      {children}
    </SliderWrapper>
  </div>
);

const GroupLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #111827;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Slider = styled.input`
  flex: 1;
  appearance: none;
  height: 6px;
  border-radius: 4px;
  background: #f1f3f5;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #6dbbbf;
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    transition: background 0.3s;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #6dbbbf;
    border: none;
    border-radius: 50%;
  }
`;

export default SliderControl;
