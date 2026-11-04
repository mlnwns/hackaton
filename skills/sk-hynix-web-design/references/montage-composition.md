# Montage를 화면으로 조합하는 기준

이 문서는 공식 컴포넌트 규칙을 제품에 적용한 **독립적인 조합 가이드**다. 원티드가 공개한 완성 화면 템플릿으로 소개하지 않는다. 개별 선택·제약·공식 링크는 [54종 선택표](montage-components.md), 토큰·레이아웃 도구는 [공통 기반](montage-foundations-utilities.md)에서 확인한다.

## 먼저 결정할 것

한 문장으로 사용자의 판단과 행동을 정한다. 예: “불량 증가 구간을 찾고 해당 검사 기록을 확인한다.” 필요한 데이터, 주행동, 비교 단위, 화면 폭을 기준으로 구조를 고른다. 아래 레시피 중 하나를 출발점으로 삼고 실제 과업에 필요한 요소만 추가한다. 컴포넌트를 많이 노출하는 것이 목표가 아니다.

| 사용자가 하려는 일 | 중심 구조 | 보조 컴포넌트 |
|---|---|---|
| 많은 항목에서 찾고 비교 | 검색/필터 + Table 또는 ListCard | Category, Pagination, FallbackView |
| 입력하고 저장 | FormControl 그룹 + ActionArea | Select/DatePicker/Radio, 오류 메시지, Toast |
| 한 대상을 이해하고 행동 | SectionHeader + 상세 + Tab/Accordion | Avatar/Thumbnail, ContentBadge, 문맥 행동 |
| 데이터로 판단 | 조회 범위 + 지표 + 차트 + 원본 Table | DateRangePicker, SegmentedControl, Tooltip, SectionMessage |
| 여러 단계를 마침 | ProgressTracker/Stepper + 현재 단계의 폼 | ActionArea, Loading/ProgressIndicator, 완료 피드백 |

## 비슷해 보여도 역할이 다른 요소

| 결정 | 선택 기준 |
|---|---|
| Tab / Category / SegmentedControl | Tab은 내용 영역 전환, Category는 그 안의 분류, SegmentedControl은 같은 데이터의 표현·모드. 동일 조건을 세 종류로 중복 제어하지 않는다. |
| FilterButton / Select / Autocomplete / Radio | 결과 집합을 좁히는 트리거는 FilterButton, 폼의 사전 정의 값은 Select, 타이핑하며 후보 탐색은 Autocomplete, 소수 값을 한눈에 비교하려면 RadioGroup. |
| Chip / ContentBadge / PushBadge | Chip은 선택·삭제 등 행동, ContentBadge는 항목 속성, PushBadge는 새 소식·개수. 색깔과 둥근 모양만으로 서로 대체하지 않는다. |
| Tooltip / Popover / Menu / Modal | 설명만 Tooltip, 앵커 주변 설명+행동은 Popover, 옵션 목록은 Menu, 독립된 편집·확인은 Modal. 큰 폼을 Popover에 욱여넣지 않는다. |
| Toast / Snackbar / SectionMessage / Alert | 사라져도 되는 결과는 Toast, 간단한 후속 행동은 Snackbar, 계속 봐야 할 영역 상태는 SectionMessage, 흐름을 멈춰야 하는 결정은 Alert. |

## 시각적 조화

### 역할별 토큰과 밀도

폰트를 실제 로드하고 Typography의 variant/weight/색을 역할별로 연결한다. 브랜드 파랑은 주요 행동·선택·포커스에, 부정 색은 오류·위험에 쓴다. 본문·보조문·캡션은 neutral 위계로 구분한다. 모든 배지·표 숫자·차트 선을 브랜드 파랑으로 칠하지 않는다. 같은 데이터 계열은 차트·범례·표에서 같은 색/명칭을 쓴다.

컨테이너와 섹션 간격은 4px 단위를 기본으로 조정하되 컴포넌트의 고유 내부 간격은 유지한다. Button/Chip/FilterButton/TextField의 높이·radius를 전역 CSS로 같게 만들지 않는다. 밀집 툴바는 지원되는 medium/small 조합, 주 입력 폼은 medium/large 중 일관된 한 밀도를 고른다. 이름이 같은 `medium`이 모든 컴포넌트에서 같은 높이라는 뜻은 아니다. 폼 필드와 그 옆의 버튼은 렌더링 높이를 확인한다.

