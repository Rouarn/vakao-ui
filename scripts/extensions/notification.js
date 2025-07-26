/**
 * 通知扩展
 * 提供多种通知方式（邮件、Webhook、桌面通知等）
 */

class NotificationExtension {
  constructor(config) {
    this.config = config;
    this.name = "notification";
    this.version = "1.0.0";
    this.description = "通知扩展，支持多种通知方式";
    this.notificationConfig = {
      email: {
        enabled: false,
        smtp: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        },
        from: process.env.SMTP_FROM || 'noreply@vakao-ui.com',
        to: process.env.NOTIFICATION_EMAIL
      },
      webhook: {
        enabled: !!process.env.WEBHOOK_URL,
        url: process.env.WEBHOOK_URL,
        method: 'POST'
      },
      desktop: {
        enabled: true
      }
    };
  }

  /**
   * 初始化扩展
   * @param {ExtensionManager} extensionManager - 扩展管理器
   */
  async initialize(extensionManager) {
    // 注册钩子
    extensionManager.registerHook('afterDeploy', this.onDeployComplete.bind(this), this.name);
    extensionManager.registerHook('onError', this.onError.bind(this), this.name);
    
    console.log(`${this.name} 扩展已初始化`);
    this.logNotificationConfig();
  }

  /**
   * 记录通知配置
   */
  logNotificationConfig() {
    const enabledMethods = [];
    if (this.notificationConfig.email.enabled) enabledMethods.push('📧 邮件');
    if (this.notificationConfig.webhook.enabled) enabledMethods.push('🔗 Webhook');
    if (this.notificationConfig.desktop.enabled) enabledMethods.push('🖥️  桌面');
    
    if (enabledMethods.length > 0) {
      console.log(`📢 通知方式: ${enabledMethods.join(', ')}`);
    } else {
      console.log('📢 通知功能已禁用');
    }
  }

  /**
   * 部署完成通知
   * @param {Object} context - 上下文
   */
  async onDeployComplete(context) {
    const { strategy, result, duration } = context;
    
    const message = {
      title: '🎉 Vakao UI - 部署成功',
      content: `策略: ${strategy}\n结果: ${result.message}\n耗时: ${Math.round(duration / 1000)}秒`,
      type: 'success',
      url: result.url
    };

    await this.sendNotification(message);
  }

  /**
   * 错误通知
   * @param {Object} context - 上下文
   */
  async onError(context) {
    const { error, strategy } = context;
    
    const message = {
      title: '⚠️ Vakao UI - 部署失败',
      content: `策略: ${strategy}\n错误: ${error.message}`,
      type: 'error'
    };

    await this.sendNotification(message);
  }

  /**
   * 发送通知
   * @param {Object} message - 消息内容
   */
  async sendNotification(message) {
    const promises = [];

    // 桌面通知
    if (this.notificationConfig.desktop.enabled) {
      promises.push(this.sendDesktopNotification(message));
    }

    // 邮件通知
    if (this.notificationConfig.email.enabled) {
      promises.push(this.sendEmailNotification(message));
    }

    // Webhook 通知
    if (this.notificationConfig.webhook.enabled) {
      promises.push(this.sendWebhookNotification(message));
    }

    // 并行发送所有通知
    await Promise.allSettled(promises);
  }

  /**
   * 发送桌面通知
   * @param {Object} message - 消息内容
   */
  async sendDesktopNotification(message) {
    try {
      // 使用 node-notifier 发送桌面通知
      const notifier = require('node-notifier');
      
      notifier.notify({
        title: message.title,
        message: message.content,
        icon: this.getIconPath(message.type),
        sound: true,
        wait: false,
        // 自定义应用名称，替换默认的 "SnoreToast"
        appName: 'Vakao UI',
        // Windows 特定配置
        appID: 'com.vakao.ui.deploy'
      });
      
      console.log('🖥️  桌面通知已发送');
    } catch (error) {
      console.log('🖥️  桌面通知发送失败:', error.message);
    }
  }

  /**
   * 发送邮件通知
   * @param {Object} message - 消息内容
   */
  async sendEmailNotification(message) {
    try {
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransporter(this.notificationConfig.email.smtp);
      
      const mailOptions = {
        from: this.notificationConfig.email.from,
        to: this.notificationConfig.email.to,
        subject: message.title,
        html: this.formatEmailContent(message)
      };
      
      await transporter.sendMail(mailOptions);
      console.log('📧 邮件通知已发送');
    } catch (error) {
      console.log('📧 邮件通知发送失败:', error.message);
    }
  }

  /**
   * 发送 Webhook 通知
   * @param {Object} message - 消息内容
   */
  async sendWebhookNotification(message) {
    try {
      const https = require('https');
      const http = require('http');
      const url = require('url');
      
      const webhookUrl = new URL(this.notificationConfig.webhook.url);
      const client = webhookUrl.protocol === 'https:' ? https : http;
      
      const payload = JSON.stringify({
        text: message.title,
        content: message.content,
        type: message.type,
        url: message.url,
        timestamp: new Date().toISOString(),
        source: 'vakao-ui-deploy'
      });
      
      const options = {
        hostname: webhookUrl.hostname,
        port: webhookUrl.port,
        path: webhookUrl.pathname + webhookUrl.search,
        method: this.notificationConfig.webhook.method,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload)
        }
      };
      
      const req = client.request(options, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('🔗 Webhook 通知已发送');
        } else {
          console.log(`🔗 Webhook 通知发送失败: ${res.statusCode}`);
        }
      });
      
      req.on('error', (error) => {
        console.log('🔗 Webhook 通知发送失败:', error.message);
      });
      
      req.write(payload);
      req.end();
    } catch (error) {
      console.log('🔗 Webhook 通知发送失败:', error.message);
    }
  }

  /**
   * 格式化邮件内容
   * @param {Object} message - 消息内容
   */
  formatEmailContent(message) {
    const color = message.type === 'success' ? '#28a745' : '#dc3545';
    const icon = message.type === 'success' ? '🚀' : '❌';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: ${color}; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">${icon} ${message.title}</h1>
        </div>
        <div style="padding: 20px; background-color: #f8f9fa;">
          <pre style="white-space: pre-wrap; font-family: monospace;">${message.content}</pre>
          ${message.url ? `<p><a href="${message.url}" style="color: ${color};">访问部署结果</a></p>` : ''}
        </div>
        <div style="padding: 10px; text-align: center; color: #6c757d; font-size: 12px;">
          <p>此邮件由 Vakao UI 自动发送</p>
        </div>
      </div>
    `;
  }

  /**
   * 获取图标路径
   * @param {string} type - 消息类型
   */
  getIconPath(type) {
    // 返回系统图标或自定义图标路径
    return type === 'success' ? 'success' : 'error';
  }

  /**
   * 清理资源
   */
  async destroy() {
    console.log(`${this.name} 扩展已清理`);
  }
}

module.exports = NotificationExtension;