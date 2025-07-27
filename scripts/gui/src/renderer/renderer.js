/* eslint-disable comma-dangle */
/**
 * Vakao UI Publisher GUI - 渲染进程脚本
 *
 * 负责处理用户界面交互、与主进程通信以及状态管理
 * 使用 jQuery 优化 DOM 操作和用户交互体验
 *
 * @version 2.0.0
 * @author 我与夏季
 */

// ==================== 全局状态管理 ====================

const AppState = {
  // 当前活动的标签页
  activeTab: "publish",

  // 项目信息
  projectInfo: null,

  // 包信息
  packages: [],

  // 选中的包
  selectedPackages: new Set(),

  // 发布选项
  publishOptions: {
    dryRun: false,
    syncVersion: false,
    skipDeploy: false,
    deployStrategy: "auto",
  },

  // 当前运行的进程
  currentProcess: null,

  // 日志数据
  logs: [],

  // 应用设置
  settings: {
    theme: "light",
    autoScroll: true,
    notifications: true,
    autoSave: true,
    defaultDryRun: false,
  },
};

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

// ==================== jQuery DOM 元素缓存 ====================

/**
 * jQuery 元素缓存对象
 * 使用 jQuery 选择器缓存常用 DOM 元素，提升性能
 */
const $elements = {
  // 导航相关
  navItems: null,
  tabContents: null,

  // 发布管理
  packageGrid: null,
  publishBtn: null,
  previewBtn: null,
  dryRunCheckbox: null,
  syncVersionCheckbox: null,
  skipDeployCheckbox: null,
  deployStrategySelect: null,

  // 包管理
  packagesOverview: null,
  refreshPackagesBtn: null,

  // 部署管理
  deployActions: null,

  // 日志查看
  logContainer: null,
  clearLogsBtn: null,
  exportLogsBtn: null,

  // 状态栏
  statusBar: null,
  statusIndicator: null,
  statusText: null,
  projectStatus: null,
  versionInfo: null,

  // 模态框
  commandModal: null,
  commandPreview: null,
  executeBtn: null,
  cancelCommandBtn: null,
  commandPreviewModal: null,
  commandPreviewContent: null,
  closePreviewModal: null,
  copyCommandBtn: null,
  executeFromPreviewBtn: null,

  // 加载遮罩
  loadingOverlay: null,
  loadingText: null,

  // 设置
  themeSelect: null,
  autoScrollCheckbox: null,
  notificationsCheckbox: null,
  autoSaveCheckbox: null,
  defaultDryRunCheckbox: null,

  // 项目信息
  projectName: null,
  projectVersion: null,
  projectDescription: null,
  projectAuthor: null,
  projectLicense: null,
  projectRepository: null,
};

// ==================== 初始化函数 ====================

/**
 * 应用初始化
 */
async function initializeApp() {
  try {
    // 初始化 DOM 元素引用
    initializeElements();

    // 绑定事件监听器
    bindEventListeners();

    // 初始化批量操作
    initializeBatchOperations();

    // 加载项目信息
    await loadProjectInfo();

    // 加载包信息
    await loadPackages();

    // 加载应用设置
    await loadSettings();

    // 初始化界面
    initializeUI();

    // 设置状态
    updateStatus("ready", "就绪");

    console.log("Vakao UI Publisher GUI 初始化完成");
  } catch (error) {
    console.error("应用初始化失败:", error);
    showError("应用初始化失败: " + error.message);
  }
}

/**
 * 使用 jQuery 初始化 DOM 元素缓存
 * 提升后续 DOM 操作的性能
 */
function initializeElements() {
  // 导航相关
  $elements.navItems = $(".nav-item");
  $elements.tabContents = $(".tab-content");
  
  // 移动端菜单
  $elements.mobileMenuToggle = $("#mobileMenuToggle");
  $elements.sidebar = $("#sidebar");
  $elements.mobileOverlay = $("#mobileOverlay");

  // 发布管理
  $elements.packageGrid = $("#packageGrid");
  $elements.publishBtn = $("#publishBtn");
  $elements.previewBtn = $("#previewBtn");

  $elements.dryRunCheckbox = $("#dryRunCheck");
  $elements.syncVersionCheckbox = $("#syncVersionCheck");
  $elements.skipDeployCheckbox = $("#deployCheck");
  $elements.deployStrategySelect = $("#deployStrategy");

  // 包管理
  $elements.packagesOverview = $("#packagesOverview");
  $elements.refreshPackagesBtn = $("#refreshPackagesBtn");

  // 部署管理
  $elements.deployActions = $(".deploy-actions");

  // 日志查看
  $elements.logContainer = $("#logContainer");
  $elements.clearLogsBtn = $("#clearLogsBtn");
  $elements.exportLogsBtn = $("#exportLogsBtn");

  // 状态栏
  $elements.statusBar = $(".status-bar");
  $elements.statusIndicator = $("#statusIndicator");
  $elements.statusText = $("#statusText");
  $elements.projectStatus = $("#projectStatus");
  $elements.versionInfo = $("#versionInfo");

  // 模态框
  $elements.commandModal = $("#commandModal");
  $elements.commandPreview = $("#commandPreview");
  $elements.executeBtn = $("#executeBtn");
  $elements.cancelCommandBtn = $("#cancelCommandBtn");
  $elements.commandPreviewModal = $("#commandPreviewModal");
  $elements.commandPreviewContent = $("#commandPreviewContent");
  $elements.closePreviewModal = $("#closePreviewModal");
  $elements.copyCommandBtn = $("#copyCommandBtn");
  $elements.executeFromPreviewBtn = $("#executeFromPreviewBtn");

  // 加载遮罩
  $elements.loadingOverlay = $("#loadingOverlay");
  $elements.loadingText = $("#loadingText");

  // 日志状态指示器
  $elements.logStatusIndicator = $("#logStatusIndicator");

  // 设置
  $elements.themeSelect = $("#themeSelect");
  $elements.autoScrollCheckbox = $("#autoScrollCheck");
  $elements.notificationsCheckbox = $("#notificationsCheck");
  $elements.autoSaveCheckbox = $("#autoSaveCheck");
  $elements.defaultDryRunCheckbox = $("#defaultDryRunCheck");

  // 项目信息
  $elements.projectName = $("#projectName");
  $elements.projectVersion = $("#projectVersion");
  $elements.projectDescription = $("#projectDescription");
  $elements.projectAuthor = $("#projectAuthor");
  $elements.projectLicense = $("#projectLicense");
  $elements.projectRepository = $("#projectRepository");
}

/**
 * 使用 jQuery 绑定事件监听器
 * 利用事件委托和链式调用优化性能
 */
function bindEventListeners() {
  // 导航切换 - 使用事件委托
  $elements.navItems.on("click", function () {
    const tabId = $(this).data("tab");
    switchTab(tabId);
  });

  // 发布管理事件
  $elements.publishBtn.on("click", handlePublish);
  $elements.previewBtn.on("click", function () {
    const command = buildPublishCommand();
    showCommandPreviewModal("发布命令预览", command, false);
  });

  // 发布选项事件 - 使用 jQuery 链式调用
  $elements.dryRunCheckbox.on("change", function () {
    AppState.publishOptions.dryRun = $(this).is(":checked");
  });

  $elements.syncVersionCheckbox.on("change", function () {
    AppState.publishOptions.syncVersion = $(this).is(":checked");
  });

  $elements.skipDeployCheckbox.on("change", function () {
    AppState.publishOptions.skipDeploy = $(this).is(":checked");
  });

  $elements.deployStrategySelect.on("change", function () {
    AppState.publishOptions.deployStrategy = $(this).val();
  });

  // 包管理事件
  $elements.refreshPackagesBtn.on("click", loadPackages);

  // 部署管理事件
  bindDeploymentEvents();

  // 日志管理事件
  $elements.clearLogsBtn.on("click", clearLogs);
  $elements.exportLogsBtn.on("click", exportLogs);

  // 模态框事件
  $elements.cancelCommandBtn.on("click", hideCommandModal);
  $("#closeCommandModal").on("click", hideCommandModal);
  $elements.executeBtn.on("click", executeCommand);

  // 命令预览模态框事件
  $elements.closePreviewModal.on("click", hideCommandPreviewModal);
  $elements.copyCommandBtn.on("click", copyCommandFromPreview);
  $elements.executeFromPreviewBtn.on("click", executeCommandFromPreview);

  // 头部按钮事件
  bindHeaderEvents();

  // 设置事件
  bindSettingsEvents();

  // 主进程通信事件
  bindIPCEvents();

  // 键盘快捷键
  bindKeyboardShortcuts();
  
  // 移动端菜单事件
  bindMobileMenuEvents();
}

