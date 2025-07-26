/**
 * ESLint 配置文件
 *
 * 为 Vakao UI 组件库项目提供代码质量检查和格式化规则。
 * 专门针对 Vue 3 + TypeScript 组件库开发进行优化配置。
 *
 * 主要特性：
 * - Vue 3 Composition API 支持
 * - TypeScript 严格类型检查
 * - 组件库开发最佳实践
 * - 代码风格统一规范
 *
 * @version 2.0.0
 * @author Vakao UI Team
 */

module.exports = {
  // 根配置，停止向上查找
  root: true,

  // 运行环境
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  // 继承的规则集
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  // 解析器配置
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2022,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },

  // 插件
  plugins: ["@typescript-eslint", "vue"],

  // 全局变量
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },

  // 自定义规则
  rules: {
    // ==================== Vue 3 相关规则 ====================

    // 组件命名规则 - 允许单词组件名（如 Button, Input）
    "vue/multi-word-component-names": "off",

    // 组件标签顺序
    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],

    // 组件名称格式 - PascalCase
    "vue/component-definition-name-casing": ["error", "PascalCase"],

    // 自定义事件名称格式 - kebab-case
    "vue/custom-event-name-casing": ["error", "kebab-case"],

    // Props 名称格式 - camelCase
    "vue/prop-name-casing": ["error", "camelCase"],

    // 禁止在模板中使用 v-html（安全考虑）
    "vue/no-v-html": "error",

    // 要求 props 有默认值（组件库最佳实践）
    "vue/require-default-prop": "error",

    // 禁止修改 props
    "vue/no-mutating-props": "error",

    // 要求组件有名称
    "vue/require-name-property": "error",

    // 属性顺序
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          "UNIQUE",
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          "OTHER_ATTR",
          "EVENTS",
          "CONTENT",
        ],
      },
    ],

    // ==================== TypeScript 相关规则 ====================

    // 禁用 ESLint 的 no-unused-vars，使用 TypeScript 版本
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],

    // 禁用 ESLint 的 no-redeclare，使用 TypeScript 版本
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",

    // 类型导入规则
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: false,
      },
    ],

    // 禁止使用 any 类型
    "@typescript-eslint/no-explicit-any": "warn",

    // 要求函数返回类型注解
    "@typescript-eslint/explicit-function-return-type": "off",

    // 要求导出函数和类的返回类型
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // ==================== 代码质量规则 ====================

    // 控制台和调试语句
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    // 变量声明
    "prefer-const": "error",
    "no-var": "error",
    "no-undef": "off", // TypeScript 处理

    // 代码风格
    semi: ["error", "always"],
    quotes: ["error", "double", { avoidEscape: true }],
    "comma-dangle": ["error", "always-multiline"],

    // 函数相关
    "no-empty-function": "warn",
    "no-unreachable": "error",

    // 对象和数组
    "object-shorthand": "error",
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: true,
      },
    ],

    // 导入导出
    "no-duplicate-imports": "off", // 关闭重复导入检查，因为 Vue 类型导入需要分开

    // ==================== 组件库特定规则 ====================

    // 允许空的 catch 块（某些组件可能需要）
    "no-empty": ["error", { allowEmptyCatch: true }],

    // 允许在条件中赋值（某些响应式逻辑需要）
    "no-cond-assign": ["error", "except-parens"],
  },

  // 覆盖特定文件的规则
  overrides: [
    {
      // 构建脚本和配置文件
      files: [
        "scripts/**/*.js",
        "*.config.js",
        "*.config.ts",
        "vite.config.*",
        "vitest.config.*",
      ],
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      // TypeScript 声明文件
      files: ["*.d.ts"],
      rules: {
        // 允许使用 any 类型
        "@typescript-eslint/no-explicit-any": "off",
        // 允许使用 {} 类型
        "@typescript-eslint/ban-types": "off",
      },
    },
    {
      // 测试文件
      files: ["**/__tests__/**/*", "**/*.test.*", "**/*.spec.*"],
      rules: {
        "no-console": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      // 文档和示例文件
      files: ["docs/**/*", "examples/**/*"],
      rules: {
        "vue/require-default-prop": "off",
        "vue/multi-word-component-names": "off",
        "no-console": "off",
      },
    },
  ],
};
