import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: ".",
      outDir: "dist/types",
      tsconfigPath: "../../tsconfig.json",
      include: ["**/*.ts", "**/*.vue"],
      exclude: ["node_modules", "dist"],
      rollupTypes: true,
      insertTypesEntry: true,
      copyDtsFiles: true,
      pathsToAliases: false,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "VakaoUIUtils",
      fileName: (format) => `vakao-ui-utils.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
});
