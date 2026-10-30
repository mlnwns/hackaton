import React, { useMemo, useState } from "react";
import {
  Button,
  Select,
  Option,
  Tab,
  TabList,
  TabListItem,
  TabPanel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
  Pagination,
  TextField,
  ContentBadge,
  Modal,
  ModalContainer,
  ModalNavigation,
  ModalContent,
} from "@montage-ui/core";
import { ChartPanel } from "./Chart.jsx";
import { axis, chartTokens as C } from "./chart-theme.mjs";
import {
  samples,
  STEPS,
  LINES,
  DEFECTS,
  ANCHOR_DATE,
  SAMPLE_UPDATED_AT,
  TARGET_PASS_RATE,
} from "./data.mjs";
import {
  aggregate,
  windowRows,
  dailyRows,
  pareto,
  histogram,
  dateOffset,
  rate,
  csv,
  finite,
} from "./metrics.mjs";
import "./dashboard.css";
const number = (n) => (finite(n) ? n.toLocaleString("ko-KR") : "—");
const decimal = (n, d = 2) => (finite(n) ? n.toFixed(d) : "—");
const shortDate = (d) => d.slice(5).replace("-", "/");
function Kpi({ label, value, unit, delta, positive, help }) {
  return (
    <section className="dash-kpi">
      <p>{label}</p>
      <div className="kpi-value">
        {value}
        <small>{unit}</small>
      </div>
      <p
        className={
          positive === null
            ? "kpi-neutral"
            : positive
              ? "kpi-positive"
              : "kpi-negative"
        }
      >
        {delta}
      </p>
      <small>{help}</small>
    </section>
  );
}
export default function Dashboard() {
  const [days, setDays] = useState("14"),
    [line, setLine] = useState("전체"),
    [step, setStep] = useState("전체"),
    [tab, setTab] = useState("overview"),
    [focusDate, setFocusDate] = useState("전체"),
    [query, setQuery] = useState(""),
    [page, setPage] = useState(1),
    [order, setOrder] = useState("date"),
    [mode, setMode] = useState("ready"),
    [detail, setDetail] = useState(null);
  const empty = mode === "empty",
    busy = mode === "loading",
    failed = mode === "error";
  const current = useMemo(
    () =>
      empty
        ? []
        : windowRows(samples, {
            anchor: ANCHOR_DATE,
            days: Number(days),
            line,
            step,
          }),
    [days, line, step, empty],
  );
  const previous = useMemo(
    () =>
      empty
        ? []
        : windowRows(samples, {
            anchor: ANCHOR_DATE,
            days: Number(days),
            line,
            step,
            previous: true,
          }),
    [days, line, step, empty],
  );
  const now = useMemo(() => aggregate(current), [current]),
    before = useMemo(() => aggregate(previous), [previous]);
  const trend = useMemo(() => dailyRows(current), [current]),
    prior = useMemo(() => dailyRows(previous), [previous]);
  const causes = useMemo(() => pareto(current, DEFECTS), [current]);
  const points = useMemo(
    () => current.filter((r) => finite(r.temperatureDeviation)),
    [current],
  );
  const bins = useMemo(
    () =>
      histogram(
        points.map((r) => r.temperatureDeviation),
        [-1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3],
      ),
    [points],
  );
  const dates = trend.map((r) => r.date);
  const heat = useMemo(
    () =>
      (step === "전체" ? STEPS : [step])
        .flatMap((s, y) =>
          trend.map((d, x) => {
            const a = aggregate(
              current.filter((r) => r.step === s && r.date === d.date),
            );
            return {
              value: [x, y, a.passRate === null ? null : 100 - a.passRate],
              date: d.date,
              step: s,
              inspected: a.inspected,
              rejected: a.rejected,
            };
          }),
        )
        .filter((x) => x.value[2] !== null),
    [current, trend, step],
  );
  const stepData = useMemo(
    () =>
      STEPS.map((s) => ({
        name: s,
        ...aggregate(current.filter((r) => r.step === s)),
      })).filter((r) => r.qualityCount),
    [current],
  );
  const visibleRows = current
    .filter(
      (r) =>
        (focusDate === "전체" || r.date === focusDate) &&
        `${r.id} ${r.line} ${r.step}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) =>
      order === "reject"
        ? b.inspected - b.passed - (a.inspected - a.passed)
        : b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
    );
  const pages = Math.max(1, Math.ceil(visibleRows.length / 8)),
    safePage = Math.min(page, pages);
  const update = (setter, value) => {
    setter(value);
    setFocusDate("전체");
    setPage(1);
  };
  const inspectDay = (date, process) => {
    if (process) setStep(process);
    setFocusDate(date);
    setPage(1);
    setQuery("");
    setTab("records");
  };
  const clear = () => {
    setDays("14");
    setOrder("date");
    setLine("전체");
    setStep("전체");
    setFocusDate("전체");
    setQuery("");
    setPage(1);
    setMode("ready");
  };
  const retry = () => {
    setMode("loading");
    window.setTimeout(() => setMode("ready"), 650);
  };
  const exportRows = () => {
    const blob = new Blob([csv(visibleRows)], {
        type: "text/csv;charset=utf-8;",
      }),
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `sample-inspections-${ANCHOR_DATE}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const pp =
    now.passRate !== null && before.passRate !== null
      ? now.passRate - before.passRate
      : null;
  const up =
    now.uptime !== null && before.uptime !== null
      ? now.uptime - before.uptime
      : null;
  const trendOption = useMemo(
    () => ({
      grid: { left: 46, right: 25, top: 28, bottom: 58 },
      legend: { data: ["선택 기간", "직전 동일 기간"], bottom: 0 },
      xAxis: {
        ...axis(),
        type: "category",
        data: trend.map((d) => shortDate(d.date)),
        boundaryGap: false,
        splitLine: { show: false },
        axisLabel: { ...axis().axisLabel, interval: days === "14" ? 2 : 0 },
      },
      yAxis: { ...axis("%"), type: "value", min: 94, max: 100, interval: 2 },
      series: [
        {
          name: "선택 기간",
          type: "line",
          data: trend.map((d) => d.passRate),
          smooth: false,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { width: 2.5 },
          itemStyle: { color: C.primary },
          areaStyle: { color: "rgba(0,102,255,.045)" },
          connectNulls: false,
          markLine: {
            symbol: "none",
            silent: true,
            label: {
              formatter: "목표 98.5%",
              position: "insideEndTop",
              color: C.secondary,
              fontSize: 10,
            },
            lineStyle: { color: "#929AA7", type: "dashed" },
            data: [{ yAxis: TARGET_PASS_RATE }],
          },
        },
        {
          name: "직전 동일 기간",
          type: "line",
          data: prior.map((d) => d.passRate),
          symbol: "none",
          lineStyle: { width: 1.5, type: "dashed", color: C.comparison },
          itemStyle: { color: C.comparison },
        },
      ],
      tooltip: {
        trigger: "axis",
        confine: true,
        renderMode: "richText",
        formatter: (ps) => {
          const i = ps[0]?.dataIndex;
          return `${trend[i]?.date} (KST)\n선택 기간  ${decimal(trend[i]?.passRate)}%\n${prior[i]?.date}  ${decimal(prior[i]?.passRate)}%\n${number(trend[i]?.passed)} / ${number(trend[i]?.inspected)}건 합격`;
        },
      },
    }),
    [trend, prior, days],
  );
  const paretoOption = useMemo(
    () => ({
      grid: { left: 47, right: 43, top: 28, bottom: 52 },
      legend: { data: ["불합격 수", "누적 비중"], bottom: 0 },
      tooltip: {
        trigger: "axis",
        confine: true,
        renderMode: "richText",
        formatter: (ps) => {
          const c = causes[ps[0]?.dataIndex];
          return c
            ? `${c.name}\n불합격 ${number(c.count)}건\n누적 비중 ${decimal(c.cumulative, 1)}%`
            : "";
        },
      },
      xAxis: {
        ...axis(),
        type: "category",
        data: causes.map((c) => c.name),
        axisLabel: { ...axis().axisLabel, interval: 0 },
        splitLine: { show: false },
      },
      yAxis: [
        { ...axis("건"), type: "value", min: 0 },
        {
          ...axis("%"),
          type: "value",
          min: 0,
          max: 100,
          interval: 50,
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: "불합격 수",
          type: "bar",
          data: causes.map((c) => c.count),
          barMaxWidth: 30,
          itemStyle: { color: C.primary, borderRadius: [3, 3, 0, 0] },
        },
        {
          name: "누적 비중",
          type: "line",
          yAxisIndex: 1,
          data: causes.map((c) => c.cumulative),
          symbolSize: 6,
          itemStyle: { color: "#7761C3" },
          lineStyle: { width: 2 },
        },
      ],
    }),
    [causes],
  );
  const heatOption = useMemo(
    () => ({
      grid: { left: 56, right: 18, top: 8, bottom: 63 },
      tooltip: {
        trigger: "item",
        confine: true,
        renderMode: "richText",
        formatter: (p) =>
          `${p.data.date} · ${p.data.step}\n불합격률 ${decimal(p.value[2])}%\n불합격 ${number(p.data.rejected)} / 검사 ${number(p.data.inspected)}건\n선택하면 해당 검사 기록으로 이동`,
      },
      xAxis: {
        ...axis(),
        type: "category",
        data: dates.map(shortDate),
        splitLine: { show: false },
        axisLabel: { ...axis().axisLabel, interval: days === "14" ? 1 : 0 },
      },
      yAxis: {
        ...axis(),
        type: "category",
        data: step === "전체" ? STEPS : [step],
        splitLine: { show: false },
      },
      visualMap: {
        min: 0,
        max: 5,
        orient: "horizontal",
        left: "center",
        bottom: 0,
        itemWidth: 9,
        itemHeight: 130,
        calculable: false,
        inRange: { color: C.sequential },
        text: ["5% 이상", "0%"],
        textStyle: {
          fontFamily: C.fontFamily,
          fontSize: 11,
          color: C.secondary,
        },
      },
      series: [
        {
          type: "heatmap",
          data: heat,
          label: { show: false },
          itemStyle: { borderWidth: 3, borderColor: "#fff" },
          emphasis: { itemStyle: { borderColor: "#171719", borderWidth: 2 } },
        },
      ],
    }),
    [heat, dates.join(","), days, step],
  );
  const scatterOption = useMemo(
    () => ({
      grid: { left: 46, right: 24, top: 26, bottom: 58 },
      legend: { bottom: 0 },
      tooltip: {
        trigger: "item",
        confine: true,
        renderMode: "richText",
        formatter: (p) =>
          `${p.data.lot.id}\n온도 편차 ${p.value[0]}°C\n불합격률 ${decimal(p.value[1])}%\n${p.data.lot.line} · ${p.data.lot.step}`,
      },
      xAxis: {
        ...axis("°C"),
        type: "value",
        min: -1,
        max: 3,
        splitLine: { show: false },
      },
      yAxis: { ...axis("%"), type: "value", min: 0, max: 5 },
      series: LINES.map((l, i) => ({
        name: l,
        type: "scatter",
        symbol: i ? "diamond" : "circle",
        symbolSize: 9,
        itemStyle: { color: C.categorical[i], opacity: 0.78 },
        data: points
          .filter((r) => r.line === l)
          .map((r) => ({
            value: [r.temperatureDeviation, 100 - rate(r.passed, r.inspected)],
            lot: r,
          })),
      })),
    }),
    [points],
  );
  const histogramOption = useMemo(
    () => ({
      grid: { left: 40, right: 18, top: 28, bottom: 46 },
      xAxis: {
        ...axis(),
        type: "category",
        data: bins.map((b) => b.label),
        axisLabel: { ...axis().axisLabel, interval: 1 },
        splitLine: { show: false },
      },
      yAxis: { ...axis("LOT"), type: "value", min: 0, minInterval: 1 },
      series: [
        {
          name: "LOT 수",
          type: "bar",
          barCategoryGap: "8%",
          data: bins.map((b) => b.count),
          itemStyle: { color: C.primary, borderRadius: [2, 2, 0, 0] },
        },
      ],
    }),
    [bins],
  );
  const barOption = useMemo(
    () => ({
      grid: { left: 46, right: 22, top: 28, bottom: 28 },
      tooltip: {
        trigger: "axis",
        confine: true,
        renderMode: "richText",
        valueFormatter: (v) => `${decimal(v, 1)}%`,
      },
      xAxis: {
        ...axis(),
        type: "category",
        data: stepData.map((r) => r.name),
        splitLine: { show: false },
      },
      yAxis: { ...axis("%"), type: "value", min: 0, max: 100 },
      series: [
        {
          name: "장비 가동률",
          type: "bar",
          barMaxWidth: 38,
          data: stepData.map((r) => r.uptime),
          itemStyle: { color: C.primary, borderRadius: [3, 3, 0, 0] },
          label: {
            show: true,
            position: "top",
            formatter: (p) => `${decimal(p.value, 1)}%`,
            color: C.secondary,
            fontSize: 12,
          },
        },
      ],
    }),
    [stepData],
  );
  return (
    <div className="wanted-dashboard">
      <div className="dash-heading">
        <div>
          <div className="dash-breadcrumb">
            운영 데이터 <span>/</span> 공정 모니터링
          </div>
          <h1>공정 현황</h1>
          <p>검사 흐름을 확인하고, 변화가 생긴 구간을 찾아보세요.</p>
        </div>
        <div className="dash-updated">
          <ContentBadge>가상 데이터</ContentBadge>
          <span>{SAMPLE_UPDATED_AT} 기준</span>
        </div>
      </div>
      <div className="dash-filters">
        <div className="dash-filter">
          <label id="period-label">조회 기간</label>
          <Select
            size="medium"
            width="168px"
            aria-labelledby="period-label"
            value={days}
            onChange={(v) => update(setDays, v)}
          >
            <Option value="14">최근 14일</Option>
            <Option value="7">최근 7일</Option>
          </Select>
        </div>
        <div className="dash-filter">
          <label id="line-label">라인</label>
          <Select
            size="medium"
            width="150px"
            aria-labelledby="line-label"
            value={line}
            onChange={(v) => update(setLine, v)}
          >
            <Option value="전체">라인 전체</Option>
            {LINES.map((l) => (
              <Option value={l} key={l}>
                {l}
              </Option>
            ))}
          </Select>
        </div>
        <div className="dash-filter">
          <label id="step-label">공정</label>
          <Select
            size="medium"
            width="150px"
            aria-labelledby="step-label"
            value={step}
            onChange={(v) => update(setStep, v)}
          >
            <Option value="전체">공정 전체</Option>
            {STEPS.map((s) => (
              <Option value={s} key={s}>
                {s}
              </Option>
            ))}
          </Select>
        </div>
        <div className="dash-date-range">
          {shortDate(dateOffset(ANCHOR_DATE, 1 - Number(days)))} —{" "}
          {shortDate(ANCHOR_DATE)}
          <small>2026 · KST</small>
        </div>
        <Button
          variant="outlined"
          color="assistive"
          size="small"
          onClick={clear}
        >
          초기화
        </Button>
      </div>
      <p className="dash-scope" role="status">
        {line === "전체" ? "전체 라인" : line} ·{" "}
        {step === "전체" ? "전체 공정" : step} · {current.length}개 검사 LOT ·
        직전 {days}일과 비교
      </p>
      {mode === "stale" && (
        <div className="dash-notice" role="status">
          <strong>수집 지연 예시</strong> 마지막 수집 값을 표시하고 있어요. 집계
          기준은 위 시각과 같습니다.
        </div>
      )}
      {failed ? (
        <div className="dash-fallback" role="alert">
          <h2>데이터를 불러오지 못했어요</h2>
          <p>요청 실패 상태를 보여주는 데모예요.</p>
          <Button onClick={retry}>다시 시도</Button>
        </div>
      ) : busy ? (
        <div
          className="dash-loading"
          role="status"
          aria-label="데이터 불러오는 중"
        >
          <div />
          <div />
          <div />
        </div>
      ) : !current.length ? (
        <div className="dash-fallback">
          <h2>조건에 맞는 데이터가 없어요</h2>
          <p>조건을 초기화하면 샘플 데이터로 돌아가요.</p>
          <Button variant="outlined" onClick={clear}>
            데이터 전체 보기
          </Button>
        </div>
      ) : (
        <>
          <div className="kpi-strip">
            <Kpi
              label="검사 합격률"
              value={decimal(now.passRate)}
              unit="%"
              delta={
                pp === null
                  ? "비교 데이터 없음"
                  : `${pp >= 0 ? "+" : ""}${pp.toFixed(2)}%p · 직전 기간 대비`
              }
              positive={pp === null ? null : pp >= 0}
              help={`합격 ${number(now.passed)} / 검사 ${number(now.inspected)}건`}
            />
            <Kpi
              label="검사 수"
              value={number(now.inspected)}
              unit="건"
              delta={`${now.inspected - before.inspected >= 0 ? "+" : ""}${number(now.inspected - before.inspected)}건 · 직전 기간 대비`}
              positive={null}
              help="공정별 검사 건수의 합계"
            />
            <Kpi
              label="불합격 수"
              value={number(now.rejected)}
              unit="건"
              delta={`${now.rejected - before.rejected >= 0 ? "+" : ""}${number(now.rejected - before.rejected)}건 · 직전 기간 대비`}
              positive={now.rejected <= before.rejected}
              help="대표 불량 유형을 1개씩 집계"
            />
            <Kpi
              label="장비 가동률"
              value={decimal(now.uptime, 1)}
              unit="%"
              delta={
                up === null
                  ? "비교 데이터 없음"
                  : `${up >= 0 ? "+" : ""}${up.toFixed(1)}%p · 직전 기간 대비`
              }
              positive={up === null ? null : up >= 0}
              help="가동 시간 / 계획 시간 · OEE와 다름"
            />
          </div>
          <Tab value={tab} onValueChange={setTab}>
            <div className="dash-tabs">
              <TabList size="medium">
                <TabListItem value="overview">운영 요약</TabListItem>
                <TabListItem value="analysis">품질 분석</TabListItem>
                <TabListItem value="records">검사 기록</TabListItem>
              </TabList>
              <span>검사 합격률 목표 {TARGET_PASS_RATE}% · 예시 기준</span>
            </div>
            <TabPanel value="overview">
              <div className="chart-grid">
                <ChartPanel
                  className="wide-chart"
                  title="검사 합격률 추이"
                  subtitle="선택 기간과 직전 동일 기간 · 세로축 94–100%"
                  summary={`전체 검사 합격률 ${decimal(now.passRate)}%. 점을 선택하면 해당 날짜의 검사 기록을 확인할 수 있어요.`}
                  option={trendOption}
                  onSelect={(p) => {
                    if (p.seriesIndex === 0)
                      inspectDay(trend[p.dataIndex].date);
                  }}
                  columns={["날짜(KST)", "합격(건)", "검사(건)", "합격률(%)"]}
                  rows={trend.map((r) => [
                    r.date,
                    number(r.passed),
                    number(r.inspected),
                    decimal(r.passRate),
                  ])}
                />
                <ChartPanel
                  title="불량 유형별 기여도"
                  subtitle="막대: 건수 · 선: 누적 비중(%)"
                  summary={
                    causes[0]
                      ? `${causes[0].name} ${number(causes[0].count)}건. 비중은 불합격 검사 건수를 기준으로 계산해요.`
                      : ""
                  }
                  option={paretoOption}
                  columns={["대표 유형", "불합격(건)", "누적(%)"]}
                  rows={causes.map((r) => [
                    r.name,
                    number(r.count),
                    decimal(r.cumulative, 1),
                  ])}
                />
                <ChartPanel
                  className="wide-chart"
                  title="공정별 불합격률"
                  subtitle="날짜 × 공정 · 색상 범위 0–5% 고정"
                  summary="진한 칸의 비율과 검사 수를 함께 확인하세요. 칸을 선택하면 해당 날짜·공정의 검사 기록으로 이동해요."
                  option={heatOption}
                  onSelect={(p) => inspectDay(p.data.date, p.data.step)}
                  columns={[
                    "날짜(KST)",
                    "공정",
                    "불합격(건)",
                    "검사(건)",
                    "불합격률(%)",
                  ]}
                  rows={heat.map((r) => [
                    r.date,
                    r.step,
                    number(r.rejected),
                    number(r.inspected),
                    decimal(r.value[2]),
                  ])}
                />
                <ChartPanel
                  title="공정별 장비 가동률"
                  subtitle="가동 시간 ÷ 계획 시간 · 세로축 0–100%"
                  summary="집계 기간과 공정 범위를 맞춰 비교하세요. 가동률만으로 생산성과 품질을 판단하지 않아요."
                  option={barOption}
                  columns={["공정", "가동률(%)"]}
                  rows={stepData.map((r) => [r.name, decimal(r.uptime, 1)])}
                />
              </div>
            </TabPanel>
            <TabPanel value="analysis">
              <div className="chart-grid equal">
                <ChartPanel
                  title="온도 편차와 불합격률"
                  subtitle="점 1개 = 검사 LOT · 라인은 색과 모양으로 구분"
                  summary={`온도 관측 ${points.length}개, 결측 ${now.missingTemperature}개 제외. 점을 선택해 LOT를 확인할 수 있어요. 상관관계가 원인을 증명하지는 않아요.`}
                  option={scatterOption}
                  onSelect={(p) => setDetail(p.data.lot)}
                  columns={[
                    "LOT",
                    "라인",
                    "공정",
                    "온도 편차(°C)",
                    "불합격률(%)",
                  ]}
                  rows={points.map((r) => [
                    r.id,
                    r.line,
                    r.step,
                    r.temperatureDeviation,
                    decimal(100 - rate(r.passed, r.inspected)),
                  ])}
                />
                <ChartPanel
                  title="온도 편차 분포"
                  subtitle="가로축 °C · 구간 너비 0.5°C · 빈도(LOT 수)"
                  summary={`유효 관측 ${points.length}개를 같은 너비의 구간으로 묶었어요. 결측값은 0으로 바꾸지 않았어요.`}
                  option={histogramOption}
                  columns={["온도 편차 구간(°C)", "LOT 수"]}
                  rows={bins.map((r) => [r.label, r.count])}
                />
              </div>
              <div className="dash-method">
                <h3>해석 전에 확인할 점</h3>
                <p>
                  라인·공정 필터로 같은 조건을 비교하세요. 이 데이터에는 화면
                  검증을 위한 변화가 의도적으로 포함돼 있습니다. 목표선은 임의의
                  예시 기준이며 통계적 관리한계(UCL/LCL)가 아닙니다.
                </p>
              </div>
            </TabPanel>
            <TabPanel value="records">
              <div className="dash-record-tools">
                <div className="dash-record-filters">
                  <TextField
                    size="medium"
                    aria-label="검사 기록 검색"
                    placeholder="LOT·라인·공정 검색"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                  />
                  <Select
                    size="medium"
                    width="165px"
                    aria-label="검사 날짜"
                    value={focusDate}
                    onChange={(v) => {
                      setFocusDate(v);
                      setPage(1);
                    }}
                  >
                    <Option value="전체">날짜 전체</Option>
                    {dates.map((d) => (
                      <Option value={d} key={d}>
                        {d}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    size="medium"
                    width="160px"
                    aria-label="검사 기록 정렬"
                    value={order}
                    onChange={(v) => {
                      setOrder(v);
                      setPage(1);
                    }}
                  >
                    <Option value="date">최신 날짜순</Option>
                    <Option value="reject">불합격 수순</Option>
                  </Select>
                </div>
                <Button
                  variant="outlined"
                  color="assistive"
                  size="small"
                  disabled={!visibleRows.length}
                  onClick={exportRows}
                >
                  현재 결과 CSV
                </Button>
              </div>
              <p className="dash-record-count" role="status">
                {visibleRows.length}개 검사 기록
                {focusDate !== "전체" ? ` · ${focusDate}` : ""} · 상단 KPI는
                전체 조회 기간 기준
              </p>
              {visibleRows.length ? (
                <Table
                  sx={{ width: "100%" }}
                  pagination={
                    <Pagination
                      page={safePage}
                      totalPages={pages}
                      onChange={(v) => setPage(v || 1)}
                    />
                  }
                >
                  <TableHead>
                    <TableRow>
                      {[
                        "LOT / 날짜",
                        "라인 · 공정",
                        "검사(건)",
                        "불합격(건)",
                        "합격률(%)",
                        "온도 편차(°C)",
                      ].map((t) => (
                        <TableHeadCell key={t}>{t}</TableHeadCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visibleRows
                      .slice((safePage - 1) * 8, safePage * 8)
                      .map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>
                            <button
                              className="dash-lot"
                              onClick={() => setDetail(r)}
                            >
                              {r.id}
                            </button>
                            <small className="dash-cell-meta">{r.date}</small>
                          </TableCell>
                          <TableCell>
                            {r.line} · {r.step}
                          </TableCell>
                          <TableCell align="right">
                            {number(r.inspected)}
                          </TableCell>
                          <TableCell align="right">
                            {number(r.inspected - r.passed)}
                          </TableCell>
                          <TableCell align="right">
                            {decimal(rate(r.passed, r.inspected))}
                          </TableCell>
                          <TableCell align="right">
                            {decimal(r.temperatureDeviation)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="dash-fallback">
                  <h2>일치하는 검사 기록이 없어요</h2>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setQuery("");
                      setFocusDate("전체");
                    }}
                  >
                    검색 조건 초기화
                  </Button>
                </div>
              )}
            </TabPanel>
          </Tab>
        </>
      )}
      <details className="dash-demo-controls">
        <summary>데이터 상태 예시 확인</summary>
        <div>
          <p>실제 장애를 발생시키지 않고 화면 상태만 전환합니다.</p>
          <div className="dash-state-buttons">
            {[
              ["ready", "정상"],
              ["loading", "로딩"],
              ["empty", "데이터 없음"],
              ["stale", "수집 지연"],
              ["error", "요청 실패"],
            ].map(([value, label]) => (
              <Button
                key={value}
                size="small"
                variant="outlined"
                color="assistive"
                onClick={() => setMode(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </details>
      <p className="dash-disclaimer">
        168개 가상 검사 LOT로 구성한 독립 예제입니다. SK하이닉스의 실제
        데이터·지표 정의·시험 출제를 나타내지 않습니다.
      </p>
      <Modal
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
      >
        <ModalContainer size="medium">
          <ModalNavigation>검사 LOT 상세</ModalNavigation>
          <ModalContent>
            {detail && (
              <div className="dash-detail">
                <h3>{detail.id}</h3>
                <p>
                  {detail.date} · {detail.line} · {detail.step}
                </p>
                <dl>
                  {[
                    ["검사 수", `${number(detail.inspected)}건`],
                    ["합격 수", `${number(detail.passed)}건`],
                    [
                      "불합격 수",
                      `${number(detail.inspected - detail.passed)}건`,
                    ],
                    [
                      "합격률",
                      `${decimal(rate(detail.passed, detail.inspected))}%`,
                    ],
                    [
                      "온도 편차",
                      finite(detail.temperatureDeviation)
                        ? `${detail.temperatureDeviation}°C`
                        : "미수집",
                    ],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <h4>대표 불량 유형</h4>
                {DEFECTS.map((d, i) => (
                  <p className="dash-defect-row" key={d}>
                    {d}
                    <strong>{detail.defects[i]}건</strong>
                  </p>
                ))}
              </div>
            )}
          </ModalContent>
          <div className="dash-modal-footer">
            <Button fullWidth onClick={() => setDetail(null)}>
              확인
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </div>
  );
}