/**
 * 绑定部署相关事件
 */
function bindDeploymentEvents() {
  // 使用事件委托绑定所有部署按钮
  $(document).on("click", ".deploy-btn", function () {
    const strategy = $(this).data("strategy");
    console.log("strategy: ", strategy);
    let title = "";
    let command = "";

    switch (strategy) {
      case "docs":
        title = "部署文档到 GitHub Pages";
        command =
          "node scripts/publish.js --deploy-only --deploy-strategy docs";
        break;
      case "github-pages":
        title = "部署到 GitHub Pages";
        command =
          "node scripts/publish.js --deploy-only --deploy-strategy github-pages";
        break;
      case "static":
        title = "生成静态文件";
        command =
          "node scripts/publish.js --deploy-only --deploy-strategy static";
        break;
      default:
        console.warn("未知的部署策略:", strategy);
        return;
    }

    showCommandPreviewModal(title, command, true); // 部署命令预览不显示执行按钮
  });
}

/**
 * 绑定头部按钮事件
 */
function bindHeaderEvents() {
  // 设置按钮
  const settingsBtn = document.getElementById("settingsBtn");
  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      switchTab("settings");
    });
  }

  // 帮助按钮
  const helpBtn = document.getElementById("helpBtn");
  if (helpBtn) {
    helpBtn.addEventListener("click", () => {
      showHelpModal();
    });
  }
}

/**
 * 使用 jQuery 绑定设置相关事件
 */
function bindSettingsEvents() {
  $elements.themeSelect.on("change", function () {
    changeTheme($(this).val());
  });

  $elements.autoScrollCheckbox.on("change", function () {
    AppState.settings.autoScroll = $(this).is(":checked");
    // 不立即保存，等待用户点击保存按钮
  });

  $elements.notificationsCheckbox.on("change", function () {
    AppState.settings.notifications = $(this).is(":checked");
    // 不立即保存，等待用户点击保存按钮
  });

  $elements.autoSaveCheckbox.on("change", function () {
    AppState.settings.autoSave = $(this).is(":checked");
    // 不立即保存，等待用户点击保存按钮
  });

  $elements.defaultDryRunCheckbox.on("change", function () {
    AppState.settings.defaultDryRun = $(this).is(":checked");
    // 不立即保存，等待用户点击保存按钮
  });

  // 设置按钮事件
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      saveSettings();
      showToast("设置已保存", "success");
    });
  }

  const resetSettingsBtn = document.getElementById("resetSettingsBtn");
  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener("click", resetSettings);
  }

  const openProjectBtn = document.getElementById("openProjectBtn");
  if (openProjectBtn) {
    openProjectBtn.addEventListener("click", openProjectDirectory);
  }
}

/**
 * 绑定主进程通信事件
 */
function bindIPCEvents() {
  // 监听日志输出
  window.electronAPI.onLogOutput(data => {
    // 根据输出类型设置日志类型
    const logType = data.type === "stderr" ? "error" : "info";
    addLog(logType, data.data);
  });

  // 监听进程状态变化
  window.electronAPI.onProcessStatus(status => {
    handleProcessStatus(status);
  });

  // 监听错误
  window.electronAPI.onError(error => {
    showError(error.message);
    updateStatus("error", "错误: " + error.message);
  });
}

/**
 * 绑定移动端菜单事件
 */
function bindMobileMenuEvents() {
  // 汉堡菜单按钮点击事件
  $elements.mobileMenuToggle.on('click', function() {
    toggleMobileMenu();
  });
  
  // 遮罩层点击事件 - 关闭菜单
  $elements.mobileOverlay.on('click', function() {
    closeMobileMenu();
  });
  
  // 导航项点击后自动关闭移动端菜单
  $elements.navItems.on('click', function() {
    if (window.innerWidth <= 768) {
      closeMobileMenu();
    }
  });
  
  // 监听窗口大小变化
  $(window).on('resize', function() {
    if (window.innerWidth > 768) {
      closeMobileMenu();
    }
  });
  
  // ESC 键关闭移动端菜单
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape' && $elements.sidebar.hasClass('mobile-open')) {
      closeMobileMenu();
    }
  });
}

/**
 * 切换移动端菜单显示状态
 */
function toggleMobileMenu() {
  if ($elements.sidebar.hasClass('mobile-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

/**
 * 打开移动端菜单
 */
function openMobileMenu() {
  $elements.sidebar.addClass('mobile-open');
  $elements.mobileOverlay.addClass('active');
  
  // 防止背景滚动
  $('body').css('overflow', 'hidden');
  
  // 更新汉堡菜单图标
  $elements.mobileMenuToggle.find('i').removeClass('fa-bars').addClass('fa-times');
}

/**
 * 关闭移动端菜单
 */
function closeMobileMenu() {
  $elements.sidebar.removeClass('mobile-open');
  $elements.mobileOverlay.removeClass('active');
  
  // 恢复背景滚动
  $('body').css('overflow', '');
  
  // 恢复汉堡菜单图标
  $elements.mobileMenuToggle.find('i').removeClass('fa-times').addClass('fa-bars');
}

/**
 * 使用 jQuery 绑定键盘快捷键
 * 提供更好的键盘导航体验
 */
function bindKeyboardShortcuts() {
  $(document).on("keydown", function (e) {
    // Ctrl/Cmd + R: 刷新包信息
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault();
      loadPackages();
      showToast("正在刷新包信息...", "info");
    }

    // Ctrl/Cmd + Enter: 执行发布
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (AppState.activeTab === "publish") {
        handlePublish();
      }
    }

    // Escape: 关闭模态框
    if (e.key === "Escape") {
      // 检查哪个模态框是打开的并关闭它
      const $helpModal = $("#helpModal");
      if ($helpModal.length && $helpModal.hasClass("active")) {
        hideHelpModal();
      } else if (
        $elements.commandPreviewModal &&
        $elements.commandPreviewModal.hasClass("active")
      ) {
        hideCommandPreviewModal();
      } else if (
        $elements.commandModal &&
        $elements.commandModal.hasClass("active")
      ) {
        hideCommandModal();
      }
    }

    // Ctrl/Cmd + L: 清空日志
    if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      clearLogs();
      showToast("日志已清空", "success");
    }
  });
}

// ==================== 标签页管理 ====================

/**
 * 使用 jQuery 优化标签页切换
 * 添加平滑的过渡动画效果
 * @param {string} tabId - 标签页 ID
 */
function switchTab(tabId) {
  // 更新状态
  AppState.activeTab = tabId;

  // 更新导航样式 - 使用 jQuery 链式调用
  $elements.navItems
    .removeClass("active")
    .filter(`[data-tab="${tabId}"]`)
    .addClass("active");

  // 更新内容显示 - 添加淡入淡出效果
  $elements.tabContents.removeClass("active").fadeOut(150);

  $(`#${tabId}-tab`).addClass("active").fadeIn(200);

  // 标签页特定的初始化
  setTimeout(() => {
    switch (tabId) {
      case "packages":
        loadPackages();
        break;
      case "logs":
        scrollToBottom();
        break;
      case "publish":
        updatePublishButton();
        break;
    }
  }, 200);

  // 显示切换提示
  showToast(`已切换到${getTabDisplayName(tabId)}`, "info");
}

/**
 * 获取标签页显示名称
 * @param {string} tabId - 标签页 ID
 * @returns {string} 显示名称
 */
function getTabDisplayName(tabId) {
  const names = {
    publish: "发布管理",
    packages: "包管理",
    deploy: "部署管理",
    logs: "日志查看",
    settings: "设置",
  };
  return names[tabId] || tabId;
}

// ==================== 数据加载 ====================

/**
 * 加载项目信息
 */
async function loadProjectInfo() {
  try {
    showLoading("加载项目信息...");
    const response = await window.electronAPI.getProjectInfo();

    // 检查响应格式
    if (response && response.success && response.data) {
      AppState.projectInfo = response.data;
      updateProjectInfo(response.data);
    } else {
      throw new Error(response?.error || "获取项目信息失败");
    }
  } catch (error) {
    console.error("加载项目信息失败:", error);
    showError("加载项目信息失败: " + error.message);
  } finally {
    hideLoading();
  }
}

/**
 * 加载包信息
 */
