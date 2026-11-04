---
name: sk-hynix-web-design
description: Build or refine desktop web interfaces for SK hynix-themed tasks using official Montage React components and SK hynix CI colors. Use for 하이닉스 디자인, SK하이닉스 업무 화면, or 하이닉스 색상의 Montage UI. Apply only when the task or user requests SK hynix branding.
---

# SK하이닉스 웹 디자인

과제의 브랜드 지시와 기존 제품 구조가 최우선이다. 공식 Montage 컴포넌트의 동작·접근성·조합은 유지하고, 검증된 SK CI 색상을 제품의 브랜드 표현에 적용한다. 공식 SK하이닉스 디자인 시스템이나 양사의 제휴 결과로 소개하지 않는다. 필수 기능과 검증이 브랜드 작업보다 먼저다.

## 의도가 있는 화면 구성

- 화면의 제목·문구·장식·배지·지표·아이콘은 사용자가 이해하거나 행동·판단하는 데 어떤 역할이 있는지 확인한다. 설명할 수 없는 요소와 같은 뜻을 반복하는 장식은 추가하지 않으며 기존 화면을 수정할 때도 제거한다. 확인되지 않은 상태를 사실처럼 표시하지 않는다.
- 한국어 화면에는 한국어를 기본으로 쓴다. `COMMUTE BUS SERVICE`, `WORKSPACE`, `DASHBOARD`처럼 멋을 위한 영문 소제목이나 같은 내용을 반복하는 영문 문구는 넣지 않는다. 실제 제품명·식별자·파일명·데이터 형식 등 영문이 사용자의 과업에 필요한 경우에만 유지한다.
- 시각적 강조는 중요한 정보와 주요 행동을 구분하기 위해 사용한다. 의미 없는 카드, 수치, 색상, 장식 문구를 완성도처럼 추가하지 않는다. 작업 후 실제 화면의 문구와 요소를 다시 보며 목적이 없거나 중복되는 부분을 걷어낸다.

## 브랜드와 로고

- 공식 [SK하이닉스 CI](https://www.skhynix.com/company/UI-FR-CP0402/)의 HEX는 SK Red `#EA002C`, SK Orange `#F47725`다. CI 페이지의 RGB와 HEX가 일부 서로 다르므로 위 HEX를 그대로 사용한다. 중립 배경을 기본으로 하고 빨강·주황을 강조에 절제해 사용한다.
- 로고는 과제에서 제공했거나 해당 용도로 사용과 재배포가 허용된 공식 원본을 확인해 쓴다. 공식 CI의 비율과 여백을 지키고 변형하거나 임의로 그리지 않는다. 이 스킬에는 재배포 권한이 확인된 로고가 없으므로 제공받기 전에는 제품명 텍스트를 사용한다. 런타임에 원격 사이트에 의존하지 않는다.
- 색상만으로 상태를 구분하지 않고 글자·아이콘을 함께 사용한다. 붉은 브랜드색과 오류색을 구분하고, 일반 텍스트·버튼·포커스 및 disabled 상태의 실제 대비를 확인한다. 주황 배경에 흰색 본문을 기본값으로 쓰지 않는다.

## Montage 컴포넌트와 적용

- React에서는 [Montage 구현 가이드](references/montage-implementation.md), [컴포넌트 선택표](references/montage-components.md), [조합 기준](references/montage-composition.md)을 필요한 만큼 읽고 공식 `@montage-ui/core` 컴포넌트와 설치된 버전의 API를 사용한다. 기존 프로젝트의 기술 스택과 컴포넌트가 있으면 먼저 재사용한다.
- 이 스킬의 [브랜드 토큰](assets/sk-hynix-brand.css)은 동봉 예제의 Montage 4.1.5에서 확인한 light 테마의 브랜드 의미 토큰을 덮어쓴다. Montage `global.css` 뒤에 불러오고 실제 사용한 버튼·탭·필터·포커스 상태를 검사한다. 프로젝트 버전이나 테마 구현이 다르면 해당 버전의 토큰을 확인한다. dark 테마는 이 파일로 재정의하지 않으므로 별도 검증 없이 브랜드 적용을 주장하지 않는다.
- 기존 테마 전체나 오류·성공 상태 토큰을 무조건 변경하지 않는다. Montage가 공식 제공하는 차트는 확인되지 않았고 동봉 예제의 차트 테마는 별도 구현이다. 업무에 필요한 지표와 상태를 먼저 정한다.
- 실제 폰트를 로드한다. 동봉한 [Pretendard Variable](assets/react-starter/PretendardVariable.woff2)을 사용할 때 [OFL](assets/OFL.txt)을 보존한다. 텍스트 크기뿐 아니라 글꼴, 굵기, 행간과 자간을 함께 확인한다.

## 실행 가능한 예제와 검증

[React starter](assets/react-starter)는 원본의 Montage 컴포넌트·표·폼·필터·상세·대시보드 흐름을 유지하고 브랜드 토큰을 불러온다. 예제는 실제 제품이나 공식 브랜드 화면이 아닌 가상 데이터이며 저장은 메모리에만 유지된다. `npm ci && npm run build`로 빌드하고 사용한 화면·빈 상태·오류·키보드 동작을 확인한다. 프로젝트에 필요한 부분만 가져온다.

- 입력 검증, 선택·검색·저장, 로딩·오류·빈 상태와 포커스 이동을 실제 데이터에 연결한다. 색상 적용을 이유로 역할별 기능이나 예외 처리를 생략하지 않는다.
- 브랜드 CSS, 컴포넌트 상태, 버튼 글자와 배경의 대비를 렌더링 결과로 확인한다. 시각 검증을 하지 않았다면 확인했다고 주장하지 않는다. 출처와 라이선스는 [Montage 구현 가이드](references/montage-implementation.md) 및 동봉한 라이선스를 따른다.
