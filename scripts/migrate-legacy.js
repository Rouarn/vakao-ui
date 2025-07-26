#!/usr/bin/env node

/**
 * 发布系统迁移脚本
 *
 * 将旧的发布脚本移动到 legacy 目录
 * 并提供迁移指南
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

const { existsSync, mkdirSync, renameSync, writeFileSync } = require("fs");
const path = require("path");
const { log, separator, showBanner, showSuccess } = require("./utils");

// 工具标题
const TOOL_TITLE = "🔄 Vakao UI 发布系统迁移工具 🔄";

// 需要迁移的文件
const LEGACY_FILES = [
  "publish-hooks.js",
  "publish-utils.js",
  "publish-packages.js",
];

/**
 * 创建 legacy 目录
 */
function createLegacyDirectory() {
  const legacyDir = path.resolve(__dirname, "legacy");
  if (!existsSync(legacyDir)) {
    mkdirSync(legacyDir, { recursive: true });
    log("创建 legacy 目录", "success");
  }
  return legacyDir;
}

/**
 * 移动文件到 legacy 目录
 * @param {string} legacyDir - legacy 目录路径
 */
function moveFilesToLegacy(legacyDir) {
  const scriptsDir = __dirname;
  let movedCount = 0;

  LEGACY_FILES.forEach((filename) => {
    const sourcePath = path.join(scriptsDir, filename);
    const targetPath = path.join(legacyDir, filename);

    if (existsSync(sourcePath)) {
      try {
        renameSync(sourcePath, targetPath);
        log(`移动文件: ${filename} -> legacy/${filename}`, "success");
        movedCount++;
      } catch (error) {
        log(`移动文件失败: ${filename} - ${error.message}`, "error");
      }
    } else {
      log(`文件不存在: ${filename}`, "warning");
    }
  });

  return movedCount;
}

/**
 * 创建迁移说明文件
 * @param {string} legacyDir - legacy 目录路径
 */
function createMigrationGuide(legacyDir) {
  const guideContent = `# 发布系统迁移说明

## 概述

Vakao UI 发布系统已升级到 v2.0，提供了更强大和统一的发布管理功能。

## 新系统特性

- 🎯 **统一发布入口**: 使用单一脚本管理所有包的发布
- 🔧 **模块化架构**: 核心引擎、交互界面、配置管理分离
- 📦 **批量发布**: 支持同时发布多个包
- 🔄 **版本同步**: 可选择同步所有包的版本号
- 🧪 **测试模式**: 完整的 dry-run 支持
- 🏢 **私有仓库**: 完整的私有制品仓库支持
- 🎨 **交互式界面**: 友好的用户交互体验

## 新旧对比

### 旧系统 (Legacy)

\`\`\`bash
# 发布 hooks 包
node scripts/publish-hooks.js

# 发布 utils 包
node scripts/publish-utils.js

# 统一发布管理器
node scripts/publish-packages.js
\`\`\`

### 新系统 (v2.0)

\`\`\`bash
# 交互式发布（推荐）
node scripts/publish.js

# 发布指定包
node scripts/publish.js --packages hooks,utils

# 发布单个包
node scripts/publish.js --package hooks

# 测试模式
node scripts/publish.js --dry-run

# 同步版本号
node scripts/publish.js --sync-version

# 查看帮助
node scripts/publish.js --help
\`\`\`

## 迁移步骤

1. **停止使用旧脚本**: 不再使用 \`publish-hooks.js\`、\`publish-utils.js\`、\`publish-packages.js\`
2. **使用新脚本**: 统一使用 \`publish.js\` 进行所有发布操作
3. **更新 CI/CD**: 如果有自动化流程，请更新脚本路径和参数
4. **更新文档**: 更新团队文档中的发布流程说明

## 配置文件

新系统使用配置驱动的方式，主要配置文件：

- \`scripts/core/package-configs.js\`: 包配置定义
- \`scripts/core/publish-engine.js\`: 发布引擎核心
- \`scripts/core/interactive.js\`: 交互界面模块

## 自定义配置

如需添加新包或修改配置，请编辑 \`scripts/core/package-configs.js\` 文件。

## 回滚方案

如果遇到问题需要回滚到旧系统：

1. 将 \`legacy/\` 目录中的文件移回 \`scripts/\` 目录
2. 删除 \`scripts/core/\` 目录
3. 恢复原有的 \`scripts/publish.js\` 文件

## 技术支持

如有问题，请联系 Vakao UI 团队。

---

迁移时间: ${new Date().toLocaleString()}
`;

  const guidePath = path.join(legacyDir, "MIGRATION_GUIDE.md");
  writeFileSync(guidePath, guideContent);
  log("创建迁移说明文件: MIGRATION_GUIDE.md", "success");
}

/**
 * 创建 legacy 脚本的 README
 * @param {string} legacyDir - legacy 目录路径
 */
function createLegacyReadme(legacyDir) {
  const readmeContent = `# Legacy 发布脚本

⚠️ **注意**: 这些是旧版本的发布脚本，已被新的统一发布系统替代。

## 文件说明

- \`publish-hooks.js\`: 旧版 hooks 包发布脚本
- \`publish-utils.js\`: 旧版 utils 包发布脚本
- \`publish-packages.js\`: 旧版统一发布管理器

## 新系统

请使用新的统一发布系统：

\`\`\`bash
node scripts/publish.js
\`\`\`

详细信息请查看 [迁移指南](./MIGRATION_GUIDE.md)。

---

存档时间: ${new Date().toLocaleString()}
`;

  const readmePath = path.join(legacyDir, "README.md");
  writeFileSync(readmePath, readmeContent);
  log("创建 legacy README.md", "success");
}

/**
 * 主函数
 */
function main() {
  try {
    // 显示 banner
    showBanner(TOOL_TITLE);

    log("开始迁移旧版发布脚本...", "info");
    separator();

    // 创建 legacy 目录
    const legacyDir = createLegacyDirectory();

    // 移动文件
    const movedCount = moveFilesToLegacy(legacyDir);

    // 创建说明文件
    createMigrationGuide(legacyDir);
    createLegacyReadme(legacyDir);

    separator();

    if (movedCount > 0) {
      showSuccess(`迁移完成！已移动 ${movedCount} 个文件到 legacy 目录`);
      console.log(
        "\n📖 请查看 scripts/legacy/MIGRATION_GUIDE.md 了解详细迁移说明",
      );
      console.log("🚀 现在可以使用新的统一发布系统: node scripts/publish.js");
    } else {
      log("没有找到需要迁移的文件", "warning");
    }
  } catch (error) {
    log(`迁移过程中出现错误: ${error.message}`, "error");
    process.exit(1);
  }
}

// 运行主函数
main();