async function loadPackages() {
  try {
    showLoading("加载包信息...");
    const response = await window.electronAPI.getPackages();

    // 检查响应格式
    if (response && response.success && response.data) {
      // 将对象转换为数组格式
      const packagesArray = Object.entries(response.data).map(([key, pkg]) => ({
        id: key,
        ...pkg,
      }));

      AppState.packages = packagesArray;
      updatePackageGrid(packagesArray);
      updatePackagesOverview(packagesArray);
    } else {
      throw new Error("获取包信息失败");
    }
  } catch (error) {
    console.error("加载包信息失败:", error);
    showError("加载包信息失败: " + error.message);
  } finally {
    hideLoading();
  }
}

/**
 * 加载应用设置
 */
async function loadSettings() {
  try {
    const response = await window.electronAPI.getSettings();
    if (response.success && response.data) {
      AppState.settings = { ...AppState.settings, ...response.data };
      updateSettingsUI();
      console.log("设置加载成功:", AppState.settings);
    } else {
      console.error("加载设置失败:", response.error);
    }
  } catch (error) {
    console.error("加载设置失败:", error);
  }
}

/**
 * 保存应用设置
 */
async function saveSettings() {
  try {
    const response = await window.electronAPI.saveSettings(AppState.settings);
    if (response.success) {
      console.log("设置保存成功:", AppState.settings);
    } else {
      console.error("保存设置失败:", response.error);
      showError("保存设置失败: " + response.error);
    }
  } catch (error) {
    console.error("保存设置失败:", error);
    showError("保存设置失败: " + error.message);
  }
}

/**
 * 重置应用设置到默认值
 */
async function resetSettings() {
  try {
    // 显示确认对话框
    const confirmed = confirm("确定要重置所有设置到默认值吗？此操作无法撤销。");
    if (!confirmed) {
      return;
    }

    // 调用主进程重置设置
    const response = await window.electronAPI.resetSettings();

    if (response.success && response.data) {
      // 使用主进程返回的默认设置
      AppState.settings = { ...AppState.settings, ...response.data };

      // 更新UI
      updateSettingsUI();

      // 应用主题
      applyTheme(AppState.settings.theme);

      showToast("设置已重置为默认值", "success");
      console.log("设置重置成功:", AppState.settings);
    } else {
      console.error("重置设置失败:", response.error);
      showError("重置设置失败: " + response.error);
    }
  } catch (error) {
    console.error("重置设置失败:", error);
    showError("重置设置失败: " + error.message);
  }
}

/**
 * 打开项目目录
 */
async function openProjectDirectory() {
  try {
    await window.electronAPI.openProjectDirectory();
    showToast("正在打开项目目录...", "info");
  } catch (error) {
    console.error("打开项目目录失败:", error);
    showError("打开项目目录失败: " + error.message);
  }
}

// ==================== UI 更新 ====================

/**
 * 初始化界面
 */
function initializeUI() {
  // 设置默认标签页
  switchTab("publish");

  // 应用主题
  applyTheme(AppState.settings.theme);

  // 更新发布选项
  updatePublishOptions();
}

/**
 * 使用 jQuery 优化项目信息显示
 * 动态创建项目信息HTML结构
 * @param {Object} projectInfo - 项目信息
 */
function updateProjectInfo(projectInfo) {
  const $projectInfoContainer = $("#projectInfo");

  if (!$projectInfoContainer.length) {
    console.error("项目信息容器未找到");
    return;
  }

  // 创建项目信息HTML结构
  const projectInfoHTML = `
     <div class="project-info-item">
       <div class="project-info-label">项目名称</div>
       <div class="project-info-value" id="projectName">${projectInfo.name || "N/A"}</div>
     </div>
     <div class="project-info-item">
       <div class="project-info-label">版本</div>
       <div class="project-info-value" id="projectVersion">${projectInfo.version || "N/A"}</div>
     </div>
     <div class="project-info-item">
       <div class="project-info-label">描述</div>
       <div class="project-info-value" id="projectDescription">${projectInfo.description || "N/A"}</div>
     </div>
     <div class="project-info-item">
       <div class="project-info-label">作者</div>
       <div class="project-info-value" id="projectAuthor">${projectInfo.author || "N/A"}</div>
     </div>
     <div class="project-info-item">
       <div class="project-info-label">许可证</div>
       <div class="project-info-value" id="projectLicense">${projectInfo.license || "N/A"}</div>
     </div>
     <div class="project-info-item">
       <div class="project-info-label">仓库</div>
       <div class="project-info-value" id="projectRepository">${projectInfo.repository || "N/A"}</div>
     </div>
   `;

  // 淡出现有内容，更新HTML，然后淡入
  $projectInfoContainer.fadeOut(200, function () {
    $(this).html(projectInfoHTML).fadeIn(300);

    // 重新缓存新创建的元素
    $elements.projectName = $("#projectName");
    $elements.projectVersion = $("#projectVersion");
    $elements.projectDescription = $("#projectDescription");
    $elements.projectAuthor = $("#projectAuthor");
    $elements.projectLicense = $("#projectLicense");
    $elements.projectRepository = $("#projectRepository");

    // 显示更新完成提示
    showToast("项目信息已更新", "success");
  });
}

/**
 * 使用 jQuery 优化包网格显示
 * 添加卡片加载动画效果
 * @param {Array} packages - 包列表
 */
function updatePackageGrid(packages) {
  if (!$elements.packageGrid.length) return;

  // 淡出现有内容
  $elements.packageGrid.fadeOut(200, function () {
    // 清空内容
    $(this).empty();

    if (packages.length === 0) {
      // 显示空状态
      $(this)
        .html(
          `
        <div class="empty-state">
          <i class="fas fa-box-open"></i>
          <h3>暂无包信息</h3>
          <p>点击刷新按钮重新加载包信息</p>
          <button class="btn btn-primary" onclick="loadPackages()">
            <i class="fas fa-refresh"></i>
            刷新
          </button>
        </div>
      `
        )
        .fadeIn(300);
      return;
    }

    // 创建包卡片并添加动画
    packages.forEach((pkg, index) => {
      const $card = createPackageCard(pkg);
      $card.hide().appendTo(this);

      // 延迟显示每个卡片，创建瀑布流效果
      setTimeout(() => {
        $card.fadeIn(300).addClass("animate-in");
      }, index * 100);
    });

    // 显示整个网格
    $(this).fadeIn(300);
  });
}

/**
 * 使用 jQuery 创建包卡片
 * 添加悬停效果和交互动画
 * @param {Object} pkg - 包信息
 * @returns {jQuery} 包卡片 jQuery 对象
 */
function createPackageCard(pkg) {
  const $card = $(`
    <div class="package-card" data-package-id="${pkg.id}">
      <div class="package-header">
        <span class="package-icon">${pkg.icon || "📦"}</span>
        <span class="package-name">${pkg.displayName || pkg.name}</span>
        <div class="package-actions">
          <button class="btn-icon" title="查看详情">
            <i class="fas fa-info-circle"></i>
          </button>
          <button class="btn-icon" title="快速选择">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
      <div class="package-description">${pkg.description || "暂无描述"}</div>
      <div class="package-path" title="${pkg.path}">${pkg.path}</div>
      <div class="package-status">
        <span class="status-indicator ${pkg.status || "unknown"}"></span>
        <span class="status-text">${getPackageStatusText(pkg.status)}</span>
      </div>
    </div>
  `);

  // 使用 jQuery 绑定事件
  $card
    .on("click", function (e) {
      if (!$(e.target).closest(".package-actions").length) {
        togglePackageSelection(pkg.id, $(this));
      }
    })
    .on("mouseenter", function () {
      $(this).addClass("hover").find(".package-actions").fadeIn(200);
    })
    .on("mouseleave", function () {
      $(this).removeClass("hover").find(".package-actions").fadeOut(200);
    })
    .on("dblclick", function () {
      // 双击打开包目录
      openPackageDirectory(pkg.path);
    });

  // 绑定操作按钮事件
  $card
    .find(".package-actions .btn-icon")
    .eq(0)
    .on("click", function (e) {
      e.stopPropagation();
      showPackageDetails(pkg);
    });

  $card
    .find(".package-actions .btn-icon")
    .eq(1)
    .on("click", function (e) {
      e.stopPropagation();
      togglePackageSelection(pkg.id, $card);
    });

  return $card;
}

/**
 * 获取包状态文本
 * @param {string} status - 包状态
 * @returns {string} 状态文本
 */
function getPackageStatusText(status) {
  const statusMap = {
    ready: "就绪",
    building: "构建中",
    error: "错误",
    published: "已发布",
    "needs-build": "需要构建",
    unknown: "未知",
  };
  return statusMap[status] || "未知";
}

