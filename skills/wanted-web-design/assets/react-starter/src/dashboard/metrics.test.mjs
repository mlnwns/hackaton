import test from "node:test";
import assert from "node:assert/strict";
import {
  aggregate,
  rate,
  windowRows,
  dailyRows,
  pareto,
  histogram,
  csv,
} from "./metrics.mjs";
import { samples, DEFECTS, ANCHOR_DATE } from "./data.mjs";
test("quality is ratio of sums; invalid or missing pairs do not dilute the rate", () => {
  const a = aggregate([
    { inspected: 10, passed: 5 },
    { inspected: 90, passed: 90 },
    { inspected: 50, passed: null },
    { inspected: 0, passed: 0 },
    { inspected: 10, passed: 20 },
  ]);
  assert.equal(a.passRate, 95);
  assert.equal(a.inspected, 100);
  assert.equal(a.rejected, 5);
  assert.equal(a.missingQuality, 3);
  assert.equal(aggregate([]).passRate, null);
  assert.equal(rate(0, 0), null);
});
test("equal current and previous windows are disjoint and honor filters", () => {
  const opts = { anchor: ANCHOR_DATE, days: 14, line: "LINE-B", step: "식각" };
  const a = windowRows(samples, opts),
    b = windowRows(samples, { ...opts, previous: true });
  assert.equal(a.length, 14);
  assert.equal(b.length, 14);
  assert.equal(a[0].date, "2026-10-17");
  assert.equal(b.at(-1).date, "2026-10-16");
  assert.ok(!a.some((r) => b.some((p) => p.id === r.id)));
  assert.ok(a.every((r) => r.line === "LINE-B" && r.step === "식각"));
});
test("all chart totals reconcile to inspection lots; primary defect classes partition rejects", () => {
  assert.equal(samples.length, 168);
  for (const r of samples)
    assert.equal(
      r.defects.reduce((a, b) => a + b, 0),
      r.inspected - r.passed,
    );
  assert.ok(
    samples.every((r) => r.defects.every((n) => Number.isInteger(n) && n >= 0)),
  );
  const a = aggregate(samples);
  assert.equal(
    dailyRows(samples).reduce((s, r) => s + r.inspected, 0),
    a.inspected,
  );
  const p = pareto(samples, DEFECTS);
  assert.equal(
    p.reduce((s, r) => s + r.count, 0),
    a.rejected,
  );
  assert.equal(p.at(-1).cumulative, 100);
});
test("histogram skips missing data and counts shared edges once", () => {
  assert.deepEqual(
    histogram([null, -1, 0, 1, 2, NaN], [-1, 0, 1, 2]).map((b) => b.count),
    [1, 1, 2],
  );
});
test("CSV retains raw data and escapes formula-leading cells and quotes", () => {
  const s = csv([
    {
      id: '=TEST("x")',
      date: "2026-10-30",
      line: "LINE-A",
      step: "식각",
      inspected: 2,
      passed: 1,
      temperatureDeviation: null,
    },
  ]);
  assert.ok(s.includes('"\'=TEST(""x"")"'));
  assert.ok(s.endsWith(',""'));
  assert.ok(s.startsWith("\ufeff"));
});
