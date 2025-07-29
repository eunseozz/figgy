<p align="center">
  <img width="400" height="169" alt="image" src="https://github.com/user-attachments/assets/d9f1aee4-5c76-4039-b542-57bc6859c1dc" />
</p>
<p align="center">
  <b>Figma ↔ 브라우저. 몇 번이나 오가셨나요?</b><br />
</p>
<p align="center">
  <b>Figgy</b>는 디자인을 구현 화면 위에 직접 겹쳐 보여줌으로써, 더 이상 추측이 아닌 확인을 가능하게 합니다.
</p>

<br/><br/>

## 📑 목차
- [기술 스택](#️-기술-스택)
- [기획 배경](#-기획-배경)
- [주요 기능](#️-주요-기능)
- [개발 과정](#️-개발-과정)
    - [1. 구조가 다른 Figma와 DOM을 비교하기 위한 기준 설계](#1-구조가-다른-figma와-dom을-비교하기-위한-기준-설계)
        - [1-1. 기준점이 다른 좌표계를 통일하기](#-1-1-기준점이-다른-좌표계를-통일하기)
        - [1-2. 스케일 차이 해결을 위한 이미지 기반 보정](#-1-2-스케일-차이-해결을-위한-이미지-기반-보정)
        - [1-3. 단일 노드 비교를 위한 좌표 계산 구조 설계](#-1-3-단일-노드-비교를-위한-좌표-계산-구조-설계)
        - [1-4. 비교 대상 필터링 기준 설계](#-1-4-비교-대상-필터링-기준-설계)
        - [1-5. 일치 기준 오차 설정과 무시 조건 처리](#-1-5-일치-기준-오차-설정과-무시-조건-처리)
    - [2. 시각 오차를 정확히 보여주기 위한 툴팁 위치 정밀 계산](#2-시각-오차를-정확히-보여주기-위한-툴팁-위치-정밀-계산)
        - [2-1. 클릭 지점과 DOM 요소 기준점 추출](#-2-1-클릭-지점과-dom-요소-기준점-추출)
        - [2-2. 툴팁 위치 계산을 위한 스크롤 보정](#-2-2-툴팁-위치-계산을-위한-스크롤-보정)
        - [2-3. 리사이즈/스크롤 대응을 위한 위치 업데이트 처리](#-2-3-리사이즈스크롤-대응을-위한-위치-업데이트-처리)
- [개발 일정](#-개발-일정)
- [회고록](#️-회고록)

<br/>

## 🛠️ 기술 스택

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=redux&logoColor=white)

![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) ![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black)

### 개발 도구

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Husky](https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=husky&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<br/>

## 💡 기획 배경

> **디자인과 구현 화면 사이의 오차를 더 이상 눈대중에 맡기고 싶지 않았습니다.**<br/>

퍼블리싱 작업을 하다 보면 디자인과 실제 구현 사이에 미묘한 차이가 자주 생겼던 경험이 있습니다.<br/>
간격이 수치로 정해져 있어도 실제 코드에 옮기면 어딘가 어색하고 확신이 들지 않을 때가 많았습니다.<br/>
<br/>
그러다 보면 자연스럽게 Figma와 브라우저를 번갈아 비교하게 되고 <br/>
결국엔 눈대중에 의존하게 되어 디자이너와 개발자 모두 “정확히 구현됐다”고 말하기 어려운 상황이 반복되곤 했습니다.<br/>
<br/>
이 과정을 겪으며 문득 디자인을 **실제 구현 화면 위에 겹쳐 비교할 수 있다면 훨씬 직관적이지 않을까?** 라는 생각이 들었습니다.<br/>
<br/>
위 문제의식을 바탕으로 **Figma 디자인을 화면 위에 오버레이**해 **시각적 차이를 확인**할 수 있는 확장 프로그램을 기획하였습니다.

<br/>

## 🕹️ 주요 기능


### 1. Figma 링크로 프로젝트 시작하기
![2025-07-254 31 03-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/3bf7edb5-f0c5-4f88-b005-84b1bf2c7567)
- 프로젝트 생성 시, 사용자는 Figma 파일의 URL을 입력합니다.
- 해당 URL을 통해 연동된 PNG 이미지들이 자동으로 불러와집니다.
- 이 이미지들은 오버레이 작업의 기준 자료로 활용됩니다.

---

### 2. 초기 해상도 기반 폴더 구조 생성 및 이미지 배치
![2025-07-254 37 27-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/2d61e52b-d1b3-4052-b139-7958353838b6)
- 기본적으로 PC, TABLET, MOBILE 기준의 폴더 구조가 자동으로 생성됩니다.
- 사용자는 불러온 이미지를 드래그 앤 드롭으로 원하는 폴더에 배치할 수 있습니다.
- 각 폴더는 이름이나 해상도 조건을 자유롭게 수정할 수 있어, 프로젝트 특성에 맞게 구조를 유연하게 구성할 수 있습니다.

---

### 3. 오버레이 이미지 적용 및 오차 시각화
![2025-07-255 32 28-ezgif com-crop](https://github.com/user-attachments/assets/e34616c2-30b1-4baa-9a39-155822411504)
- 폴더 내 이미지를 선택하면, 브라우저 해상도에 맞는 오버레이 이미지가 자동 적용됩니다.
- 오버레이는 반투명 상태로 실제 UI 위에 자연스럽게 덮여 보이며, 반응형 페이지에 따라 자동 전환됩니다.
- DOM 요소를 클릭하면 해당 요소와 디자인 간의 위치/크기 차이를 툴팁 형태로 시각화해 빠르게 확인할 수 있습니다.

---

### 4. 오차 기준 설정 및 피드백 커스터마이징
![2025-07-255 46 04-ezgif com-crop](https://github.com/user-attachments/assets/cb68f988-d7ab-4911-b6f9-9b6d4a74c020)

- 허용할 오차 범위를 직접 설정해, 기준을 초과한 항목만 선별적으로 표시할 수 있습니다.
- 오버레이의 투명도나 피드백 색상 등을 자유롭게 조절할 수 있어 사용자 환경에 맞는 시각적 비교가 가능합니다.
- 피드백 표시 방식(선 스타일, 색상 등)도 커스터마이징할 수 있어 다양한 검수 스타일을 지원합니다.

<br/>

## 🏔️ 개발 과정
### 1. 구조가 다른 Figma와 DOM을 비교하기 위한 기준 설계

Figgy는 Figma 디자인과 실제 웹 화면 사이의 오차를 시각적으로 보여주는 도구입니다.<br/>
사용자가 오버레이된 디자인 이미지 위에서 DOM 요소 클릭시 해당 요소가 디자인과 얼마나 일치하는지 툴팁 형태로 확인할 수 있습니다.<br/>

<br/>

**하지만 이 기능을 구현하는 과정은 단순한 좌표 비교로는 해결되지 않는, 꽤 복잡한 좌표계 통합 문제와 맞닿아 있었습니다.**

<br/>

**🙅 왜 단순 비교로는 안 되는가?**
- Figma와 브라우저는 서로 완전히 다른 좌표 시스템을 사용합니다.
- Figma는 “디자인 캔버스” 기준 좌표를 절대값으로 표현합니다.
- 브라우저는 “뷰포트 기준”으로 상대적인 위치를 계산합니다.
- 렌더링 크기도 달라지므로 디자인은 1440px 기준이지만, 브라우저에서는 1080px 등으로 축소돼 보일 수 있습니다.
- 오차는 1~2px 단위로 미묘하게 발생하며, 이를 잡아내려면 정밀한 기준 정리가 필요했습니다.

<br/>

#### ✅ 1-1. 기준점이 다른 좌표계를 통일하기
Figma와 DOM은 서로 다른 좌표 기준을 사용합니다.

| 기준 시스템 | 기준점                          | 예시 값                              |
|-------------|----------------------------------|----------------------------------------|
| **Figma**   | 디자인 캔버스 기준 (0,0)        | `absoluteBoundingBox.x = 1325`        |
| **DOM**     | 브라우저 뷰포트 기준 (0,0)      | `getBoundingClientRect().left = 240`  |

위처럼 기준점이 다르므로 두 값을 직접 비교할 수 없습니다.<br/>
정확한 비교를 위해선 기준 좌표계, 크기, 오프셋을 모두 일치시켜야 합니다.

<br/>

**해결 전략**
1. 오버레이 이미지의 위치와 스케일 측정
```js
const imageRect = imageRef.current.getBoundingClientRect();
const scale = imageRef.current.width / figmaOriginalWidth;
```
- `imageRect`: 이미지의 브라우저 상 위치
- `scale`: Figma 원본과 브라우저 렌더링 간의 축척 비율

<br/>

2. Figma 좌표 변환
```js
const figmaX = (figmaBox.x - frameOffset.x) * scale + imageRect.left;
const figmaY = (figmaBox.y - frameOffset.y) * scale + imageRect.top;
```
- `figmaBox`: Figma 노드의 위치
- `frameOffset`: 프레임 내 상대 위치 → 전체 캔버스 좌표 보정용
- `scale`과 브라우저 이미지 위치를 활용해 DOM 좌표계로 변환

<br/>

#### ✅ 1-2. 스케일 차이 해결을 위한 이미지 기반 보정
Figma 디자인은 특정 해상도 기준으로 만들어지지만, 브라우저에서는 디바이스 크기에 따라 실제 렌더링 크기가 달라집니다.<br/>
이때 디자인과 실제 구현 사이의 스케일 차이를 보정하지 않으면 정확한 비교가 불가능합니다.


| 항목                         | 값            | 설명                                           |
|------------------------------|----------------|------------------------------------------------|
| Figma 원본 프레임 너비       | 1440px         | 디자인 툴에서 정의된 원래 너비                 |
| 브라우저 오버레이 이미지 너비| 1080px         | 실제 화면에 렌더링된 이미지 너비               |
| 스케일 비율                  | 0.75           | `1080 / 1440`으로 계산됨                       |

예를 들어, 위 내용과 같은 케이스의 경우 Figma에서 제공하는<br/>
좌표값에 × 0.75의 스케일 비율을 적용해야 실제 브라우저 상의 위치와 일치합니다.<br/>

이는 단순히 오차를 줄이기 위한 보정이 아니라 기준 좌표계 자체를 통일하기 위한 필수 단계로,<br/>
디자인과 구현을 정확히 비교하려면 모든 Figma 좌표에 동일한 비율을 적용한 위치 보정이 선행되어야 합니다.

<br/>

**해결 전략**
1. 오버레이 이미지의 렌더링 크기 측정
```js
const scale = imageRef.current.width / figmaOriginalWidth; // 실제 스케일
```
- `imageRef.current.width`: 현재 브라우저에서 렌더링된 이미지 너비
- `figmaOriginalWidth`: Figma에서의 원본 프레임 너비

<br/>

2. 모든 좌표와 크기에 동일한 스케일 적용
```js
const scaledX = (figmaBox.x - frameOffset.x) * scale + imageOffsetX;
const scaledWidth = figmaBox.width * scale;
```
- x, y, width, height 등 모든 위치 정보에 scale 값을 곱하여 실제 위치를 보정합니다.

<br/>

#### ✅ 1-3. 단일 노드 비교를 위한 좌표 계산 구조 설계
단일 DOM 요소와 Figma 노드를 비교하려면 양측 좌표가 동일한 기준 위에 있어야 할 뿐 아니라<br/>
비교 대상이 정확히 어떤 속성인지도 명확하게 정의되어야 합니다.<br/>
<br/>
이를 위해 실제 비교에 필요한 좌표 정보를 구조화하고, 조건에 따라 오차를 계산하는 방식을 설계했습니다.
| 비교 항목        | 비교 대상 (DOM vs Figma)             | 설명                        |
|------------------|----------------------------------------|-----------------------------|
| x 좌표           | `dom.x` vs `scaledFigmaX`             | 좌측 위치 기준 비교        |
| y 좌표           | `dom.y` vs `scaledFigmaY`             | 상단 위치 기준 비교        |
| 너비 (width)     | `dom.width` vs `scaledFigmaWidth`     | 요소의 가로 크기 비교      |
| 높이 (height)    | `dom.height` vs `scaledFigmaHeight`   | 요소의 세로 크기 비교      |

<br/>

**해결 전략**
1. Figma 노드 좌표를 브라우저 기준 좌표로 변환
```js
const scaledX = (figmaBox.x - frameOffset.x) * scale + imageRect.left;
const scaledY = (figmaBox.y - frameOffset.y) * scale + imageRect.top;
```
- `frameOffset`: Figma 프레임 내에서의 상대 좌표
- `scale`: 이미지 축소/확대에 따른 보정 값
- `imageRect`: 오버레이 이미지의 실제 브라우저 내 위치

<br/>

2. 비교 대상 정의 및 오차 판별 구조 설계
```js
const comparePairs = [
  { key: "x", dom: dom.x, figma: scaledX },
  { key: "y", dom: dom.y, figma: scaledY },
];

for (const { key, dom, figma } of comparePairs) {
  const isOverGap = Math.abs(dom - figma) > pixelLimit;
  if (isOverGap) {
    result.matched = false;
    result.mismatches.push({ key, dom, figma });
  }
}
```
- 비교할 항목들을 하나의 배열로 정리하여 반복적으로 처리합니다.
- `pixelLimit`값을 초과하는 경우, 일치하지 않는 것으로 판단합니다.
- 구조화된 방식을 사용하여 확장성과 가독성을 높였습니다.

<br/>

#### ✅ 1-4. 비교 대상 필터링 기준 설계
DOM 요소와 Figma 노드를 비교할 때는 단순히 화면에 보이는 모든 요소를 대상으로 삼기보다는<br/>
실제로 시각적으로 의미 있는 단위인지를 판단할 수 있는 기준이 필요합니다.<br/>
불필요한 요소까지 모두 비교하면 오히려 정확도는 떨어지고 사용자 경험에도 악영향을 줄 수 있기 때문입니다.<br/>
**따라서, 어떤 요소를 비교 대상으로 삼을지 결정하는 필터링 기준이 중요합니다.**

| **필터링 항목**             | **설명** |
|-----------------------------|----------|
| 상위 구조 태그 제외         | `<html>`, `<body>` 등 전체 레이아웃 용도의 태그는 제외 |
| 내부 툴 UI 제외             | #figgy-dashboard 내부 요소는 툴 기능 영역이므로 비교 제외 |
| 인라인 요소 제외            | display: inline 요소는 정확한 크기 비교가 어려워 제외 |
| 단순 텍스트 요소 허용       | 텍스트 크기 ≒ 요소 크기일 경우 유의미한 버튼/링크로 판단 |
| 복잡한 텍스트 블록 제외     | block 요소와 텍스트가 혼합된 구조는 정확한 비교 어려움 |

이러한 기준을 바탕으로 화면 상에서 시각적으로 구분 가능한 컴포넌트만을 비교 대상으로 선별하고<br/>
구조적으로 부정확하거나 비교 의미가 낮은 요소는 사전에 제외되는 방식을 설계했습니다.<br/>

**해결 전략**
1. 복잡한 텍스트 블록 필터링
```js
export const isMessyTextBlock = (el) => {
  if (!el || !el.children || el.children.length === 0) return false;

  let hasBlock = false;
  let hasExtraText = false;

  for (const child of el.children) {
    const display = window.getComputedStyle(child).display;
    if (display !== "inline") hasBlock = true;

    const text = child.textContent?.trim() ?? "";
    if (text.length > 0) hasExtraText = true;

    if (hasBlock && hasExtraText) return true;
  }

  return false;
};
```
- 텍스트와 `block` 요소가 섞인 복잡한 구조를 제외함으로써 비교 정확도 저하 방지
- 내부에 의미 없는 `block` 구조가 포함된 경우 오탐 방지

<br/>

2.  텍스트 기반 요소 판단
```js
export const isTextSizedBox = (el) => {
  if (!el || !el.textContent?.trim()) return false;

  const tag = el.tagName.toLowerCase();
  if (tag !== "a" && tag !== "button") return false;

  const elRect = el.getBoundingClientRect();
  const range = document.createRange();
  range.selectNodeContents(el);
  const textRect = range.getBoundingClientRect();

  const elArea = elRect.width * elRect.height;
  const textArea = textRect.width * textRect.height;
  const areaRatio = textArea / elArea;

  return areaRatio > 0.9;
};
```
- 요소의 크기와 텍스트의 렌더링 크기가 거의 일치하는 경우만 유의미한 버튼/링크로 판단
- 불필요한 마진/패딩 요소는 제외하고 시각적 컴포넌트 단위로 정확히 비교 가능하게 설계

<br/>

#### ✅ 1-5. 일치 기준 오차 설정과 무시 조건 처리
디자인과 구현이 완전히 동일할 수는 없으므로 비교 기준에는 일정 수준의 허용 오차가 필요합니다.<br/>
또한 디자이너가 의도적으로 위치를 생략하거나 비교가 무의미한 수준의 차이는 무시하도록 처리할 필요도 있습니다.

<br/>

**해결 전략**

1. 픽셀 단위 허용 오차 기준 도입
```js
const pixelLimit = useHUDStore.getState().matchGap;
```
- `matchGap`: 사용자가 설정할 수 있는 허용 오차 값
- DOM과 Figma 간의 좌표 차이가 이 값을 초과할 경우만 “불일치”로 판단

<br/>

2. 무시 조건 정의
```js
export const shouldSkipFeedback = (mismatches) => {
  return mismatches.some(({ dom, figma }) => {
    const diff = +(dom - figma).toFixed(1);
    return Math.abs(diff) > MAX_MISMATCH_GAP;
  });
};
```
- `MAX_MISMATCH_GAP` (너무 큰 오차)는 잘못된 비교로 간주하여 무시합니다.

<hr />

### 2. 시각 오차를 정확히 보여주기 위한 툴팁 위치 정밀 계산
Figgy는 디자인과 실제 화면 사이의 차이를 단순 수치로만 보여주지 않습니다.<br/>
사용자가 DOM 요소 클릭시 해당 요소가 디자인과 얼마나 어긋나 있는지를 방향과 거리로 직관적으로 보여주는 툴팁이 표시됩니다.<br/>
<br/>
**하지만 이 기능은 단순히 “몇 px 어긋났다”는 메시지를 띄우는 문제를 넘어 툴팁이 항상 정확히 해당 요소에 붙어 있도록 계산하고<br/>
화면 리사이즈나 스크롤 같은 상황에서도 어긋나지 않게 유지해야 하는 복잡한 구현 과제가 있었습니다.**

<br/>

**🙅 왜 단순히 띄우면 안 되는가?**
- 툴팁의 위치는 마우스, DOM 중심, 이미지 오버레이 위치 등 기준점이 매우 다양합니다.
- 툴팁이 시각적으로 가려지거나 어색한 위치에 표시되면 오히려 혼란을 줄 수 있습니다.
- 오차 방향을 계산하기 위해선 DOM과 Figma의 좌표 차이를 해석해 문장으로 변환해야 합니다.
- 1~2px 오차는 의미 있지만, 100px 이상 벌어지면 오히려 피드백이 무의미해지는 조건 처리도 필요했습니다.
- 결과적으로, 이 기능은 좌표 계산 + 시각적 설계 + 예외 판단이 모두 필요한 종합적인 로직이었습니다.

<br/>

#### ✅ 2-1. 클릭 지점과 DOM 요소 기준점 추출
사용자가 오버레이된 이미지 위에서 특정 DOM 요소를 클릭하면 그 위치를 기준으로 비교가 시작됩니다.<br/>
이때 정확한 오차 계산을 위해서는 클릭 지점이 포함된 DOM 요소의 절대 위치를 기준으로 삼아야 합니다.<br/>
<br/>
이 절대 위치는 단순한 `left`, `top` 값만으로는 얻을 수 없으며, 스크롤 오프셋 등을 포함한 정확한 위치 계산이 필요합니다.<br/>

| 항목         | 값                                     | 설명                                                                 |
|--------------|------------------------------------------|----------------------------------------------------------------------|
| 클릭 대상     | `event.target`                           | 실제 사용자가 클릭한 DOM 요소                                        |
| 요소 위치     | `event.target.getBoundingClientRect()`   | 요소의 브라우저 내 상대 좌표<br>(`top`, `left`, `width`, `height`) 추출 |
| 기준점 보정   | `rect.top + scrollY`,<br>`rect.left + scrollX` | 뷰포트 기준 좌표를 페이지 전체 기준 절대 좌표로 보정               |

예를 들어, 사용자가 `position: absolute`로 고정된 버튼을 클릭했을 경우에도<br/>
브라우저 스크롤이 존재하면 단순한 `left`, `top`으로는 정확한 위치 비교가 불가능합니다.<br/>

<br/>

따라서 `scrollY`, `scrollX`를 포함해 절대 좌표 기준으로 환산해야만 오버레이 기준과 비교할 수 있습니다.<br/>

<br/>

**해결 전략**
1. 클릭된 DOM 요소의 기준 위치 추출

```js
const rect = clickedElement.getBoundingClientRect();
```

- 브라우저 뷰포트 기준 상대 좌표를 추출
  
<br/>

2. 스크롤 보정 좌표 계산 및 위치 반영
   
```js
const absoluteTop = rect.top + window.scrollY;
const absoluteLeft = rect.left + window.scrollX;
```

- 페이지 전체 기준 좌표로 변환하여 툴팁과 하이라이트 박스를 정확하게 배치할 수 있도록 합니다.
  
<br/>

#### ✅ 2-2. 툴팁 위치 계산을 위한 스크롤 보정
툴팁은 사용자가 클릭한 DOM 요소 바로 아래에 표시되어야 하며 화면이 스크롤된 상태에서도 정확한 위치를 유지해야 합니다.<br/>
이를 위해 브라우저 뷰포트 기준 좌표에 `scrollY`, `scrollX`를 더해 절대 좌표로 보정하고 요소 크기를 반영하여 툴팁 위치를 자연스럽게 조정합니다.
| 항목         | 값                                              | 설명                                                             |
|--------------|--------------------------------------------------|------------------------------------------------------------------|
| 기준 위치     | `rect.top + scrollY`,<br>`rect.left + scrollX`      | 뷰포트 기준 위치에 스크롤 보정을 더해 절대 위치 계산              |
| 툴팁 위치     | `top + height + 7`, `left - 3`                   | 요소 아래에 여유를 두고 좌측 약간 안쪽에 위치하도록 보정값 적용   |
| 사용 위치     | `setTooltip({ top, left, text })`               | 불일치 시 툴팁에 정확한 위치와 메시지 전달                        |

<br/>

**해결 전략**
1. 툴팁 표시 기준 위치 계산
```js
const rect = element.getBoundingClientRect();
const tooltipTop = rect.top + window.scrollY + rect.height + 7;
const tooltipLeft = rect.left + window.scrollX - 3;
```

<br/>

2. 툴팁 렌더링 위치 설정
```js
setTooltip({
  top: tooltipTop,
  left: tooltipLeft,
  text: generateDiffText(comparison.mismatches),
});
```
- 스크롤이 반영된 절대 좌표를 기반으로 툴팁이 정확한 위치에 표시되도록 처리합니다.
- 툴팁이 요소와 시각적으로 연결되어 있다는 인상을 줄 수 있도록 여백을 조정합니다.

<br/>

#### ✅ 2-3. 리사이즈/스크롤 대응을 위한 위치 업데이트 처리
툴팁과 강조 박스는 단순히 한 번 위치를 계산해서 끝나는 것이 아니라, 브라우저의 스크롤이나 리사이즈에도 반응해야 합니다.<br/>
예를 들어 사용자가 요소를 클릭한 뒤 화면을 스크롤하면 툴팁이 엉뚱한 위치에 남아 있는 문제가 발생할 수 있습니다.<br/>
이를 방지하기 위해 전역 이벤트 리스너를 활용해 항상 위치를 갱신하도록 처리했습니다.<br/>

<br/>

**해결 전략**
1. 클릭된 요소를 기억하고 위치 갱신 함수 호출
```js
const el = clickedElementRef.current;
const rect = el.getBoundingClientRect();
```

<br/>

2. 	스크롤 보정 좌표 계산 및 위치 반영
```js
setTooltip({
  top: rect.top + window.scrollY + rect.height + 7,
  left: rect.left + window.scrollX - 3,
  text: generateDiffText(comparison.mismatches),
});
```
<br/>

3. 리사이즈/스크롤 이벤트 연결
```js
window.addEventListener("scroll", updateFeedbackPosition);
window.addEventListener("resize", updateFeedbackPosition);
```
<br/>

## 🗓 개발 일정

**프로젝트 기간: 2025. 06. 23 ~ 2025. 07. 17**

1주차
- 아이디어 수집, 선정
- 기술 스택 결정 및 검증
- 칸반 보드 작성
- 개발/확장프로그램 초기 환경 설정

2주차
- 프로젝트 구조 및 UI 설계
- PNG 자동 불러오기 및 전환 구현
- 좌표 수집 및 비교 로직 개발

3주차
- 오차 시각화 및 사용자 단축키 기능 구현
- 프로젝트/페이지/폴더 관리 기능 확장
- 새로고침 시 상태 유지 처리

4주차
- 반응형 오버레이 및 커스터마이징 개선
- 피드백 초기화 및 오차 범위 설정
- 렌더링 및 상태 관련 버그 수정

<br/>

## ✍️ 회고록
>**기능의 완성도보다 전달 방식의 중요성을 배운 프로젝트**

처음에는 디자인과 실제 구현 사이의 오차를 조금 더 쉽게 확인할 수 있으면 좋겠다는 문제의식에서 출발했지만<br/>
구현을 이어갈수록 단순히 화면상의 요소를 ‘비교’하는 기능만으로는 충분하지 않다는 걸 느끼게 되었습니다.<br/>
<br/>
예를 들어, 오차가 감지되더라도 그 정보가 언제 어떻게 보여지느냐에 따라<br/>
사용자가 느끼는 이해도나 몰입도가 크게 달라질 수 있다는 생각이 들었고<br/>
그 과정을 겪으면서 **기능이 어떤 흐름 속에서 전달되느냐**가 훨씬 중요할 수 있다는 걸 자연스럽게 깨닫게 되었습니다.<br/>
<br/>
이후로는 사용자가 어떤 흐름을 통해 서비스를 이용하게 될지를 먼저 고민해보려 노력하였습니다.<br/>
고민 과정에서 반복적인 비교 작업을 빠르게 처리할 수 있도록 오버레이 단축키 토글 기능을 추가하게 되었고<br/>
필요에 따라 오차 범위를 조절하거나 피드백 시각화 스타일을 커스터마이징할 수 있는 기능도 함께 구현하게 되었습니다.<br/>
<br/>
이러한 기능들은 처음부터 계획한 기능이 아닌 흐름을 그려보며 필요한 순간마다 하나씩 만들어간 결과였습니다.<br/>
<br/>
이번 프로젝트는 제가 UX를 처음으로 ‘마지막에 덧붙이는 요소’가 아니라,<br/>
‘기획의 가장 앞단에서부터 함께 고민해야 하는 핵심’으로 받아들인 경험이었습니다.<br/>
작은 흐름에도 이유를 담아보려 했던 이번 경험이 이후 더 큰 흐름 설계를 위한 밑거름이 되었습니다.