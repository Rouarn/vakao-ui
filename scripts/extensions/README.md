# Vakao UI 扩展系统

扩展系统为 Vakao UI 发布工具提供了强大的可扩展性，允许您添加自定义功能和集成第三方服务。

## 扩展目录结构

```
scripts/
├── extensions/          # 扩展目录
│   ├── github-integration.js    # GitHub 集成扩展
│   ├── notification.js          # 通知扩展
│   └── custom-extension/        # 目录形式的扩展
│       ├── package.json
│       └── index.js
└── plugins/            # 插件目录（别名）
```

## 扩展类型

### 1. 单文件扩展

最简单的扩展形式，直接放在 `extensions` 目录下：

```javascript
// scripts/extensions/my-extension.js
class MyExtension {
  constructor(config) {
    this.config = config;
    this.name = "my-extension";
    this.version = "1.0.0";
  }

  async initialize(extensionManager) {
    // 注册钩子
    extensionManager.registerHook('beforeDeploy', this.beforeDeploy.bind(this), this.name);
  }

  async beforeDeploy(context) {
    console.log('执行部署前操作');
  }

  async destroy() {
    console.log('清理资源');
  }
}

module.exports = MyExtension;
```

### 2. 目录形式扩展

更复杂的扩展可以使用目录结构：

```json
// scripts/extensions/my-extension/package.json
{
  "name": "vakao-ui-extension-my-extension",
  "version": "1.0.0",
  "description": "我的自定义扩展",
  "main": "index.js",
  "author": "Your Name",
  "vakaoExtension": {
    "type": "deployment",
    "category": "integration"
  }
}
```

```javascript
// scripts/extensions/my-extension/index.js
class MyExtension {
  // 扩展实现
}

module.exports = MyExtension;
```

## 可用钩子

扩展可以注册以下钩子来响应不同的事件：

### 部署相关钩子

- `beforeDeploy`: 部署前执行
- `afterDeploy`: 部署后执行
- `onError`: 部署出错时执行

```javascript
// 注册钩子
extensionManager.registerHook('beforeDeploy', this.beforeDeploy.bind(this), this.name);

// 钩子实现
async beforeDeploy(context) {
  // context 包含:
  // - strategy: 部署策略
  // - options: 部署选项
  // - startTime: 开始时间
  console.log(`准备使用 ${context.strategy} 策略部署`);
}
```

### 发布相关钩子（未来扩展）

- `beforePublish`: 发布前执行
- `afterPublish`: 发布后执行
- `onPublishError`: 发布出错时执行

## 内置扩展

### GitHub 集成扩展

提供 GitHub 相关的自动化功能：

- 检查未推送的提交
- 自动创建 Release（待实现）
- 发送部署状态到 GitHub（待实现）

### 通知扩展

支持多种通知方式：

- 🖥️ 桌面通知
- 📧 邮件通知
- 🔗 Webhook 通知

#### 配置环境变量

```bash
# 邮件通知配置
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@vakao-ui.com
NOTIFICATION_EMAIL=admin@company.com

# Webhook 通知配置
WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

## 创建自定义扩展

### 1. 使用模板创建

```bash
# 创建扩展模板
node scripts/publish.js --create-extension my-extension
```

### 2. 手动创建

```javascript
// scripts/extensions/my-custom-extension.js
class MyCustomExtension {
  constructor(config) {
    this.config = config;
    this.name = "my-custom-extension";
    this.version = "1.0.0";
    this.description = "我的自定义扩展";
  }

  /**
   * 初始化扩展
   */
  async initialize(extensionManager) {
    // 注册钩子
    extensionManager.registerHook('afterDeploy', this.onDeploySuccess.bind(this), this.name);
    
    console.log(`${this.name} 扩展已初始化`);
  }

  /**
   * 部署成功后的处理
   */
  async onDeploySuccess(context) {
    const { result, duration } = context;
    
    // 发送自定义通知
    await this.sendCustomNotification({
      message: `部署成功: ${result.message}`,
      duration: Math.round(duration / 1000),
      url: result.url
    });
  }

  /**
   * 发送自定义通知
   */
  async sendCustomNotification(data) {
    // 实现您的自定义通知逻辑
    console.log('📢 自定义通知:', data);
  }

  /**
   * 清理资源
   */
  async destroy() {
    console.log(`${this.name} 扩展已清理`);
  }
}

module.exports = MyCustomExtension;
```

## 扩展最佳实践

### 1. 错误处理

```javascript
async onDeploySuccess(context) {
  try {
    await this.doSomething();
  } catch (error) {
    console.error(`${this.name} 扩展执行失败:`, error.message);
    // 不要抛出错误，避免影响主流程
  }
}
```

### 2. 配置管理

```javascript
constructor(config) {
  this.config = config;
  this.extensionConfig = {
    enabled: process.env.MY_EXTENSION_ENABLED !== 'false',
    apiKey: process.env.MY_API_KEY,
    timeout: parseInt(process.env.MY_TIMEOUT) || 5000
  };
}
```

### 3. 日志记录

```javascript
const { log } = require('../utils');

async initialize(extensionManager) {
  log(`初始化 ${this.name} 扩展`, 'info');
}
```

### 4. 异步操作

```javascript
async onDeploySuccess(context) {
  // 使用 Promise.allSettled 处理多个异步操作
  const results = await Promise.allSettled([
    this.sendNotification(),
    this.updateDatabase(),
    this.callWebhook()
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`操作 ${index} 失败:`, result.reason);
    }
  });
}
```

## 扩展开发指南

### 必需方法

- `constructor(config)`: 构造函数
- `initialize(extensionManager)`: 初始化方法

### 可选方法

- `destroy()`: 清理资源
- 各种钩子方法

### 扩展属性

- `name`: 扩展名称（必需）
- `version`: 扩展版本
- `description`: 扩展描述

### 上下文对象

钩子函数接收的 `context` 对象包含：

```javascript
{
  strategy: 'github-pages',    // 部署策略
  options: { isDryRun: false }, // 部署选项
  startTime: 1234567890,       // 开始时间戳
  endTime: 1234567895,         // 结束时间戳（afterDeploy 钩子）
  duration: 5000,              // 执行时长（afterDeploy 钩子）
  result: { success: true },   // 执行结果（afterDeploy 钩子）
  error: new Error(),          // 错误对象（onError 钩子）
  gitStatus: { ... }           // Git 状态信息
}
```

## 故障排除

### 扩展未加载

1. 检查文件路径和命名
2. 确保扩展类正确导出
3. 检查控制台错误信息

### 钩子未执行

1. 确保在 `initialize` 方法中注册了钩子
2. 检查钩子名称是否正确
3. 确保钩子方法存在且可调用

### 扩展报错

1. 添加 try-catch 错误处理
2. 检查依赖是否正确安装
3. 验证配置和环境变量

## 贡献扩展

如果您开发了有用的扩展，欢迎贡献到项目中：

1. 确保扩展遵循最佳实践
2. 添加完整的文档和示例
3. 提供测试用例
4. 提交 Pull Request