### 컨테이너와 행동 위계

페이지 → 섹션 → 콘텐츠의 구분은 먼저 여백·제목·얕은 선으로 표현한다. 데이터 패널을 전부 Card로 감싸거나 중첩 카드·그림자·테두리를 세 겹으로 만들지 않는다. 높은 elevation은 오버레이 등 실제 층위에 쓴다. 한 행동 영역에 가장 중요한 행동을 명확하게 둔다. 버튼에 ‘확인’ 대신 ‘조건 적용’, ‘분석 시작’처럼 결과를 예측할 수 있는 문구를 쓴다.

SectionHeader의 trailingContent는 제목 기준선에 맞춘다. Toolbar·표·페이지 이동의 좌우 정렬선을 공유한다. 고정 헤더·필터 바·탭이 겹치면 sticky top 누적값을 계산하고 내용이 가려지지 않게 한다. 좁아질 때는 도구를 다음 줄로 보내고 중요한 라벨을 숨겨 억지로 한 줄에 맞추지 않는다.

### 공식 슬롯을 먼저 사용

| 상위 요소 | 들어가는 요소의 래퍼 |
|---|---|
| ListCell | ListCellContent, ListCellLabelTrailing, ListCellExtraContent |
| MenuItem / Option | MenuItemContent / OptionContent 및 각 LabelTrailing·ExtraContent |
| TextField / TextArea / Select | TextFieldContent / TextAreaContent / SelectContent |
| AccordionSummary | AccordionSummaryContent, AccordionSummaryLabelTrailing, AccordionSummaryExtraContent |
| Card / ListCard | CardRow·CardThumbnailContent / ListCardRow·ListCardContent |

variant에 맞는 래퍼가 자식의 크기·간격을 맞춘다. 기본값으로 정렬되는 IconButton/ContentBadge에 불필요하게 size와 padding을 중복 지정하지 않는다. 슬롯의 아이콘 버튼을 누를 때 부모의 선택·열림까지 실행되면 `stopPropagation()` 위치를 조정한다. `ListCell`은 자식 컨트롤 클릭을 전달할 수 있으므로 부모·자식에서 같은 상태를 두 번 반전시키지 않는다.

## 레시피 A · 검색 → 필터 → 결과 → 상세

**구조:** SectionHeader → SearchField + FilterButton(Menu/Modal) → 적용 조건 Chip → 결과 수/정렬 → Table 또는 ListCard → Pagination → 별도 상세 화면/Modal.

검색어·필터·정렬·페이지를 하나의 query 상태로 관리한다. 카드/표 보기 전환은 동일한 query와 결과를 공유한다. 결과 수와 페이지 수는 필터 이후 값으로 계산하고 조건 변경 시 첫 페이지로 이동한다. 새 요청 중에는 이전 결과를 보존할지 Skeleton으로 바꿀지 선택하되, 이전 결과가 새 조건의 확정 결과처럼 보이지 않게 처리한다.

단일 정렬은 즉시 적용해도 된다. 다중 필터는 `applied`와 `draft`를 분리한다. 열기: applied 복사 → 선택: draft만 변경 → 적용: applied 갱신 후 닫기 → Escape/외부 클릭/취소: applied 유지. ‘초기화’가 임시 선택만 지우는지 즉시 결과를 바꾸는지 일관되게 정한다. 일반적으로 모달 안 초기화는 draft만 지우고 적용을 기다린다.

```jsx
// SelectMultiple + MenuActionArea를 사용할 때의 상태 연결 골격.
// Option·레이블·ActionArea UI는 해당 공식 anatomy에 맞춰 추가한다.
const [applied, setApplied] = useState([]);
const [draft, setDraft] = useState([]);
const [open, setOpen] = useState(false);
function changeOpen(next) {
  if (next) setDraft([...applied]);
  setOpen(next);
}
function apply() {
  setApplied([...draft]);
  setOpen(false);
  setPage(1);
}
// value={applied} onChange={setApplied}
// enableMenuActionArea menuValue={draft} onMenuValueChange={setDraft}
// open={open} onOpenChange={changeOpen}
```

FilterButton + Menu를 쓰면 Menu value에 draft를 연결하고 MenuItem에 checkbox variant를 준다. 열림 상태는 expanded, 적용된 필터는 active로 구분한다. ‘A 외 2개’처럼 요약하고 Chip 제거는 실제 applied 조건도 제거한다.

