/* eslint-disable no-control-regex */
/**
 * Vakao UI Publisher GUI - Electron 主进程
 *
 * 负责窗口管理、进程通信和系统集成
 *
 * @version 1.0.0
 * @author 我与夏季
 */

const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  shell,
  Menu,
} = require("electron");
const path = require("path");
const fs = require("fs");
const { execSync, spawn } = require("child_process");
const Store = require("electron-store");
const notifier = require("node-notifier");

// ==================== 工具函数 ====================

/**
 * 将日期格式化为中文格式：2025年7月27日 17点56分xx秒
 * @param {Date} date - 要格式化的日期对象
 * @returns {string} 格式化后的中文日期字符串
 */
function formatDateToChinese(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  return `${year}年${month}月${day}日 ${hours}点${minutes}分${seconds}秒`;
}

// ==================== 配置和状态 ====================

/** 应用配置存储 */
const store = new Store();

/** 主窗口实例 */
let mainWindow = null;

/** 当前运行的发布进程 */
let publishProcess = null;

/** 项目根目录 */
const PROJECT_ROOT = path.resolve(__dirname, "../../..");

/** 发布脚本路径 */
const PUBLISH_SCRIPT = path.join(PROJECT_ROOT, "publish.js");

// ==================== 菜单管理 ====================

/**
 * 创建应用菜单
 */
function createApplicationMenu() {
  const template = [
    {
      label: "文件",
      submenu: [
        {
          label: "打开项目目录",
          accelerator: "CmdOrCtrl+O",
          click: () => {
            shell.openPath(PROJECT_ROOT);
          },
        },
        {
          label: "导出日志",
          accelerator: "CmdOrCtrl+E",
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send("export-logs");
            }
          },
        },
        { type: "separator" },
        {
          label: "退出",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "编辑",
      submenu: [
        { label: "撤销", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { label: "重做", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
        { type: "separator" },
        { label: "剪切", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "复制", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "粘贴", accelerator: "CmdOrCtrl+V", role: "paste" },
        { label: "全选", accelerator: "CmdOrCtrl+A", role: "selectall" },
      ],
    },
    {
      label: "视图",
      submenu: [
        { label: "重新加载", accelerator: "CmdOrCtrl+R", role: "reload" },
        {
          label: "强制重新加载",
          accelerator: "CmdOrCtrl+Shift+R",
          role: "forceReload",
        },
        { label: "开发者工具", accelerator: "F12", role: "toggleDevTools" },
        { type: "separator" },
        { label: "实际大小", accelerator: "CmdOrCtrl+0", role: "resetZoom" },
        { label: "放大", accelerator: "CmdOrCtrl+Plus", role: "zoomIn" },
        { label: "缩小", accelerator: "CmdOrCtrl+-", role: "zoomOut" },
        { type: "separator" },
        { label: "全屏", accelerator: "F11", role: "togglefullscreen" },
      ],
    },
    {
      label: "窗口",
      submenu: [
        { label: "最小化", accelerator: "CmdOrCtrl+M", role: "minimize" },
        { label: "关闭", accelerator: "CmdOrCtrl+W", role: "close" },
      ],
    },
    {
      label: "帮助",
      submenu: [
        {
          label: "关于",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "关于 Vakao UI Publisher",
              message: "Vakao UI Publisher",
              detail:
                "Version 1.0.0\n\n一个现代化的 UI 组件库发布工具\n\n© 2025 我与夏季",
            });
          },
        },
      ],
    },
  ];

  // macOS 特殊处理
  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { label: "关于 " + app.getName(), role: "about" },
        { type: "separator" },
        { label: "服务", role: "services", submenu: [] },
        { type: "separator" },
        {
          label: "隐藏 " + app.getName(),
          accelerator: "Command+H",
          role: "hide",
        },
        {
          label: "隐藏其他",
          accelerator: "Command+Shift+H",
          role: "hideothers",
        },
        { label: "显示全部", role: "unhide" },
        { type: "separator" },
        { label: "退出", accelerator: "Command+Q", click: () => app.quit() },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ==================== 窗口管理 ====================

