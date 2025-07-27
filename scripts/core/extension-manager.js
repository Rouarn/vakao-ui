/**
 * Vakao UI 扩展管理器
 *
 * 提供插件化的扩展系统：
 * - 动态加载扩展
 * - 扩展生命周期管理
 * - 扩展间通信
 * - 扩展配置管理
 * - 扩展依赖解析
 *
 * @version 1.0.0
 * @author 我与夏季
 */

const fs = require("fs");
const path = require("path");
const { log } = require("../utils/");

/**
 * 扩展管理器类
 */
class ExtensionManager {
  constructor(config) {
    this.config = config;
    this.extensions = new Map();
    this.extensionConfigs = new Map();
    this.hooks = new Map();
    this.extensionPaths = [
      path.join(config.projectRoot, "scripts", "extensions"),
      path.join(config.projectRoot, "scripts", "plugins"),
    ];
    this.isInitialized = false;
  }

  /**
   * 初始化扩展管理器
   */
  async initialize() {
    if (this.isInitialized) {
      return;
    }

    log("初始化扩展管理器", "info");

    // 创建扩展目录
    this.ensureExtensionDirectories();

    // 加载所有扩展
    await this.loadAllExtensions();

    this.isInitialized = true;
    log(
      `扩展管理器初始化完成，已加载 ${this.extensions.size} 个扩展`,
      "success",
    );
  }

