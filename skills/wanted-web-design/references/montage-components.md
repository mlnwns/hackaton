# Montage 전체 웹 컴포넌트 선택표

2026-10-31 기준 공식 사이트의 **54개 컴포넌트 Design·Web 문서**를 검토한 적용 가이드다. 모든 prop을 복제한 API 문서가 아니다. 필요한 행을 선택한 뒤 연결된 공식 문서와 설치 버전의 타입을 확인한다. 화면 전체 조합은 [montage-composition.md](montage-composition.md), 공통 토큰·30개 유틸리티는 [montage-foundations-utilities.md](montage-foundations-utilities.md)를 읽는다.

출처: [공식 목록](https://montage.wanted.co.kr/docs/components), [공식 문서 소스 스냅샷](https://github.com/wanteddev/montage-web/tree/d2d49a5017e498792cfbbe797bf81528227c7240/docs/data/components). 검토 기준 `@montage-ui/core@4.1.5`. 아래 각 링크는 Web 탭이며 URL 끝의 `/web`을 `/design`으로 바꾸면 같은 항목의 Design 지침을 볼 수 있다. 이 문서의 업무 예시는 독립적인 응용이다. 전체 54종의 모든 상태를 브라우저에서 실행 검증했다는 뜻은 아니다.

## Actions · 5개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Action area](https://montage.wanted.co.kr/docs/components/actions/action-area/web) · `ActionArea`, `ActionAreaButton` | 폼·Modal의 최종 행동 묶음. 주행동과 대안의 무게에 따라 `strong`, `neutral`, `compact`, `cancel` 선택 | `compact`는 560px 이상 데스크톱 모달에 권장. extra/compactContent 슬롯 활용. 닫기와 X를 같은 기능으로 중복하지 않는다. |
| [Button](https://montage.wanted.co.kr/docs/components/actions/button/web) · `Button` | 저장·생성·적용. 주행동 solid, 보조행동 outlined/assistive. 비동기 처리에는 `loading` | `negative`는 solid에서만 지원. 정해진 size로 높이·radius 유지. `iconOnly`는 일반 버튼 옆 아이콘 행동에 사용하고 이름을 제공. leading/trailing 아이콘 동시 사용 지양. |
| [Chip](https://montage.wanted.co.kr/docs/components/actions/chip/web) · `Chip` | 짧은 선택지, 선택한 필터, 삭제 가능한 태그. SelectMultiple의 선택 표현과 조합 | `active`를 실제 선택과 연결. solid/outlined, 4가지 size. 읽기 전용 상태 설명은 ContentBadge. 임의 높이·테두리·radius 변경 금지. |
| [Icon button](https://montage.wanted.co.kr/docs/components/actions/icon-button/web) · `IconButton` | 더보기·닫기·설정처럼 익숙한 행동. Tooltip/PushBadge와 조합 | `aria-label` 제공. normal/background/outlined/solid의 지원 size가 다르다. `interactionOverflow`는 레이아웃보다 넓게 반응 영역을 그리므로 간격 확보. ActionArea에는 ActionAreaButton 사용. |
| [Text button](https://montage.wanted.co.kr/docs/components/actions/text-button/web) · `TextButton` | 섹션의 전체 보기·부가 링크·Snackbar 행동. primary/assistive, small/medium | 독립 버튼 행에서 일반 Button과 나란히 혼합하지 않는다. 공통 ActionArea의 지원 구성을 사용. 본문 텍스트와 행동을 구분하고 정해진 높이 유지. |

## Contents · 11개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Accordion](https://montage.wanted.co.kr/docs/components/contents/accordion/web) · `Accordion`, `AccordionSummary`, `AccordionDetails`, `AccordionDescription` | 상세 정책·진단 근거·FAQ를 점진적으로 공개. 슬롯은 AccordionSummaryContent/LabelTrailing/ExtraContent | `expanded`/`onChange`. 독립 trailing 행동은 클릭 전파 분리. 중첩 시 들여쓰기, clipping 문제는 하위 full 또는 disableAnimation 검토. 중요한 오류·필수 입력을 접힌 채 숨기지 않는다. |
| [Avatar](https://montage.wanted.co.kr/docs/components/contents/avatar/web) · `Avatar`, `AvatarButton` | 사람·조직의 식별. ListCell/담당자/댓글에 배치. 새 소식은 PushBadge | 이미지 부재 fallback, 버튼이면 AvatarButton. person은 원형 유지. custom은 4배수 크기. 배지 겹침에는 outlineBorder, 아바타 크기에 맞는 배지 size. |
| [Avatar group](https://montage.wanted.co.kr/docs/components/contents/avatar-group/web) · `AvatarGroup`, `AvatarGroupContent` | 여러 담당자·협업자. Avatar 최대 5개와 뒤쪽 추가 인원 텍스트 | 그룹 size와 Avatar size 맞춤. 생략 인원을 가짜 Avatar로 만들지 않고 trailingContent에 표시. |
| [Card](https://montage.wanted.co.kr/docs/components/contents/card/web) · `Card`, `CardThumbnail`, `CardBody`, `CardTitle`, `CardCaption`, `CardRow` | 이미지 중심 탐색. Thumbnail·ContentBadge, 전용 Skeleton 조합 | desktop 기본 이미지 3:2, mobile 4:3. 제목 최대 2줄·캡션 1줄. DOM과 시각 순서 일치. 모든 표·KPI를 이 이미지 카드로 대체하지 않는다. |
| [Content badge](https://montage.wanted.co.kr/docs/components/contents/content-badge/web) · `ContentBadge` | 상태·분류·속성 표시. Table/ListCell/Card의 보조 정보 | 비인터랙티브. solid/outlined와 neutral/accent 역할 구분. accentColor가 전경·배경을 함께 정하도록 사용. 작은 배지 간격 6px, medium 8px 권장. 선택 행동은 Chip. |
| [List card](https://montage.wanted.co.kr/docs/components/contents/list-card/web) · `ListCard`, `ListCardThumbnail`, `ListCardBody`, `ListCardTitle`, `ListCardCaption`, `ListCardRow`, `ListCardContent` | 이미지와 정보를 가로로 읽는 고밀도 콘텐츠 목록. Bookmark·Checkbox 슬롯과 조합 | desktop/mobile 규격 사용. 제목·캡션 기본 각각 1줄. 전용 Skeleton 활용. 카드 전체 링크와 내부 버튼을 중첩 인터랙티브 HTML로 만들지 않는다. |
| [List cell](https://montage.wanted.co.kr/docs/components/contents/list-cell/web) · `List`, `ListCell`, `ListCellContent`, `ListCellLabelTrailing`, `ListCellExtraContent` | 설정·선택 목록·메뉴의 한 행. leading Avatar/Radio/Checkbox, trailing 값/배지/Switch | inset/full의 패딩 차이 이해. 기본 내부 정렬 flex-start. selected 체크와 Radio/Checkbox를 중복 표기하지 않는다. 셀 클릭이 내부 컨트롤을 전달 클릭할 수 있지만 Switch는 예외. 두 번 토글하지 않도록 한 곳에서 상태 변경. |
| [Play badge](https://montage.wanted.co.kr/docs/components/contents/play-badge/web) · `PlayBadge` | Thumbnail 위 비디오 식별·재생 진입점 | 영상 중앙에 하나. 장식용 상태 아이콘으로 재사용하지 않음. 실제 재생 행동·접근 가능한 이름은 제품에서 연결. |
| [Section header](https://montage.wanted.co.kr/docs/components/contents/section-header/web) · `SectionHeader`, `SectionHeaderNavigation`, `SectionHeaderNavigationButton` | 섹션 제목 + 필터·전체 보기·캐러셀 이동. headingContent/trailingContent 활용 | desktop/mobile 및 xsmall~large 사용. 제목·우측 요소의 기준선과 위계 유지. 짧은 제목, 최대 두 줄. 모든 섹션에 별도 큰 헤더를 쌓지 않는다. |
| [Table](https://montage.wanted.co.kr/docs/components/contents/table/web) · `Table`, `TableHead`, `TableHeadCell`, `TableBody`, `TableRow`, `TableCell` | 기록·공정·비용·실험 비교. Checkbox/ContentBadge/정렬/필터/Pagination 조합 | 기본 행은 데이터 표시. `interaction`은 실제 행동 있을 때만. 숫자는 우측·단위 명시, 헤더 유지. 가상 스크롤은 별도 구현이며 자동 제공 기능으로 오해하지 않음. 좁은 화면은 별도 요약 목록 또는 명시적 가로 스크롤. |
| [Thumbnail](https://montage.wanted.co.kr/docs/components/contents/thumbnail/web) · `Thumbnail` | 대표 이미지·영상. ratio/portrait, border/radius, overlay에 PlayBadge | 원본 비율·주요 피사체 보존 및 실패 대체 이미지. 모서리 둥글기 활성화 시 공식 규격 사용. 임의의 사진을 데이터 차트 대신 넣지 않는다. |

## Feedback · 6개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Alert](https://montage.wanted.co.kr/docs/components/feedback/alert/web) · `Alert`, `AlertContainer`, `AlertContent`, `AlertHeading`, `AlertDescription`, `AlertActionArea`, `AlertActionAreaButton` | 파괴적 행동·반드시 필요한 결정. 간단한 경우 useAlert | 취소 + 구체적 행동명, 위험 행동 negative. 일반 성공 알림에는 사용하지 않음. 버튼 기본은 닫기 동작; 비동기 검증 시 preventDefault와 완료·오류 상태 설계. |
| [Fallback view](https://montage.wanted.co.kr/docs/components/feedback/fallback-view/web) · `FallbackView`, `FallbackViewContent`, `FallbackViewText`, `FallbackViewActionArea`, `FallbackViewActionAreaButton` | 첫 사용·결과 없음·실패·권한 없음. 이유와 가능한 다음 행동 제공 | 버튼은 전용 ActionArea 안에, single/horizontal/vertical. 작은 패널은 compact. ‘데이터 없음’과 ‘불러오기 실패’를 같은 메시지로 합치지 않는다. |
| [Push badge](https://montage.wanted.co.kr/docs/components/feedback/push-badge/web) · `PushBadge` | 알림·업데이트 개수. Avatar/IconButton/Tab에 부착 | dot/text/max-count. 기본 디자인 개수 상한 99+, 실제 maxCount 설정 가능. 겹침에 outlineBorder. 상태 분류는 ContentBadge. 같은 화면에서 위치 일관성. |
| [Section message](https://montage.wanted.co.kr/docs/components/feedback/section-message/web) · `SectionMessage` | 해당 페이지·영역에 남아야 하는 안내·주의·오류. 재시도/수정 행동과 조합 | info/positive/cautionary/negative/custom. 주메시지 간결하게, 필요시 description. trailingButton과 bottomButton은 메시지 길이에 맞게 선택. 같은 영역에 여러 경고 박스 적층 지양. |
| [Snackbar](https://montage.wanted.co.kr/docs/components/feedback/snackbar/web) · `Snackbar`, `SnackbarContent`, `SnackbarHeading`, `SnackbarDescription`, `SnackbarAction`, `SnackbarCloseButton` | 완료 후 실행 취소·후속 행동이 있는 일시적 피드백. 보통 useSnackbar | 행동에는 실제 복구/이동 연결. 필수 확인이나 복구 불가능한 위험 안내를 자동 소멸시키지 않는다. 디자인 기준 폭 최대 420px, 데스크톱 하단 40px. RegionConfig로 조정 가능해도 이유 없이 기본 배치 변경하지 않음. |
| [Toast](https://montage.wanted.co.kr/docs/components/feedback/toast/web) · `Toast`, `ToastContainer`, `ToastContent`, `ToastIcon` | 저장됨·복사됨처럼 행동 없는 짧은 결과. 보통 useToast | normal/positive/cautionary/negative. 액션 버튼은 Snackbar로. 실제 성공 응답 뒤 표시, 폼 필드 오류를 Toast만으로 전달하지 않음. 최대 2줄을 목표로 간결하게. |

## Loading · 2개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Loading](https://montage.wanted.co.kr/docs/components/loading/loading/web) · `Loading` | 결과 구조를 모르는 처리 대기. 짧은 국소 처리 circular, 문서상 2초 이상 로드에 wanted variant | 완료율을 모를 때 임의 %를 만들지 않는다. 버튼 자체 요청은 Button의 loading 우선. 페이지 전체를 불필요하게 잠그지 않음. |
| [Skeleton](https://montage.wanted.co.kr/docs/components/loading/skeleton/web) · `Skeleton` | 예상 레이아웃이 정해진 최초 로드. text/rectangle/circle 또는 Card/ListCard 전용 Skeleton | 실제 영역 크기를 유지. 정적 메뉴·고정 아이콘까지 skeleton으로 바꾸지 않음. text의 패딩을 높이에 포함. 필요시 animation=false로 줄인 모션 대응. |

## Navigations · 9개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Bottom navigation](https://montage.wanted.co.kr/docs/components/navigations/bottom-navigation/web) · `BottomNavigation`, `BottomNavigationItem` | 모바일 웹의 최상위 목적지 3~5개 | PC 관리 화면의 탭 대용으로 쓰지 않는다. 상세 depth에서는 제거 검토. safe area와 콘텐츠 하단 여백 확보, 아이콘만으로 목적지를 설명하지 않음. |
| [Category](https://montage.wanted.co.kr/docs/components/navigations/category/web) · `Category`, `CategoryList`, `CategoryListItem`, `CategoryPanel` | Tab 아래 세부 분류나 섹션 내 콘텐츠 필터 | CategoryList의 실제 variant는 normal/alternative. 컨테이너 패딩과 horizontal/verticalPadding 중복 방지. 같은 수준에 다른 카테고리 스타일을 연속 적층하지 않음. |
| [Page counter](https://montage.wanted.co.kr/docs/components/navigations/page-counter/web) · `PageCounter` | 갤러리·문서의 현재 위치 / 전체 수를 읽기 전용으로 표시 | 클릭 이동은 별도 버튼이나 PaginationDots. Counter를 페이지 이동 컨트롤로 오해하지 않음. 미디어 내부 사용 시 16px 여백 기준. |
| [Pagination](https://montage.wanted.co.kr/docs/components/navigations/pagination/web) · `Pagination`, `PaginationSelect`, `PaginationField` | 표·큰 검색 결과의 페이지 단위 이동 | extended/compact/minimize. `page`, `totalPages`, `onChange`. 필터·pageSize 변경 후 범위 조정. totalPages는 필터된 결과 기준. 페이지 수와 행 수 혼동 금지. |
| [Pagination dots](https://montage.wanted.co.kr/docs/components/navigations/pagination-dots/web) · `PaginationDots` | 캐러셀의 위치 표시와 이동 | 자동 순환은 별도 기능. 긴 데이터 테이블 탐색에 사용하지 않음. 미디어 밖 20px·안 16px 간격 가이드, 필요시 PageCounter 병행. |
| [Progress indicator](https://montage.wanted.co.kr/docs/components/navigations/progress-indicator/web) · `ProgressIndicator` | 측정 가능한 완료율, 문서 읽기·전송 진행 | `percent` 0~100. 상태·취소 행동은 별도 제공. 완료율을 알 수 없으면 Loading. 같은 작업에 막대와 스피너를 중복하지 않음. |
| [Progress tracker](https://montage.wanted.co.kr/docs/components/navigations/progress-tracker/web) · `ProgressTracker`, `ProgressTrackerItem`, `ProgressTrackerLabelContent`, `Stepper`, `StepperItem` | 의미 있는 여러 단계의 신청·분석·검토. 긴 설명은 vertical, 페이지 단위는 Stepper | 보통 3~5단계, vertical은 2단계부터 가능. 완료·현재·향후 구분. label에 단계 번호 반복 금지. 진행 표시를 실제 검증 상태와 연결. |
| [Tab](https://montage.wanted.co.kr/docs/components/navigations/tab/web) · `Tab`, `TabList`, `TabListItem`, `TabPanel` | 상세의 개요/기록/설정처럼 콘텐츠 영역 전환 | `value`/`onValueChange`, hug/fill. TabPanel mountMode 확인: only-active는 전환 시 언마운트, force-mount는 첫 활성 후 유지, always는 처음부터 유지. 저장 전 입력 유실 방지. |
| [Top navigation](https://montage.wanted.co.kr/docs/components/navigations/top-navigation/web) · `TopNavigation`, `TopNavigationButton` | 모바일 웹·앱 맥락의 상단 제목/뒤로/검색과 toolbar | normal/display/floating/search. Tab과 조합 시 divider 중복 방지. 이 컴포넌트를 원티드 PC GNB와 동일한 규격이라고 하지 않음. PC GNB는 관찰 명세 또는 제품 정보 구조로 구성. |

## Presentation · 6개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Autocomplete](https://montage.wanted.co.kr/docs/components/presentation/autocomplete/web) · `Autocomplete`, `AutocompleteField`, `AutocompleteList`, `AutocompleteOption`, `AutocompleteGroup` | 담당자·설비 코드처럼 입력하며 후보를 좁히는 필드. TextField/SearchField 조합 | `asSelect`는 후보 값만 허용. 입력문자 inputValue와 확정 value를 구분. 검색·빈 결과·debounce/오래된 응답 처리 필요. ActionArea를 안에 넣지 않음. |
| [Bottom sheet](https://montage.wanted.co.kr/docs/components/presentation/bottom-sheet/web) · `Modal`, `ModalContainer`, `ModalNavigation`, `ModalContent` | 좁은 화면의 임시 선택·작업. `ModalContainer variant="bottom"`; full은 별도 variant | resize hug/fixed/fill/flexible. Web 구현의 handle 기본은 false, flexible은 활성화. Navigation과 handle을 불필요하게 중복하지 않음. 복잡한 단계/중첩 시트 대신 별도 화면 검토. |
| [Menu](https://montage.wanted.co.kr/docs/components/presentation/menu/web) · `Menu`, `MenuTrigger`, `MenuContent`, `MenuList`, `MenuItem`, `MenuGroup`, `MenuActionArea` | FilterButton·더보기에서 호출하는 선택 목록. 단일 즉시 적용, 신중한 선택은 하단 적용 | **variant는 MenuItem에 지정**: normal/radio는 문자열, checkbox는 문자열 배열을 Menu value에 연결. 복수 필터는 draft/applied 분리. 콘텐츠 슬롯은 MenuItemContent 등 전용 래퍼. |
| [Popover](https://montage.wanted.co.kr/docs/components/presentation/popover/web) · `Popover`, `PopoverTrigger`, `PopoverContent` | 트리거에 붙는 설명 + 행동·작은 상호작용 | normal/custom. custom에는 heading/action/closeButton props 사용 불가. 기본적으로 열린 동안 외부 상호작용 차단. 단순 힌트는 Tooltip. 한 번에 하나, 충돌 위치·포커스 복귀 확인. |
| [Popup](https://montage.wanted.co.kr/docs/components/presentation/popup/web) · `Modal`, `ModalContainer`, `ModalNavigation`, `ModalContent`, `ModalContentItem` | 상세 필터·짧은 편집·독립 과업. `ModalContainer variant="popup"` + ActionArea | medium/large/xlarge, hug/fixed. 순서는 Navigation → Content → ActionArea. 제목은 실제 ModalNavigation children 사용. 크기별 기본 여백 유지, 동일 닫기 버튼 중복 금지. |
| [Tooltip](https://montage.wanted.co.kr/docs/components/presentation/tooltip/web) · `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipGroup` | 아이콘 의미·잘린 내용·단축키 보조 설명 | hover/always/click, small/medium. action/closeButton은 deprecated: 행동 필요하면 Popover. 모바일 필수 설명을 hover에만 의존하지 않음. 접근 가능한 이름을 대체하지 않음. |

## Selection and input · 15개

| 컴포넌트 / 실제 API | 선택·조합 | 유지할 규칙 |
|---|---|---|
| [Check mark](https://montage.wanted.co.kr/docs/components/selection-and-input/check-mark/web) · `CheckMark` | 읽음·내용 확인·동의 여부. FormControl과 조합 | `checked`/`onCheckedChange`. 일반 다중 항목 선택에는 Checkbox 사용. 약관 동의를 임의로 미리 체크하지 않는다. |
| [Checkbox](https://montage.wanted.co.kr/docs/components/selection-and-input/checkbox/web) · `Checkbox` | 복수 선택·표 행 선택. FormControl/ListCell과 조합 | `checked`/`onCheckedChange`, 일부 선택 indeterminate는 표현 상태. 전체 선택이 현재 페이지인지 전체 검색 결과인지 명시. 셀과 컨트롤의 클릭으로 두 번 토글하지 않음. |
| [Date picker](https://montage.wanted.co.kr/docs/components/selection-and-input/date-picker/web) · `DatePicker`, `DateRangePicker`, `PickerActionArea`, `PickerActionAreaButton` | 일정·조회 기간·기간 비교. FormControl/대시보드 툴바 | `value`/`onChange`, locale/timezone 명시. min/max가 있어도 키보드로 범위 밖·Invalid Date가 들어올 수 있으므로 별도 검증. 범위 시작≤끝 확인. 웹 picker는 앵커형 팝오버 동작 유지. |
| [Filter button](https://montage.wanted.co.kr/docs/components/selection-and-input/filter-button/web) · `FilterButton` | 목록·표의 필터 트리거. Menu 또는 상세 필터 Modal 호출 | active는 적용된 조건, expanded는 열림, activeLabel은 선택 요약. 한 항목은 즉시 적용, 복수는 적용 버튼 흐름. 원래 dropdown 아이콘·타이포 유지. |
| [Form control](https://montage.wanted.co.kr/docs/components/selection-and-input/form-control/web) · `FormControl`, `FormControlGroup`, `FormControlField`, `FormControlLabel`, `FormControlMessage`, `FormControlNegativeMessage`, `FormControlPositiveMessage` | 라벨·설명·입력·오류를 하나의 접근 가능한 단위로 연결 | top/leading. leading 정렬은 Group labelWidth를 고정값으로 맞춤. medium/large와 하위 필드 size 전파 확인. placeholder를 label 대신 쓰지 않음. 오류에 구체적 수정 방법. |
| [Framed style](https://montage.wanted.co.kr/docs/components/selection-and-input/framed-style/web) · `framedStyle` | 요금제·시나리오·설비군 같은 선택 단위를 시각적으로 묶음. Box/ListCell/RadioGroup 조합 | JSX 컴포넌트가 아닌 스타일 함수. sx/css에 적용. selected/status/disabled와 내부 Control의 상태 일치. 프레임 자체가 라디오·키보드 행동을 제공하지 않음. |
| [Radio](https://montage.wanted.co.kr/docs/components/selection-and-input/radio/web) · `RadioGroup`, `RadioGroupItem` | 동시에 비교할 소수 단일 선택지. FormControl·framedStyle 조합 | `value`/`onValueChange`, 그룹 이름과 방향키 탐색 유지. 개별 Radio만 나열하여 그룹 키보드 동작을 잃지 않음. |
| [Search field](https://montage.wanted.co.kr/docs/components/selection-and-input/search-field/web) · `SearchField` | 콘텐츠 검색, 긴 목록 내 검색. Category/FilterButton/결과 수와 조합 | `value`/`onChange(event)`. solid/outlined, medium/large. 700px 이상 긴 필드는 지양. 한글 조합 중 Enter 제출·실시간 필터 처리 방침 확인. |
| [Segmented control](https://montage.wanted.co.kr/docs/components/selection-and-input/segmented-control/web) · `SegmentedControl`, `SegmentedControlItem` | 동일 데이터의 목록/차트, 일/주/월, 단위·모드 전환 | `value`/`onValueChange`. PC 2~6개, 모바일 최대 4개 권장. 서로 다른 최상위 화면은 Tab. 아이콘 전용은 aria-label. 내부 높이/radius/문자색 임의 변경 지양. |
| [Select](https://montage.wanted.co.kr/docs/components/selection-and-input/select/web) · `Select`, `SelectMultiple`, `Option`, `OptionGroup`, `SelectRenderChip` | 폼에서 미리 정의된 값 선택. FormControl과 조합 | `onChange`는 이벤트가 아니라 값. 복수+확인은 enableMenuActionArea, menuValue/draft와 value/applied 분리. SelectMultiple overflow=false는 한 줄/칩 가로스크롤, true는 줄바꿈. 칩 삭제 클릭이 필드를 열지 않도록 전파 분리. |
| [Slider](https://montage.wanted.co.kr/docs/components/selection-and-input/slider/web) · `Slider` | 범위·임계값을 탐색하며 조절. 값 라벨/단위·정확한 입력 필요시 TextField 병행 | `value`/`onValueChange`, min/max/step. 단일과 범위의 데이터 타입 확인. 두 thumb 역전 방지 정책·키보드 이동·단위 표시. |
| [Switch](https://montage.wanted.co.kr/docs/components/selection-and-input/switch/web) · `Switch` | 즉시 켜기/끄기 설정. ListCell trailing 또는 FormControl | `checked`/`onCheckedChange`. 오른쪽 배치 권장. 표·밀집 목록은 small, 주요 설정 medium. 저장에 실패하면 값 복구와 메시지 제공. 다중 선택을 Switch로 표현하지 않음. |
| [Text area](https://montage.wanted.co.kr/docs/components/selection-and-input/text-area/web) · `TextArea`, `TextAreaContent` | 여러 줄 설명·분석 요청·메모. FormControl·문자 수·하단 도구 슬롯 | `minRows`/`maxRows`로 성장 범위, medium/large. leading/trailing은 하단 슬롯. 적절한 래퍼로 아이콘/버튼 자동 크기 매핑 유지. AI 대화 전체 UI가 내장되어 있다고 간주하지 않음. |
| [Text field](https://montage.wanted.co.kr/docs/components/selection-and-input/text-field/web) · `TextField`, `TextFieldContent`, `TextFieldButton` | 한 줄 값·검색 외 일반 입력. FormControl과 suffix/보조 버튼 조합 | `onChange(event)`. normal/positive/negative, readOnly/disabled 구분. placeholder는 예시. 아이콘·배지·타이머는 전용 슬롯, trailingButton은 전용 버튼. 숫자 단위와 저장 값 분리. |
| [Time picker](https://montage.wanted.co.kr/docs/components/selection-and-input/time-picker/web) · `TimePicker`, `PickerActionArea`, `PickerActionAreaButton` | 시간 예약·운영 구간. 범위는 시작·끝 두 필드 | 12시간은 h/hh+A/a, 24시간은 H/HH. locale/timezone·Invalid Date·범위 검증. min/max를 검증 대신 신뢰하지 않음. 자정 경계의 종료 날짜는 제품 정책으로 정의. |

## 문서와 코드가 다를 때

Design은 의도·권장 배치, Web과 설치된 패키지 타입은 구현 API다. 예를 들어 Select의 overflow 설명, Bottom sheet의 handle 기본값, Pagination의 variant 개수는 디자인/서술 일부와 실제 API 설명 사이에 차이가 있다. 설치 버전의 타입·동작을 우선 검증하고 차이를 기록한다. Design의 명칭을 PascalCase로 바꿔 존재하지 않는 export를 만들지 않는다. 특히 `Popup`, `BottomSheet`, `FramedStyle`, `Media`, `Navigation`, `ariaHidden`을 문서 제목만 보고 import하지 않는다.