/**
 * 创建主窗口
 */
function createMainWindow() {
  // 获取窗口配置
  const windowConfig = store.get("windowConfig", {
    width: 1200,
    height: 800,
    x: undefined,
    y: undefined,
  });

  mainWindow = new BrowserWindow({
    width: windowConfig.width,
    height: windowConfig.height,
    x: windowConfig.x,
    y: windowConfig.y,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(PROJECT_ROOT, "public/favicon.ico"),
    title: "Vakao UI Publisher",
    titleBarStyle: "default",
    show: false, // 先隐藏，加载完成后显示
    autoHideMenuBar: false, // 显示菜单栏
    closable: true, // 确保窗口可以关闭
  });

  // 加载页面
  mainWindow.loadFile(path.join(__dirname, "./index.html"));

  // 窗口准备好后显示
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // 开发模式下打开开发者工具
    if (process.argv.includes("--dev")) {
      mainWindow.webContents.openDevTools();
    }
  });

  // 保存窗口状态
  mainWindow.on("close", () => {
    const bounds = mainWindow.getBounds();
    store.set("windowConfig", bounds);
  });

  // 窗口关闭时清理
  mainWindow.on("closed", () => {
    mainWindow = null;

    // 终止正在运行的发布进程
    if (publishProcess) {
      publishProcess.kill();
      publishProcess = null;
    }
  });

  // 处理外部链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // 创建应用菜单
  createApplicationMenu();
}

// ==================== 应用生命周期 ====================

/**
 * 应用准备就绪
 */