/**
 * 获取包图标
 * @param {string} type - 包类型
 * @returns {string} 图标类名
 */
function getPackageIcon(type) {
  const icons = {
    main: "fas fa-cube",
    hooks: "fas fa-link",
    utils: "fas fa-tools",
    docs: "fas fa-book",
  };
  return icons[type] || "fas fa-package";
}

/**
 * 使用 jQuery 优化包选择状态切换
 * 添加选择动画效果和视觉反馈
 * @param {string} packageId - 包 ID
 * @param {jQuery} $card - 包卡片 jQuery 对象
 */
function togglePackageSelection(packageId, $card) {
  const isSelected = AppState.selectedPackages.has(packageId);

  if (isSelected) {
    // 取消选择
    AppState.selectedPackages.delete(packageId);
    $card
      .removeClass("selected")
      .find(".package-icon")
      .animate({ scale: 0.9 }, 100)
      .animate({ scale: 1 }, 100);

    showToast(`已取消选择 ${getPackageName(packageId)}`, "info");
  } else {
    // 选择包
    AppState.selectedPackages.add(packageId);
    $card
      .addClass("selected")
      .find(".package-icon")
      .animate({ scale: 1.2 }, 100)
      .animate({ scale: 1 }, 100);

    // 添加选择特效 - 使用 CSS 动画替代 jQuery UI effect
    $card.addClass("package-selected-animation");
    // 动画完成后移除类名，以便下次可以重新触发
    setTimeout(() => {
      $card.removeClass("package-selected-animation");
    }, 500);

    showToast(`已选择 ${getPackageName(packageId)}`, "success");
  }

  updatePublishButton();
  updateSelectionCounter();
}

/**
 * 获取包名称
 * @param {string} packageId - 包 ID
 * @returns {string} 包名称
 */
function getPackageName(packageId) {
  const pkg = AppState.packages.find(p => p.id === packageId);
  return pkg ? pkg.displayName || pkg.name : packageId;
}

/**
 * 更新选择计数器
 */
function updateSelectionCounter() {
  const count = AppState.selectedPackages.size;
  const $counter = $(".selection-counter");

  if (count > 0) {
    if ($counter.length === 0) {
      // 创建计数器
      $(
        '<div class="selection-counter" style="margin-bottom: 12px; padding: 8px 12px; background: var(--primary-color); color: white; border-radius: var(--radius-md); text-align: center; font-size: var(--font-size-sm);">'
      )
        .html(
          `<i class="fas fa-check-circle"></i> 已选择 <span class="count">${count}</span> 个包`
        )
        .prependTo($elements.packageGrid.parent())
        .hide()
        .slideDown(200);
    } else {
      // 更新计数器
      $counter.find(".count").text(count);
    }
  } else {
    // 隐藏计数器
    $counter.slideUp(200, function () {
      $(this).remove();
    });
  }
}

/**
 * 使用 jQuery 优化发布按钮状态更新
 * 添加按钮动画和状态指示
 */
function updatePublishButton() {
  const $publishBtn = $elements.publishBtn;
  if (!$publishBtn || !$publishBtn.length) return;

  const hasSelection = AppState.selectedPackages.size > 0;
  const count = AppState.selectedPackages.size;

  if (hasSelection) {
    // 启用发布按钮
    $publishBtn
      .prop("disabled", false)
      .removeClass("btn-disabled")
      .addClass("btn-primary")
      .html(`<i class="fas fa-rocket"></i> 发布选中的包 (${count})`)
      .addClass("btn-pulse-animation");

    // 动画完成后移除类名
    setTimeout(() => {
      $publishBtn.removeClass("btn-pulse-animation");
    }, 300);

    // 更新按钮提示
    $publishBtn.attr("title", `发布 ${count} 个选中的包`);
  } else {
    // 禁用发布按钮
    $publishBtn
      .prop("disabled", true)
      .removeClass("btn-primary")
      .addClass("btn-disabled")
      .html('<i class="fas fa-rocket"></i> 请选择要发布的包')
      .attr("title", "请先选择要发布的包");
  }

  // 更新发布选项面板状态
  updatePublishOptionsPanel(hasSelection);
}

/**
 * 更新发布选项面板状态
 * @param {boolean} hasSelection - 是否有选中的包
 */
function updatePublishOptionsPanel(hasSelection) {
  const $optionsPanel = $(".publish-options");

  if (hasSelection) {
    $optionsPanel
      .removeClass("disabled")
      .find("input, select")
      .prop("disabled", false);
  } else {
    $optionsPanel
      .addClass("disabled")
      .find("input, select")
      .prop("disabled", true);
  }
}

/**
 * 更新包概览显示
 * @param {Array} packages - 包列表
 */
function updatePackagesOverview(packages) {
  if (!$elements.packagesOverview || !$elements.packagesOverview.length) return;

  $elements.packagesOverview.empty();

  packages.forEach(pkg => {
    const card = createPackageOverviewCard(pkg);
    $elements.packagesOverview.append(card);
  });
}

/**
 * 创建包概览卡片
 * @param {Object} pkg - 包信息
 * @returns {HTMLElement} 包概览卡片元素
 */
function createPackageOverviewCard(pkg) {
  const card = document.createElement("div");
  card.className = "package-overview-card";

  card.innerHTML = `
    <div class="package-overview-header">
      <span class="package-overview-icon">${pkg.icon || "📦"}</span>
      <div class="package-overview-info">
        <h3>${pkg.displayName || pkg.name}</h3>
        <p>${pkg.description || "暂无描述"}</p>
      </div>
    </div>
    <div class="package-overview-details">
      <div class="package-detail">
        <div class="package-detail-label">包名</div>
        <div class="package-detail-value">${pkg.name}</div>
      </div>
      <div class="package-detail">
        <div class="package-detail-label">路径</div>
        <div class="package-detail-value">${pkg.path}</div>
      </div>
      <div class="package-detail">
        <div class="package-detail-label">构建命令</div>
        <div class="package-detail-value">${pkg.buildCommand || "N/A"}</div>
      </div>
    </div>
    <div class="package-overview-actions">
      <button class="btn btn-secondary btn-small" onclick="openPackageDirectory('${pkg.path}')">
        <i class="fas fa-folder-open"></i>
        打开目录
      </button>
      <button class="btn btn-primary btn-small" onclick="buildPackage('${pkg.id}')">
        <i class="fas fa-hammer"></i>
        构建
      </button>
    </div>
  `;

  return card;
}

/**
 * 更新发布选项
 */
function updatePublishOptions() {
  if ($elements.dryRunCheckbox && $elements.dryRunCheckbox.length) {
    $elements.dryRunCheckbox.prop("checked", AppState.publishOptions.dryRun);
  }
  if ($elements.syncVersionCheckbox && $elements.syncVersionCheckbox.length) {
    $elements.syncVersionCheckbox.prop(
      "checked",
      AppState.publishOptions.syncVersion
    );
  }
  if ($elements.skipDeployCheckbox && $elements.skipDeployCheckbox.length) {
    $elements.skipDeployCheckbox.prop(
      "checked",
      AppState.publishOptions.skipDeploy
    );
  }
  if ($elements.deployStrategySelect && $elements.deployStrategySelect.length) {
    $elements.deployStrategySelect.val(AppState.publishOptions.deployStrategy);
  }
}

/**
 * 更新设置界面
 */
function updateSettingsUI() {
  if ($elements.themeSelect && $elements.themeSelect.length) {
    $elements.themeSelect.val(AppState.settings.theme);
  }
  if ($elements.autoScrollCheckbox && $elements.autoScrollCheckbox.length) {
    $elements.autoScrollCheckbox.prop("checked", AppState.settings.autoScroll);
  }
  if (
    $elements.notificationsCheckbox &&
    $elements.notificationsCheckbox.length
  ) {
    $elements.notificationsCheckbox.prop(
      "checked",
      AppState.settings.notifications
    );
  }
  if ($elements.autoSaveCheckbox && $elements.autoSaveCheckbox.length) {
    $elements.autoSaveCheckbox.prop("checked", AppState.settings.autoSave);
  }
  if (
    $elements.defaultDryRunCheckbox &&
    $elements.defaultDryRunCheckbox.length
  ) {
    $elements.defaultDryRunCheckbox.prop(
      "checked",
      AppState.settings.defaultDryRun
    );
  }
}

// ==================== 发布管理 ====================

/**
 * 处理发布操作
 */
