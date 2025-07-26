#!/usr/bin/env node

/**
 * @vakao-ui/hooks 包发布脚本
 *
 * 专门用于构建并发布 hooks 包到 npm
 * 支持独立版本管理和发布流程
 *
 * 功能特性：
 * - 独立版本号管理
 * - TypeScript 类型声明生成
 * - 自动化构建和发布流程
 * - 测试模式支持
 * - 完整的错误处理
 *
 * 使用方法：
 * ```bash
 * # 正式发布
 * node scripts/publish-hooks.js
 *
 * # 测试模式（不实际发布）
 * node scripts/publish-hooks.js --dry-run
 * ```
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

const { execSync } = require("child_process");
const {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
} = require("fs");
const path = require("path");
const readline = require("readline");
const {
  log,
  separator,
  showBanner,
  showSuccess,
  handleError,
} = require("../utils/");

// ==================== 配置常量 ====================

/** 工具标题 */
const TOOL_TITLE = "🪝 Vakao UI Hooks 发布工具 🪝";

/** 包根目录 */
const PACKAGE_ROOT = path.resolve(__dirname, "../packages/hooks");

/** 构建输出目录 */
const BUILD_DIR = path.resolve(__dirname, "../dist/hooks");

/** 包名 */
const PACKAGE_NAME = "@vakao-ui/hooks";

/** 默认 npm registry 配置 */
const DEFAULT_REGISTRY = "https://registry.npmjs.org/";

/** 私有制品仓库配置 */
const PRIVATE_REGISTRY = process.env.NPM_REGISTRY || DEFAULT_REGISTRY;

/** 是否使用私有仓库 */
const USE_PRIVATE_REGISTRY = PRIVATE_REGISTRY !== DEFAULT_REGISTRY;

// ==================== 工具函数 ====================

/**
 * 创建 readline 接口
 *
 * 用于与用户进行交互式输入
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * 执行命令并打印输出
 *
 * @param {string} command - 要执行的命令
 * @param {string} cwd - 工作目录，默认为当前目录
 */
function exec(command, cwd = process.cwd()) {
  log(`执行命令: ${command}`, "command");
  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (error) {
    log(`命令执行失败: ${error}`, "error");
    process.exit(1);
  }
}

/**
 * 获取 hooks 包的 package.json
 *
 * @returns {Object} package.json 内容
 */
function getPackageJson() {
  const packagePath = path.join(PACKAGE_ROOT, "package.json");
  if (!existsSync(packagePath)) {
    throw new Error(`package.json 不存在: ${packagePath}`);
  }
  return JSON.parse(readFileSync(packagePath, "utf8"));
}

/**
 * 更新 hooks 包的版本号
 *
 * @param {string} version - 新版本号
 */
function updateVersion(version) {
  const packagePath = path.join(PACKAGE_ROOT, "package.json");
  const packageJson = getPackageJson();
  packageJson.version = version;
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
  log(`hooks 包版本已更新为: ${version}`, "success");
}

/**
 * 验证版本号格式
 *
 * @param {string} version - 版本号
 * @returns {boolean} 是否有效
 */
function isValidVersion(version) {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}

/**
 * 计算建议的新版本号
 *
 * @param {string} currentVersion - 当前版本号
 * @returns {string} 建议的新版本号
 */
function suggestNextVersion(currentVersion) {
  const versionParts = currentVersion.split(".");
  if (versionParts.length === 3) {
    const [major, minor, patch] = versionParts;
    return `${major}.${minor}.${parseInt(patch) + 1}`;
  }
  return currentVersion;
}

/**
 * 递归询问版本号直到输入正确
 *
 * @param {string} currentVersion - 当前版本号
 * @param {string} suggestedVersion - 建议版本号
 * @returns {Promise<string>} 新版本号
 */
function askForVersion(currentVersion, suggestedVersion) {
  return new Promise((resolve) => {
    rl.question(
      `请输入新版本号 (建议: ${suggestedVersion}, 留空使用建议版本): `,
      (version) => {
        const newVersion = version || suggestedVersion;

        // 验证版本号格式
        if (!isValidVersion(newVersion)) {
          log("版本号格式不正确！请使用 x.y.z 格式（如: 1.0.0）", "error");
          askForVersion(currentVersion, suggestedVersion).then(resolve);
          return;
        }

        // 检查版本号是否比当前版本新
        if (newVersion <= currentVersion) {
          log("新版本号必须大于当前版本！", "error");
          askForVersion(currentVersion, suggestedVersion).then(resolve);
          return;
        }

        log("版本号验证通过", "success");
        resolve(newVersion);
      },
    );
  });
}

/**
 * 构建 hooks 包
 *
 * 生成 TypeScript 类型声明和 ES 模块
 */
function buildHooks() {
  log("开始构建 hooks 包...", "build");

  // 确保构建目录存在
  if (!existsSync(BUILD_DIR)) {
    mkdirSync(BUILD_DIR, { recursive: true });
  }

  // 使用 TypeScript 编译器生成类型声明和 JS 文件
  const tsconfigPath = path.resolve(__dirname, "../tsconfig.json");
  exec(
    `npx tsc --project ${tsconfigPath} --outDir ${BUILD_DIR} --declaration --emitDeclarationOnly false`,
    PACKAGE_ROOT,
  );

  log("hooks 包构建完成", "success");
}

