import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts/core";
import {
  LineChart,
  BarChart,
  ScatterChart,
  HeatmapChart,
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  VisualMapComponent,
  AriaComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";
import { baseOption } from "./chart-theme.mjs";
echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  HeatmapChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  VisualMapComponent,
  AriaComponent,
  SVGRenderer,
]);
export function Chart({ option, label, onSelect }) {
  const host = useRef(null),
    instance = useRef(null),
    select = useRef(onSelect),
    [failed, setFailed] = useState(false);
  select.current = onSelect;
  useEffect(() => {
    let disposed = false;
    let chart;
    try {
      chart = echarts.init(host.current, null, { renderer: "svg" });
      instance.current = chart;
      chart.on("click", (p) => select.current?.(p));
    } catch {
      setFailed(true);
      return;
    }
    const observer = new ResizeObserver(() => {
      if (!disposed && host.current.clientWidth > 0) chart.resize();
    });
    observer.observe(host.current);
    document.fonts.ready.then(() => {
      if (!disposed) chart.resize();
    });
    return () => {
      disposed = true;
      observer.disconnect();
      chart.dispose();
      instance.current = null;
    };
  }, []);
  useEffect(() => {
    if (instance.current) {
      try {
        instance.current.setOption(
          {
            ...baseOption,
            ...option,
            aria: { enabled: true, label: { description: label } },
          },
          { notMerge: true },
        );
        setFailed(false);
      } catch {
        setFailed(true);
      }
    }
  }, [option, label]);
  return (
    <>
      {failed && (
        <p className="chart-error" role="alert">
          차트를 표시하지 못했어요. 아래 데이터 표에서 값을 확인하세요.
        </p>
      )}
      <div
        className="data-chart"
        ref={host}
        role="img"
        aria-label={label}
        style={failed ? { display: "none" } : undefined}
      />
    </>
  );
}
export function ChartPanel({
  title,
  subtitle,
  summary,
  option,
  columns,
  rows,
  onSelect,
  children,
  className = "",
}) {
  return (
    <section className={`chart-panel ${className}`}>
      <header>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <Chart
        option={option}
        label={`${title}. ${summary}`}
        onSelect={onSelect}
      />
      <p className="chart-summary">{summary}</p>
      {children}
      <details className="chart-data">
        <summary>{title} 데이터 표</summary>
        <div className="chart-table-scroll">
          <table>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {r.map((v, j) => (
                    <td key={j}>{v ?? "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
