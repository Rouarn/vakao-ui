# 用户输入交互功能使用指南

## 概述

用户输入交互功能允许在脚本执行期间暂停并请求用户输入，支持多种输入类型和验证规则。这个功能特别适用于需要用户确认、配置参数或提供敏感信息的场景。

## 功能特性

- ✅ **多种输入类型**: 文本、密码、数字、选择框、单选框、复选框、文本域
- ✅ **输入验证**: 必填验证、长度验证、数值范围验证、正则表达式验证
- ✅ **用户友好**: 现代化UI设计，支持键盘快捷键和无障碍访问
- ✅ **错误处理**: 完善的错误提示和重试机制
- ✅ **超时处理**: 自动清理过期请求，防止内存泄漏
- ✅ **主题适配**: 支持浅色和深色主题

## 支持的输入类型

### 1. 文本输入 (text)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: '项目名称',
  message: '请输入项目名称',
  description: '项目名称将用于创建目录和配置文件',
  type: 'text',
  required: true,
  defaultValue: 'my-project',
  validation: {
    minLength: 3,
    maxLength: 50,
    pattern: '^[a-zA-Z0-9-_]+$',
    patternMessage: '只能包含字母、数字、连字符和下划线'
  }
});
```

### 2. 密码输入 (password)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: 'API 密钥',
  message: '请输入 API 密钥',
  type: 'password',
  required: true,
  validation: {
    minLength: 8,
    maxLength: 64
  }
});
```

### 3. 数字输入 (number)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: '端口号',
  message: '请输入端口号',
  type: 'number',
  required: true,
  defaultValue: 3000,
  validation: {
    min: 1000,
    max: 65535
  }
});
```

### 4. 选择框 (select)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: '构建工具',
  message: '请选择构建工具',
  type: 'select',
  required: true,
  defaultValue: 'vite',
  options: [
    { value: 'webpack', label: 'Webpack' },
    { value: 'vite', label: 'Vite' },
    { value: 'rollup', label: 'Rollup' }
  ]
});
```

### 5. 单选框 (radio)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: '部署环境',
  message: '请选择部署环境',
  type: 'radio',
  required: true,
  defaultValue: 'production',
  options: [
    { value: 'development', label: '开发环境' },
    { value: 'staging', label: '测试环境' },
    { value: 'production', label: '生产环境' }
  ]
});
```

### 6. 复选框 (checkbox)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: '功能特性',
  message: '请选择要启用的功能',
  type: 'checkbox',
  required: false,
  defaultValue: ['typescript', 'eslint'],
  options: [
    { value: 'typescript', label: 'TypeScript 支持' },
    { value: 'eslint', label: 'ESLint 代码检查' },
    { value: 'prettier', label: 'Prettier 格式化' }
  ]
});
```

### 7. 文本域 (textarea)
```javascript
const result = await window.electronAPI.requestUserInput({
  title: '项目描述',
  message: '请输入项目描述',
  type: 'textarea',
  required: false,
  validation: {
    maxLength: 500
  }
});
```

## 验证规则

### 基础验证
- `required`: 是否必填
- `minLength`: 最小长度
- `maxLength`: 最大长度

### 数值验证 (仅限 number 类型)
- `min`: 最小值
- `max`: 最大值

### 正则表达式验证
- `pattern`: 正则表达式字符串
- `patternMessage`: 验证失败时的提示信息

### 自定义验证
```javascript
validation: {
  custom: (value) => {
    if (value.includes('test')) {
      return '不能包含 "test" 字符';
    }
    return true; // 验证通过
  }
}
```

## 返回值格式

### 成功响应
```javascript
{
  success: true,
  value: "用户输入的值",
  cancelled: false
}
```

### 取消响应
```javascript
{
  success: false,
  cancelled: true,
  error: "用户取消了输入"
}
```

### 错误响应
```javascript
{
  success: false,
  cancelled: false,
  error: "错误信息"
}
```

## 在发布脚本中使用

### 基本用法
```javascript
// 在你的发布脚本中
const { ipcRenderer } = require('electron');

async function askUserConfirmation() {
  try {
    const result = await ipcRenderer.invoke('request-user-input', {
      title: '确认发布',
      message: '确定要发布到生产环境吗？',
      description: '此操作将会覆盖当前的生产版本',
      type: 'radio',
      required: true,
      options: [
        { value: 'yes', label: '是，确认发布' },
        { value: 'no', label: '否，取消发布' }
      ]
    });

    if (result.success && result.value === 'yes') {
      console.log('用户确认发布');
      // 继续发布流程
    } else {
      console.log('用户取消发布');
      process.exit(0);
    }
  } catch (error) {
    console.error('获取用户确认失败:', error);
    process.exit(1);
  }
}
```

