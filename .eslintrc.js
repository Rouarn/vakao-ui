/**
 * ESLint 配置文件
 *
 * 为 Vakao UI 项目提供代码质量检查和格式化规则。
 * 支持 Vue 3、TypeScript、JavaScript 等文件类型。
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

module.exports = {
  // 运行环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  // 继承的规则集
  extends: ["eslint:recommended", "plugin:vue/vue3-essential"],

  // 解析器配置
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },

  // 插件
  plugins: ["@typescript-eslint", "vue"],

  // 自定义规则
  rules: {
    // Vue 相关规则
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/require-default-prop": "off",

    // 通用规则
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "prefer-const": "error",
    "no-var": "error",
    semi: ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true }],
    "no-redeclare": "warn",
  },

  // 覆盖特定文件的规则
  overrides: [
    {
      files: ["scripts/**/*.js", "*.config.js"],
      rules: {
        "no-console": "off",
      },
    },
  ],
};
