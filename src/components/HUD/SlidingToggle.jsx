import styled from "styled-components";

const SlidingToggle = ({ options = [], value, onChange }) => {
  const index = options.findIndex((option) => option.value === value);

  return (
    <ToggleWrapper>
      <SliderBackground
        $index={index}
        $count={options.length}
      />
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          $isActive={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 30px;
  border-radius: 999px;
  background-color: #f1f3f5;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  flex: 1;
  z-index: 1;
  background: none;
  border: none;
  font-size: 11px;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#374151")};
  cursor: pointer;
  transition: color 0.2s;
`;

const SliderBackground = styled.div`
  position: absolute;
  top: 0;
  left: ${({ $index, $count }) => `${($index / $count) * 100}%`};
  width: ${({ $count }) => `${100 / $count}%`};
  height: 100%;
  background-color: #6dbbbf;
  border-radius: 999px;
  transition: left 0.3s ease;
  z-index: 0;
`;

export default SlidingToggle;