app.whenReady().then(() => {
  createMainWindow();

  // macOS 特殊处理
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

/**
 * 所有窗口关闭时退出应用（macOS 除外）
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/**
 * 应用退出前清理
 */
app.on("before-quit", () => {
  if (publishProcess) {
    publishProcess.kill();
    publishProcess = null;
  }
});

// ==================== IPC 通信处理 ====================

/**
 * 获取项目信息
 */
ipcMain.handle("get-project-info", async () => {
  try {
    // 读取项目 package.json
    const packageJsonPath = path.join(PROJECT_ROOT, "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

    // 读取包配置
    const configPath = path.join(
      PROJECT_ROOT,
      "scripts/core/package-configs.js"
    );
    delete require.cache[require.resolve(configPath)];
    const { CONFIG } = require(configPath);

    return {
      success: true,
      data: {
        name: packageJson.name,
        version: packageJson.version,
        description: packageJson.description,
        author: packageJson.author,
        license: packageJson.license,
        repository: packageJson.repository?.url || packageJson.repository,
        packages: CONFIG.packages,
        projectRoot: PROJECT_ROOT,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

/**
 * 检查包的状态
 * @param {string} packageKey - 包标识符
 * @param {Object} packageConfig - 包配置
 * @returns {string} 包状态
 */
function checkPackageStatus(packageKey, packageConfig) {
  try {
    const packagePath = path.join(PROJECT_ROOT, packageConfig.path, "package.json");
    const distPath = path.join(PROJECT_ROOT, packageConfig.path, "dist");
    const libPath = path.join(PROJECT_ROOT, packageConfig.path, "lib");
    
    // 检查 package.json 是否存在
    if (!fs.existsSync(packagePath)) {
      return "error";
    }
    
    // 检查是否有构建产物
    const hasDistFolder = fs.existsSync(distPath);
    const hasLibFolder = fs.existsSync(libPath);
    
    if (hasDistFolder || hasLibFolder) {
      // 检查构建产物是否是最新的
      const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
      if (packageJson.version) {
        return "ready";
      }
    }
    
    // 如果没有构建产物，但有 package.json，说明需要构建
    return "needs-build";
  } catch (error) {
    console.warn(`检查包 ${packageKey} 状态时出错:`, error.message);
    return "error";
  }
}

/**
 * 获取包列表
 */
ipcMain.handle("get-packages", async () => {
  try {
    const configPath = path.join(
      PROJECT_ROOT,
      "scripts/core/package-configs.js"
    );
    delete require.cache[require.resolve(configPath)];
    const { CONFIG } = require(configPath);

    // 为每个包添加状态信息和版本信息
    const packagesWithStatus = {};
    for (const [key, pkg] of Object.entries(CONFIG.packages)) {
      // 读取包的版本信息
      let version = null;
      let lastModified = null;
      try {
        const packagePath = path.join(PROJECT_ROOT, pkg.path, "package.json");
        if (fs.existsSync(packagePath)) {
          const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
          version = packageJson.version;
          
          // 获取文件最后修改时间
          const stats = fs.statSync(packagePath);
          lastModified = formatDateToChinese(stats.mtime);
        }
      } catch (err) {
        console.warn(`无法读取包 ${key} 的版本信息:`, err.message);
      }

      packagesWithStatus[key] = {
        ...pkg,
        status: checkPackageStatus(key, pkg),
        version: version,
        lastModified: lastModified,
      };
    }

    return {
      success: true,
      data: packagesWithStatus,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

/**
 * 获取包的当前版本信息
 */
ipcMain.handle("get-package-versions", async () => {
  try {
    const configPath = path.join(
      PROJECT_ROOT,
      "scripts/core/package-configs.js"
    );
    delete require.cache[require.resolve(configPath)];
    const { CONFIG } = require(configPath);

    const versions = {};

    for (const [key, pkg] of Object.entries(CONFIG.packages)) {
      try {
        const packagePath = path.join(PROJECT_ROOT, pkg.path, "package.json");
        if (fs.existsSync(packagePath)) {
          const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
          versions[key] = {
            current: packageJson.version,
            name: packageJson.name,
          };
        }
      } catch (err) {
        console.warn(`无法读取包 ${key} 的版本信息:`, err.message);
      }
    }

    return {
      success: true,
      data: versions,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

/**
 * 执行发布命令
 */
ipcMain.handle("execute-publish", async (event, options) => {
  return new Promise(resolve => {
    try {
      // 构建命令参数
      const args = ["scripts/publish.js"];

      if (options.isDryRun) {
        args.push("--dry-run");
      }

      if (options.syncVersion) {
        args.push("--sync-version");
      }

      if (options.packages && options.packages.length > 0) {
        args.push("--packages", options.packages.join(","));
      }

      if (options.deploy) {
        args.push("--deploy");
      }

      if (options.deployOnly) {
        args.push("--deploy-only");
      }

      if (options.deployStrategy) {
        args.push("--deploy-strategy", options.deployStrategy);
      }

      if (options.skipDeploy) {
        args.push("--skip-deploy");
      }

      // 启动发布进程
      publishProcess = spawn("node", args, {
        cwd: PROJECT_ROOT,
        stdio: ["pipe", "pipe", "pipe"],
        shell: true,
        encoding: "utf8",
        env: {
          ...process.env,
          FORCE_COLOR: "0",
          CHCP: "65001", // 设置UTF-8编码
        },
      });

      let output = "";
      let errorOutput = "";

      // 处理标准输出
      publishProcess.stdout.on("data", data => {
        const text = data.toString("utf8");
        output += text;

        // 实时发送输出到渲染进程
        if (mainWindow) {
          mainWindow.webContents.send("log-output", {
            type: "stdout",
            data: text,
          });
        }
      });

      // 处理错误输出
      publishProcess.stderr.on("data", data => {
        const text = data.toString("utf8");
        errorOutput += text;

        // 实时发送错误输出到渲染进程
        if (mainWindow) {
          mainWindow.webContents.send("log-output", {
            type: "stderr",
            data: text,
          });
        }
      });

      // 发送进程开始状态
      if (mainWindow) {
        mainWindow.webContents.send("process-status", {
          status: "running",
          message: "发布进程已启动",
        });
      }

      // 处理进程结束
      publishProcess.on("close", code => {
        publishProcess = null;

        const success = code === 0;
        const result = {
          success,
          code,
          output,
          errorOutput,
        };

        // 发送进程结束状态
        if (mainWindow) {
          mainWindow.webContents.send("process-status", {
            status: success ? "completed" : "failed",
            message: success ? "发布完成！" : "发布失败！",
            code,
          });
        }

        // 发送桌面通知
        notifier.notify({
          title: "Vakao UI Publisher",
          message: success ? "发布完成！" : "发布失败！",
          icon: path.join(__dirname, "../assets/icon.png"),
          sound: true,
        });

        resolve(result);
      });

      // 处理进程错误
      publishProcess.on("error", error => {
        publishProcess = null;

        // 发送错误事件
        if (mainWindow) {
          mainWindow.webContents.send("error", {
            type: "process-error",
            message: error.message,
            error: error,
          });
        }

        resolve({
          success: false,
          error: error.message,
        });
      });
    } catch (error) {
      resolve({
        success: false,
        error: error.message,
      });
    }
  });
});

/**
 * 终止发布进程
 */
ipcMain.handle("kill-publish-process", async () => {
  try {
    if (publishProcess) {
      publishProcess.kill();
      publishProcess = null;
      return { success: true };
    }
    return { success: false, error: "没有正在运行的进程" };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 清理 ANSI 转义序列和控制字符
 * @param {string} text - 要清理的文本
 * @returns {string} 清理后的文本
 */
function cleanAnsiCodes(text) {
  // 移除 ANSI 转义序列（颜色代码、光标控制等）
  return text
    .replace(/\x1b\[[0-9;]*m/g, "") // 移除颜色代码
    .replace(/\x1b\[[0-9;]*[A-Za-z]/g, "") // 移除其他 ANSI 序列
    .replace(/\x1b\[\?[0-9;]*[hl]/g, "") // 移除模式设置
    .replace(/\x1b\[[0-9;]*[JK]/g, "") // 移除清屏序列
    .replace(/\r\n/g, "\n") // 统一换行符
    .replace(/\r/g, "\n"); // 处理单独的回车符
}

/**
 * 执行通用命令
 */
ipcMain.handle("execute-command", async (event, command) => {
  return new Promise(resolve => {
    try {
      // 解析命令
      const args = command.split(" ");
      const cmd = args.shift();

      // 启动命令进程
      const commandProcess = spawn(cmd, args, {
        cwd: PROJECT_ROOT,
        stdio: ["pipe", "pipe", "pipe"],
        shell: true,
        encoding: "utf8",
        env: {
          ...process.env,
          FORCE_COLOR: "0", // 禁用颜色输出
          NO_COLOR: "1", // 另一种禁用颜色的方式
          TERM: "dumb", // 设置为哑终端
          CHCP: "65001", // 设置UTF-8编码
        },
      });

      let output = "";
      let errorOutput = "";

      // 处理标准输出
      commandProcess.stdout.on("data", data => {
        const rawText = data.toString("utf8");
        const cleanText = cleanAnsiCodes(rawText);
        output += cleanText;

        // 实时发送清理后的输出到渲染进程
        if (mainWindow && cleanText.trim()) {
          mainWindow.webContents.send("log-output", {
            type: "stdout",
            data: cleanText,
          });
        }
      });

      // 处理错误输出
      commandProcess.stderr.on("data", data => {
        const rawText = data.toString("utf8");
        const cleanText = cleanAnsiCodes(rawText);
        errorOutput += cleanText;

        // 实时发送清理后的错误输出到渲染进程
        if (mainWindow && cleanText.trim()) {
          mainWindow.webContents.send("log-output", {
            type: "stderr",
            data: cleanText,
          });
        }
      });

      // 发送进程开始状态
      if (mainWindow) {
        mainWindow.webContents.send("process-status", {
          status: "running",
          message: "命令执行中...",
        });
      }

      // 处理进程结束
      commandProcess.on("close", code => {
        const success = code === 0;
        const result = {
          success,
          code,
          output,
          errorOutput,
        };

        // 发送进程结束状态
        if (mainWindow) {
          mainWindow.webContents.send("process-status", {
            status: success ? "completed" : "failed",
            message: success ? "命令执行完成！" : "命令执行失败！",
            code,
          });
        }

        resolve(result);
      });

      // 处理进程错误
      commandProcess.on("error", error => {
        // 发送错误事件
        if (mainWindow) {
          mainWindow.webContents.send("error", {
            type: "process-error",
            message: error.message,
            error: error,
          });
        }

        resolve({
          success: false,
          error: error.message,
        });
      });
    } catch (error) {
      resolve({
        success: false,
        error: error.message,
      });
    }
  });
});

/**
 * 打开指定目录
 */
ipcMain.handle("open-directory", async (event, directoryPath) => {
  try {
    if (!directoryPath) {
      return { success: false, error: "目录路径不能为空" };
    }

    // 将相对路径转换为绝对路径
    let absolutePath;
    if (path.isAbsolute(directoryPath)) {
      absolutePath = directoryPath;
    } else {
      // 相对于项目根目录解析路径
      absolutePath = path.resolve(PROJECT_ROOT, directoryPath);
    }

    // 检查路径是否存在
    if (!fs.existsSync(absolutePath)) {
      return { success: false, error: `目录不存在: ${absolutePath}` };
    }

    await shell.openPath(absolutePath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 打开项目目录
 */
ipcMain.handle("open-project-directory", async () => {
  try {
    shell.openPath(PROJECT_ROOT);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 打开日志目录
 */
ipcMain.handle("open-logs-directory", async () => {
  try {
    const logsPath = path.join(PROJECT_ROOT, "logs");
    if (!fs.existsSync(logsPath)) {
      fs.mkdirSync(logsPath, { recursive: true });
    }
    shell.openPath(logsPath);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 获取应用设置
 */
ipcMain.handle("get-settings", async () => {
  try {
    const settings = store.get("settings", {
      theme: "light",
      autoSave: true,
      notifications: true,
      defaultDryRun: false,
    });
    return { success: true, data: settings };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 保存应用设置
 */
ipcMain.handle("save-settings", async (event, settings) => {
  try {
    store.set("settings", settings);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 重置应用设置
 */
ipcMain.handle("reset-settings", async () => {
  try {
    // 重置到默认设置
    const defaultSettings = {
      theme: "light",
      autoSave: true,
      notifications: true,
      defaultDryRun: false,
    };

    store.set("settings", defaultSettings);
    return { success: true, data: defaultSettings };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 显示消息对话框
 */
ipcMain.handle("show-message-box", async (event, options) => {
  try {
    const result = await dialog.showMessageBox(mainWindow, options);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

/**
 * 显示保存对话框
 */
ipcMain.handle("show-save-dialog", async (event, options) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, options);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// ==================== 错误处理 ====================

/**
 * 处理未捕获的异常
 */
process.on("uncaughtException", error => {
  console.error("未捕获的异常:", error);

  // 显示错误对话框
  if (mainWindow) {
    dialog.showErrorBox("应用错误", `发生未预期的错误:\n${error.message}`);
  }
});

/**
 * 处理未处理的 Promise 拒绝
 */
process.on("unhandledRejection", (reason, promise) => {
  console.error("未处理的 Promise 拒绝:", reason);
});

console.log("Vakao UI Publisher GUI 启动完成");
console.log("项目根目录:", PROJECT_ROOT);
console.log("发布脚本路径:", PUBLISH_SCRIPT);
