// Independent data-visualization theme derived from Wanted/Montage UI roles.
// This is not an official Wanted chart theme. Keep categorical colors separate from status colors.
export const chartTokens = {
  fontFamily: '"Pretendard Variable", Pretendard, sans-serif',
  ink: "#171719",
  secondary: "#5A5D65",
  muted: "#858891",
  grid: "rgba(112,115,124,.12)",
  primary: "#0066FF",
  comparison: "#8C9BAF",
  positive: "#006E25",
  caution: "#A34F00",
  negative: "#D22D36",
  categorical: ["#0066FF", "#7761C3", "#008B93", "#B36424", "#A3477A"],
  sequential: ["#F2F6FC", "#CFDFFA", "#9EC5FF", "#4F95FF", "#0054D1"],
};
export const axis = (name = "") => ({
  name,
  nameTextStyle: {
    color: chartTokens.secondary,
    fontFamily: chartTokens.fontFamily,
    fontSize: 11,
    padding: [0, 0, 8, 0],
  },
  axisLine: { show: false },
  axisTick: { show: false },
  axisLabel: {
    color: chartTokens.secondary,
    fontSize: 11,
    fontFamily: chartTokens.fontFamily,
    margin: 12,
  },
  splitLine: {
    show: true,
    lineStyle: { color: chartTokens.grid, type: "dashed" },
  },
});
export const baseOption = {
  animation: false,
  backgroundColor: "transparent",
  color: chartTokens.categorical,
  textStyle: {
    fontFamily: chartTokens.fontFamily,
    fontSize: 12,
    color: chartTokens.ink,
  },
  grid: { left: 48, right: 24, top: 34, bottom: 34, containLabel: false },
  tooltip: {
    trigger: "axis",
    confine: true,
    renderMode: "richText",
    backgroundColor: "#fff",
    borderColor: "rgba(112,115,124,.16)",
    borderWidth: 1,
    padding: 12,
    textStyle: {
      color: chartTokens.ink,
      fontFamily: chartTokens.fontFamily,
      fontSize: 12,
    },
    axisPointer: {
      type: "line",
      lineStyle: { color: "#AEB8C6", type: "dashed" },
    },
  },
  legend: {
    bottom: 0,
    textStyle: {
      color: chartTokens.secondary,
      fontFamily: chartTokens.fontFamily,
      fontSize: 12,
    },
    itemWidth: 16,
    itemHeight: 8,
  },
};
