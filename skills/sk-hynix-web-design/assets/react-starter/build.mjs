import { build } from "esbuild";
import { copyFile, mkdir, cp } from "node:fs/promises";
await mkdir("dist", { recursive: true });
await build({
  entryPoints: { app: "src/app.jsx", dashboard: "src/dashboard-main.jsx" },
  bundle: true,
  minify: true,
  format: "iife",
  outdir: "dist",
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".woff2": "file" },
  assetNames: "[name]",
  legalComments: "linked",
  jsx: "automatic",
});
await copyFile("index.html", "dist/index.html");
await copyFile("dashboard.html", "dist/dashboard.html");

await cp("LICENSES", "dist/LICENSES", { recursive: true });