async function handlePublish() {
  if (AppState.selectedPackages.size === 0) {
    showError("请选择要发布的包");
    return;
  }

  try {
    // 构建命令
    const command = buildPublishCommand();

    // 显示命令预览
    showCommandModal("发布包", command);
  } catch (error) {
    console.error("构建发布命令失败:", error);
    showError("构建发布命令失败: " + error.message);
  }
}

/**
 * 构建发布命令
 * @returns {string} 发布命令
 */
function buildPublishCommand() {
  const args = ["node", "scripts/publish.js"];

  // 添加包参数
  const packages = Array.from(AppState.selectedPackages);
  if (packages.length === 1) {
    args.push("--package", packages[0]);
  } else {
    args.push("--packages", packages.join(","));
  }

  // 添加选项
  if (AppState.publishOptions.dryRun) {
    args.push("--dry-run");
  }

  if (AppState.publishOptions.syncVersion) {
    args.push("--sync-version");
  }

  if (AppState.publishOptions.skipDeploy) {
    args.push("--skip-deploy");
  } else if (AppState.publishOptions.deployStrategy !== "auto") {
    args.push("--deploy-strategy", AppState.publishOptions.deployStrategy);
  }

  return args.join(" ");
}

// ==================== 包管理 ====================

/**
 * 打开包目录
 * @param {string} packagePath - 包路径
 */
async function openPackageDirectory(packagePath) {
  try {
    await window.electronAPI.openDirectory(packagePath);
  } catch (error) {
    console.error("打开目录失败:", error);
    showError("打开目录失败: " + error.message);
  }
}

/**
 * 构建包
 * @param {string} packageId - 包 ID
 */
async function buildPackage(packageId) {
  try {
    const pkg = AppState.packages.find(p => p.id === packageId);
    if (!pkg || !pkg.buildCommand) {
      showError("包不存在或没有构建命令");
      return;
    }

    const command = `cd ${pkg.path} && ${pkg.buildCommand}`;
    showCommandModal(`构建 ${pkg.displayName}`, command);
  } catch (error) {
    console.error("构建包失败:", error);
    showError("构建包失败: " + error.message);
  }
}

// ==================== 日志管理 ====================

/**
 * 使用 jQuery 优化日志添加
 * 添加日志动画和类型图标
 * @param {string} type - 日志类型
 * @param {string} message - 日志消息
 */
function addLog(type, message) {
  const timestamp = formatDateToChinese(new Date());
  const logEntry = {
    timestamp,
    type,
    message,
  };

  AppState.logs.push(logEntry);

  // 使用 jQuery 添加日志条目
  const $logContainer = $elements.logContainer;
  if ($logContainer && $logContainer.length) {
    // 如果存在占位符，先隐藏它
    const $placeholder = $logContainer.find(".log-placeholder");
    if ($placeholder.length > 0) {
      $placeholder.fadeOut(200, function () {
        $(this).remove();
      });
    }

    const icon = getLogIcon(type);

    const $logEntry = $(`
      <div class="log-entry log-${type}">
        <span class="log-time">${timestamp}</span>
        <span class="log-icon">${icon}</span>
        <span class="log-message">${message}</span>
        <button class="log-copy-btn" title="复制日志">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    `);

    // 添加复制功能
    $logEntry.find(".log-copy-btn").on("click", function (e) {
      e.stopPropagation();
      copyToClipboard(`[${timestamp}] ${message}`);
      showToast("日志已复制到剪贴板", "success");
    });

    // 添加日志条目动画
    $logEntry.hide().appendTo($logContainer).slideDown(200).addClass("log-new");

    // 移除新日志标记
    setTimeout(() => {
      $logEntry.removeClass("log-new");
    }, 1000);

    // 限制日志数量
    const maxLogs = 1000;
    const $logs = $logContainer.children();
    if ($logs.length > maxLogs) {
      $logs.first().slideUp(200, function () {
        $(this).remove();
      });
    }
  }

  // 自动滚动
  if (AppState.settings.autoScroll) {
    scrollToBottom();
  }
}

/**
 * 获取日志类型图标
 * @param {string} type - 日志类型
 * @returns {string} 图标 HTML
 */
function getLogIcon(type) {
  const iconMap = {
    info: '<i class="fas fa-info-circle"></i>',
    success: '<i class="fas fa-check-circle"></i>',
    warning: '<i class="fas fa-exclamation-triangle"></i>',
    error: '<i class="fas fa-times-circle"></i>',
    debug: '<i class="fas fa-bug"></i>',
  };
  return iconMap[type] || iconMap["info"];
}

/**
 * 使用 jQuery 优化日志显示更新
 * 添加过渡动画和交互功能
 */
function updateLogDisplay() {
  const $logContainer = $elements.logContainer;
  if (!$logContainer || !$logContainer.length) return;

  // 淡出现有内容
  $logContainer.fadeOut(200, function () {
    // 清空现有内容
    $(this).empty();

    if (AppState.logs.length === 0) {
      // 显示空状态
      $(this)
        .html(
          `
        <div class="log-placeholder">
          <i class="fas fa-file-alt"></i>
          <h3>暂无日志</h3>
          <p>执行命令后日志将显示在这里</p>
        </div>
      `
        )
        .fadeIn(300);
      return;
    }

    // 添加日志条目
    AppState.logs.forEach((log, index) => {
      const icon = getLogIcon(log.type);
      const $entry = $(`
        <div class="log-entry log-${log.type}">
          <span class="log-time">${log.timestamp}</span>
          <span class="log-icon">${icon}</span>
          <span class="log-message">${log.message}</span>
          <button class="log-copy-btn" title="复制日志">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      `);

      // 添加复制功能
      $entry.find(".log-copy-btn").on("click", function (e) {
        e.stopPropagation();
        copyToClipboard(`[${log.timestamp}] ${log.message}`);
        showToast("日志已复制到剪贴板", "success");
      });

      // 添加悬停效果
      $entry
        .on("mouseenter", function () {
          $(this).addClass("log-hover");
        })
        .on("mouseleave", function () {
          $(this).removeClass("log-hover");
        });

      $entry.hide().appendTo(this);

      // 延迟显示每个日志条目，创建瀑布流效果
      setTimeout(() => {
        $entry.fadeIn(200);
      }, index * 50);
    });

    // 显示整个容器
    $(this).fadeIn(300);
  });
}

/**
 * 使用 jQuery 优化清空日志
 * 添加清空动画效果
 */
function clearLogs() {
  const $logContainer = $elements.logContainer;
  if (!$logContainer || !$logContainer.length) return;

  // 添加清空动画
  $logContainer.children(".log-entry").each(function (index) {
    const $entry = $(this);
    setTimeout(() => {
      $entry.fadeOut(100, function () {
        $(this).remove();
      });
    }, index * 20);
  });

  // 清空状态数据
  setTimeout(
    () => {
      AppState.logs = [];

      // 显示空状态
      $logContainer
        .html(
          `
      <div class="log-placeholder">
        <i class="fas fa-file-alt"></i>
        <h3>日志已清空</h3>
        <p>执行命令后日志将显示在这里</p>
      </div>
    `
        )
        .hide()
        .fadeIn(300);

      showToast("日志已清空", "success");
    },
    $logContainer.children(".log-entry").length * 20 + 200
  );
}

/**
 * 异步清空日志，返回 Promise
 */
function clearLogsAsync() {
  return new Promise(resolve => {
    const $logContainer = $elements.logContainer;
    if (!$logContainer || !$logContainer.length) {
      resolve();
      return;
    }

    const $entries = $logContainer.children(".log-entry");
    if ($entries.length === 0) {
      AppState.logs = [];
      resolve();
      return;
    }

    // 添加清空动画
    $entries.each(function (index) {
      const $entry = $(this);
      setTimeout(() => {
        $entry.fadeOut(100, function () {
          $(this).remove();
        });
      }, index * 20);
    });

    // 清空状态数据并解析 Promise
    setTimeout(
      () => {
        AppState.logs = [];

        // 清空容器，准备接收新日志
        $logContainer.empty();

        resolve();
      },
      $entries.length * 20 + 200
    );
  });
}

/**
 * 使用 jQuery 优化日志导出
 * 添加导出进度提示
 */
