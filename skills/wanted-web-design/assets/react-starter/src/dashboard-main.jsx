import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@montage-ui/core";
import "@montage-ui/core/global.css";
import "./style.css";
import Dashboard from "./dashboard/Dashboard.jsx";
function App() {
  return (
    <ThemeProvider>
      <header className="top">
        <div className="shell dash-standalone top-inner">
          <a className="brand" href="dashboard.html">
            워크스테이션<span className="beta">DATA</span>
          </a>
          <nav className="dash-standalone-nav" aria-label="데이터 주 메뉴">
            <a href="dashboard.html" aria-current="page">
              공정 모니터링
            </a>
            <a href="index.html">UI 실험실</a>
          </nav>
          <a
            className="dash-toplink"
            href="https://montage.wanted.co.kr/docs/components"
            target="_blank"
            rel="noreferrer"
          >
            Montage ↗
          </a>
        </div>
      </header>
      <main className="shell dash-standalone">
        <Dashboard />
      </main>
    </ThemeProvider>
  );
}
createRoot(document.getElementById("root")).render(<App />);
document.fonts
  .load("16px 'Pretendard Variable'")
  .then(() => document.fonts.ready)
  .then(
    () =>
      (document.documentElement.dataset.fontLoaded = String(
        [...document.fonts].some(
          (f) => f.family === "Pretendard Variable" && f.status === "loaded",
        ),
      )),
  );
