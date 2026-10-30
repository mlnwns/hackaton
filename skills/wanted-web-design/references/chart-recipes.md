# 차트 선택과 원티드 스타일 적용

차트가 답할 질문, 데이터 단위, 집계 수준을 먼저 정한다. 아래 시각화는 원티드 공식 차트 카탈로그가 아니라 이 스킬의 응용 규칙이다.

## 1. 시간·진행

| 질문 | 차트 | 주의 |
|---|---|---|
| 시간에 따라 변했나? | 선 그래프, 소수 계열의 small multiples | 시간 정렬, 누락 구간 null, 실제 점을 지나지 않는 과도한 smoothing 금지 |
| 시간별 총량과 구성은? | 누적 막대/면적 | 합칠 수 있는 같은 단위·상호 배타적 항목인지 확인 |
| 어떤 작업이 언제 겹치나? | Gantt/상태 타임라인 | 시작/종료·시간대·정지/대기 상태 구분. 일반 선 그래프에 이벤트를 억지로 누적하지 않음 |
| 목표와 어디까지 왔나? | bullet/진행 막대 + 숫자 | 목표·실제·범위를 명시. 동일 값을 KPI와 대형 원형 gauge로 반복하지 않음 |

## 2. 비교·구성

| 질문 | 차트 | 주의 |
|---|---|---|
| 무엇이 많고 적나? | 정렬한 가로 막대 | 긴 한글 라벨에 적합, 길이 비교 축은 0부터 |
| 유형별 비중과 우선 확인 대상은? | 파레토(내림차순 막대 + 누적 %) | 건수와 비율 축을 명확히 분리. 누적 끝 100%, 0분모는 — |
| 소수 항목의 전체 구성은? | 100% 누적 막대, 필요 시 donut | 4~5개 이하, 기타 집계 정의. 작은 조각이 많으면 표/막대로 전환 |
| 전기 대비 증감의 기여는? | waterfall | 시작+증감=끝값 일치. 음수·합계 색 역할 구분 |

## 3. 분포·변동

| 질문 | 차트 | 주의 |
|---|---|---|
| 관측값이 어디에 모이나? | histogram | 동일 bin 경계/너비·모집단 유지, 범주 막대와 구별 |
| 여러 장비의 중앙값·산포는? | box plot + 표본 수 | 사분위·수염 정의 표시. 이상치 표시는 고장 확정 아님 |
| 값이 기준을 넘나드나? | 관리도 또는 기준선이 있는 추이 | 통계적 관리한계와 제품 규격/목표를 구별. 근거 없이 ±3σ를 고장 판정으로 사용하지 않음 |

## 4. 관계·공간·밀도

| 질문 | 차트 | 주의 |
|---|---|---|
| 두 변수는 함께 변하나? | scatter, 필요 시 small multiples | 점의 단위(LOT/장비/관측)를 명시. 상관관계≠인과, 공정/제품군 혼합에 주의 |
| 어느 날짜/공정/장비 조합에 집중됐나? | heatmap | 비교 화면은 같은 색 범위. tooltip에 비율·분자·분모. 미수집은 0 색상과 구별 |
| wafer 내 위치별 패턴은? | 실제 die 좌표 기반 wafer map | 좌표·wafer 외곽·유효 die 마스크가 있을 때만. 일반 행렬을 실제 wafer 검사 결과처럼 표현하지 않음 |
| 여러 단계를 통해 어디로 흐르나? | Sankey | 유량 보존과 중복 경로 정의가 있을 때만. 단순 순위를 장식용 흐름으로 만들지 않음 |

## 색과 의미

