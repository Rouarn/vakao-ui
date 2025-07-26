/**
 * 输入测试脚本
 *
 * 用于测试 readline 输入是否正常工作，
 * 验证是否还存在输入重复或删除键异常的问题。
 *
 * 使用方法：
 * node scripts/test-input.js
 *
 * @version 1.0.0
 * @author Vakao UI Team
 */

const readline = require("readline");

// 使用与 interactive.js 相同的配置
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false, // 禁用终端模式，避免输入重复问题
  crlfDelay: Infinity, // 处理 Windows 换行符
});

console.log("\n🧪 Vakao UI 输入测试工具");
console.log("═══════════════════════════════════");
console.log("\n测试说明：");
console.log("1. 请输入数字 1，检查是否会显示为 11");
console.log("2. 尝试使用删除键，检查是否会删除多个字符");
console.log("3. 输入完成后按回车确认\n");

function testInput() {
  rl.question("请输入测试内容: ", (answer) => {
    console.log(`\n✅ 您输入的内容是: "${answer}"`);
    console.log(`📏 字符长度: ${answer.length}`);

    if (answer === "1") {
      console.log("🎉 输入测试通过！没有出现重复字符。");
    } else if (answer === "11") {
      console.log("❌ 输入测试失败！出现了重复字符问题。");
    } else {
      console.log("ℹ️ 请输入数字 1 来测试重复字符问题。");
    }

    rl.question("\n是否继续测试？(y/N): ", (continueTest) => {
      if (
        continueTest.toLowerCase() === "y" ||
        continueTest.toLowerCase() === "yes"
      ) {
        console.log(`\n${"─".repeat(40)}`);
        testInput();
      } else {
        console.log("\n🏁 测试结束，感谢使用！");
        rl.close();
      }
    });
  });
}

// 开始测试
testInput();

// 处理程序退出
process.on("SIGINT", () => {
  console.log("\n\n👋 测试已中断");
  rl.close();
  process.exit(0);
});