후보가 많은 담당자/설비 선택은 Autocomplete를 쓴다. `asSelect`일 때 입력문자와 확정된 식별자를 별도로 관리한다. 요청을 debounce하고 이전 검색 응답이 최신 결과를 덮지 않게 한다. 입력을 수정했는데 이전 선택 ID가 유효한 척 남지 않도록 제품 정책을 정한다. 검색 결과 없음·대기·네트워크 실패를 각각 안내한다. 한글 입력은 조합 중 Enter를 제출로 처리하지 않는다.

## 레시피 B · 입력 → 검증 → 저장

**구조:** SectionHeader → FormControlGroup → FormControl(Label + Field + Message) → 필요시 SectionMessage → ActionArea → 성공 Toast.

사용자가 고르는 값은 Select, 소수의 대등한 옵션은 RadioGroup, 확인은 CheckMark, 복수 선택은 Checkbox, 즉시 반영되는 설정은 Switch로 구분한다. framedStyle로 선택 단위를 강조할 때 실제 Radio/Checkbox와 selected를 같은 상태에서 계산한다. TextField는 한 줄, TextArea는 여러 줄, 단위는 슬롯에 두고 저장 값에는 섞지 않는다.

로컬 검증은 필드 오류 메시지로 연결하고 제출 때 첫 오류로 포커스를 옮긴다. 입력을 고친 뒤에도 오래된 오류가 남지 않게 한다. 서버 오류는 사용자 입력을 보존하고 재시도 가능한 SectionMessage로 제공한다. 저장 버튼의 loading은 실제 요청 수명과 일치시키며 연속 제출을 막는다. 성공 토스트는 응답 성공 후에만 표시한다. FormControl이 라벨·aria 연결을 제공해도 업무 검증·서버 저장을 해주는 것은 아니다.

날짜·시간의 `min/max`는 키보드 입력 검증을 대체하지 않는다. Invalid Date, 시작>종료, 시간대, 자정 경계를 점검한다. 표시 형식과 저장 형식을 구분한다. ‘저장’이 필요한 설정에서 Switch를 즉시 저장처럼 보이게 만들지 않는다.

## 레시피 C · 표 작업 → 선택 → 일괄 행동

**구조:** 필터 툴바 → 선택 수/행동 → Table → Pagination. 셀 안에는 값·ContentBadge·Avatar·문맥 행동만 필요한 만큼 배치한다.

숫자는 우측 정렬, 비율·단위·소수점 자릿수 일관성, 정렬은 표시 문자열이 아닌 원본 값 기준이다. 정렬 아이콘만 바꾸고 행 순서는 그대로 두지 않는다. 기본 표 행 전체는 클릭하지 않으며 상세 진입이 필요하면 의미 있는 링크를 둔다. 행 interaction을 켜면 키보드 동작도 확인한다.

전체 선택 범위는 현재 페이지 또는 전체 검색 결과 중 하나로 명시한다. 선택 ID는 안정적인 원본 ID를 사용한다. 페이지 전환·필터 변경 후 선택을 보존할지 지울지 정한다. 일부만 선택하면 헤더 Checkbox의 indeterminate를 표시한다. 행 메뉴 클릭·체크박스 클릭이 행 상세 열기를 함께 실행하지 않게 한다. 삭제는 대상 수를 보여주는 Alert, 복구 가능하다면 실제 복구 로직을 연결한 Snackbar로 이어진다.

데이터가 많다고 무조건 가상화를 추가하지 않는다. 실제 성능 필요가 있을 때 별도 가상화 엔진을 붙이고 sticky head·행 높이·키보드 이동을 확인한다. Table 자체가 필터·정렬·가상화·서버 페이지 처리를 모두 제공한다고 가정하지 않는다.

## 레시피 D · 상세·프로필·콘텐츠

**구조:** Avatar/Thumbnail + 식별 정보 → 주행동 → Tab(개요/기록/설정) → SectionHeader + ListCell/Accordion/관련 ListCard.

