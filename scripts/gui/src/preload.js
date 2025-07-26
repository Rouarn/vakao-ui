/**
 * Vakao UI Publisher GUI - 预加载脚本
 *
 * 在渲染进程中安全地暴露主进程 API
 * 遵循 Electron 安全最佳实践
 *
 * @version 1.0.0
 * @author 我与夏季
 */

const { contextBridge, ipcRenderer } = require('electron');

// ==================== API 定义 ====================

/**
 * 暴露给渲染进程的 API
 */
const electronAPI = {
  // ==================== 项目信息 ====================
  
  /**
   * 获取项目信息
   * @returns {Promise<Object>} 项目信息
   */
  getProjectInfo: () => ipcRenderer.invoke('get-project-info'),
  
  /**
   * 获取包列表
   * @returns {Promise<Array>} 包列表
   */
  getPackages: () => ipcRenderer.invoke('get-packages'),
  
  /**
   * 获取包版本信息
   * @param {string} packageId - 包 ID
   * @returns {Promise<Object>} 包版本信息
   */
  getPackageVersions: (packageId) => ipcRenderer.invoke('get-package-versions', packageId),
  
  // ==================== 命令执行 ====================
  
  /**
   * 执行发布命令
   * @param {string} command - 要执行的命令
   * @returns {Promise<Object>} 执行结果
   */
  executeCommand: (command) => ipcRenderer.invoke('execute-command', command),
  
  /**
   * 执行发布任务
   * @param {Object} options - 发布选项
   * @returns {Promise<Object>} 执行结果
   */
  executePublish: (options) => ipcRenderer.invoke('execute-publish', options),
  
  /**
   * 终止发布进程
   * @returns {Promise<Object>} 执行结果
   */
  killPublishProcess: () => ipcRenderer.invoke('kill-publish-process'),
  
  /**
   * 终止当前运行的进程
   * @param {string} processId - 进程 ID
   * @returns {Promise<boolean>} 是否成功终止
   */
  terminateProcess: (processId) => ipcRenderer.invoke('terminate-process', processId),
  
  /**
   * 获取进程状态
   * @param {string} processId - 进程 ID
   * @returns {Promise<Object>} 进程状态
   */
  getProcessStatus: (processId) => ipcRenderer.invoke('get-process-status', processId),
  
  // ==================== 文件系统操作 ====================
  
  /**
   * 打开目录
   * @param {string} path - 目录路径
   * @returns {Promise<void>}
   */
  openDirectory: (path) => ipcRenderer.invoke('open-directory', path),
  
  /**
   * 打开项目根目录
   * @returns {Promise<void>}
   */
  openProjectDirectory: () => ipcRenderer.invoke('open-project-directory'),
  
  /**
   * 打开日志目录
   * @returns {Promise<void>}
   */
  openLogDirectory: () => ipcRenderer.invoke('open-log-directory'),
  
  /**
   * 导出日志文件
   * @param {string} content - 日志内容
   * @returns {Promise<string>} 导出的文件路径
   */
  exportLogs: (content) => ipcRenderer.invoke('export-logs', content),
  
  // ==================== 应用设置 ====================
  
  /**
   * 获取应用设置
   * @returns {Promise<Object>} 应用设置
   */
  getSettings: () => ipcRenderer.invoke('get-settings'),
  
  /**
   * 保存应用设置
   * @param {Object} settings - 应用设置
   * @returns {Promise<void>}
   */
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  
  /**
   * 重置应用设置
   * @returns {Promise<void>}
   */
  resetSettings: () => ipcRenderer.invoke('reset-settings'),
  
  // ==================== 对话框 ====================
  
  /**
   * 显示信息对话框
   * @param {string} title - 标题
   * @param {string} message - 消息
   * @returns {Promise<void>}
   */
  showInfoDialog: (title, message) => ipcRenderer.invoke('show-info-dialog', title, message),
  
  /**
   * 显示错误对话框
   * @param {string} title - 标题
   * @param {string} message - 消息
   * @returns {Promise<void>}
   */
  showErrorDialog: (title, message) => ipcRenderer.invoke('show-error-dialog', title, message),
  
  /**
   * 显示确认对话框
   * @param {string} title - 标题
   * @param {string} message - 消息
   * @returns {Promise<boolean>} 用户是否确认
   */
  showConfirmDialog: (title, message) => ipcRenderer.invoke('show-confirm-dialog', title, message),
  
  /**
   * 显示文件保存对话框
   * @param {Object} options - 对话框选项
   * @returns {Promise<string|null>} 选择的文件路径
   */
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  
  /**
   * 显示文件打开对话框
   * @param {Object} options - 对话框选项
   * @returns {Promise<string[]|null>} 选择的文件路径列表
   */
  showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
  
  // ==================== 通知 ====================
  
  /**
   * 显示系统通知
   * @param {string} title - 通知标题
   * @param {string} body - 通知内容
   * @param {string} icon - 通知图标
   * @returns {Promise<void>}
   */
  showNotification: (title, body, icon) => ipcRenderer.invoke('show-notification', title, body, icon),
  
  // ==================== 应用控制 ====================
  
  /**
   * 获取应用版本
   * @returns {Promise<string>} 应用版本
   */
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  /**
   * 重启应用
   * @returns {Promise<void>}
   */
  restartApp: () => ipcRenderer.invoke('restart-app'),
  
  /**
   * 退出应用
   * @returns {Promise<void>}
   */
  quitApp: () => ipcRenderer.invoke('quit-app'),
  
  /**
   * 最小化窗口
   * @returns {Promise<void>}
   */
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  
  /**
   * 最大化/还原窗口
   * @returns {Promise<void>}
   */
  toggleMaximizeWindow: () => ipcRenderer.invoke('toggle-maximize-window'),
  
  /**
   * 关闭窗口
   * @returns {Promise<void>}
   */
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // ==================== 事件监听 ====================
  
  /**
   * 监听日志输出
   * @param {Function} callback - 回调函数
   */
  onLogOutput: (callback) => {
    ipcRenderer.on('log-output', (event, data) => callback(data));
  },
  
  /**
   * 移除日志输出监听
   * @param {Function} callback - 回调函数
   */
  offLogOutput: (callback) => {
    ipcRenderer.removeListener('log-output', callback);
  },
  
  /**
   * 监听进程状态变化
   * @param {Function} callback - 回调函数
   */
  onProcessStatus: (callback) => {
    ipcRenderer.on('process-status', (event, status) => callback(status));
  },
  
  /**
   * 移除进程状态监听
   * @param {Function} callback - 回调函数
   */
  offProcessStatus: (callback) => {
    ipcRenderer.removeListener('process-status', callback);
  },
  
  /**
   * 监听错误事件
   * @param {Function} callback - 回调函数
   */
  onError: (callback) => {
    ipcRenderer.on('error', (event, error) => callback(error));
  },
  
  /**
   * 移除错误事件监听
   * @param {Function} callback - 回调函数
   */
  offError: (callback) => {
    ipcRenderer.removeListener('error', callback);
  },
  
  /**
   * 监听应用更新事件
   * @param {Function} callback - 回调函数
   */
  onAppUpdate: (callback) => {
    ipcRenderer.on('app-update', (event, updateInfo) => callback(updateInfo));
  },
  
  /**
   * 移除应用更新事件监听
   * @param {Function} callback - 回调函数
   */
  offAppUpdate: (callback) => {
    ipcRenderer.removeListener('app-update', callback);
  },
  
  /**
   * 监听主题变化事件
   * @param {Function} callback - 回调函数
   */
  onThemeChanged: (callback) => {
    ipcRenderer.on('theme-changed', (event, theme) => callback(theme));
  },
  
  /**
   * 移除主题变化事件监听
   * @param {Function} callback - 回调函数
   */
  offThemeChanged: (callback) => {
    ipcRenderer.removeListener('theme-changed', callback);
  },
  
  // ==================== 开发工具 ====================
  
  /**
   * 打开开发者工具
   * @returns {Promise<void>}
   */
  openDevTools: () => ipcRenderer.invoke('open-dev-tools'),
  
  /**
   * 重新加载窗口
   * @returns {Promise<void>}
   */
  reloadWindow: () => ipcRenderer.invoke('reload-window'),
  
  /**
   * 获取系统信息
   * @returns {Promise<Object>} 系统信息
   */
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // ==================== 工具函数 ====================
  
  /**
   * 移除所有事件监听器
   */
  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('log-output');
    ipcRenderer.removeAllListeners('process-status');
    ipcRenderer.removeAllListeners('error');
    ipcRenderer.removeAllListeners('app-update');
    ipcRenderer.removeAllListeners('theme-changed');
  },
  
  /**
   * 检查是否为开发模式
   * @returns {boolean} 是否为开发模式
   */
  isDevelopment: () => process.env.NODE_ENV === 'development',
  
  /**
   * 获取平台信息
   * @returns {string} 平台名称
   */
  getPlatform: () => process.platform,
  
  /**
   * 获取架构信息
   * @returns {string} 架构名称
   */
  getArch: () => process.arch,
  
  /**
   * 获取 Node.js 版本
   * @returns {string} Node.js 版本
   */
  getNodeVersion: () => process.versions.node,
  
  /**
   * 获取 Electron 版本
   * @returns {string} Electron 版本
   */
  getElectronVersion: () => process.versions.electron,
  
  /**
   * 获取 Chrome 版本
   * @returns {string} Chrome 版本
   */
  getChromeVersion: () => process.versions.chrome
};

