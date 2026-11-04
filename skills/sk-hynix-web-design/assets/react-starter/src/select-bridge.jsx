import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, Select, Option } from "@montage-ui/core";
import "@montage-ui/core/global.css";
function Bridge({ native, label }) {
  const [value, setValue] = useState(native.value);
  useEffect(() => {
    const sync = () => setValue(native.value);
    document.addEventListener("wanted-filter-sync", sync);
    return () => document.removeEventListener("wanted-filter-sync", sync);
  }, [native]);
  return (
    <ThemeProvider>
      <Select
        width="100%"
        aria-label={label}
        value={value}
        onChange={(v) => {
          setValue(v);
          native.value = v;
        }}
        contentProps={{
          container: native.closest("dialog"),
          wrapperProps: { style: { zIndex: 10 } },
        }}
      >
        {[...native.options].map((o) => (
          <Option key={o.value} value={o.value}>
            {o.text}
          </Option>
        ))}
      </Select>
    </ThemeProvider>
  );
}
for (const native of document.querySelectorAll("#filter-dialog select")) {
  const label = document.querySelector(`label[for="${native.id}"]`);
  const root = document.createElement("div");
  root.className = "montage-select-bridge";
  native.after(root);
  native.hidden = true;
  native.tabIndex = -1;
  label.removeAttribute("for");
  createRoot(root).render(<Bridge native={native} label={label.textContent} />);
}
