import { useState } from "react";
import styled from "styled-components";

import ColorControlGroup from "@/components/HUD/ColorControlGroup";

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

        <ColorControlGroup
          label="일치"
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          onChangeBackground={setBackgroundColor}
          onChangeBorder={setBorderColor}
        />

        <ColorControlGroup
          label="경고"
          backgroundColor={mismatchBackgroundColor}
          borderColor={mismatchBorderColor}
          onChangeBackground={setMismatchBackgroundColor}
          onChangeBorder={setMismatchBorderColor}
        />
      </Section>

      <Section>
        <SectionTitle>미리보기</SectionTitle>
        <PreviewWrapper>
          <ColumnGroup $gap="6px">
            <Label>일치</Label>
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