[Montage 공개 토큰](https://github.com/wanteddev/montage-web/tree/main/packages/theme/src/theme)의 blue 50은 `#0066FF`. 기존 neutral/typography 역할과 조합하되 **아래 차트 배정은 별도 설계**다.

- 강조 계열: `#0066FF`. 이전 기간/기준선: `#8C9BAF`, 점선·다른 marker를 함께 사용.
- 범주: 파랑/보라/청록 등 서로 구분되는 색을 안정적으로 매핑. 선택이나 정렬마다 같은 라인의 색이 바뀌지 않게 한다.
- 상태: 상승=좋음으로 고정하지 않는다. 불량·지연·비용은 증가가 나쁠 수 있고, 처리량 변화는 목표 없이 좋고 나쁨을 판단하지 않는다. 방향은 부호/텍스트로도 표시.
- 연속값: 밝음→진함 단일 계열. 양/음 편차는 의미 있는 0을 중심으로 diverging 색. 무지개 색과 무근거 gradient는 사용하지 않는다.
- 양호/위험을 빨강·초록만으로 구분하지 않는다. 아이콘/선 종류/marker/텍스트·데이터 표를 함께 둔다. 색 대비는 실제 배경에서 확인한다.

## 축·범례·툴팁

- 막대 축은 0 시작. 선 그래프를 잘라 볼 때 범위(예: 94–100%)를 제목 아래 명시하고 비교 대상에 같은 범위를 사용한다.
- 단위가 다른 두 축은 독립 단위를 명시하고 필요할 때만 사용한다. 예제 파레토는 왼쪽 '건', 오른쪽 '%'를 사용한다. 임의 축 조정으로 두 선을 일치시키지 않는다.
- 로그 축이면 축/설명에 표시하고 0·음수 처리 정의를 둔다. 자동축 변경으로 값이 같은데 변동이 커진 것처럼 보이지 않게 한다.
- 축 라벨이 겹치면 눈금 수/줄바꿈/가로 막대로 해결한다. 큰 회전 각도와 과도한 축소를 기본 해법으로 쓰지 않는다.
- tooltip: 기준 시각/범주, 계열, 값+단위, 분모/표본 수를 제공한다. 임의 정밀도를 늘리지 않는다. HTML formatter에 원본 문자열을 그대로 넣지 않는다.
- 범례는 차트마다 같은 순서와 스타일. 6개 이상 계열이면 핵심 선택·small multiples·표를 고려한다.

## 기술 선택

새 React/정적 차트 구현의 이 스킬 기본 예제는 **Apache ECharts 6.1.0**이다. 선·막대·산점도·히트맵 등을 한 엔진으로 다룬다. 기존 프로젝트가 다른 차트 라이브러리를 쓰면 필수 기능이 부족하지 않은 한 교체하지 않고 같은 테마/데이터 계약을 이식한다.

[모듈별 import 공식 가이드](https://echarts.apache.org/handbook/en/basics/import/)에 따라 chart/component/renderer를 명시적으로 등록한다. 이 starter는 필요한 4개 chart 타입(선·막대·산점도·히트맵)으로 6개 시각화를 만든다. histogram은 집계 후 막대, Pareto는 막대+선이다. renderer는 SVG다.

```jsx
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, AriaComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
echarts.use([LineChart, GridComponent, TooltipComponent, AriaComponent, SVGRenderer]);
```

[컨테이너/수명주기 문서](https://echarts.apache.org/handbook/en/concepts/chart-size/)에 따라 실제 너비·높이가 있는 DOM에서 초기화하고, ResizeObserver로 resize하며, unmount 때 dispose한다. 재렌더마다 init하거나 전역 resize listener를 누적하지 않는다. 탭 전환으로 숨겨진/다시 나타난 차트도 확인한다.

[접근성 문서](https://echarts.apache.org/handbook/en/best-practices/aria/)의 AriaComponent를 등록한다. 설명만 켰다고 키보드 탐색이 완성되는 것은 아니다. 동일 데이터 표와 기록 상세 경로를 추가한다. `prefers-reduced-motion`과 빈 상태를 존중하고, 고빈도 실시간 갱신에 강한 animation을 쓰지 않는다.

## 많은 데이터

브라우저에 원본 수백만 행을 모두 내려보내지 않는다. 서버 집계/페이지 처리, viewport 범위, 필요한 chart 타입만 import하는 방식부터 적용한다. 샘플링·binning·top N은 화면에 표시하며 최대/최소/이상치가 사라지지 않는지 확인한다. 선의 시각적 요약과 KPI 원본 집계는 구분한다.

CSV는 현재 필터 범위·단위·시간대를 보존하고 숫자 정밀도를 화면 표시와 별도로 유지한다. 문자열 formula injection을 방어한다. 내보내기는 사용 환경의 허용 범위에 맞춰 제공한다.

## 구현 범위

동봉 demo: **선 추이, Pareto, heatmap, 막대 비교, scatter, histogram**. box plot/SPC/wafer map/Gantt/Sankey/waterfall은 선택·설계 가이드이며 현재 starter에 구현돼 있지 않다. 요청한 주제의 데이터가 있을 때 추가한다.
