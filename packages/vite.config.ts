import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: [
        "components/**/*.ts",
        "components/**/*.d.ts",
        "components/**/*.vue",
        "utils/**/*.ts",
        "hooks/**/*.ts",
        "types/**/*.ts",
        "index.ts",
        "resolver.ts",
      ],
      outDir: "../dist/types",
      entryRoot: __dirname,
      pathsToAliases: false,
      aliasesExclude: [/@vakao-ui\/.*/],
      beforeWriteFile: (filePath, content) => {
        const path = require("path");
        const fileDir = path.dirname(filePath);
        const distTypesRoot = path.resolve(__dirname, "../dist/types");

        // 计算从当前文件到各个模块的相对路径
        const utilsPath = path
          .relative(fileDir, path.join(distTypesRoot, "utils"))
          .replace(/\\/g, "/");
        const typesPath = path
          .relative(fileDir, path.join(distTypesRoot, "types"))
          .replace(/\\/g, "/");
        const hooksPath = path
          .relative(fileDir, path.join(distTypesRoot, "hooks"))
          .replace(/\\/g, "/");

        // 确保路径以 ./ 开头（如果不是以 ../ 开头的话）
        const normalizeRelativePath = (p: string) => {
          if (!p.startsWith("../") && !p.startsWith("./")) {
            return "./" + p;
          }
          return p;
        };

        let updatedContent = content;

        // 替换 @vakao-ui/utils 导入
        updatedContent = updatedContent
          .replace(
            /from ["']@vakao-ui\/utils["']/g,
            `from "${normalizeRelativePath(utilsPath)}"`,
          )
          .replace(
            /import\(["']@vakao-ui\/utils["']\)/g,
            `import("${normalizeRelativePath(utilsPath)}")`,
          );

        // 替换 @vakao-ui/types 导入
        updatedContent = updatedContent
          .replace(
            /from ["']@vakao-ui\/types["']/g,
            `from "${normalizeRelativePath(typesPath)}"`,
          )
          .replace(
            /import\(["']@vakao-ui\/types["']\)/g,
            `import("${normalizeRelativePath(typesPath)}")`,
          );

        // 替换 @vakao-ui/hooks 导入
        updatedContent = updatedContent
          .replace(
            /from ["']@vakao-ui\/hooks["']/g,
            `from "${normalizeRelativePath(hooksPath)}"`,
          )
          .replace(
            /import\(["']@vakao-ui\/hooks["']\)/g,
            `import("${normalizeRelativePath(hooksPath)}")`,
          );

        // 修复错误的内部路径引用
        // 将类似 "../../../../packages/dist/types/utils" 的路径替换为正确的相对路径
        updatedContent = updatedContent.replace(
          /import\(["'][^"']*\/packages\/dist\/types\/utils["']\)/g,
          `import("${normalizeRelativePath(utilsPath)}")`,
        );

        // 修复其他可能的错误路径
        updatedContent = updatedContent.replace(
          /["'][^"']*\/packages\/dist\/types\/([^"']*)["']/g,
          (_match, modulePath) => {
            const targetPath = path
              .relative(fileDir, path.join(distTypesRoot, modulePath))
              .replace(/\\/g, "/");
            return `"${normalizeRelativePath(targetPath)}"`;
          },
        );

        return {
          filePath,
          content: updatedContent,
        };
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "VakaoUI",
      fileName: (format) => `vakao-ui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
        exports: "named",
        // 确保CSS文件输出为单独的文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "style.css";
          return assetInfo.name || "asset";
        },
      },
    },
    outDir: "../dist",
    emptyOutDir: false,
    sourcemap: true,
    // 启用CSS代码分割
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname),
    },
  },
});