### 复杂场景示例
```javascript
async function configureDeployment() {
  // 1. 选择部署环境
  const envResult = await ipcRenderer.invoke('request-user-input', {
    title: '部署环境',
    message: '请选择部署环境',
    type: 'select',
    required: true,
    options: [
      { value: 'staging', label: '测试环境' },
      { value: 'production', label: '生产环境' }
    ]
  });

  if (!envResult.success) {
    throw new Error('未选择部署环境');
  }

  // 2. 输入版本号
  const versionResult = await ipcRenderer.invoke('request-user-input', {
    title: '版本号',
    message: '请输入新版本号',
    type: 'text',
    required: true,
    validation: {
      pattern: '^\\d+\\.\\d+\\.\\d+$',
      patternMessage: '版本号格式不正确，请使用 x.y.z 格式'
    }
  });

  if (!versionResult.success) {
    throw new Error('版本号输入失败');
  }

  // 3. 选择部署选项
  const optionsResult = await ipcRenderer.invoke('request-user-input', {
    title: '部署选项',
    message: '请选择部署选项',
    type: 'checkbox',
    options: [
      { value: 'backup', label: '备份当前版本' },
      { value: 'migrate', label: '执行数据库迁移' },
      { value: 'notify', label: '发送部署通知' }
    ]
  });

  return {
    environment: envResult.value,
    version: versionResult.value,
    options: optionsResult.success ? optionsResult.value : []
  };
}
```

## 最佳实践

### 1. 错误处理
```javascript
try {
  const result = await window.electronAPI.requestUserInput(config);
  
  if (!result.success) {
    if (result.cancelled) {
      console.log('用户取消了操作');
      return;
    } else {
      throw new Error(result.error);
    }
  }
  
  // 使用 result.value
} catch (error) {
  console.error('用户输入失败:', error);
}
```

### 2. 输入验证
```javascript
// 推荐：在客户端和服务端都进行验证
const config = {
  title: '邮箱地址',
  message: '请输入邮箱地址',
  type: 'text',
  required: true,
  validation: {
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    patternMessage: '请输入有效的邮箱地址'
  }
};
```

### 3. 用户体验
```javascript
// 提供清晰的标题和描述
const config = {
  title: '数据库连接',  // 简短明确的标题
  message: '请输入数据库连接字符串',  // 清晰的指令
  description: '格式: postgresql://user:password@host:port/database',  // 详细说明
  type: 'text',
  defaultValue: 'postgresql://localhost:5432/mydb'  // 提供默认值
};
```

### 4. 安全考虑
```javascript
// 对于敏感信息使用 password 类型
const config = {
  title: 'API 密钥',
  message: '请输入 API 密钥',
  type: 'password',  // 输入内容会被隐藏
  required: true
};
```

## 故障排除

### 常见问题

1. **模态框不显示**
   - 检查 `electronAPI` 是否已正确加载
   - 确认 preload.js 中的 API 已正确暴露

2. **验证不生效**
   - 检查验证规则的语法是否正确
   - 确认正则表达式是否有效

3. **样式显示异常**
   - 检查 CSS 文件是否正确加载
   - 确认主题设置是否正确

### 调试技巧

1. **启用开发者工具**
   ```javascript
   mainWindow.webContents.openDevTools();
   ```

2. **查看控制台日志**
   - 检查浏览器控制台的错误信息
   - 查看主进程的日志输出

3. **测试脚本**
   ```bash
   node test-user-input.js
   ```

## 更新日志

### v1.0.0 (2025-01-27)
- ✅ 初始版本发布
- ✅ 支持 7 种输入类型
- ✅ 完整的验证系统
- ✅ 现代化 UI 设计
- ✅ 完善的错误处理

## 技术支持

如果在使用过程中遇到问题，请：

1. 查看本文档的故障排除部分
2. 运行测试脚本验证功能
3. 检查开发者工具的控制台输出
4. 提交 Issue 并附上详细的错误信息

---

**注意**: 此功能需要 Electron 环境支持，不能在普通的 Web 浏览器中使用。