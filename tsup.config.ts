import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ui: "src/ui/index.ts",
    constants: "src/constants/index.ts",
    utils: "src/utils/index.ts",
    "styles/tailwind": "src/styles/tailwind.css",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  loader: {
    ".woff2": "file",
  },
});
