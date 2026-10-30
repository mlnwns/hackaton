// Deterministic synthetic inspection lots. These are not SK hynix data.
export const STEPS = ["증착", "식각", "검사"];
export const LINES = ["LINE-A", "LINE-B"];
export const DEFECTS = ["파티클", "패턴 이상", "두께 편차", "표면 결함"];
export const ANCHOR_DATE = "2026-10-30";
export const SAMPLE_UPDATED_AT = "2026-10-30 20:00 KST";
export const TARGET_PASS_RATE = 98.5; // Demo business target, not a statistical control limit.
export const samples = Array.from({ length: 28 }, (_, day) =>
  LINES.flatMap((line, li) =>
    STEPS.map((step, si) => {
      const date = `2026-10-${String(day + 3).padStart(2, "0")}`;
      const inspected = 720 + ((day * 127 + li * 263 + si * 149) % 990);
      const incident = li === 1 && si === 1 && day >= 18 && day <= 23;
      const deviation = Number(
        (Math.sin(day * 0.76 + si + li) * 0.72 + (incident ? 1.75 : 0)).toFixed(
          2,
        ),
      );
      const rejected = Math.round(
        inspected *
          (0.008 +
            (0.5 + 0.5 * Math.sin(day * 0.51 + si + li)) * 0.009 +
            (incident ? 0.025 : 0)),
      );
      const a = Math.round(rejected * (incident ? 0.58 : 0.39)),
        b = Math.round(rejected * 0.28),
        c = Math.round(rejected * (incident ? 0.09 : 0.19));
      const defects = [a, b, c, rejected - a - b - c];
      const plannedMinutes = 480;
      const runMinutes =
        plannedMinutes -
        (18 + ((day * 7 + si * 13 + li * 5) % 32)) -
        (incident ? 58 : 0);
      return {
        id: `LOT-${date.slice(5).replace("-", "")}-${li + 1}${si + 1}`,
        date,
        line,
        step,
        inspected,
        passed: inspected - rejected,
        plannedMinutes,
        runMinutes,
        temperatureDeviation:
          day === 24 && li === 0 && si === 1 ? null : deviation,
        defects,
      };
    }),
  ),
).flat();
