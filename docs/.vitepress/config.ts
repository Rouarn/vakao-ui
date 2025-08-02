import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Vakao UI",
  description: "基于 Vue 3 和 TypeScript 的现代化组件库",
  base: "/vakao-ui/", // GitHub Pages 部署路径

  // 网站图标配置
  head: [
    ["link", { rel: "icon", href: "/vakao-ui/logo.svg" }],
    ["link", { rel: "apple-touch-icon", href: "/vakao-ui/logo.svg" }],
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      { text: "组件", link: "/components/" },
      { text: "Hooks", link: "/hooks/" },
      { text: "工具", link: "/utils/" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "基础",
          items: [
            { text: "介绍", link: "/guide/" },
            { text: "快速开始", link: "/guide/getting-started" },
            { text: "安装", link: "/guide/installation" },
          ],
        },
        {
          text: "进阶",
          items: [
            { text: "使用指南", link: "/guide/usage" },
            { text: "主题定制", link: "/guide/theming" },
            { text: "使用示例", link: "/guide/examples" },
          ],
        },
        {
          text: "其他",
          items: [{ text: "更新日志", link: "/guide/changelog" }],
        },
      ],
      "/components/": [
        {
          text: "组件总览",
          items: [{ text: "组件介绍", link: "/components/" }],
        },
        {
          text: "基础组件",
          items: [
            { text: "Button 按钮", link: "/components/button" },
            { text: "Icon 图标", link: "/components/icon" },
          ],
        },
        {
          text: "表单组件",
          items: [
            { text: "Input 输入框", link: "/components/input" },
            { text: "Select 选择器", link: "/components/select" },
            { text: "Checkbox 多选框", link: "/components/checkbox" },
            { text: "Radio 单选框", link: "/components/radio" },
            { text: "Switch 开关", link: "/components/switch" },
          ],
        },
        {
          text: "反馈组件",
          items: [{ text: "MessageBox 消息弹框", link: "/components/message-box" }],
        },
      ],
      "/hooks/": [
        {
          text: "Hooks 总览",
          items: [{ text: "Hooks 介绍", link: "/hooks/" }],
        },
        {
          text: "状态管理",
          items: [
            { text: "useToggle", link: "/hooks/use-toggle" },
            { text: "useCounter", link: "/hooks/use-counter" },
            { text: "useBoolean", link: "/hooks/use-boolean" },
            { text: "useArray", link: "/hooks/use-array" },
            { text: "useLocalStorage", link: "/hooks/use-local-storage" },
          ],
        },
        {
          text: "性能优化",
          items: [
            { text: "useDebounce", link: "/hooks/use-debounce" },
            { text: "useThrottle", link: "/hooks/use-throttle" },
          ],
        },
        {
          text: "数据获取",
          items: [
            { text: "useFetch", link: "/hooks/use-fetch" },
            { text: "useAsync", link: "/hooks/use-async" },
          ],
        },
        {
          text: "DOM 操作",
          items: [
            { text: "useClickOutside", link: "/hooks/use-click-outside" },
            { text: "useEventListener", link: "/hooks/use-event-listener" },
            { text: "useWindowSize", link: "/hooks/use-window-size" },
            { text: "useFullscreen", link: "/hooks/use-fullscreen" },
          ],
        },
        {
          text: "用户交互",
          items: [
            { text: "useHover", link: "/hooks/use-hover" },
            { text: "useKeyPress", link: "/hooks/use-key-press" },
            { text: "useDrag", link: "/hooks/use-drag" },
            { text: "useMouse", link: "/hooks/use-mouse" },
          ],
        },
        {
          text: "系统功能",
          items: [
            { text: "useClipboard", link: "/hooks/use-clipboard" },
            { text: "usePagination", link: "/hooks/use-pagination" },
          ],
        },
      ],
      "/utils/": [
        {
          text: "工具函数",
          items: [{ text: "工具介绍", link: "/utils/" }],
        },
        {
          text: "组件工具",
          items: [
            { text: "withInstall 组件安装", link: "/utils/withInstall" },
            { text: "useNamespace 命名空间", link: "/utils/namespace" },
            { text: "useControlled 受控组件", link: "/utils/controlled" },
          ],
        },
        {
          text: "类型工具",
          items: [
            { text: "typeTool 类型工具", link: "/utils/typeTool" },
            { text: "typeGuards 类型守卫", link: "/utils/typeGuards" },
          ],
        },
        {
          text: "数据处理",
          items: [
            { text: "deepClone 深拷贝", link: "/utils/deepClone" },
            { text: "isEqual 相等判断", link: "/utils/isEqual" },
            { text: "array 数组工具", link: "/utils/array" },
            { text: "object 对象工具", link: "/utils/object" },
            { text: "string 字符串工具", link: "/utils/string" },
            { text: "math 数学工具", link: "/utils/math" },
            { text: "function 函数工具", link: "/utils/function" },
            { text: "misc 其他工具", link: "/utils/misc" },
          ],
        },
        {
          text: "日期处理",
          items: [{ text: "formatDate 日期格式化", link: "/utils/formatDate" }],
        },
        {
          text: "URL 处理",
          items: [{ text: "isUrl URL 验证", link: "/utils/url" }],
        },
        {
          text: "DOM 操作",
          items: [{ text: "dom DOM 工具", link: "/utils/dom" }],
        },
      ],
    },
    socialLinks: [{ icon: "github", link: "https://github.com/Rouarn/vakao-ui" }],
    footer: {
      message: "基于 MIT 协议发布",
      copyright: "Copyright © 2025-present Vakao UI",
    },
  },
});
