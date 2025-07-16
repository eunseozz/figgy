import styled from "styled-components";

import ColorControlGroup from "@/components/HUD/ColorControlGroup";
import useHUDStore from "@/stores/useHUDStore";

const BORDER_STYLES = ["solid", "dashed", "dotted", "double"];

const CustomHighlightBox = () => {
  const bgColor = useHUDStore((state) => state.bgColor);
  const borderColor = useHUDStore((state) => state.borderColor);
  const warnBgColor = useHUDStore((state) => state.warnBgColor);
  const warnBorderColor = useHUDStore((state) => state.warnBorderColor);
  const borderStyle = useHUDStore((state) => state.borderStyle);

  const {
    setBgColor,
    setBorderColor,
    setWarnBgColor,
    setWarnBorderColor,
    setBorderStyle,
  } = useHUDStore.getState();

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
                $selected={borderStyle === style}
                onClick={() => setBorderStyle(style)}
              />
            ))}
          </BorderStyleGrid>
        </ColumnGroup>

        <ColorControlGroup
          label="일치"
          backgroundColor={bgColor}
          borderColor={borderColor}
          onChangeBackground={setBgColor}
          onChangeBorder={setBorderColor}
        />

        <ColorControlGroup
          label="경고"
          backgroundColor={warnBgColor}
          borderColor={warnBorderColor}
          onChangeBackground={setWarnBgColor}
          onChangeBorder={setWarnBorderColor}
        />
      </Section>

      <Section>
        <SectionTitle>미리보기</SectionTitle>
        <PreviewWrapper>
          <ColumnGroup $gap="6px">
            <Label>일치</Label>
            <PreviewBox
              PreviewBox
              $bg={bgColor}
              $border={`2px ${borderStyle} ${borderColor}`}
            />
          </ColumnGroup>
          <ColumnGroup $gap="6px">
            <Label>경고</Label>
            <PreviewBox
              PreviewBox
              $bg={warnBgColor}
              $border={`2px ${borderStyle} ${warnBorderColor}`}
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
  color: #777;
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
  border: ${({ $border }) => $border};
  background-color: ${({ $bg }) => {
    const rgbMatch = $bg?.match(/\d+/g);

    if (rgbMatch && rgbMatch.length >= 3) {
      const [r, g, b] = rgbMatch.map(Number);
      const isWhite = r === 255 && g === 255 && b === 255;

      return `rgba(${r}, ${g}, ${b}, ${isWhite ? 0 : 0.5})`;
    }

    return $bg;
  }};
`;

export default CustomHighlightBox;