  /**
   * 确保扩展目录存在
   */
  ensureExtensionDirectories() {
    this.extensionPaths.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`创建扩展目录: ${dir}`, "info");
      }
    });
  }

  /**
   * 加载所有扩展
   */
  async loadAllExtensions() {
    for (const extensionPath of this.extensionPaths) {
      if (fs.existsSync(extensionPath)) {
        await this.loadExtensionsFromDirectory(extensionPath);
      }
    }
  }

  /**
   * 从目录加载扩展
   * @param {string} directory - 扩展目录
   */
  async loadExtensionsFromDirectory(directory) {
    const items = fs.readdirSync(directory);

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // 目录形式的扩展
        await this.loadExtensionFromDirectory(itemPath);
      } else if (item.endsWith(".js") && !item.startsWith(".")) {
        // 单文件扩展
        await this.loadExtensionFromFile(itemPath);
      }
    }
  }

  /**
   * 从目录加载扩展
   * @param {string} extensionDir - 扩展目录
   */
  async loadExtensionFromDirectory(extensionDir) {
    const packageJsonPath = path.join(extensionDir, "package.json");
    const indexPath = path.join(extensionDir, "index.js");
    const mainPath = path.join(extensionDir, "main.js");

    let extensionPath = null;
    let extensionConfig = {};

    // 读取扩展配置
    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(packageJsonPath, "utf8"),
        );
        extensionConfig = {
          name: packageJson.name,
          version: packageJson.version,
          description: packageJson.description,
          author: packageJson.author,
          main: packageJson.main || "index.js",
          ...packageJson.vakaoExtension,
        };
        extensionPath = path.join(extensionDir, extensionConfig.main);
      } catch (error) {
        log(`读取扩展配置失败: ${packageJsonPath}`, "error");
        return;
      }
    } else {
      // 没有 package.json，尝试默认入口文件
      if (fs.existsSync(indexPath)) {
        extensionPath = indexPath;
      } else if (fs.existsSync(mainPath)) {
        extensionPath = mainPath;
      }
    }

    if (extensionPath && fs.existsSync(extensionPath)) {
      await this.loadExtensionFromFile(extensionPath, extensionConfig);
    }
  }

  /**
   * 从文件加载扩展
   * @param {string} extensionPath - 扩展文件路径
   * @param {Object} config - 扩展配置
   */
  async loadExtensionFromFile(extensionPath, config = {}) {
    try {
      // 清除模块缓存以支持热重载
      delete require.cache[require.resolve(extensionPath)];

      const extensionModule = require(extensionPath);
      const extension =
        typeof extensionModule === "function"
          ? new extensionModule(this.config)
          : extensionModule;

      // 验证扩展结构
      if (!this.validateExtension(extension)) {
        log(`扩展验证失败: ${extensionPath}`, "error");
        return;
      }

      const extensionName =
        extension.name || config.name || path.basename(extensionPath, ".js");

      // 合并配置
      const finalConfig = {
        ...config,
        name: extensionName,
        path: extensionPath,
        loadTime: Date.now(),
      };

      // 注册扩展
      this.extensions.set(extensionName, extension);
      this.extensionConfigs.set(extensionName, finalConfig);

      // 初始化扩展
      if (typeof extension.initialize === "function") {
        await extension.initialize(this);
      }

      log(
        `加载扩展: ${extensionName} (${finalConfig.version || "unknown"})`,
        "success",
      );
    } catch (error) {
      log(`加载扩展失败: ${extensionPath} - ${error.message}`, "error");
    }
  }

  /**
   * 验证扩展结构
   * @param {Object} extension - 扩展对象
   * @returns {boolean} 是否有效
   */
  validateExtension(extension) {
    if (!extension || typeof extension !== "object") {
      return false;
    }

    // 必须有名称
    if (!extension.name && typeof extension.getName !== "function") {
      return false;
    }

    return true;
  }

  /**
   * 获取扩展
   * @param {string} name - 扩展名称
   * @returns {Object|null} 扩展对象
   */
  getExtension(name) {
    return this.extensions.get(name) || null;
  }

  /**
   * 获取所有扩展
   * @returns {Array} 扩展列表
   */
  getAllExtensions() {
    return Array.from(this.extensions.entries()).map(([name, extension]) => ({
      name,
      extension,
      config: this.extensionConfigs.get(name),
    }));
  }

  /**
   * 检查扩展是否存在
   * @param {string} name - 扩展名称
   * @returns {boolean} 是否存在
   */
  hasExtension(name) {
    return this.extensions.has(name);
  }

  /**
   * 卸载扩展
   * @param {string} name - 扩展名称
   */
  async unloadExtension(name) {
    const extension = this.extensions.get(name);
    if (!extension) {
      return false;
    }

    try {
      // 调用扩展的清理方法
      if (typeof extension.destroy === "function") {
        await extension.destroy();
      }

      // 移除扩展
      this.extensions.delete(name);
      this.extensionConfigs.delete(name);

      // 清除模块缓存
      const config = this.extensionConfigs.get(name);
      if (config && config.path) {
        delete require.cache[require.resolve(config.path)];
      }

      log(`卸载扩展: ${name}`, "info");
      return true;
    } catch (error) {
      log(`卸载扩展失败: ${name} - ${error.message}`, "error");
      return false;
    }
  }

  /**
   * 重新加载扩展
   * @param {string} name - 扩展名称
   */
  async reloadExtension(name) {
    const config = this.extensionConfigs.get(name);
    if (!config) {
      return false;
    }

    await this.unloadExtension(name);
    await this.loadExtensionFromFile(config.path, config);
    return true;
  }

  /**
   * 注册钩子
   * @param {string} hookName - 钩子名称
   * @param {Function} callback - 回调函数
   * @param {string} extensionName - 扩展名称
   */
  registerHook(hookName, callback, extensionName) {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }

    this.hooks.get(hookName).push({
      callback,
      extensionName,
      registeredAt: Date.now(),
    });
  }

  /**
   * 执行钩子
   * @param {string} hookName - 钩子名称
   * @param {Object} context - 上下文数据
   */
  async executeHook(hookName, context = {}) {
    const hooks = this.hooks.get(hookName) || [];
    const results = [];

    for (const hook of hooks) {
      try {
        const result = await hook.callback(context);
        results.push({
          extensionName: hook.extensionName,
          result,
          success: true,
        });
      } catch (error) {
        log(`钩子执行失败 (${hookName}): ${error.message}`, "error");
        results.push({
          extensionName: hook.extensionName,
          error: error.message,
          success: false,
        });
      }
    }

    return results;
  }

  /**
   * 获取扩展统计信息
   * @returns {Object} 统计信息
   */
  getStats() {
    const extensions = this.getAllExtensions();
    const hookCount = Array.from(this.hooks.values()).reduce(
      (total, hooks) => total + hooks.length,
      0,
    );

    return {
      extensionCount: extensions.length,
      hookCount,
      extensionPaths: this.extensionPaths,
      extensions: extensions.map((ext) => ({
        name: ext.name,
        version: ext.config.version,
        description: ext.config.description,
        loadTime: ext.config.loadTime,
      })),
    };
  }

  /**
   * 创建扩展模板
   * @param {string} name - 扩展名称
   * @param {Object} options - 选项
   */
  async createExtensionTemplate(name, options = {}) {
    const extensionDir = path.join(this.extensionPaths[0], name);

    if (fs.existsSync(extensionDir)) {
      throw new Error(`扩展目录已存在: ${extensionDir}`);
    }

    fs.mkdirSync(extensionDir, { recursive: true });

    // 创建 package.json
    const packageJson = {
      name: `vakao-ui-extension-${name}`,
      version: "1.0.0",
      description: options.description || `Vakao UI 扩展: ${name}`,
      main: "index.js",
      author: options.author || "Vakao UI Team",
      vakaoExtension: {
        type: options.type || "general",
        category: options.category || "utility",
      },
    };

    fs.writeFileSync(
      path.join(extensionDir, "package.json"),
      JSON.stringify(packageJson, null, 2),
    );

    // 创建主文件
    const indexContent = `/**
 * ${name} 扩展
 * ${options.description || `Vakao UI 扩展: ${name}`}
 */

class ${name.charAt(0).toUpperCase() + name.slice(1)}Extension {
  constructor(config) {
    this.config = config;
    this.name = "${name}";
    this.version = "1.0.0";
  }

  /**
   * 初始化扩展
   * @param {ExtensionManager} extensionManager - 扩展管理器
   */
  async initialize(extensionManager) {
    // 注册钩子
    // extensionManager.registerHook('beforeDeploy', this.beforeDeploy.bind(this), this.name);
    
    console.log(\`\${this.name} 扩展已初始化\`);
  }

  /**
   * 扩展主要功能
   * @param {Object} options - 选项
   */
  async execute(options = {}) {
    console.log(\`执行 \${this.name} 扩展\`);
    // 在这里实现扩展的主要功能
  }

  /**
   * 清理资源
   */
  async destroy() {
    console.log(\`\${this.name} 扩展已清理\`);
  }
}

module.exports = ${name.charAt(0).toUpperCase() + name.slice(1)}Extension;
`;

    fs.writeFileSync(path.join(extensionDir, "index.js"), indexContent);

    log(`创建扩展模板: ${name}`, "success");
    return extensionDir;
  }

  /**
   * 关闭扩展管理器
   */
  async close() {
    // 卸载所有扩展
    const extensionNames = Array.from(this.extensions.keys());
    for (const name of extensionNames) {
      await this.unloadExtension(name);
    }

    // 清理资源
    this.extensions.clear();
    this.extensionConfigs.clear();
    this.hooks.clear();
    this.isInitialized = false;

    log("扩展管理器已关闭", "info");
  }
}

module.exports = ExtensionManager;
