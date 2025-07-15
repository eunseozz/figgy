import { useState } from "react";
import styled from "styled-components";

const BORDER_STYLES = ["solid", "dashed", "dotted", "double"];

const CustomHighlightBox = () => {
  const [backgroundColor, setBackgroundColor] = useState("#dfffe0");
  const [mismatchBackgroundColor, setMismatchBackgroundColor] =
    useState("#ffe3e3");
  const [borderColor, setBorderColor] = useState("#4caf50");
  const [mismatchBorderColor, setMismatchBorderColor] = useState("#f44336");
  const [selectedBorderStyle, setSelectedBorderStyle] = useState("solid");

  return (
    <>
      <Section>
        <SectionTitle>강조 박스</SectionTitle>

        <ColumnGroup>
          <Label>선 스타일</Label>
          <BorderStyleGrid>
            {BORDER_STYLES.map((style) => (
              <BorderStyleBox
                key={style}
                $style={style}
                $selected={selectedBorderStyle === style}
                onClick={() => setSelectedBorderStyle(style)}
              />
            ))}
          </BorderStyleGrid>
        </ColumnGroup>

        <ColumnGroup>
          <Label>일치</Label>
          <ColorRow>
            <ColorLabel>배경 색상</ColorLabel>
            <ColorPickerField
              $color={backgroundColor}
              $opacity={0.5}
            >
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </ColorPickerField>
          </ColorRow>
          <ColorRow>
            <ColorLabel>선 색상</ColorLabel>
            <ColorPickerField $color={borderColor}>
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
              />
            </ColorPickerField>
          </ColorRow>
        </ColumnGroup>

        <ColumnGroup>
          <Label>경고</Label>
          <ColorRow>
            <ColorLabel>배경 색상</ColorLabel>
            <ColorPickerField
              $color={mismatchBackgroundColor}
              $opacity={0.5}
            >
              <input
                type="color"
                value={mismatchBackgroundColor}
                onChange={(e) => setMismatchBackgroundColor(e.target.value)}
              />
            </ColorPickerField>
          </ColorRow>
          <ColorRow>
            <ColorLabel>선 색상</ColorLabel>
            <ColorPickerField $color={mismatchBorderColor}>
              <input
                type="color"
                value={mismatchBorderColor}
                onChange={(e) => setMismatchBorderColor(e.target.value)}
              />
            </ColorPickerField>
          </ColorRow>
        </ColumnGroup>
      </Section>

      <Section>
        <SectionTitle>미리보기</SectionTitle>
        <PreviewWrapper>
          <ColumnGroup $gap="6px">
            <Label>정상</Label>
            <PreviewBox
              $bg={backgroundColor}
              $border={`2px ${selectedBorderStyle} ${borderColor}`}
            />
          </ColumnGroup>
          <ColumnGroup $gap="6px">
            <Label>경고</Label>
            <PreviewBox
              $bg={mismatchBackgroundColor}
              $border={`2px ${selectedBorderStyle} ${mismatchBorderColor}`}
            />
          </ColumnGroup>
        </PreviewWrapper>
      </Section>
    </>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 600;
  color: #111;
`;

const ColumnGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || "8px"};
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #444;
`;

const ColorLabel = styled.span`
  font-size: 11px;
  color: #888;
  margin-right: 4px;
  min-width: 70px;
`;

const BorderStyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const BorderStyleBox = styled.div`
  width: 100%;
  height: 28px;
  border: 2px ${({ $style }) => $style} #6dbbbf;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ $selected }) => ($selected ? "#dceeef" : "none")};
`;

const ColorRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 6px;
  background-color: ${({ $bg }) => $bg};
  border: ${({ $border }) => $border};
`;

export default CustomHighlightBox;