// ==================== 安全暴露 API ====================

/**
 * 通过 contextBridge 安全地暴露 API 到渲染进程
 * 这样可以避免直接暴露 Node.js API，提高安全性
 */
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// ==================== 开发模式调试 ====================

if (process.env.NODE_ENV === 'development') {
  // 在开发模式下，可以暴露一些额外的调试工具
  contextBridge.exposeInMainWorld('debugAPI', {
    /**
     * 获取所有 IPC 通道
     * @returns {string[]} IPC 通道列表
     */
    getIPCChannels: () => {
      return [
        'get-project-info',
        'get-packages',
        'get-package-versions',
        'execute-command',
        'terminate-process',
        'get-process-status',
        'open-directory',
        'open-project-directory',
        'open-log-directory',
        'export-logs',
        'get-settings',
        'save-settings',
        'reset-settings',
        'show-info-dialog',
        'show-error-dialog',
        'show-confirm-dialog',
        'show-save-dialog',
        'show-open-dialog',
        'show-notification',
        'get-app-version',
        'restart-app',
        'quit-app',
        'minimize-window',
        'toggle-maximize-window',
        'close-window',
        'open-dev-tools',
        'reload-window',
        'get-system-info'
      ];
    },
    
    /**
     * 测试 IPC 通信
     * @param {string} channel - 通道名称
     * @param {any} data - 测试数据
     * @returns {Promise<any>} 测试结果
     */
    testIPC: (channel, data) => {
      return ipcRenderer.invoke('debug-test-ipc', channel, data);
    },
    
    /**
     * 获取渲染进程内存使用情况
     * @returns {Object} 内存使用情况
     */
    getMemoryUsage: () => {
      return process.memoryUsage();
    },
    
    /**
     * 强制垃圾回收（如果可用）
     */
    forceGC: () => {
      if (global.gc) {
        global.gc();
      }
    }
  });
  
  console.log('Vakao UI Publisher GUI - 预加载脚本已加载（开发模式）');
} else {
  console.log('Vakao UI Publisher GUI - 预加载脚本已加载（生产模式）');
}

