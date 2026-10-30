---
name: wanted-web-design
description: "Build or refine desktop-first websites in Wanted's observed PC visual style, with official Montage components, measured typography, and reusable dropdown/filter, dashboard/chart, table, form, detail, profile, navigation and feedback patterns for hackathon products. Use for 원티드 웹 스타일, 원티드 PC 디자인, or improving fidelity to Wanted in any domain. Preserve the requested topic; use wanted-app-design for native mobile apps."
---

# 원티드 PC 웹 디자인

원티드 웹의 컴포넌트와 글자 체계를 요청한 제품에 적용한다. 흰 배경·파란 버튼·둥근 카드만으로 원티드 스타일이라고 판단하지 않는다. 사용자의 주제, 데이터, 기능, 기존 기술 스택은 유지한다.

## 시작

[인터랙션·화면 선택표](references/interaction-patterns.md)를 읽고 사용자 주제의 핵심 행동에 맞는 구조를 선택한다. 카드 탐색 외에 표·폼·상세·프로필·진행·데이터 화면을 고려한다. 타이포그래피와 기존 목록 규격은 [실측 명세](references/desktop-design-system.md)를 읽는다. 수치는 2026-10-31 PC 웹에서 관찰한 값이며 공식 디자인 토큰이라고 부르지 않는다. 레이아웃을 주제에 맞게 조정한 부분은 실측과 구분한다.

- React라면 [공식 Montage 구현 가이드](references/montage-implementation.md)를 확인하고 필요한 공식 컴포넌트를 사용한다. 실행 가능한 [starter](assets/react-starter/src/app.jsx)는 표·필터, 상세, 폼, 진행 상태와 데이터 대시보드를 담는다. 기존 HTML/프레임워크를 불필요하게 전환하지 않는다.
- **폰트를 실제로 로드한다.** `font-family` 이름만 지정하면 폴백 폰트로 보일 수 있다. [assets/PretendardVariable.woff2](assets/PretendardVariable.woff2)와 [assets/wanted-web.css](assets/wanted-web.css)를 같은 공개 자산 폴더에 복사하거나 프로젝트의 폰트 로더를 사용한다. [OFL.txt](assets/OFL.txt)도 보존한다. CSS는 독립적으로 작성한 구현이며 공식 원티드 라이브러리가 아니다.
- 기존 프레임워크에서는 같은 규격을 기존 컴포넌트에 옮긴다. 프로젝트 전역 스타일을 무조건 덮어쓰지 않는다. `w-` 클래스의 필요한 부분만 사용해도 된다.
- 글자 크기만 맞추지 말고 **family / size / weight / line-height / letter-spacing / color**를 하나의 역할로 맞춘다. 650·750 같은 임의 굵기나 일괄 음수 자간을 UI 전체에 적용하지 않는다.
- 레퍼런스 버튼의 계산값을 읽을 때 실제 글자를 담은 span도 확인한다. 버튼의 기본 14px/400과 내부 라벨의 13px/500 또는 24px/700은 다르다. 외곽선이 border가 아니라 inset shadow인 경우도 확인한다.

## 대시보드·차트 요청

데이터 화면이면 [대시보드 패턴](references/dashboard-patterns.md)을 읽어 판단 목적과 배치를 고른다. 차트 선택·원티드 스타일 테마는 [chart-recipes.md](references/chart-recipes.md), 지표 계산·분모·결측·기간·SPC 해석은 [data-contracts.md](references/data-contracts.md)를 필요한 부분만 읽는다.

- 공개 Montage UI와 독립 차트 테마를 구분한다. 공개 목록에서 원티드 전용 차트 컴포넌트를 확인하지 못했으므로 자체 차트를 공식 원티드 차트라고 부르지 않는다.
- KPI → 추이/비교 → 분포/관계 → 원본 기록 흐름에서 사용자에게 필요한 것만 선택한다. 표를 장식용 차트로 대체하지 않는다.
- 비율은 원본 분자/분모로 집계한다. %와 %p, 0과 미수집, 목표선과 통계 관리한계를 구분한다. mock/추정/관측을 표시한다.
- [대시보드 구현](assets/react-starter/src/dashboard/Dashboard.jsx)은 6종 시각화와 연동 표를 제공한다. `npm ci && npm test && npm run build` 후 `dist/dashboard.html`로 확인한다. 기존 차트 엔진이 있으면 동일 역할을 매핑하고 불필요하게 교체하지 않는다.

## 주제에 적용

1. 요청한 핵심 행동을 유지하고 목록·상세·관리 화면 중 적합한 구조를 고른다. 기존 표를 무조건 이미지 그리드로 바꾸지 않는다. 여러 보기 방식이 필요하면 같은 데이터를 공유한다.
2. 상단 바, 범위 선택, 필터, 정렬, 콘텐츠의 정렬선과 수직 간격을 맞춘다. 목록 레퍼런스에 없는 큰 영웅 제목, KPI 카드, 소개 문구, 검색 행을 습관적으로 추가하지 않는다. 기능상 추가할 때는 그로 인한 레이아웃 차이를 설명한다.
3. 제목·메타 정보·버튼 라벨에 실측 역할을 연결한다. 단위가 다른 컴포넌트에 모든 텍스트 14px, 모든 radius 14px 같은 규칙을 쓰지 않는다.
4. 선택·검색·정렬·저장·초기화·닫기를 실제 데이터와 연결한다. 필터의 draft/applied를 분리하고 드롭다운의 열림·선택·키보드 상태까지 구현한다. 네이티브 OS select를 공식 커스텀 dropdown과 같은 모양이라고 간주하지 않는다. 네이티브 dialog 또는 기존 접근성 라이브러리로 Escape, 포커스 복귀, 키보드 탐색을 지원한다.
5. 로고·회사명·공고·전용 이미지 대신 주제에 맞는 자산과 문구를 쓴다. 가상 데이터와 개념도는 예시라고 표시한다. 이미지의 품질과 다양성은 폰트·컴포넌트 일치와 별개로 평가한다.

## 확인

- PC 비교는 같은 CSS viewport에서 한다. 1440px 또는 실제 요청 폭을 사용하고 브라우저가 좁은 패널 너비로 모바일 레이아웃을 보여주지 않는지 확인한다.
- 폰트 로드 완료를 확인한 후 렌더링을 비교한다. `document.fonts`의 해당 FontFace가 `loaded`인지 확인한다. `document.fonts.check()`만으로는 폴백 사용을 놓칠 수 있다. 가능하면 개발 도구의 rendered font도 확인한다.
- 측정한 역할의 font-size/weight/line-height/tracking, 필터 높이, 반지름, 카드 안쪽 여백을 결과와 대조한다. 실제 상호작용의 선택·열림·빈 상태도 확인한다. 사용한 표의 페이지 이동, 폼의 오류→수정→성공, 상세의 펼치기/CTA를 실행한다.
- 시각적 확인 없이 “유사도 높음”이라고 하지 않는다. 전체 유사도 백분율을 만들지 않는다. 맞춘 수치, 달라진 구성, 미확인 범위를 분리해 알려준다.
- 모바일 웹은 별도로 넘침을 확인하되 PC 기준을 먼저 충족한다. 모든 상태·모든 원티드 페이지를 관찰했다고 주장하지 않는다.