async function exportLogs() {
  if (AppState.logs.length === 0) {
    showToast("暂无日志可导出", "warning");
    return;
  }

  try {
    // 显示导出进度
    const $exportBtn = $elements.exportLogsBtn;
    const originalText = $exportBtn.html();

    $exportBtn
      .prop("disabled", true)
      .html('<i class="fas fa-spinner fa-spin"></i> 导出中...');

    const content = AppState.logs
      .map(
        log => `[${log.timestamp}] [${log.type.toUpperCase()}] ${log.message}`
      )
      .join("\n");

    await window.electronAPI.exportLogs(content);

    // 成功反馈
    $exportBtn.html('<i class="fas fa-check"></i> 导出成功');
    showToast(`成功导出 ${AppState.logs.length} 条日志`, "success");

    // 恢复按钮状态
    setTimeout(() => {
      $exportBtn.prop("disabled", false).html(originalText);
    }, 2000);
  } catch (error) {
    console.error("导出日志失败:", error);
    showError("导出日志失败: " + error.message);

    // 恢复按钮状态
    const $exportBtn = $elements.exportLogsBtn;
    const originalText = '<i class="fas fa-download"></i> 导出日志';

    $exportBtn.prop("disabled", false).html(originalText);
  }
}

// ==================== 命令执行 ====================

/**
 * 使用 jQuery 优化命令模态框显示
 * 添加淡入动画和键盘支持
 * @param {string} title - 标题
 * @param {string} command - 命令
 */
function showCommandModal(title, command) {
  const $modal = $elements.commandModal;
  const $preview = $elements.commandPreview;

  if (!$modal || !$modal.length) return;

  // 设置标题
  const $titleElement = $modal.find(".modal-header h3");
  if ($titleElement.length) {
    $titleElement.text(title);
  }

  // 设置命令预览
  if ($preview && $preview.length) {
    $preview.text(command);
  }

  // 存储命令
  $modal.data("command", command);

  // 控制执行按钮的显示/隐藏
  const $executeBtn = $modal.find("#executeFromPreviewBtn");
  if ($executeBtn.length) {
    if (showExecuteButton) {
      $executeBtn.show();
    } else {
      $executeBtn.hide();
    }
  }

  // 显示模态框动画
  $modal
    .addClass("active")
    .hide()
    .fadeIn(300)
    .find(".modal-content")
    .css("transform", "scale(0.8)")
    .animate(
      {
        scale: 1,
      },
      200
    );

  // 聚焦到取消按钮
  setTimeout(() => {
    $elements.cancelCommandBtn.focus();
  }, 300);

  // 添加键盘事件监听
  $(document).on("keydown.modal", function (e) {
    if (e.key === "Escape") {
      hideCommandModal();
    } else if (e.key === "Enter" && e.ctrlKey) {
      executeCommand();
    }
  });
}

/**
 * 使用 jQuery 优化命令模态框隐藏
 * 添加淡出动画
 */
function hideCommandModal() {
  const $modal = $elements.commandModal;

  if (!$modal || !$modal.length) return;

  // 隐藏模态框动画
  $modal
    .find(".modal-content")
    .animate(
      {
        scale: 0.8,
      },
      200
    )
    .end()
    .fadeOut(300, function () {
      $(this).removeClass("active");
    });

  // 清除存储的命令
  $modal.removeData("command");

  // 移除键盘事件监听
  $(document).off("keydown.modal");
}

/**
 * 执行命令
 */
async function executeCommand() {
  const command =
    $elements.commandModal && $elements.commandModal.length
      ? $elements.commandModal.data("command")
      : null;
  if (!command) return;

  try {
    // 隐藏模态框
    hideCommandModal();

    // 显示日志执行状态指示器
    showLogExecutionStatus("执行命令中...");
    updateStatus("running", "执行中...");

    // 切换到日志标签页
    switchTab("logs");

    // 清空日志并等待完成
    await clearLogsAsync();

    // 添加开始执行日志
    addLog("info", `开始执行: ${command}`);

    // 执行命令
    const result = await window.electronAPI.executeCommand(command);
    AppState.currentProcess = result.processId;
  } catch (error) {
    console.error("执行命令失败:", error);
    showError("执行命令失败: " + error.message);
    updateStatus("error", "执行失败");
    hideLogExecutionStatus();
  }
}

/**
 * 显示命令预览模态框
 * @param {string} title - 标题
 * @param {string} command - 命令
 * @param {boolean} showExecuteButton - 是否显示执行按钮，默认为true
 */
function showCommandPreviewModal(title, command, showExecuteButton = true) {
  const $modal = $elements.commandPreviewModal;
  const $preview = $elements.commandPreviewContent;

  if (!$modal || !$modal.length) return;

  // 设置标题
  const $titleElement = $modal.find(".modal-header h3");
  if ($titleElement.length) {
    $titleElement.text(title);
  }

  // 设置命令预览内容
  if ($preview && $preview.length) {
    $preview.html(`<pre><code>${command}</code></pre>`);
  }

  // 存储命令
  $modal.data("command", command);

  // 控制执行按钮的显示
  const $executeButton = $modal.find("#executeFromPreviewBtn");
  if ($executeButton.length) {
    if (showExecuteButton) {
      $executeButton.show();
    } else {
      $executeButton.hide();
    }
  }

  // 显示模态框动画
  $modal
    .addClass("active")
    .hide()
    .fadeIn(300)
    .find(".modal-content")
    .css("transform", "scale(0.8)")
    .animate(
      {
        scale: 1,
      },
      200
    );

  // 添加键盘事件监听
  $(document).on("keydown.previewModal", function (e) {
    if (e.key === "Escape") {
      hideCommandPreviewModal();
    }
  });
}

/**
 * 隐藏命令预览模态框
 */
function hideCommandPreviewModal() {
  const $modal = $elements.commandPreviewModal;

  if (!$modal || !$modal.length) return;

  // 隐藏模态框动画
  $modal
    .find(".modal-content")
    .animate(
      {
        scale: 0.8,
      },
      200
    )
    .end()
    .fadeOut(300, function () {
      $(this).removeClass("active");
    });

  // 清除存储的命令
  $modal.removeData("command");

  // 移除键盘事件监听
  $(document).off("keydown.previewModal");
}

/**
 * 从预览模态框复制命令
 */
function copyCommandFromPreview() {
  const command =
    $elements.commandPreviewModal && $elements.commandPreviewModal.length
      ? $elements.commandPreviewModal.data("command")
      : null;

  if (!command) return;

  // 复制到剪贴板
  navigator.clipboard
    .writeText(command)
    .then(() => {
      showToast("命令已复制到剪贴板", "success");
    })
    .catch(err => {
      console.error("复制失败:", err);
      showError("复制命令失败");
    });
}

/**
 * 从预览模态框执行命令
 */
async function executeCommandFromPreview() {
  const command =
    $elements.commandPreviewModal && $elements.commandPreviewModal.length
      ? $elements.commandPreviewModal.data("command")
      : null;

  if (!command) return;

  try {
    // 隐藏预览模态框
    hideCommandPreviewModal();

    // 显示日志执行状态指示器
    showLogExecutionStatus("执行命令中...");
    updateStatus("running", "执行中...");

    // 切换到日志标签页
    switchTab("logs");

    // 清空日志并等待完成
    await clearLogsAsync();

    // 添加开始执行日志
    addLog("info", `开始执行: ${command}`);

    // 执行命令
    const result = await window.electronAPI.executeCommand(command);
    AppState.currentProcess = result.processId;
  } catch (error) {
    console.error("执行命令失败:", error);
    showError("执行命令失败: " + error.message);
    updateStatus("error", "执行失败");
    hideLogExecutionStatus();
  }
}

/**
 * 处理进程状态变化
 * @param {Object} status - 进程状态
 */
function handleProcessStatus(status) {
  console.log("收到进程状态:", status);

  switch (status.status) {
    case "running":
      updateStatus("running", status.message || "执行中...");
      addLog("info", status.message || "进程已启动");
      break;

    case "completed":
      AppState.currentProcess = null;
      hideLogExecutionStatus();
      if ((status.code || 0) === 0) {
        updateStatus("success", "执行成功");
        addLog("success", status.message || "命令执行完成");
        showToast("命令执行成功！", "success");
        if (AppState.settings.notifications) {
          showNotification("执行完成", "命令执行成功");
        }
      } else {
        updateStatus("error", `执行失败 (退出码: ${exitCode})`);
        addLog("error", `进程执行失败，退出码: ${exitCode}`);
        showToast(`命令执行失败，退出码: ${exitCode}`, "error");
        if (AppState.settings.notifications) {
          showNotification("执行失败", `命令执行失败，退出码: ${exitCode}`);
        }
      }
      break;

    case "failed":
      AppState.currentProcess = null;
      hideLogExecutionStatus();
      updateStatus("error", `执行失败 (退出码: ${status.code ?? 1})`);
      addLog(
        "error",
        status.message || `进程执行失败，退出码: ${status.code ?? 1}`
      );
      showToast(status.message || "命令执行失败", "error");
      if (AppState.settings.notifications) {
        showNotification("执行失败", status.message || "命令执行失败");
      }
      break;

    default:
      console.warn("未知的进程状态:", status);
      break;
  }
}