// ==================== 错误处理 ====================

/**
 * 处理未捕获的异常
 */
process.on('uncaughtException', (error) => {
  console.error('预加载脚本中的未捕获异常:', error);
  // 通知主进程
  ipcRenderer.send('preload-error', {
    type: 'uncaughtException',
    message: error.message,
    stack: error.stack
  });
});

/**
 * 处理未处理的 Promise 拒绝
 */
process.on('unhandledRejection', (reason, promise) => {
  console.error('预加载脚本中的未处理 Promise 拒绝:', reason);
  // 通知主进程
  ipcRenderer.send('preload-error', {
    type: 'unhandledRejection',
    message: reason?.message || String(reason),
    promise: promise
  });
});

// ==================== 生命周期事件 ====================

/**
 * 窗口即将卸载时的清理工作
 */
window.addEventListener('beforeunload', () => {
  // 移除所有事件监听器
  electronAPI.removeAllListeners();
  
  console.log('预加载脚本清理完成');
});

/**
 * 窗口加载完成后的初始化工作
 */
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 内容已加载，预加载脚本准备就绪');
  
  // 可以在这里进行一些初始化工作
  // 例如设置全局错误处理器等
  
  window.addEventListener('error', (event) => {
    console.error('渲染进程错误:', event.error);
    ipcRenderer.send('renderer-error', {
      message: event.error?.message || event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack
    });
  });
  
  window.addEventListener('unhandledrejection', (event) => {
    console.error('渲染进程未处理的 Promise 拒绝:', event.reason);
    ipcRenderer.send('renderer-error', {
      type: 'unhandledRejection',
      message: event.reason?.message || String(event.reason)
    });
  });
});

// ==================== 导出类型定义（用于 TypeScript） ====================

/**
 * 如果项目使用 TypeScript，可以在这里定义类型
 * 这些类型定义可以帮助开发者获得更好的代码提示
 */

/*
// 项目信息类型
interface ProjectInfo {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  repository?: string;
  homepage?: string;
}

// 包信息类型
interface PackageInfo {
  id: string;
  name: string;
  displayName: string;
  version: string;
  description?: string;
  path: string;
  type: 'main' | 'hooks' | 'utils' | 'docs';
  buildCommand?: string;
  dependencies?: string[];
  keywords?: string[];
}

// 应用设置类型
interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  autoScroll: boolean;
  notifications: boolean;
  language?: string;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

// 进程状态类型
interface ProcessStatus {
  type: 'started' | 'running' | 'completed' | 'error';
  processId?: string;
  code?: number;
  error?: string;
}

// 日志条目类型
interface LogEntry {
  timestamp: string;
  type: 'stdout' | 'stderr' | 'info' | 'success' | 'warning' | 'error';
  message: string;
}

// 系统信息类型
interface SystemInfo {
  platform: string;
  arch: string;
  nodeVersion: string;
  electronVersion: string;
  chromeVersion: string;
  totalMemory: number;
  freeMemory: number;
  cpuCount: number;
}
*/