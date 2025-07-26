# Legacy 发布脚本

⚠️ **注意**: 这些是旧版本的发布脚本，已被新的统一发布系统替代。

## 文件说明

- `deploy.js`: 旧版部署脚本（已转换为兼容性包装器）
- `publish-hooks.js`: 旧版 hooks 包发布脚本
- `publish-utils.js`: 旧版 utils 包发布脚本
- `publish-packages.js`: 旧版统一发布管理器

## 新系统

请使用新的统一发布系统：

```bash
# 交互式发布
node scripts/publish.js

# 仅部署（替代旧版 deploy.js）
node scripts/publish.js --deploy-only

# 发布后自动部署
node scripts/publish.js --deploy
```

详细信息请查看 [迁移指南](./MIGRATION_GUIDE.md)。

---

存档时间: 2025/7/26 18:29:57