/**
 * 准备发布文件
 *
 * 复制必要的文件到构建目录
 *
 * @param {string} version - 版本号
 */
function preparePublishFiles(version) {
  log("准备发布文件...", "copy");

  // 创建发布用的 package.json
  const publishPackageJson = {
    name: PACKAGE_NAME,
    version: version,
    description: "Vue 3 组合式函数库 - Vakao UI Hooks",
    main: "index.js",
    module: "index.js",
    types: "index.d.ts",
    exports: {
      ".": {
        import: "./index.js",
        require: "./index.js",
        types: "./index.d.ts",
      },
    },
    files: ["*.js", "*.d.ts", "README.md"],
    keywords: [
      "vue3",
      "hooks",
      "composables",
      "ui-library",
      "typescript",
      "vakao-ui",
    ],
    author: "Vakao UI Team",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/vakao-ui/vakao-ui.git",
      directory: "packages/hooks",
    },
    homepage: "https://vakao-ui.github.io/vakao-ui/hooks/",
    peerDependencies: {
      vue: "^3.3.0",
    },
    publishConfig: {
      access: "public",
      registry: PRIVATE_REGISTRY,
    },
  };

  // 写入发布用的 package.json
  const publishPackageJsonPath = path.join(BUILD_DIR, "package.json");
  writeFileSync(
    publishPackageJsonPath,
    JSON.stringify(publishPackageJson, null, 2) + "\n",
  );

  // 复制 README.md（如果存在）
  const readmePath = path.join(PACKAGE_ROOT, "README.md");
  const publishReadmePath = path.join(BUILD_DIR, "README.md");

  if (existsSync(readmePath)) {
    copyFileSync(readmePath, publishReadmePath);
  } else {
    // 创建默认 README
    const defaultReadme = `# @vakao-ui/hooks

Vue 3 组合式函数库，提供一系列可复用的 Hooks。

## 安装

\`\`\`bash
npm install @vakao-ui/hooks
# 或
pnpm add @vakao-ui/hooks
# 或
yarn add @vakao-ui/hooks
\`\`\`

## 使用

\`\`\`typescript
import { useToggle, useFetch, useLocalStorage } from '@vakao-ui/hooks';

// 布尔状态切换
const [isVisible, toggle] = useToggle(false);

// 数据获取
const [data, loading, error] = useFetch('/api/users');

// 本地存储
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## 文档

访问 [Vakao UI 文档](https://vakao-ui.github.io/vakao-ui/hooks/) 查看完整的 API 文档和使用示例。

## 许可证

MIT
`;
    writeFileSync(publishReadmePath, defaultReadme);
  }

  log("发布文件准备完成", "success");
}

/**
 * 发布到 npm 或私有制品仓库
 *
 * @param {boolean} isDryRun - 是否为测试模式
 */
function publishToNpm(isDryRun) {
  const registryInfo = USE_PRIVATE_REGISTRY
    ? `私有制品仓库 (${PRIVATE_REGISTRY})`
    : "npm 官方仓库";

  if (isDryRun) {
    log(`测试模式：跳过实际发布到 ${registryInfo}`, "warning");
    log("检查发布文件...", "check");
    exec(`npm pack --dry-run --registry ${PRIVATE_REGISTRY}`, BUILD_DIR);
  } else {
    log(`开始发布到 ${registryInfo}...`, "publish");
    exec(
      `npm publish --access public --registry ${PRIVATE_REGISTRY}`,
      BUILD_DIR,
    );
  }
}

// ==================== 主函数 ====================

/**
 * 主发布流程
 *
 * 执行完整的构建和发布流程
 */
async function main() {
  try {
    // 显示 banner
    showBanner(TOOL_TITLE);

    // 检查是否为测试模式
    const isDryRun = process.argv.includes("--dry-run");

    // 显示发布配置信息
    log(`发布模式: ${isDryRun ? "测试模式" : "正式发布"}`, "info");
    log(
      `目标仓库: ${USE_PRIVATE_REGISTRY ? `私有制品仓库 (${PRIVATE_REGISTRY})` : "npm 官方仓库"}`,
      "info",
    );

    // 获取当前版本信息
    const packageJson = getPackageJson();
    const currentVersion = packageJson.version;
    const suggestedVersion = suggestNextVersion(currentVersion);

    log(`当前 hooks 包版本: ${currentVersion}`, "info");
    separator();

    // 询问新版本号
    const newVersion = await askForVersion(currentVersion, suggestedVersion);

    // 更新版本号
    if (newVersion !== currentVersion) {
      updateVersion(newVersion);
    }

    separator();

    // 构建包
    buildHooks();

    separator();

    // 准备发布文件
    preparePublishFiles(newVersion);

    separator();

    // 发布到 npm
    publishToNpm(isDryRun);

    // 显示成功消息
    showSuccess(
      `${PACKAGE_NAME} v${newVersion} ${isDryRun ? "测试" : "发布"}成功!`,
    );
  } catch (error) {
    handleError("hooks 包发布过程中出现错误", error);
  } finally {
    rl.close();
  }
}

// ==================== 程序入口 ====================

// 运行主函数
main().catch((err) => {
  console.error("hooks 包发布失败:", err);
  process.exit(1);
});