// ==================== 主题管理 ====================

/**
 * 更改主题
 * @param {string} theme - 主题名称
 */
function changeTheme(theme) {
  AppState.settings.theme = theme;
  applyTheme(theme);
  // 不立即保存，等待用户点击保存按钮
}

/**
 * 应用主题
 * @param {string} theme - 主题名称
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

// ==================== 帮助功能 ====================

/**
 * 显示帮助模态框
 */
function showHelpModal() {
  const $helpModal = $("#helpModal");

  if (!$helpModal.length) {
    console.error("帮助模态框元素未找到");
    return;
  }

  // 绑定关闭事件（使用 off 先解绑避免重复绑定）
  $helpModal
    .find(".modal-close")
    .off("click.helpModal")
    .on("click.helpModal", function () {
      hideHelpModal($helpModal);
    });

  $helpModal
    .find("#closeHelpModalBtn")
    .off("click.helpModal")
    .on("click.helpModal", function () {
      hideHelpModal($helpModal);
    });

  // 点击背景关闭
  $helpModal.off("click.helpModal").on("click.helpModal", function (e) {
    if (e.target === this) {
      hideHelpModal($helpModal);
    }
  });

  // 显示模态框
  $helpModal
    .addClass("active")
    .hide()
    .fadeIn(300)
    .find(".modal-content")
    .css("transform", "scale(0.8)")
    .animate({ scale: 1 }, 200);
}

/**
 * 隐藏帮助模态框
 * @param {jQuery} $modal - 模态框元素
 */
function hideHelpModal($modal) {
  if ($modal && $modal.length) {
    $modal
      .find(".modal-content")
      .animate({ scale: 0.8 }, 200)
      .end()
      .fadeOut(300, function () {
        $(this).removeClass("active");
        // 解绑事件避免内存泄漏
        $(this).off(".helpModal");
      });
  } else {
    // 如果没有传入模态框参数，查找现有的帮助模态框
    const $existingModal = $("#helpModal");
    if ($existingModal.length) {
      $existingModal
        .find(".modal-content")
        .animate({ scale: 0.8 }, 200)
        .end()
        .fadeOut(300, function () {
          $(this).removeClass("active");
          $(this).off(".helpModal");
        });
    }
  }
}

// ==================== 工具函数 ====================

/**
 * 使用 jQuery 显示全局加载状态
 * 添加加载动画和遮罩层
 * @param {string} text - 加载文本
 */
function showLoading(text = "加载中...") {
  const $loadingOverlay = $elements.loadingOverlay;
  const $loadingText = $elements.loadingText;

  if ($loadingOverlay && $loadingOverlay.length) {
    $loadingOverlay.addClass("active").fadeIn(300);
  }

  if ($loadingText && $loadingText.length) {
    $loadingText.text(text);
  }
}

/**
 * 显示日志执行状态指示器
 * @param {string} text - 状态文本
 */
function showLogExecutionStatus(text = "执行中...") {
  const $indicator = $elements.logStatusIndicator;
  const $textElement = $indicator.find(".executing-text");

  if ($indicator && $indicator.length) {
    if ($textElement.length) {
      $textElement.text(text);
    }
    $indicator.fadeIn(300);
  }
}

/**
 * 隐藏日志执行状态指示器
 */
function hideLogExecutionStatus() {
  const $indicator = $elements.logStatusIndicator;

  if ($indicator && $indicator.length) {
    $indicator.fadeOut(300);
  }
}

/**
 * 使用 jQuery 隐藏全局加载状态
 * 添加淡出动画
 */
function hideLoading() {
  const $loadingOverlay = $elements.loadingOverlay;

  if ($loadingOverlay && $loadingOverlay.length) {
    $loadingOverlay.fadeOut(300, function () {
      $(this).removeClass("active");
    });
  }
}

/**
 * 使用 jQuery 优化状态栏更新
 * 添加状态变化动画和视觉反馈
 * @param {string} type - 状态类型
 * @param {string} text - 状态文本
 */
function updateStatus(type, text) {
  const $statusIndicator = $elements.statusIndicator;
  const $statusText = $elements.statusText;

  if ($statusIndicator && $statusIndicator.length) {
    $statusIndicator
      .removeClass()
      .addClass(`status-indicator ${type}`)
      .addClass("status-pulse-animation");

    // 动画完成后移除类名
    setTimeout(() => {
      $statusIndicator.removeClass("status-pulse-animation");
    }, 300);
  }

  if ($statusText && $statusText.length) {
    $statusText
      .fadeOut(150)
      .queue(function () {
        $(this).text(text).dequeue();
      })
      .fadeIn(150);
  }

  // 自动清除非错误状态
  if (type !== "error" && type !== "running") {
    setTimeout(() => {
      if ($statusText && $statusText.length) {
        $statusText.fadeOut(150, function () {
          $(this).text("就绪").fadeIn(150);
        });
      }
      if ($statusIndicator && $statusIndicator.length) {
        $statusIndicator.removeClass().addClass("status-indicator ready");
      }
    }, 3000);
  }
}

/**
 * 使用 jQuery 平滑滚动到底部
 * 添加滚动动画效果
 * @param {jQuery|HTMLElement} element - 要滚动的元素（可选，默认为日志容器）
 */
function scrollToBottom(element) {
  let $target;

  if (element) {
    $target = $(element);
  } else {
    $target = $elements.logContainer;
  }

  if ($target && $target.length) {
    $target.animate(
      {
        scrollTop: $target[0].scrollHeight,
      },
      300,
      "swing"
    );
  }
}

/**
 * 使用 jQuery 显示错误消息
 * 添加错误提示动画和多种反馈方式
 * @param {string} message - 错误消息
 */
function showError(message) {
  console.error(message);
  addLog("error", message);
  showToast(message, "error");
  updateStatus("error", message);

  if (AppState.settings.notifications) {
    showNotification("错误", message, "error");
  }
}

/**
 * 使用 jQuery 显示成功消息
 * 添加成功提示动画和多种反馈方式
 * @param {string} message - 成功消息
 */
function showSuccess(message) {
  console.log(message);
  addLog("success", message);
  showToast(message, "success");
  updateStatus("success", message);

  if (AppState.settings.notifications) {
    showNotification("成功", message, "success");
  }
}

/**
 * 显示系统通知
 * @param {string} title - 通知标题
 * @param {string} message - 通知消息
 * @param {string} type - 通知类型
 */
function showNotification(title, message, type = "info") {
  if ("Notification" in window && Notification.permission === "granted") {
    // 创建简单的 SVG 图标作为 data URL，避免文件路径问题
    const getIconDataUrl = notificationType => {
      const iconMap = {
        success:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMyOGE3NDUiLz4KPHBhdGggZD0ibTkgMTIgMiAyIDQtNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        error:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNkYzM1NDUiLz4KPHBhdGggZD0ibTggOCA4IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Im0xNiA4LTggOCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+",
        warning:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNmZmMxMDciLz4KPHBhdGggZD0iTTEyIDh2NCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0ibTEyIDE2IC4wMSAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=",
        info: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMwNmI2ZDQiLz4KPHBhdGggZD0iTTEyIDEydjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Im0xMiA4IC4wMSAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=",
      };
      return iconMap[notificationType] || iconMap["info"];
    };

    const notificationOptions = {
      body: message,
      icon: getIconDataUrl(type),
    };

    new Notification(title, notificationOptions);
  }
}

/**
 * 使用 jQuery 显示 Toast 提示
 * 创建美观的提示框动画
 * @param {string} message - 提示消息
 * @param {string} type - 提示类型 (success, error, warning, info)
 * @param {number} duration - 显示时长（毫秒）
 */