사진 중심 탐색에는 Card, 세부 정보가 많은 결과는 ListCard, 설정·메타 정보에는 ListCell을 선택한다. 프로필 그룹은 AvatarGroup의 생략 수를 텍스트로 제공한다. Badge는 상태, Chip은 조작 가능한 태그로 유지한다. 긴 추가 설명은 Accordion으로 접되 의사결정에 필요한 경고·핵심 조건을 숨기지 않는다. 탭 이동이 폼 상태를 언마운트해 버리지 않게 mountMode 또는 상위 상태 보존을 선택한다.

## 레시피 E · 대시보드·공정·분석

**구조:** SectionHeader + DateRangePicker + 범위 필터 → KPI → 추이/비교 차트 → 원본 Table. 동일 데이터의 보기 방식은 SegmentedControl, 다른 분석 관점은 Tab.

조회 기간·대상 집합을 KPI/차트/표가 공유한다. 차트 선택으로 표가 좁혀지면 선택 상태와 해제 수단을 표시한다. 지표 설명은 Tooltip, 행동·세부 설정은 Popover/Modal, 지속되는 수집 지연·일부 실패는 SectionMessage로 제공한다. 지표 계산은 [data-contracts.md](data-contracts.md), 배치는 [dashboard-patterns.md](dashboard-patterns.md), 차트는 [chart-recipes.md](chart-recipes.md)를 적용한다.

차트는 공개 Montage 컴포넌트에 없는 별도 구현이다. Typography·semantic 색·간격을 맞추되 ‘공식 Montage Chart’라는 이름을 만들지 않는다. 계열이 없는 빈 차트, 결측값, 목표선과 관리한계, 비율의 분모를 명확히 구분한다. 그래프 색만으로 상태를 전달하지 않고 단위·범례·텍스트도 제공한다.

## 레시피 F · 단계·작업 진행

**구조:** ProgressTracker/Stepper → 현재 단계 FormControl/선택 목록 → ActionArea → 서버 작업 진행 → 결과 화면.

입력 단계와 백그라운드 작업 진행을 같은 값으로 취급하지 않는다. 다음 단계 이동은 현재 단계 검증 뒤 실행하고 이전 단계로 돌아가면 값을 보존한다. 완료율을 알 때만 ProgressIndicator, 알 수 없으면 Loading을 쓴다. 단계 실패에는 해당 단계·실패 이유·재시도를 보여준다. 화면을 떠나도 작업이 계속되는지 알려주고 제품 요구에 따라 중단 수단을 둔다. 가짜 타이머로 실제 작업 완료처럼 표시하지 않는다.

## 오버레이·반응형·상태 검증

Modal은 Navigation → Content → ActionArea 순서와 내부 스크롤을 유지한다. 데스크톱 popup과 모바일 bottom/full은 같은 작업 상태를 공유하되 폭에 맞는 구조를 선택한다. 웹 DatePicker/TimePicker의 고유 팝오버를 모바일 native wheel인 것처럼 임의로 바꾸지 않는다. Bottom sheet 안에서 다시 복잡한 모달을 여는 구조는 피한다.

Menu/Select가 모달 안에서 열리면 portal 컨테이너·z-index·overflow·focus scope를 확인한다. native dialog top layer는 일반 body portal보다 위이므로 적절한 container를 전달한다. 라이브러리의 포커스 제어 위에 또 다른 포커스 트랩을 겹치지 않는다. Escape는 최상위로 열린 요소부터 닫히고 닫힌 뒤 트리거로 포커스가 돌아오는지 확인한다.

| 흐름 | 확인할 실제 상태 |
|---|---|
| 검색·필터 | 열기→수정→취소 / 재열기→초기화→적용 / 0건 / 페이지 범위 / 한글 조합 |
| 폼·저장 | 빈 제출→필드 오류→수정 / 저장 중 재클릭 / 실패 입력 보존 / 실제 성공 |
| 표·일괄 행동 | 일부 선택→indeterminate / 전체 선택 범위 / 정렬·페이지 / 행 내부 행동 전파 |
| 오버레이·키보드 | Tab/방향키/Enter/Escape / 초기 포커스·복귀 / 긴 목록 스크롤 / 중첩 clipping |
| 데이터·반응형 | 로딩·빈 결과·오류·부분 데이터 / 기간·단위 일치 / PC 폭과 좁은 폭의 넘침 |

모든 상태를 억지로 화면에 동시에 보여주지 않는다. 구현한 흐름의 분기별로 검증하고, 문서만 읽은 컴포넌트와 실제 조작한 컴포넌트를 결과 보고에서 구분한다.
