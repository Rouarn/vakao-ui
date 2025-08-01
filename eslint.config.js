/**
 * ESLint 配置文件 (ESLint 9.x 格式)
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
 * @version 3.0.0
 * @author Vakao UI Team
 */

import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import vueParser from "vue-eslint-parser";

export default [
  // 忽略文件配置
  {
    ignores: [
      "node_modules/**/*",
      "**/node_modules/**/*",
      "dist/**/*",
      "build/**/*",
      "coverage/**/*",
      ".vitepress/cache/**/*",
      ".vitepress/dist/**/*",
      "scripts/gui/build/**/*",
      "scripts/gui/release/**/*",
      "**/*.json",
      "**/*.jsonc",
      "tsconfig.json",
      "package.json",
      "pnpm-lock.yaml",
    ],
  },

  // 基础 JavaScript 配置
  js.configs.recommended,

  // TypeScript 文件配置
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      // TypeScript 特定规则
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },

  // Vue 文件配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        parser: typescriptParser,
        sourceType: "module",
        extraFileExtensions: [".vue"],
      },
      globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescript,
    },
    rules: {
      ...vue.configs["vue3-recommended"].rules,
      ...typescript.configs.recommended.rules,

      // Vue 3 相关规则
      "vue/multi-word-component-names": "off",
      "vue/component-tags-order": [
        "error",
        {
          order: ["template", "script", "style"],
        },
      ],
      "vue/component-definition-name-casing": ["error", "PascalCase"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "vue/prop-name-casing": ["error", "camelCase"],
      "vue/no-v-html": "error",
      "vue/require-default-prop": "error",
      "vue/no-mutating-props": "error",
      "vue/require-name-property": "error",
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

      // TypeScript 规则
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: false,
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },

  // 通用 JavaScript/TypeScript 规则
  {
    files: ["**/*.js", "**/*.ts", "**/*.vue"],
    rules: {
      // 环境相关
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

      // 代码质量
      "prefer-const": "error",
      "no-var": "error",
      "no-undef": "off", // TypeScript 处理

      // 代码风格
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "comma-dangle": ["error", "always-multiline"],

      // 错误预防
      "no-empty-function": "warn",
      "no-unreachable": "error",

      // 现代化写法
      "object-shorthand": "error",
      "prefer-destructuring": [
        "error",
        {
          array: false,
          object: true,
        },
      ],

      // 导入相关
      "no-duplicate-imports": "off", // 关闭重复导入检查，因为 Vue 类型导入需要分开

      // 其他
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-cond-assign": ["error", "except-parens"],
    },
  },

  // 配置文件特殊规则
  {
    files: ["**/*.config.js", "**/*.config.ts", "scripts/**/*.js"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-var-requires": "off",
      "comma-dangle": ["error", "always-multiline"],
    },
  },

  // JSON 文件特殊规则
  {
    files: ["**/*.json", "**/*.jsonc"],
    rules: {
      "comma-dangle": "off",
      semi: "off",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },

  // TypeScript 声明文件特殊规则
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
    },
  },

  // 测试文件特殊规则
  {
    files: ["**/*.test.ts", "**/*.test.js", "**/*.spec.ts", "**/*.spec.js"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // 示例和文档文件特殊规则
  {
    files: ["docs/**/*.vue", "examples/**/*.vue"],
    rules: {
      "vue/require-default-prop": "off",
      "vue/multi-word-component-names": "off",
      "no-console": "off",
    },
  },
];
