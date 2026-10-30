import React, { useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ThemeProvider,
  Button,
  FilterButton,
  Select,
  SelectMultiple,
  SelectRenderChip,
  Option,
  Tab,
  TabList,
  TabListItem,
  TabPanel,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableCell,
  Checkbox,
  ContentBadge,
  Pagination,
  TextField,
  TextArea,
  FormControl,
  FormControlLabel,
  FormControlField,
  FormControlMessage,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionDescription,
  ProgressIndicator,
  Modal,
  ModalContainer,
  ModalNavigation,
  ModalContent,
  Slider,
  useToast,
} from "@montage-ui/core";
import "@montage-ui/core/global.css";
import "./style.css";
const initialRows = [
  ["냉각 장치 A-02", "1구역", "확인 필요", "온도 재확인", 82],
  ["순환 펌프 B-04", "2구역", "정상", "정기 점검 완료", 34],
  ["압력 센서 C-08", "1구역", "확인 필요", "측정값 재확인", 76],
  ["환기 장치 D-01", "3구역", "정상", "특이사항 없음", 21],
  ["냉각 장치 A-05", "2구역", "정상", "설정 온도 유지", 38],
  ["진공 펌프 B-07", "3구역", "정상", "누설 점검 완료", 28],
  ["유량 센서 C-03", "1구역", "정상", "측정값 정상", 18],
  ["공조 장치 D-06", "2구역", "확인 필요", "필터 교체 확인", 68],
].map(([name, area, status, note, risk], i) => ({
  id: i + 1,
  name,
  area,
  status,
  note,
  risk,
}));
const emptyFilter = { status: "전체", areas: [], risk: 0 };
const toggle = (a, v) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]);
function App() {
  const [tab, setTab] = useState("list"),
    [rows, setRows] = useState(initialRows),
    [q, setQ] = useState(""),
    [sort, setSort] = useState("risk"),
    [page, setPage] = useState(1),
    [selected, setSelected] = useState([]),
    [filter, setFilter] = useState(emptyFilter),
    [draft, setDraft] = useState(emptyFilter),
    [filterOpen, setFilterOpen] = useState(false),
    [detail, setDetail] = useState(initialRows[0]),
    [branch, setBranch] = useState("생산 구역");
  const [title, setTitle] = useState(""),
    [area, setArea] = useState("1구역"),
    [memo, setMemo] = useState(""),
    [priority, setPriority] = useState("normal"),
    [notify, setNotify] = useState(true),
    [submitted, setSubmitted] = useState(false),
    [saving, setSaving] = useState(false),
    [confirmed, setConfirmed] = useState(false),
    [stage, setStage] = useState(0);
  const areaSelectRef = useRef(null);
  const showToast = useToast();
  const say = (content) => showToast({ variant: "positive", content });
  const filtered = rows
    .filter(
      (r) =>
        r.name.toLowerCase().includes(q.toLowerCase()) &&
        (filter.status === "전체" || r.status === filter.status) &&
        (!filter.areas.length || filter.areas.includes(r.area)) &&
        r.risk >= filter.risk,
    )
    .sort((a, b) =>
      sort === "risk" ? b.risk - a.risk : a.name.localeCompare(b.name, "ko"),
    );
  const visible = filtered.slice((page - 1) * 5, page * 5),
    active =
      (filter.status !== "전체" ? 1 : 0) +
      filter.areas.length +
      (filter.risk ? 1 : 0);
  const openFilters = () => {
    setDraft({ ...filter, areas: [...filter.areas] });
    setFilterOpen(true);
  };
  const showDetail = (r) => {
    setDetail(r);
    setTab("detail");
  };
  const reset = () => {
    setFilter(emptyFilter);
    setQ("");
    setPage(1);
  };
  async function submit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (title.trim().length < 2 || !confirmed) {
      if (title.trim().length < 2)
        document.getElementById("request-name")?.focus();
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setRows((v) => [
      ...v,
      {
        id: Date.now(),
        name: title.trim(),
        area,
        status: "확인 필요",
        note: memo.trim() || "점검 요청 접수",
        risk: priority === "urgent" ? 90 : 50,
      },
    ]);
    setSaving(false);
    setTitle("");
    setMemo("");
    setSubmitted(false);
    setConfirmed(false);
    reset();
    setTab("list");
    say("점검 요청이 목록에 추가됐어요. 이 데모에서만 저장됩니다.");
  }
  return (
    <>
      <header className="top">
        <div className="shell top-inner">
          <a className="brand" href="#">
            워크스테이션<span className="beta">DEMO</span>
          </a>
          <nav aria-label="주 메뉴">
            <button onClick={() => setTab("list")}>설비 관리</button>
            <button onClick={() => setTab("form")}>점검 요청</button>
          </nav>
          <a
            className="source"
            href="https://montage.wanted.co.kr"
            target="_blank"
            rel="noreferrer"
          >
            Montage ↗
          </a>
        </div>
      </header>
      <main className="shell">
        <div className="page-heading">
          <div>
            <p className="eyebrow">WANTED WEB · INTERACTION LAB</p>
            <h1>설비 운영 워크스페이스</h1>
            <p className="muted">
              표에서 찾고, 상세를 확인하고, 점검을 요청하세요.
            </p>
          </div>
          <Button onClick={() => setTab("form")}>점검 요청하기</Button>
        </div>
        <Tab value={tab} onValueChange={setTab}>
          <div className="tabbar">
            <TabList size="medium">
              <TabListItem value="list">목록·필터</TabListItem>
              <TabListItem value="detail">상세·안내</TabListItem>
              <TabListItem value="form">입력·요청</TabListItem>
              <TabListItem value="progress">진행·설정</TabListItem>
            </TabList>
          </div>
          <TabPanel value="list">
            <section className="section">
              <div className="toolbar">
                <div className="row">
                  <FilterButton
                    variant="outlined"
                    active={active > 0}
                    activeLabel={active || undefined}
                    onClick={openFilters}
                  >
                    필터 전체
                  </FilterButton>
                  <FilterButton
                    variant="outlined"
                    active={filter.areas.length > 0}
                    onClick={openFilters}
                  >
                    구역 선택
                  </FilterButton>
                  <FilterButton
                    active={filter.status === "확인 필요"}
                    onClick={() => {
                      setFilter((f) => ({
                        ...f,
                        status: f.status === "확인 필요" ? "전체" : "확인 필요",
                      }));
                      setPage(1);
                    }}
                  >
                    확인 필요
                  </FilterButton>
                </div>
                <div className="row search-tools">
                  <TextField
                    aria-label="설비 검색"
                    placeholder="설비 이름 검색"
                    size="medium"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                  />
                  <Select
                    aria-label="정렬 순서"
                    size="medium"
                    width="145px"
                    value={sort}
                    onChange={setSort}
                  >
                    <Option value="risk">우선순위순</Option>
                    <Option value="name">이름순</Option>
                  </Select>
                </div>
              </div>
              <div className="list-meta">
                <span role="status">
                  총 {filtered.length}대{active > 0 ? " · 필터 적용 중" : ""}
                </span>
                {selected.length > 0 ? (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setRows((rs) =>
                        rs.map((r) =>
                          selected.includes(r.id)
                            ? {
                                ...r,
                                status: "정상",
                                note: "점검 완료",
                                risk: 0,
                              }
                            : r,
                        ),
                      );
                      setSelected([]);
                      setPage(1);
                      say("선택한 설비를 점검 완료로 변경했어요.");
                    }}
                  >
                    {selected.length}대 점검 완료 처리
                  </Button>
                ) : (
                  <span>설비 이름을 선택하면 상세로 이동해요</span>
                )}
              </div>
              {filtered.length ? (
                <div className="table-wrap">
                  <Table
                    sx={{ width: "100%" }}
                    pagination={
                      <Pagination
                        page={page}
                        totalPages={Math.ceil(filtered.length / 5)}
                        onChange={(v) => setPage(v || 1)}
                      />
                    }
                  >
                    <TableHead>
                      <TableRow>
                        <TableHeadCell>
                          <Checkbox
                            size="small"
                            aria-label="현재 페이지 모두 선택"
                            checked={visible.every((r) =>
                              selected.includes(r.id),
                            )}
                            onCheckedChange={(v) =>
                              setSelected((s) =>
                                v
                                  ? [
                                      ...new Set([
                                        ...s,
                                        ...visible.map((r) => r.id),
                                      ]),
                                    ]
                                  : s.filter(
                                      (id) => !visible.some((r) => r.id === id),
                                    ),
                              )
                            }
                          />
                        </TableHeadCell>
                        <TableHeadCell>설비 이름</TableHeadCell>
                        <TableHeadCell>담당 구역</TableHeadCell>
                        <TableHeadCell>상태</TableHeadCell>
                        <TableHeadCell>최근 기록</TableHeadCell>
                        <TableHeadCell>우선 점검 지수</TableHeadCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visible.map((r) => (
                        <TableRow key={r.id}>
                          <TableCell>
                            <Checkbox
                              size="small"
                              aria-label={`${r.name} 선택`}
                              checked={selected.includes(r.id)}
                              onCheckedChange={() =>
                                setSelected((s) => toggle(s, r.id))
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <button
                              className="name-link"
                              onClick={() => showDetail(r)}
                            >
                              {r.name}
                            </button>
                          </TableCell>
                          <TableCell>{r.area}</TableCell>
                          <TableCell>
                            <ContentBadge
                              color={
                                r.status === "확인 필요" ? "accent" : "neutral"
                              }
                            >
                              {r.status}
                            </ContentBadge>
                          </TableCell>
                          <TableCell>{r.note}</TableCell>
                          <TableCell>
                            <span className={r.risk > 60 ? "blue" : ""}>
                              {r.risk}
                            </span>
                            <span className="muted"> / 100</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="empty">
                  <span className="empty-icon">⌕</span>
                  <h2>조건에 맞는 설비가 없어요</h2>
                  <p>검색어나 필터를 바꿔 다시 찾아보세요.</p>
                  <Button variant="outlined" onClick={reset}>
                    전체 보기
                  </Button>
                </div>
              )}
              <p className="provenance">
                구역 필터: 원티드 PC 웹 관찰 · 표·선택·페이지 이동: 공식 Montage
                · 설비 데이터: 가상 예시
              </p>
            </section>
          </TabPanel>
          <TabPanel value="detail">
            <div className="detail-layout">
              <article>
                <ContentBadge color="accent">{detail.status}</ContentBadge>
                <h1 className="detail-title">{detail.name}</h1>
                <p className="muted">설비 운영팀 · {detail.area} · 정기 점검</p>
                <div className="detail-banner">
                  <div className="device">
                    <span />
                    <i />
                    <b />
                  </div>
                  <div>
                    <span className="eyebrow">EQUIPMENT RECORD</span>
                    <h2>
                      정확한 기록으로
                      <br />
                      안전한 운영을 이어가요.
                    </h2>
                    <small>설비 일러스트와 기록은 예시입니다.</small>
                  </div>
                </div>
                <h2>설비 정보</h2>
                <p className="body-copy">
                  최근 점검에서 기록한 내용을 확인하고 후속 점검을 요청할 수
                  있어요. 담당 구역, 확인할 항목과 요청 내용을 함께 남겨주세요.
                </p>
                <dl className="facts">
                  <div>
                    <dt>담당 구역</dt>
                    <dd>{detail.area}</dd>
                  </div>
                  <div>
                    <dt>최근 기록</dt>
                    <dd>{detail.note}</dd>
                  </div>
                  <div>
                    <dt>점검 방식</dt>
                    <dd>현장 확인 후 결과 기록</dd>
                  </div>
                  <div>
                    <dt>관리 번호</dt>
                    <dd>EQ-{String(detail.id).slice(-4).padStart(4, "0")}</dd>
                  </div>
                </dl>
                <h2>확인할 내용</h2>
                <Accordion divider defaultExpanded>
                  <AccordionSummary>
                    점검 전에 무엇을 확인하나요?
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionDescription>
                      설비 식별 번호와 담당 구역이 일치하는지 확인해주세요. 이
                      화면의 지수와 기록은 동작을 보여주기 위한 가상
                      데이터입니다.
                    </AccordionDescription>
                  </AccordionDetails>
                </Accordion>
                <Accordion divider>
                  <AccordionSummary>
                    요청 후 내용을 수정할 수 있나요?
                  </AccordionSummary>
                  <AccordionDetails>
                    <AccordionDescription>
                      이 예시에서는 새 요청을 목록에 추가할 수 있어요. 실제
                      제품에는 요청 상세와 수정 권한을 연결하세요.
                    </AccordionDescription>
                  </AccordionDetails>
                </Accordion>
                <p className="provenance">
                  원티드 공고 상세의 본문·메타 정보·우측 고정 액션 구조를 설비
                  주제로 적용했습니다.
                </p>
              </article>
              <aside className="sticky">
                <h3>후속 점검 요청</h3>
                <p>
                  확인이 필요한 내용을 남겨
                  <br />
                  다음 점검으로 연결하세요.
                </p>
                <dl className="facts compact">
                  <div>
                    <dt>상태</dt>
                    <dd>{detail.status}</dd>
                  </div>
                  <div>
                    <dt>담당</dt>
                    <dd>{detail.area}</dd>
                  </div>
                </dl>
                <Button
                  fullWidth
                  onClick={() => {
                    setTitle(detail.name);
                    setArea(detail.area);
                    setTab("form");
                  }}
                >
                  이 설비 점검 요청
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  color="assistive"
                  onClick={() => setTab("list")}
                >
                  목록으로 돌아가기
                </Button>
                <small>외부 서버로 전송되지 않는 데모예요.</small>
              </aside>
            </div>
          </TabPanel>
          <TabPanel value="form">
            <div className="form-layout">
              <section>
                <h2>점검 요청하기</h2>
                <p className="muted">
                  필요한 정보만 입력하면 목록에서 확인할 수 있어요.
                </p>
                <form onSubmit={submit} noValidate className="request-form">
                  <FormControl>
                    <FormControlLabel required htmlFor="request-name">
                      설비 이름
                    </FormControlLabel>
                    <FormControlField>
                      <TextField
                        id="request-name"
                        width="100%"
                        placeholder="예: 냉각 장치 A-02"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        status={
                          submitted && title.trim().length < 2
                            ? "negative"
                            : "normal"
                        }
                        aria-invalid={submitted && title.trim().length < 2}
                        aria-describedby="title-help"
                      />
                    </FormControlField>
                    {submitted && title.trim().length < 2 ? (
                      <p className="error" id="title-help">
                        설비 이름을 2자 이상 입력해주세요.
                      </p>
                    ) : (
                      <FormControlMessage id="title-help">
                        설비에 표시된 이름이나 관리 번호를 입력해주세요.
                      </FormControlMessage>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormControlLabel>담당 구역</FormControlLabel>
                    <FormControlField>
                      <Select
                        width="100%"
                        aria-label="요청 담당 구역"
                        value={area}
                        onChange={setArea}
                      >
                        {["1구역", "2구역", "3구역"].map((v) => (
                          <Option key={v} value={v}>
                            {v}
                          </Option>
                        ))}
                      </Select>
                    </FormControlField>
                  </FormControl>
                  <FormControl>
                    <FormControlLabel>우선순위</FormControlLabel>
                    <RadioGroup
                      value={priority}
                      onValueChange={setPriority}
                      orientation="horizontal"
                      className="row"
                    >
                      <label className="check-label">
                        <RadioGroupItem aria-label="일반 점검" value="normal" />
                        일반 점검
                      </label>
                      <label className="check-label">
                        <RadioGroupItem aria-label="우선 확인" value="urgent" />
                        우선 확인
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormControlLabel htmlFor="request-memo">
                      요청 내용 <span className="muted">(선택)</span>
                    </FormControlLabel>
                    <FormControlField>
                      <TextArea
                        id="request-memo"
                        width="100%"
                        minRows={4}
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="어떤 부분을 확인하면 좋을까요?"
                      />
                    </FormControlField>
                  </FormControl>
                  <div className="setting-row">
                    <div>
                      <strong>진행 상태 알림</strong>
                      <p>이 데모에서는 설정 선택만 저장해요.</p>
                    </div>
                    <Switch
                      aria-label="진행 상태 알림"
                      checked={notify}
                      onCheckedChange={setNotify}
                    />
                  </div>
                  <label className="check-label">
                    <Checkbox
                      aria-label="설비 정보 확인"
                      checked={confirmed}
                      onCheckedChange={setConfirmed}
                    />
                    입력한 설비 정보를 확인했어요.
                  </label>
                  {submitted && !confirmed && (
                    <p className="error" role="alert">
                      설비 정보 확인에 체크해주세요.
                    </p>
                  )}
                  <Button type="submit" size="large" fullWidth loading={saving}>
                    점검 요청 등록
                  </Button>
                </form>
              </section>
              <aside className="form-help">
                <h3>입력 상태도 디자인의 일부예요</h3>
                <p>
                  비어 있는 필수 입력 → 오류 안내 → 수정 → 등록 → 목록 반영까지
                  연결했어요.
                </p>
                <p>
                  폼 컨트롤은 공식 Montage를 사용하고, 원티드 로그인 화면의
                  라벨·입력 밀도를 참고했습니다.
                </p>
                <div className="disabled-example">
                  <span>비활성 입력 예시</span>
                  <TextField
                    disabled
                    width="100%"
                    value="관리 번호는 자동 발급돼요"
                    readOnly
                  />
                </div>
              </aside>
            </div>
          </TabPanel>
          <TabPanel value="progress">
            <div className="progress-layout">
              <section>
                <h2>점검 진행 상황</h2>
                <p className="muted">
                  다음 단계로 이동하며 진행·완료 상태를 확인하세요.
                </p>
                <div className="step-list">
                  {["요청 접수", "담당자 확인", "현장 점검", "점검 완료"].map(
                    (s, i) => (
                      <div
                        key={s}
                        className={`step ${i <= stage ? "reached" : ""}`}
                      >
                        <span>{i < stage || stage === 3 ? "✓" : i + 1}</span>
                        <div>
                          <strong>{s}</strong>
                          <p>
                            {i < stage || stage === 3
                              ? "완료했어요"
                              : i === stage
                                ? "현재 진행 중이에요"
                                : "앞 단계 완료 후 진행해요"}
                          </p>
                        </div>
                        {i === stage && (
                          <ContentBadge color="accent">
                            {stage === 3 ? "완료" : "진행 중"}
                          </ContentBadge>
                        )}
                      </div>
                    ),
                  )}
                </div>
                <ProgressIndicator percent={(stage / 3) * 100} />
                <div className="row progress-buttons">
                  <Button
                    variant="outlined"
                    color="assistive"
                    disabled={stage === 0}
                    onClick={() => setStage((v) => v - 1)}
                  >
                    이전 단계
                  </Button>
                  <Button
                    disabled={stage === 3}
                    onClick={() => {
                      setStage((v) => v + 1);
                      say(
                        stage === 2
                          ? "모든 점검이 완료됐어요."
                          : "다음 단계로 이동했어요.",
                      );
                    }}
                  >
                    {stage === 3 ? "점검 완료" : "다음 단계"}
                  </Button>
                </div>
                <p className="provenance">
                  진행 흐름은 해커톤 응용 예시입니다. 원티드 서비스에서 관찰한
                  업무 화면은 아닙니다.
                </p>
              </section>
              <aside className="form-help">
                <h3>다른 주제에 적용하려면</h3>
                <dl className="recipes">
                  <div>
                    <dt>예약·신청</dt>
                    <dd>입력 폼 + 상세 + 진행 상태</dd>
                  </div>
                  <div>
                    <dt>분석·운영</dt>
                    <dd>필터 + 표 + 상세 + 일괄 처리</dd>
                  </div>
                  <div>
                    <dt>콘텐츠·교육</dt>
                    <dd>탭 + 목록 + 상세 + 아코디언</dd>
                  </div>
                  <div>
                    <dt>탐색·추천</dt>
                    <dd>검색 + 다중 선택 + 빈 상태</dd>
                  </div>
                </dl>
                <a
                  href="https://montage.wanted.co.kr/docs/components"
                  target="_blank"
                  rel="noreferrer"
                >
                  공식 컴포넌트 전체 보기 ↗
                </a>
              </aside>
            </div>
          </TabPanel>
        </Tab>
        <footer className="foot">
          원티드의 공개 디자인 시스템을 사용한 독립 데모 · 원티드와 제휴한
          서비스가 아닙니다.
        </footer>
      </main>
      <Modal open={filterOpen} onOpenChange={setFilterOpen}>
        <ModalContainer
          size="large"
          sx={{ width: "560px", maxWidth: "calc(100vw - 32px)" }}
        >
          <ModalNavigation>필터</ModalNavigation>
          <ModalContent horizontalPadding="none" sx={{ paddingInline: "24px" }}>
            <FormControl>
              <FormControlLabel>설비 상태</FormControlLabel>
              <Select
                width="100%"
                aria-label="설비 상태"
                value={draft.status}
                onChange={(v) => setDraft((d) => ({ ...d, status: v }))}
              >
                {["전체", "확인 필요", "정상"].map((v) => (
                  <Option key={v} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormControlLabel>담당 구역</FormControlLabel>
              <SelectMultiple
                ref={areaSelectRef}
                width="100%"
                aria-label="담당 구역 다중 선택"
                value={draft.areas}
                onChange={(v) => setDraft((d) => ({ ...d, areas: v }))}
                placeholder="구역 선택"
                render={() =>
                  draft.areas.map((v) => (
                    <SelectRenderChip
                      key={v}
                      aria-label={`${v} 선택 해제`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDraft((d) => ({
                          ...d,
                          areas: d.areas.filter((a) => a !== v),
                        }));
                        areaSelectRef.current?.focus();
                      }}
                    >
                      {v}
                    </SelectRenderChip>
                  ))
                }
              >
                {["1구역", "2구역", "3구역"].map((v) => (
                  <Option key={v} value={v}>
                    {v}
                  </Option>
                ))}
              </SelectMultiple>
            </FormControl>
            <div className="hierarchy">
              <div>
                {["생산 구역", "지원 구역"].map((b) => (
                  <button
                    key={b}
                    aria-pressed={branch === b}
                    onClick={() => setBranch(b)}
                  >
                    {b}
                    <span>
                      {draft.areas.filter((a) =>
                        b === "생산 구역" ? a !== "3구역" : a === "3구역",
                      ).length || ""}
                    </span>
                  </button>
                ))}
              </div>
              <div>
                {(branch === "생산 구역" ? ["1구역", "2구역"] : ["3구역"]).map(
                  (v) => (
                    <label key={v} className="check-label">
                      <Checkbox
                        checked={draft.areas.includes(v)}
                        onCheckedChange={() =>
                          setDraft((d) => ({ ...d, areas: toggle(d.areas, v) }))
                        }
                      />
                      {v}
                    </label>
                  ),
                )}
              </div>
            </div>
            <Slider
              title={`우선 점검 지수 ${draft.risk} 이상`}
              value={[draft.risk]}
              onValueChange={(v) => setDraft((d) => ({ ...d, risk: v[0] }))}
              min={0}
              max={100}
              step={10}
            />
            <p className="draft-help">
              적용을 누르기 전까지 목록은 바뀌지 않아요.
            </p>
          </ModalContent>
          <div className="modal-footer">
            <Button
              size="large"
              variant="outlined"
              color="assistive"
              onClick={() => setDraft({ ...emptyFilter, areas: [] })}
            >
              초기화
            </Button>
            <Button
              size="large"
              fullWidth
              onClick={() => {
                setFilter(draft);
                setPage(1);
                setSelected([]);
                setFilterOpen(false);
              }}
            >
              적용
            </Button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
document.fonts
  .load("16px 'Pretendard Variable'")
  .then(() => document.fonts.ready)
  .then(() => {
    document.documentElement.dataset.fontLoaded = String(
      [...document.fonts].some(
        (f) => f.family === "Pretendard Variable" && f.status === "loaded",
      ),
    );
  });
