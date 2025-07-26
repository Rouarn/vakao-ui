import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

// 导入组件库
import VakaoUI from "@vakao-ui/components";
// 导入文档专用样式（不包含全局重置，避免与 VitePress 冲突）
import "../../../packages/styles/docs.scss";
// 导入自定义样式
import "./custom.css";

// 导入演示组件
import Demo from "../components/Demo.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册组件库
    app.use(VakaoUI);

    // 注册演示组件
    app.component("Demo", Demo);
  },
} as Theme;
