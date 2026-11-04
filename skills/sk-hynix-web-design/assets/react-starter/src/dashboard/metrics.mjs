export const finite = (n) => typeof n === "number" && Number.isFinite(n);
export const sum = (rows, key) =>
  rows.reduce((s, r) => s + (finite(r[key]) ? r[key] : 0), 0);
export function rate(numerator, denominator) {
  return finite(numerator) &&
    finite(denominator) &&
    denominator > 0 &&
    numerator >= 0 &&
    numerator <= denominator
    ? (numerator / denominator) * 100
    : null;
}
export function aggregate(rows) {
  const quality = rows.filter((r) => rate(r.passed, r.inspected) !== null);
  const uptime = rows.filter(
    (r) => rate(r.runMinutes, r.plannedMinutes) !== null,
  );
  const inspected = sum(quality, "inspected"),
    passed = sum(quality, "passed");
  return {
    inspected,
    passed,
    rejected: inspected - passed,
    passRate: rate(passed, inspected),
    uptime: rate(sum(uptime, "runMinutes"), sum(uptime, "plannedMinutes")),
    qualityCount: quality.length,
    missingQuality: rows.length - quality.length,
    missingTemperature: rows.filter((r) => !finite(r.temperatureDeviation))
      .length,
  };
}
export function dateOffset(date, days) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
export function windowRows(
  rows,
  { anchor, days, line = "전체", step = "전체", previous = false },
) {
  const end = dateOffset(anchor, previous ? -days : 0),
    start = dateOffset(end, 1 - days);
  return rows.filter(
    (r) =>
      r.date >= start &&
      r.date <= end &&
      (line === "전체" || r.line === line) &&
      (step === "전체" || r.step === step),
  );
}
export function dailyRows(rows) {
  return [...new Set(rows.map((r) => r.date))].sort().map((date) => ({
    date,
    ...aggregate(rows.filter((r) => r.date === date)),
  }));
}
export function pareto(rows, labels) {
  const counts = labels
    .map((name, i) => ({
      name,
      count: rows.reduce((s, r) => s + (r.defects?.[i] || 0), 0),
    }))
    .sort((a, b) => b.count - a.count);
  const total = counts.reduce((s, x) => s + x.count, 0);
  let running = 0;
  return counts.map((x) => ({
    ...x,
    cumulative: total ? ((running += x.count) / total) * 100 : null,
  }));
}
export function histogram(values, edges) {
  const valid = values.filter(finite);
  return edges.slice(0, -1).map((lo, i) => ({
    label: `${lo} ~ ${edges[i + 1]}`,
    lo,
    hi: edges[i + 1],
    count: valid.filter(
      (v) =>
        v >= lo &&
        (i === edges.length - 2 ? v <= edges[i + 1] : v < edges[i + 1]),
    ).length,
  }));
}
export function csv(rows) {
  const cell = (v) => {
    let s = String(v ?? "");
    if (typeof v === "string" && /^[=+@\-\t\r]/.test(s)) s = "'" + s;
    return `"${s.replaceAll('"', '""')}"`;
  };
  return (
    "\ufeff" +
    [
      [
        "lot",
        "date_KST",
        "line",
        "process",
        "inspected",
        "passed",
        "rejected",
        "temperature_deviation_C",
      ],
      ...rows.map((r) => [
        r.id,
        r.date,
        r.line,
        r.step,
        r.inspected,
        r.passed,
        r.inspected - r.passed,
        r.temperatureDeviation,
      ]),
    ]
      .map((r) => r.map(cell).join(","))
      .join("\r\n")
  );
}
