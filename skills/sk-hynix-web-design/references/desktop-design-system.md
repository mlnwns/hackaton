# Wanted PC: 역할별 실측 명세

## 출처와 범위

2026-10-31 [원티드 채용 목록](https://www.wanted.co.kr/wdlist)의 1440×1000 CSS viewport에서 DOM의 getComputedStyle과 bounding rect를 읽었다. 경력 필터 dialog와 검색 overlay를 직접 열어 확인했다. 스크롤바를 제외한 가로 폭은 1425px였다. 아래 값은 이 화면의 관찰값이며 원티드 내부 토큰이나 모든 페이지의 공통 규칙이 아니다.

이전 2026-10-30 상세 화면에서 28px/700 제목, 22px/600 소제목, 48px 높이·14px 반지름 주요 버튼도 관찰했지만, 이 문서의 2026-10-31 비교는 목록·필터·검색에 집중했다. 상세 페이지 전체의 수치 일치를 주장하지 않는다.

## 폰트: 선언과 로드는 별개

실제 페이지의 첫 font-family는 `Pretendard Variable`, 다음은 `Pretendard JP Variable`, 이후 OS 폴백이었다. 첨부한 한국어용 Pretendard Variable을 실제로 로드한다. JP 서체는 일본어 콘텐츠가 필요한 경우에만 별도로 고려한다.

- [Pretendard 공식 저장소](https://github.com/orioncactus/pretendard), [폰트 원본](https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2)
- `@font-face {font-family:'Pretendard Variable';src:url('./PretendardVariable.woff2') format('woff2');font-style:normal;font-weight:45 920;font-display:swap}`
- 선언 후 본문과 button/input/select에 같은 family가 상속되는지 확인한다. font-weight 범위가 빠지면 variable font 굵기 적용이 달라질 수 있다.
- 첨부 폰트는 공개 원본을 2026-10-31 내려받은 파일이다. 원티드가 배포한 폰트 바이너리와 동일한 버전이라고 검증한 것은 아니다. SIL OFL 라이선스를 함께 보존한다.

## 타이포그래피 (실제 글자를 담은 요소 기준)

| 역할 | 크기 / 행간 | 굵기 | 자간 | 색 |
|---|---|---|---|---|
| PC 상단 메뉴 | 15 / 22px | 600 | +0.144px | #171719 |
| 목록 범위 제목 (직군/경력) | 24 / 32px | 700 | −0.552px | #171719 |
| 정렬 라벨 | 14 / 20px | 600 | +0.203px | 선택 #171719 |
| 필터 칩 라벨 | 13 / 18px | 500 | +0.2522px | #171719 |
| 카드 제목 | 16 / 24px | 600 | +0.0912px | #171719 |
| 카드 회사명·위치 | 13 / 18px | 500 | +0.2522px | rgba(55,56,60,.61) |
| 카드 이미지 위 라벨 | 13 / 18px | 600 | +0.2522px | #fff |
| 필터 dialog 제목 | 20 / 28px | 600 | −0.24px | #171719 |
| dialog 초기화/적용 라벨 | 14 / 20px | 600 | +0.203px | #171719 / #fff |
| 검색 입력 | 15 / 22px | 400 | +0.144px | 기본 글자색 |

`rgba(55,56,60,.61)`은 흰 배경에 합성될 때 약 #858689로 보인다. 임의의 푸른 회색으로 바꾸면 보조 정보의 인상이 달라진다. 본문 글자에 일괄 `letter-spacing:-.03em`을 적용하지 않는다.

## 목록 구조 (1440px 관찰)

- 상단 내비게이션: 메뉴 높이 60px, 전체 하단 경계 포함 61px. 브랜드 슬롯 112px, 메뉴 간격 40px. 메뉴 전체를 굵은 800 글씨로 만들지 않는다.
- 콘텐츠: 실측 폭 1282.5px, 왼쪽 x=71.25px. `width:90%`로 해당 폭을 재현한다. 첨부 CSS의 `max-width:1400px`은 더 큰 화면을 위한 구현 선택이며 공식 상한을 측정한 값이 아니다.
- 범위 선택 버튼: y=105px, 높이42px. 라벨 y=110px. 페이지 시작부터 padding-top44px. 두 범위 선택 사이32px.
- 정렬: 전체 높이40px, 바깥 패딩4px, 선택 구획76×32px, radius8px. 선택 표면 흰색 + `0 1px 3px rgba(0,0,0,.08)` 그림자.
- 필터 줄: y=217px, 높이36px. 범위 선택 하단에서70px. 칩 간8px. 얇은 구분선으로 필터 종류를 나눈다.
- 카드 목록 박스 y=298px, 각 항목 padding20px 8px. 첫 이미지 y=318px. 4열, 이미지 사이16px, 다음 행 사이40px. 상단 숫자/검색 입력 행을 추가하면 이 기준이 달라진다.
- 첫 이미지304.625×203.078px (3:2). 세로 포스터 비율이나 정사각형으로 바꾸지 않는다. 썸네일 radius12px.
- 이미지 아래8px, 카드 텍스트 영역 좌우 padding6px. 제목24px 행간, 메타 정보18px, 텍스트 단락 사이4px. 제목은 한 줄 말줄임.
- 북마크 버튼40×40px, 이미지 top/right6px, padding8px, 아이콘24px.

## 버튼·필터·팝오버

| 종류 | 치수 | 표면 |
|---|---|---|
| 헤더 작은 액션 | 높이32, radius10, padding8px 12px 관찰 | 흰색/투명 + 옅은 경계 |
| 필터 칩 | 높이36, radius10, padding9px 10px + 라벨 안쪽2px | inset 0 0 0 1px rgba(112,115,124,.16) |
| 범위 선택의 화살표 | 약29×29, radius8, 아이콘 약20 | 옅은 경계 |
| 필터 dialog | width468, radius16 | 흰색, shadow 0 4px 30px 10px rgba(0,0,0,.06) |
| dialog 버튼 | 높이40, radius12, padding10px 16px | 적용 #0066ff; 초기화 inset 경계 |
| 검색 표면 | 높이48, 중앙 폭660 관찰 | 옅은 회색, radius12 (화면 관찰) |

경력 팝오버의 실측 높이는390px였지만 내용이 다른 폼에 고정 높이를 강제하지 않는다. 첨부 CSS의 select 입력, 일반 상세 dialog, hover/selected 색, 모바일 분기, 명시적 키보드 focus는 같은 시각 체계로 만든 **구현 선택**이다. 이것들을 원티드에서 직접 측정했다고 하지 않는다.

필터는 초안을 편집한 뒤 적용할 때 결과가 바뀌고, 취소/Escape는 초안을 버린다. 초기화는 팝오버 내부 초안을 지우며 적용을 누르기 전까지 결과를 바꾸지 않는 동작을 구현할 수 있다. 검색은 본문에 작은 입력을 습관적으로 더하지 말고 상단 돋보기→넓은 검색 화면 패턴을 우선 고려한다.

## 재사용 CSS와 검수

[../assets/wanted-web.css](../assets/wanted-web.css)의 클래스는 역할에 대응한다: `w-header`, `w-scope`, `w-segment`, `w-chip`, `w-card`, `w-dialog`, `w-search-dialog`.

1. CSS와 폰트·OFL을 함께 배치한다. 기존 디자인 시스템이 있으면 값만 해당 토큰에 옮긴다.
2. 요청한 기능에 맞는 컴포넌트만 쓴다. 설비 표·업무 통계 등 원티드에서 보지 않은 구조는 주제별 응용이라고 구분한다.
3. 폰트 로드 완료 후 같은 viewport에서 각 역할의 계산값과 화면을 확인한다. 버튼이 아닌 내부 텍스트 노드의 스타일도 읽는다.
4. 결과 보고에는 정확히 맞춘 항목과 응용/미검증 항목을 적는다. 카드 폭만 맞았다는 이유로 전체 스타일을 높게 평가하지 않는다.


## 확장 컴포넌트

이 문서는 최초 채용 목록 중심 실측이다. 필터 메뉴·지역 계층 선택·상세·폼·프로필과 공식 디자인 시스템은 [interaction-patterns.md](interaction-patterns.md), 구현은 [montage-implementation.md](montage-implementation.md)를 우선 참고한다. `wanted-web.css`의 `.w-select`는 일반 HTML용 기본 스타일이며 원티드 커스텀 dropdown의 완전한 구현이 아니다.
