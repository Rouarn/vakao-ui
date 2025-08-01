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
const PROJECT_ROOT = app.isPackaged
  ? path.dirname(process.execPath) // 打包后：可执行文件所在目录
  : path.resolve(__dirname, "../../.."); // 开发时：相对于源码的项目根目录

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
      "scripts/core/package-configs.js",
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
    const packagePath = path.join(
      PROJECT_ROOT,
      packageConfig.path,
      "package.json",
    );
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
      "scripts/core/package-configs.js",
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
      "scripts/core/package-configs.js",
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
  return new Promise((resolve) => {
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
          NO_COLOR: "1", // 禁用颜色输出
          CHCP: "65001", // 设置UTF-8编码
          VAKAO_GUI_MODE: "true", // 标记为GUI模式
        },
      });

      let output = "";
      let errorOutput = "";

      // 处理标准输出
      publishProcess.stdout.on("data", (data) => {
        const text = data.toString("utf8");
        output += text;

        // 检查是否包含GUI输入请求
        const guiRequestMatch = text.match(
          /__VAKAO_GUI_REQUEST__(.+?)__VAKAO_GUI_REQUEST_END__/s,
        );
        if (guiRequestMatch) {
          try {
            const request = JSON.parse(guiRequestMatch[1]);
            handleGUIInputRequest(request, publishProcess);

            // 移除GUI请求标记，只发送普通输出
            const cleanText = text.replace(
              /__VAKAO_GUI_REQUEST__.+?__VAKAO_GUI_REQUEST_END__/gs,
              "",
            );
            if (cleanText.trim() && mainWindow) {
              mainWindow.webContents.send("log-output", {
                type: "stdout",
                data: cleanText,
              });
            }
          } catch (error) {
            console.error("解析GUI输入请求失败:", error);
            // 如果解析失败，发送原始输出
            if (mainWindow) {
              mainWindow.webContents.send("log-output", {
                type: "stdout",
                data: text,
              });
            }
          }
        } else {
          // 普通输出，直接发送到渲染进程
          if (mainWindow) {
            mainWindow.webContents.send("log-output", {
              type: "stdout",
              data: text,
            });
          }
        }
      });

      // 处理错误输出
      publishProcess.stderr.on("data", (data) => {
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
      publishProcess.on("close", (code) => {
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
      publishProcess.on("error", (error) => {
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
 * 处理GUI输入请求
 * @param {Object} request - 输入请求对象
 * @param {Object} process - 发布进程对象
 */
async function handleGUIInputRequest(request, process) {
  try {
    console.log("主进程: 开始处理GUI输入请求", request.id);

    if (!request || !request.id || !request.data) {
      console.error("无效的GUI输入请求:", request);
      return;
    }

    // 构建请求对象
    const requestObject = {
      id: request.id,
      title: request.data.title,
      message: request.data.message,
      description: request.data.description || "",
      type: request.data.type,
      defaultValue: request.data.defaultValue || "",
      options: request.data.options || [],
      required: request.data.required || false,
      validation: request.data.validation || {},
      helpText: request.data.helpText || "",
      timestamp: Date.now(),
    };

    // 存储请求数据到pendingInputRequests
    console.log("主进程: 存储请求数据到pendingInputRequests");
    pendingInputRequests.set(request.id, {
      request: requestObject,
      resolve: null,
      reject: null,
    });

    // 向渲染进程发送用户输入请求
    if (mainWindow) {
      console.log("主进程: 向渲染进程发送用户输入请求");
      mainWindow.webContents.send("user-input-request", requestObject);
    }

    console.log("主进程: 等待用户响应...");
    // 等待用户响应
    const userResponse = await waitForUserResponse(request.id);
    console.log("主进程: 收到用户响应:", userResponse);

    // 将响应发送回发布进程
    const response = {
      id: request.id,
      type: "user-input-response",
      data: userResponse,
    };

    console.log("主进程: 准备将响应发送回发布进程:", response);
    if (process && process.stdin && process.stdin.writable) {
      process.stdin.write(JSON.stringify(response) + "\n");
      console.log("主进程: 响应已发送到发布进程");
    } else {
      console.error("主进程: 发布进程的stdin不可写或不存在");
    }
  } catch (error) {
    console.error("处理GUI输入请求失败:", error);

    // 发送错误响应
    const errorResponse = {
      id: request.id,
      type: "user-input-response",
      data: {
        success: false,
        cancelled: true,
        error: error.message,
      },
    };

    console.log("主进程: 发送错误响应到发布进程:", errorResponse);
    if (process && process.stdin && process.stdin.writable) {
      process.stdin.write(JSON.stringify(errorResponse) + "\n");
    }
  }
}

/**
 * 等待用户响应
 * @param {string} requestId - 请求ID
 * @returns {Promise<Object>} 用户响应
 */
function waitForUserResponse(requestId) {
  return new Promise((resolve, reject) => {
    // 存储请求信息
    const requestData = pendingInputRequests.get(requestId);
    if (requestData) {
      requestData.resolve = resolve;
      requestData.reject = reject;
    } else {
      // 如果没有找到请求，说明数据结构有问题
      console.error(
        "waitForUserResponse: 找不到请求数据，requestId:",
        requestId,
      );
      console.error(
        "当前 pendingInputRequests:",
        Array.from(pendingInputRequests.entries()),
      );
      reject(new Error("找不到对应的输入请求"));
      return;
    }

    // 设置超时
    setTimeout(() => {
      if (pendingInputRequests.has(requestId)) {
        pendingInputRequests.delete(requestId);
        reject(new Error("用户输入超时"));
      }
    }, 30000);
  });
}

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
  return new Promise((resolve) => {
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
          NO_COLOR: "1", // 禁用颜色输出
          CHCP: "65001", // 设置UTF-8编码
          VAKAO_GUI_MODE: "true", // 标记为GUI模式
        },
      });

      let output = "";
      let errorOutput = "";

      // 处理标准输出
      commandProcess.stdout.on("data", (data) => {
        const text = data.toString("utf8");
        output += text;

        // 检查是否包含GUI输入请求
        const guiRequestMatch = text.match(
          /__VAKAO_GUI_REQUEST__(.+?)__VAKAO_GUI_REQUEST_END__/s,
        );
        if (guiRequestMatch) {
          try {
            const request = JSON.parse(guiRequestMatch[1]);
            handleGUIInputRequest(request, commandProcess);

            // 移除GUI请求标记，只发送普通输出
            const cleanText = text.replace(
              /__VAKAO_GUI_REQUEST__.+?__VAKAO_GUI_REQUEST_END__/gs,
              "",
            );
            if (cleanText.trim() && mainWindow) {
              mainWindow.webContents.send("log-output", {
                type: "stdout",
                data: cleanAnsiCodes(cleanText),
              });
            }
          } catch (error) {
            console.error("解析GUI输入请求失败:", error);
            // 如果解析失败，发送原始输出
            if (mainWindow && text.trim()) {
              mainWindow.webContents.send("log-output", {
                type: "stdout",
                data: cleanAnsiCodes(text),
              });
            }
          }
        } else {
          // 没有GUI请求，正常处理输出
          const cleanText = cleanAnsiCodes(text);
          if (mainWindow && cleanText.trim()) {
            mainWindow.webContents.send("log-output", {
              type: "stdout",
              data: cleanText,
            });
          }
        }
      });

      // 处理错误输出
      commandProcess.stderr.on("data", (data) => {
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
      commandProcess.on("close", (code) => {
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
      commandProcess.on("error", (error) => {
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

/**
 * 导出日志文件
 */
ipcMain.handle("export-logs", async (event, content) => {
  try {
    // 显示保存对话框
    const result = await dialog.showSaveDialog(mainWindow, {
      title: "导出日志文件",
      defaultPath: `vakao-ui-logs-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.txt`,
      filters: [
        { name: "文本文件", extensions: ["txt"] },
        { name: "日志文件", extensions: ["log"] },
        { name: "所有文件", extensions: ["*"] },
      ],
    });

    // 如果用户取消了保存
    if (result.canceled) {
      return { success: false, error: "用户取消了保存操作" };
    }

    // 写入文件
    fs.writeFileSync(result.filePath, content, "utf8");

    // 自动打开包含导出文件的文件夹
    const fileDirectory = path.dirname(result.filePath);
    await shell.openPath(fileDirectory);

    return {
      success: true,
      data: {
        filePath: result.filePath,
        fileDirectory: fileDirectory,
        message: "日志文件导出成功，已打开文件夹",
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

// ==================== 用户输入交互处理器 ====================

// 存储待处理的用户输入请求
const pendingInputRequests = new Map();

/**
 * 生成唯一的请求ID
 * @returns {string} 请求ID
 */
function generateRequestId() {
  return `input_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 验证输入值
 * @param {any} value - 输入值
 * @param {Object} validation - 验证规则
 * @param {string} type - 输入类型
 * @returns {Object} 验证结果
 */
function validateInput(value, validation, type) {
  const errors = [];

  if (!validation) {
    return { valid: true, errors: [] };
  }

  // 必填验证
  if (validation.required && (!value || value.toString().trim() === "")) {
    errors.push("此字段为必填项");
    return { valid: false, errors };
  }

  // 如果值为空且非必填，跳过其他验证
  if (!value || value.toString().trim() === "") {
    return { valid: true, errors: [] };
  }

  // 长度验证
  if (validation.minLength && value.toString().length < validation.minLength) {
    errors.push(`最少需要 ${validation.minLength} 个字符`);
  }
  if (validation.maxLength && value.toString().length > validation.maxLength) {
    errors.push(`最多允许 ${validation.maxLength} 个字符`);
  }

  // 数值验证
  if (type === "number") {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      errors.push("请输入有效的数字");
    } else {
      if (validation.min !== undefined && numValue < validation.min) {
        errors.push(`数值不能小于 ${validation.min}`);
      }
      if (validation.max !== undefined && numValue > validation.max) {
        errors.push(`数值不能大于 ${validation.max}`);
      }
    }
  }

  // 正则表达式验证
  if (validation.pattern) {
    const regex = new RegExp(validation.pattern);
    if (!regex.test(value.toString())) {
      errors.push(validation.patternMessage || "输入格式不正确");
    }
  }

  // 自定义验证函数
  if (validation.custom && typeof validation.custom === "function") {
    try {
      const customResult = validation.custom(value);
      if (customResult !== true) {
        errors.push(customResult || "输入值不符合要求");
      }
    } catch (error) {
      errors.push("验证过程中发生错误");
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * 请求用户输入
 */
ipcMain.handle("request-user-input", async (event, inputRequest) => {
  try {
    const requestId = generateRequestId();

    // 验证输入请求参数
    if (
      !inputRequest ||
      !inputRequest.title ||
      !inputRequest.message ||
      !inputRequest.type
    ) {
      return {
        success: false,
        error: "输入请求参数不完整",
      };
    }

    // 支持的输入类型
    const supportedTypes = [
      "text",
      "password",
      "number",
      "select",
      "checkbox",
      "radio",
      "textarea",
    ];
    if (!supportedTypes.includes(inputRequest.type)) {
      return {
        success: false,
        error: `不支持的输入类型: ${inputRequest.type}`,
      };
    }

    // 为选择类型验证选项
    if (["select", "checkbox", "radio"].includes(inputRequest.type)) {
      if (
        !inputRequest.options ||
        !Array.isArray(inputRequest.options) ||
        inputRequest.options.length === 0
      ) {
        return {
          success: false,
          error: `${inputRequest.type} 类型需要提供选项列表`,
        };
      }
    }

    // 创建输入请求对象
    const request = {
      id: requestId,
      title: inputRequest.title,
      message: inputRequest.message,
      description: inputRequest.description || "",
      type: inputRequest.type,
      defaultValue: inputRequest.defaultValue || "",
      options: inputRequest.options || [],
      required: inputRequest.required || false,
      validation: inputRequest.validation || {},
      timestamp: Date.now(),
    };

    // 存储请求
    pendingInputRequests.set(requestId, {
      request,
      resolve: null,
      reject: null,
    });

    // 向渲染进程发送输入请求
    mainWindow.webContents.send("user-input-request", request);

    // 返回一个 Promise，等待用户响应
    return new Promise((resolve, reject) => {
      const requestData = pendingInputRequests.get(requestId);
      if (requestData) {
        requestData.resolve = resolve;
        requestData.reject = reject;

        // 设置超时（30秒）
        setTimeout(() => {
          if (pendingInputRequests.has(requestId)) {
            pendingInputRequests.delete(requestId);
            resolve({
              success: false,
              error: "用户输入超时",
              cancelled: true,
            });
          }
        }, 30000);
      } else {
        reject(new Error("无法创建输入请求"));
      }
    });
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
});

/**
 * 响应用户输入
 */
ipcMain.handle("respond-user-input", async (event, requestId, response) => {
  try {
    console.log("主进程: 收到渲染进程的用户输入响应", { requestId, response });

    const requestData = pendingInputRequests.get(requestId);
    if (!requestData) {
      console.error("主进程: 找不到对应的输入请求", requestId);
      return {
        success: false,
        error: "找不到对应的输入请求",
      };
    }

    console.log("主进程: 找到对应的请求数据:", requestData);
    console.log("主进程: requestData.request:", requestData.request);
    console.log("主进程: requestData.resolve:", typeof requestData.resolve);

    const { request, resolve } = requestData;
    console.log("主进程: 解构后的request:", request);
    console.log("主进程: 解构后的resolve:", typeof resolve);

    // 移除请求
    pendingInputRequests.delete(requestId);
    console.log("主进程: 已从待处理请求中移除请求", requestId);

    // 如果用户取消了输入
    if (response.cancelled) {
      console.log("主进程: 用户取消了输入");
      const result = {
        success: false,
        cancelled: true,
        error: "用户取消了输入",
      };

      if (resolve) {
        console.log("主进程: 调用resolve函数返回取消结果");
        resolve(result);
      }
      return { success: true };
    }

    // 验证输入值
    const validationResult = validateInput(
      response.value,
      request.validation,
      request.type,
    );
    console.log("主进程: 输入验证结果:", validationResult);

    if (!validationResult.valid) {
      console.log("主进程: 验证失败，重新发送请求");
      // 验证失败，重新发送请求
      const newRequestId = generateRequestId();
      const newRequest = {
        ...request,
        id: newRequestId,
        validationErrors: validationResult.errors,
      };

      pendingInputRequests.set(newRequestId, {
        request: newRequest,
        resolve,
        reject: requestData.reject,
      });

      mainWindow.webContents.send("user-input-request", newRequest);
      return { success: true };
    }

    // 验证成功，返回结果
    const result = {
      success: true,
      value: response.value,
      cancelled: false,
    };

    console.log("主进程: 验证成功，准备调用resolve函数:", result);
    if (resolve) {
      console.log("主进程: 调用resolve函数返回成功结果");
      resolve(result);
    } else {
      console.error("主进程: resolve函数不存在!");
    }

    return { success: true };
  } catch (error) {
    console.error("主进程: 处理用户输入响应时发生错误:", error);
    return {
      success: false,
      error: error.message,
    };
  }
});

/**
 * 清理过期的输入请求
 */
setInterval(() => {
  const now = Date.now();
  const expiredRequests = [];

  for (const [requestId, requestData] of pendingInputRequests.entries()) {
    // 清理超过5分钟的请求
    if (now - requestData.request.timestamp > 5 * 60 * 1000) {
      expiredRequests.push(requestId);
    }
  }

  expiredRequests.forEach((requestId) => {
    const requestData = pendingInputRequests.get(requestId);
    if (requestData && requestData.resolve) {
      requestData.resolve({
        success: false,
        error: "输入请求已过期",
        cancelled: true,
      });
    }
    pendingInputRequests.delete(requestId);
  });
}, 60000); // 每分钟检查一次

// ==================== 错误处理 ====================

/**
 * 处理未捕获的异常
 */
process.on("uncaughtException", (error) => {
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

// 使用 Buffer 确保中文字符正确输出
const logMessage = (message) => {
  if (process.platform === "win32") {
    // Windows 平台使用 UTF-8 编码输出
    process.stdout.write(Buffer.from(message + "\n", "utf8"));
  } else {
    console.log(message);
  }
};

logMessage("Vakao UI Publisher GUI 启动完成");
logMessage("项目根目录: " + PROJECT_ROOT);
logMessage("发布脚本路径: " + PUBLISH_SCRIPT);
