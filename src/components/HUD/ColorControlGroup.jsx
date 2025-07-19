import styled from "styled-components";

import { hexToRgba } from "@/utils/setting";

const ColorControlGroup = ({
  label,
  backgroundColor,
  borderColor,
  onChangeBackground,
  onChangeBorder,
}) => {
  return (
    <Group>
      <Label>{label}</Label>
      <ColorRow>
        <ColorLabel>배경 색상</ColorLabel>
        <ColorPickerField
          $color={backgroundColor}
          $opacity={0.5}
        >
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onChangeBackground(hexToRgba(e.target.value))}
          />
        </ColorPickerField>
      </ColorRow>
      <ColorRow>
        <ColorLabel>선 색상</ColorLabel>
        <ColorPickerField $color={borderColor}>
          <input
            type="color"
            value={borderColor}
            onChange={(e) => onChangeBorder(e.target.value)}
          />
        </ColorPickerField>
      </ColorRow>
    </Group>
  );
};

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #777;
`;

const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColorLabel = styled.span`
  font-size: 11px;
  color: #888;
  margin-right: 4px;
  min-width: 70px;
`;

const ColorPickerField = styled.label`
  position: relative;
  display: inline-block;
  width: 42px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: ${({ $color }) =>
    $color === "#ffffff" ? "transparent" : $color};
  opacity: ${({ $opacity }) => $opacity || 1};
  cursor: pointer;

  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export default ColorControlGroup;
