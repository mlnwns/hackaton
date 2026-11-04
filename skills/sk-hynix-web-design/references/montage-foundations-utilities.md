# Montage 기반과 웹 유틸리티

2026-10-31, `@montage-ui/*@4.1.5` 기준. [Foundations](https://montage.wanted.co.kr/docs/foundations)의 Colors·Elevation·Grid·Icons·Typography와 [Utilities](https://montage.wanted.co.kr/docs/utilities)의 웹 항목 **30개**를 정리했다. 개별 컴포넌트는 [54종 선택표](montage-components.md), 화면 구성은 [조합 기준](montage-composition.md)로 연결한다.

## 기반을 맞추는 순서

1. `ThemeProvider`와 `@montage-ui/core/global.css`를 프로젝트 진입점에 적용한다. 함께 쓰는 `@montage-ui/*` 패키지 버전을 맞춘다. 설치와 라이선스는 [구현 가이드](montage-implementation.md)를 따른다.
2. 실제 폰트를 로드한다. 공식 Montage Typography 문서는 **Pretendard JP**를 기본 글꼴로 설명한다. 이 스킬에 동봉한 파일은 **Pretendard Variable**이며 둘을 같은 파일이라고 소개하지 않는다. 한글 제품은 동봉 폰트를 쓸 수 있지만 일본어 포함/정밀 재현 시 해당 글꼴과 실제 렌더링을 확인한다.
3. Typography의 variant/weight와 semantic 색을 사용한다. 직접 만든 차트·숫자·HTML 요소에도 같은 역할을 매핑한다. 기존 원티드 PC 서비스의 [실측값](desktop-design-system.md)과 Montage 토큰이 다르면 실제 서비스 재현인지 공식 시스템 적용인지 목적에 맞춰 구분한다.
4. 레이아웃 간격은 기본 4px 단위를 사용한다. 시각 보정은 2px, 필요한 경우 1px. 컴포넌트 내부의 공식 패딩·radius를 이 원칙으로 재계산하여 덮지 않는다.
5. PC 화면을 먼저 검토하고 좁은 폭을 별도로 검토한다. 테마를 제공한다면 같은 semantic 역할로 색을 전환하고 모달·차트·tooltip까지 확인한다.

## 색·층위·그리드·아이콘

| 역할 | 사용 방법 |
|---|---|
| 전경 | `theme.semantic.foreground.neutral.primary` 등의 neutral 위계로 제목·본문·보조 정보를 구분. 브랜드/부정 상태는 해당 foreground 역할 사용. |
| 배경·표면 | background는 페이지, surface는 패널/브랜드/오버레이 표면. 다크 모드에서 elevated와 일반 배경의 차이를 유지. 전경 색을 반투명하게 만드는 방법만으로 모든 표면을 만들지 않는다. |
| 선·그림자 | semantic line은 border/divider, elevation shadow는 층위. 투명 선을 중첩하면 진해지므로 필요시 opaque 토큰. 모든 패널에 팝오버 수준의 그림자를 쓰지 않음. |
| 화면 폭 | xs=0, sm=768, md=992, lg=1200, xl=1600px. 공식 Grid 문서의 컨테이너 최대폭은 lg 1100px, xl 1440px(패딩 포함). 넓은 분석 화면으로 확장하면 제품 레이아웃 응용임을 구분. |
| 아이콘 | `@montage-ui/icon`의 실제 export 사용. 같은 역할에 서로 다른 선 두께·이모지 혼용 지양. IconButton 등은 해당 슬롯/size에 맞춰 넣고 접근 가능한 이름 제공. |

Grid는 12열 기반, 컬럼 간격은 공식 Foundation에서 20px를 제시한다. 고정 메뉴·본문·차트 분할은 읽는 순서에 따라 묶는다. 모든 화면을 12개의 동일 폭 카드로 만들 필요는 없다. `containerStyle(true)`를 쓸 때 xl까지의 대응이 활성화됨을 확인한다.

## Typography 역할

토큰의 글자 크기·행간·자간·굵기를 함께 쓴다. `bold`가 항상 700은 아니다. display/title 계열은 700, heading 이하 계열은 600으로 정의되어 있다. font-size만 옮기고 weight/line-height를 브라우저 기본값으로 남기지 않는다.

| 역할 예시 | variant | 크기 / 행간 (기본 root 16px) |
|---|---|---|
| 큰 페이지 제목 | title1 / title2 / title3 | 32/44, 28/38, 24/32px |
| 섹션 제목 | heading1 / heading2 | 22/30, 20/28px |
| 강조 문장 | headline1 / headline2 | 18/26, 17/24px |
| 본문 | body1 / body2 | 16/24, 15/22px |
| 보조·메타 | label1 / label2 / caption1 / caption2 | 14/20, 13/18, 12/16, 11/14px |

긴 글에는 `body1-reading`, `body2-reading`, `label1-reading`을 고려한다. theme 객체 키는 camelCase(`body1Reading`), 공개 variant는 kebab-case(`body1-reading`)다. 큰 display1/2/3(56/40/36px)을 데이터 화면에 관성적으로 쓰지 않는다. 시각적 variant와 HTML 제목 단계는 별개이므로 올바른 h1/h2/label 등의 의미 구조도 보존한다. 한글을 고정 폭에 맞추려고 모든 문장에 수동 줄바꿈을 넣지 않는다.

공식 토큰 근거: [theme/typography](https://github.com/wanteddev/montage-web/blob/d2d49a5017e498792cfbbe797bf81528227c7240/packages/theme/src/theme/typography/index.ts), [semantic](https://github.com/wanteddev/montage-web/blob/d2d49a5017e498792cfbbe797bf81528227c7240/packages/theme/src/theme/semantic/index.ts), [breakpoint](https://github.com/wanteddev/montage-web/blob/d2d49a5017e498792cfbbe797bf81528227c7240/packages/theme/src/theme/breakpoint/index.ts).

## 레이아웃·텍스트 유틸리티 · 10개

| 공식 항목 | 실제 API / 적용할 때 |
|---|---|
| [Box](https://montage.wanted.co.kr/docs/utilities/web-utility-components/box) | `Box`. `sx`로 theme 접근, `as`로 의미 있는 태그 선택. 불필요한 전역 CSS 대신 해당 요소의 레이아웃 보정. |
| [FlexBox](https://montage.wanted.co.kr/docs/utilities/web-utility-components/flex-box) | `FlexBox`. 툴바·버튼·슬롯 정렬. gap/wrap 및 responsive props 활용. |
| [Grid](https://montage.wanted.co.kr/docs/utilities/web-utility-components/grid) | `Grid`, `GridItem`. 12열 중 columns/offset. auto는 내용 폭, true는 남은 공간, 5등분은 2.4. |
| [Divider](https://montage.wanted.co.kr/docs/utilities/web-utility-components/divider) | `Divider`. vertical, color, size(길이), thickness(두께). 부모가 이미 선을 제공하면 중복하지 않음. |
| [ScrollArea](https://montage.wanted.co.kr/docs/utilities/web-utility-components/scroll-area) | `ScrollArea`. 제한된 내부 스크롤, scrollbars horizontal/vertical/both; type hover/scroll/auto/always. 페이지 안에 이유 없는 다중 스크롤 생성 지양. |
| [Typography](https://montage.wanted.co.kr/docs/utilities/web-utility-components/typography) | `Typography`. variant/weight/color를 역할 단위로 사용. |
| [Label](https://montage.wanted.co.kr/docs/utilities/web-utility-components/label) | `Label`. 독립 입력의 htmlFor와 required 표시. 폼 내부는 보통 FormControlLabel 우선. |
| [containerStyle](https://montage.wanted.co.kr/docs/utilities/web-utilities/container-style) | `containerStyle()(theme)`. 헤더/본문 정렬선 공유. `containerStyle(true)(theme)`는 xl까지 대응. |
| [typographyStyle](https://montage.wanted.co.kr/docs/utilities/web-utilities/typography-style) | `typographyStyle(variant, weight)`. 기존 태그·커스텀 요소에 Typography 규격 적용. |
| [ellipsisTypographyStyle](https://montage.wanted.co.kr/docs/utilities/web-utilities/ellipsis-typography-style) | `ellipsisTypographyStyle(line)` 기본 1줄. 잘린 정보가 판단에 필요하면 전체 보기 경로도 제공. |

## 스타일·환경 유틸리티 · 8개

| 공식 항목 | 실제 API / 적용할 때 |
|---|---|
| [listStyle](https://montage.wanted.co.kr/docs/utilities/web-utilities/list-style) | `listStyle`. 설명·정책의 불릿/중첩 목록. ListCell UI와 혼동하지 않음. |
| [addOpacity](https://montage.wanted.co.kr/docs/utilities/web-utilities/add-opacity) | `addOpacity`. theme 색 또는 custom hex에 투명도 적용. 전경 대비를 임의로 낮추지 않음. |
| [gradient](https://montage.wanted.co.kr/docs/utilities/web-utilities/gradient) | `gradient`. solid/multiple/mask 용도별 경계 처리. 장식용 대형 배경을 기본값으로 추가하지 않음. |
| [Media](https://montage.wanted.co.kr/docs/utilities/web-utilities/media) | **문서 분류명**. `respondTo`/`respondDown`, `respondMore`/`respondUp`, `useMediaQuery`. `<Media>` import를 만들지 않는다. 768 기준 down은 최대767, up은 최소768px. |
| [Navigation](https://montage.wanted.co.kr/docs/utilities/web-utilities/navigation) | **theme 스타일 안내**. 예: `theme.semantic.platform.ios.navigation`. 별도 `<Navigation>` export가 아님. PC GNB 구조를 자동 제공하지 않음. |
| [ForceTheme](https://montage.wanted.co.kr/docs/utilities/web-utility-components/force-theme) | `ForceTheme`. 특정 영역 테마를 의도적으로 고정할 때. 앱 전체 테마 정책과 구분. |
| [useThemeControl](https://montage.wanted.co.kr/docs/utilities/web-utilities/use-theme-control) | `useThemeControl`. theme/setTheme/themeOriginValue. system은 ThemeProvider의 enableDarkMode 설정과 확인. 기본 쿠키 지속 동작을 고려하고 앱 상태와 중복 저장하지 않음. |
| [useSize](https://montage.wanted.co.kr/docs/utilities/web-utilities/use-size) | `useSize`. 요소의 실제 크기 상태가 필요할 때. 단순 반응형 레이아웃은 CSS/Media 우선. 차트 resize 연결에 활용 가능. |

## 오버레이·동작 기반 · 8개

대부분 공식 Menu/Modal/Popover 등에 이미 포함된다. 제품 구현에서는 완성된 컴포넌트를 우선하고 이 primitive들을 무조건 겹쳐 감싸지 않는다.

| 공식 항목 | 실제 API / 적용할 때 |
|---|---|
| [Popper](https://montage.wanted.co.kr/docs/utilities/web-utility-components/popper) | `Popper`, `PopperAnchor`, `PopperContent`, `PopperArrow`. 직접 만드는 앵커형 오버레이의 위치·충돌 처리. |
| [Portal](https://montage.wanted.co.kr/docs/utilities/web-utility-components/portal) | `Portal`. React createPortal 래퍼. 모달/메뉴의 실제 DOM 컨테이너와 z-index 관계 확인. |
| [FocusScope](https://montage.wanted.co.kr/docs/utilities/web-utility-components/focus-scope) | `FocusScope`. 직접 구현한 오버레이의 포커스 진입·제한·복귀. 공식 컴포넌트와 중복 trap 금지. |
| [DismissableLayer](https://montage.wanted.co.kr/docs/utilities/web-utility-components/dismissable-layer) | `DismissableLayer`. 외부 pointer/focus/Escape 처리. 예외는 실제 필요한 영역에만 설정. |
| [ariaHidden](https://montage.wanted.co.kr/docs/utilities/web-utilities/aria-hidden) | **문서 제목과 import 구분**: `hideOthers` 등 aria-hidden 패키지 재export. 수동 사용 시 반환 cleanup으로 복구. 화면만 가리고 스크린리더 접근은 남는 문제 방지. |
| [AnimationPresence](https://montage.wanted.co.kr/docs/utilities/web-utility-components/animation-presence) | `AnimationPresence`. CSS animation/transition 종료 후 언마운트. 공식 오버레이에 내장된 경우 재추가하지 않음. |
| [WithInteraction](https://montage.wanted.co.kr/docs/utilities/web-utility-components/with-interaction) | `WithInteraction`. custom 클릭 요소의 hover/press 레이어, light/normal/strong. 실제 클릭·키보드 의미는 따로 제공. 비인터랙티브 박스에 적용하지 않음. |
| [NoSsr](https://montage.wanted.co.kr/docs/utilities/web-utility-components/no-ssr) | `NoSsr`. 브라우저 전용 요소만 클라이언트 렌더링. 모든 hydration 오류를 숨기기 위해 전체 화면을 감싸지 않음. |

## 피드백 유틸리티 · 4개

| 공식 항목 | 실제 API / 적용할 때 |
|---|---|
| [useToast](https://montage.wanted.co.kr/docs/utilities/web-utilities/use-toast) | `useToast`. content와 normal/positive/cautionary/negative. 실제 처리 결과가 정해진 뒤 호출. |
| [useSnackbar](https://montage.wanted.co.kr/docs/utilities/web-utilities/use-snackbar) | `useSnackbar`. title/description/action/extraContent/closeButton. 행동이 있는 알림에 사용. |
| [useAlert](https://montage.wanted.co.kr/docs/utilities/web-utilities/use-alert) | `useAlert`. `Promise<'confirm' | 'cancel'>`. confirm일 때만 해당 행동 진행. cancel·Escape·외부 닫힘을 성공으로 처리하지 않음. |
| [RegionConfig](https://montage.wanted.co.kr/docs/utilities/web-utility-components/region-config) | `RegionConfig`. Toast/Snackbar 표시 영역 조절, 언마운트 시 복원. 하단 ActionArea와 겹칠 때 맥락에 맞춰 사용하며 데스크톱 기본 배치를 이유 없이 변경하지 않음. |

## API를 옮길 때 놓치기 쉬운 연결

| 요소 | 제어 상태·변경 콜백 |
|---|---|
| TextField / TextArea / SearchField | value + onChange(event), 값은 event.target.value |
| Select / SelectMultiple | value + onChange(value), 이벤트 객체 아님 |
| Tab / Category / SegmentedControl / RadioGroup / Autocomplete | value + onValueChange(value); Autocomplete asSelect는 inputValue도 분리 |
| Checkbox / CheckMark / Switch | checked + onCheckedChange(boolean) |
| Accordion / Pagination / Date·Time Picker | 각각 expanded + onChange(boolean), page + onChange(page), value + onChange(date 값); 공통 이름이지만 인자 타입은 다름 |

Menu의 variant는 MenuItem에, Popup/Bottom sheet의 variant는 ModalContainer에 들어간다. 슬롯·controlled 상태·콜백 타입은 설치된 타입 정의에서 확인한다. 기본 동작을 CSS 모양만 복제하고 의미·키보드 동작을 누락하지 않는다.
