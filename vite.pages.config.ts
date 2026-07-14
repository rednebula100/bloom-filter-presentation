import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

type PackageMetadata = {
  name: string;
};

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const packageMetadata = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
) as PackageMetadata;
const repositoryName = packageMetadata.name;
const pagesBase = process.env.VITE_BASE_PATH ?? `/${repositoryName}/`;

export default defineConfig({
  base: pagesBase,
  plugins: [react()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
