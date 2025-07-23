#!/usr/bin/env node

/**
 * 准备发布脚本
 * 将 packages/dist 目录的内容复制到项目根目录下的 dist 目录中
 */

const fs = require('fs-extra');
const path = require('path');

// 源目录和目标目录
const sourceDir = path.resolve(__dirname, '../packages/dist');
const targetDir = path.resolve(__dirname, '../dist');

// 确保目标目录存在并清空
fs.emptyDirSync(targetDir);

// 复制文件
console.log(`正在复制文件从 ${sourceDir} 到 ${targetDir}...`);
fs.copySync(sourceDir, targetDir);

console.log('✅ 文件复制完成！');