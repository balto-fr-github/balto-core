import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    ui: "src/ui/index.ts",
    constants: "src/constants/index.ts",
    utils: "src/utils/index.ts",
    "styles/tailwind": "src/styles/tailwind.css",
  },
  format: ["esm"],
  dts: {
    resolve: true,
  },
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "class-variance-authority"],
  loader: {
    ".woff2": "file",
  },
  outDir: "dist",
});
