/**
 * Prettier 配置文件
 * 与 ESLint 配置保持一致，避免格式化冲突
 */
module.exports = {
  // 基础格式化选项
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",

  // 尾随逗号设置 - 与 ESLint 的 comma-dangle 规则保持一致
  trailingComma: "es5",

  // 括号和空格
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",

  // 换行符设置
  endOfLine: "lf",

  // Vue 文件特定配置
  vueIndentScriptAndStyle: false,

  // 覆盖特定文件类型的配置
  overrides: [
    {
      files: "*.vue",
      options: {
        parser: "vue",
      },
    },
    {
      files: ["*.js", "*.ts"],
      options: {
        parser: "typescript",
      },
    },
    {
      files: "*.json",
      options: {
        parser: "json",
        trailingComma: "none",
      },
    },
    {
      files: "*.md",
      options: {
        parser: "markdown",
        proseWrap: "preserve",
      },
    },
  ],
};