function showToast(message, type = "info", duration = 3000) {
  // 创建 toast 容器（如果不存在）
  let $toastContainer = $(".toast-container");
  if ($toastContainer.length === 0) {
    $toastContainer = $('<div class="toast-container">').appendTo("body");
  }

  // 获取图标
  const iconMap = {
    success: "fas fa-check-circle",
    error: "fas fa-times-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };

  const icon = iconMap[type] || iconMap["info"];

  // 创建 toast 元素
  const $toast = $(`
    <div class="toast toast-${type}">
      <div class="toast-icon">
        <i class="${icon}"></i>
      </div>
      <div class="toast-message">${message}</div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `);

  // 存储自动移除的定时器ID
  const autoRemoveTimer = null;

  // 绑定关闭事件
  $toast.find(".toast-close").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // 清除自动移除定时器
    if (autoRemoveTimer) {
      clearTimeout(autoRemoveTimer);
    }

    // 停止所有动画队列并立即移除
    $toast.stop(true, false);
    removeToast($toast);
  });

  // 添加到容器并显示动画
  $toast.appendTo($toastContainer).hide().slideDown(300);

  // 设置自动移除定时器
  setTimeout(() => {
    // 检查元素是否仍然存在（可能已被手动关闭）
    if ($toast.length && $toast.parent().length) {
      removeToast($toast);
    }
  }, duration);

  // 将定时器ID存储到元素上，以便在手动关闭时清除
  $toast.data("autoRemoveTimer", autoRemoveTimer);
}

/**
 * 移除 Toast 提示
 * @param {jQuery} $toast - Toast 元素
 */
function removeToast($toast) {
  // 清除可能存在的自动移除定时器
  const autoRemoveTimer = $toast.data("autoRemoveTimer");
  if (autoRemoveTimer) {
    clearTimeout(autoRemoveTimer);
    $toast.removeData("autoRemoveTimer");
  }

  // 停止所有动画并移除
  $toast.stop(true, false).slideUp(300, function () {
    $(this).remove();

    // 如果容器为空，移除容器
    const $container = $(".toast-container");
    if ($container.children().length === 0) {
      $container.remove();
    }
  });
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 */
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    // 使用现代 Clipboard API
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("文本已复制到剪贴板");
      })
      .catch(err => {
        console.error("复制失败:", err);
        fallbackCopyTextToClipboard(text);
      });
  } else {
    // 降级方案
    fallbackCopyTextToClipboard(text);
  }
}

/**
 * 降级复制方案
 * @param {string} text - 要复制的文本
 */
function fallbackCopyTextToClipboard(text) {
  const $textArea = $("<textarea>");
  $textArea.val(text);
  $("body").append($textArea);
  $textArea[0].focus();
  $textArea[0].select();

  try {
    document.execCommand("copy");
    console.log("文本已复制到剪贴板（降级方案）");
  } catch (err) {
    console.error("复制失败:", err);
  }

  $textArea.remove();
}

/**
 * 显示包详情模态框
 * @param {Object} pkg - 包信息
 */
function showPackageDetails(pkg) {
  // 创建详情模态框
  const $detailModal = $(`
    <div class="modal package-detail-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3><i class="fas fa-info-circle"></i> 包详情</h3>
          <button class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="package-detail-grid">
            <div class="detail-item">
              <label>包名:</label>
              <span>${pkg.displayName || pkg.name}</span>
            </div>
            <div class="detail-item">
              <label>路径:</label>
              <span class="path-text" title="${pkg.path}">${pkg.path}</span>
            </div>
            <div class="detail-item">
              <label>描述:</label>
              <span>${pkg.description || "暂无描述"}</span>
            </div>
            <div class="detail-item">
              <label>版本:</label>
              <span>${pkg.version || "未知"}</span>
            </div>
            <div class="detail-item">
              <label>状态:</label>
              <span class="status-badge status-${pkg.status || "unknown"}">
                ${getPackageStatusText(pkg.status)}
              </span>
            </div>
            <div class="detail-item">
              <label>最后更新:</label>
              <span>${pkg.lastModified || "未知"}</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary modal-close">
            <i class="fas fa-times"></i> 关闭
          </button>
          <button class="btn btn-primary open-directory" data-path="${pkg.path}">
            <i class="fas fa-folder-open"></i> 打开目录
          </button>
          <button class="btn btn-success toggle-selection" data-package-id="${pkg.id}">
            <i class="fas fa-check"></i> 
            ${AppState.selectedPackages.has(pkg.id) ? "取消选择" : "选择包"}
          </button>
        </div>
      </div>
    </div>
  `);

  // 绑定事件
  $detailModal.find(".modal-close").on("click", function () {
    hidePackageDetails($detailModal);
  });

  $detailModal.find(".open-directory").on("click", function () {
    const path = $(this).data("path");
    openPackageDirectory(path);
  });

  $detailModal.find(".toggle-selection").on("click", function () {
    const packageId = $(this).data("package-id");
    const $packageCard = $(`.package-card[data-package-id="${packageId}"]`);
    togglePackageSelection(packageId, $packageCard);
    hidePackageDetails($detailModal);
  });

  // 点击背景关闭
  $detailModal.on("click", function (e) {
    if (e.target === this) {
      hidePackageDetails($detailModal);
    }
  });

  // 显示模态框
  $detailModal
    .appendTo("body")
    .hide()
    .fadeIn(300)
    .find(".modal-content")
    .css("transform", "scale(0.8)")
    .animate({ scale: 1 }, 200);
}

/**
 * 隐藏包详情模态框
 * @param {jQuery} $modal - 模态框元素
 */
function hidePackageDetails($modal) {
  $modal
    .find(".modal-content")
    .animate({ scale: 0.8 }, 200)
    .end()
    .fadeOut(300, function () {
      $(this).remove();
    });
}

/**
 * 批量选择操作
 */
function initializeBatchOperations() {
  // 添加批量操作工具栏
  const $batchToolbar = $(`
    <div class="batch-toolbar" style="margin-bottom: 16px; padding: 12px; background: var(--bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
      <div class="batch-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn btn-small btn-secondary" id="selectAll">
          <i class="fas fa-check-square"></i> 全选
        </button>
        <button class="btn btn-small btn-secondary" id="selectNone">
          <i class="fas fa-square"></i> 全不选
        </button>
        <button class="btn btn-small btn-secondary" id="selectInvert">
          <i class="fas fa-exchange-alt"></i> 反选
        </button>
        <button class="btn btn-small btn-info" id="refreshAll">
          <i class="fas fa-sync"></i> 刷新全部
        </button>
      </div>
    </div>
  `);

  // 插入到包网格前面
  $elements.packageGrid.before($batchToolbar);

  // 绑定批量操作事件
  $("#selectAll").on("click", function () {
    $(".package-card").each(function () {
      const packageId = $(this).data("package-id");
      if (!AppState.selectedPackages.has(packageId)) {
        togglePackageSelection(packageId, $(this));
      }
    });
    showToast("已全选所有包", "success");
  });

  $("#selectNone").on("click", function () {
    $(".package-card.selected").each(function () {
      const packageId = $(this).data("package-id");
      togglePackageSelection(packageId, $(this));
    });
    showToast("已取消选择所有包", "info");
  });

  $("#selectInvert").on("click", function () {
    $(".package-card").each(function () {
      const packageId = $(this).data("package-id");
      togglePackageSelection(packageId, $(this));
    });
    showToast("已反选所有包", "info");
  });

  $("#refreshAll").on("click", function () {
    const $btn = $(this);
    const originalText = $btn.html();

    $btn
      .prop("disabled", true)
      .html('<i class="fas fa-spinner fa-spin"></i> 刷新中...');

    // 刷新包信息
    loadPackages()
      .then(() => {
        $btn.prop("disabled", false).html(originalText);
        showToast("包信息已刷新", "success");
      })
      .catch(error => {
        $btn.prop("disabled", false).html(originalText);
        showError("刷新失败: " + error.message);
      });
  });
}

// ==================== 应用启动 ====================

/**
 * 等待 electronAPI 准备就绪
 */
function waitForElectronAPI() {
  return new Promise(resolve => {
    if (window.electronAPI) {
      resolve();
    } else {
      // 如果 electronAPI 还没准备好，等待一段时间后重试
      const checkAPI = () => {
        if (window.electronAPI) {
          resolve();
        } else {
          setTimeout(checkAPI, 100);
        }
      };
      checkAPI();
    }
  });
}

// 等待 DOM 加载完成后初始化应用
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 请求通知权限
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // 等待 electronAPI 准备就绪
    await waitForElectronAPI();

    // 初始化应用
    initializeApp();
  } catch (error) {
    console.error("应用启动失败:", error);
    showError("应用启动失败: " + error.message);
  }
});

// 导出全局函数供 HTML 调用
window.openPackageDirectory = openPackageDirectory;
window.buildPackage = buildPackage;
window.showCommandModal = showCommandModal;
window.hideCommandModal = hideCommandModal;
window.executeCommand = executeCommand;
window.changeTheme = changeTheme;
window.clearLogs = clearLogs;
window.exportLogs = exportLogs;
