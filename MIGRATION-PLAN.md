# 迁移与清理操作方案（评审稿 · 未执行）

> 状态：**仅文档，尚未执行任何删除、改名、发布操作。**
> 本文所有数据来自 2026-11-07 的只读核查（git / 云效 OpenAPI / GitHub API / 本地 grep）。
> 执行前请先拍板第 8 节的 4 个分歧点。

---

## 0. 一句话结论

旧仓库（本地 + codeup + GitHub）、旧制品（`vakao-ui@0.0.1` 与 `@vakao-ui/*`）都可以安全清理；
包名统一到 `@vakao/xxx` 是纯改名，不改变任何运行时行为；
**云效 npm 仓库当前已开启「制品允许覆盖」**（`isOverwriteArtifact=Y`，实测查询，非推测），
所以「0.1.0 必须可重发」在技术上成立，但覆盖同一版本号会带来缓存与锁文件不一致的风险，需要按第 2.4 节的口径执行。

唯一硬阻塞：**新版 `vakao-ui-next` 目前没有任何 git 远端，也没有一次提交**。
在给它建仓推送之前删掉旧远端，代码就只剩这台机器上的副本。

---

## 1. 事实核查

### 1.1 旧 UI 仓库（本地）

| 项          | 值                                                            |
| ----------- | ------------------------------------------------------------- |
| 路径        | `/Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui`                |
| 体积        | 8.0 MB（不含 node_modules 时更小）                            |
| 分支 / HEAD | `main` / `cf76466 chore: 更换四芒星品牌图标`                  |
| 工作区      | **干净**（`git status --porcelain` 为空）                     |
| 与远端差异  | 领先 0 / 落后 0（origin 与 github 均已同步）                  |
| 包名 / 版本 | `vakao-ui@0.0.1`，`publishConfig.access = public`（无 scope） |

> 结论：本地无未推送内容，删除不会丢代码（远端仍有正本，直到第 7 步删除远端）。

### 1.2 旧仓库的两个远端

| 远端               | 地址                                                                   | 平台侧事实                                                                                          |
| ------------------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `origin`（codeup） | `git@codeup.aliyun.com:676d377c721f4dc7be6ca65a/vakao-ui/vakao-ui.git` | repoId `5586374`，私有，创建 2025-08-14，最后活动 2026-11-01，当前账号 accessLevel=40（Maintainer） |
| `github`           | `git@github.com:Rouarn/vakao-ui.git`                                   | **公开**仓库，默认分支 `main`，最后推送 2026-11-01T07:35:39Z，当前 token 权限 `admin=true`          |

> codeup 的 `vakao-ui` 是**组 / 命名空间**，下面还有 3 个仍在使用的仓库：
> `vakao-axios`、`vakao-scripts-utils`、`vakao-socket-system`、`vakao-static-hub`、`vakao-rtc`。
> **只删 `vakao-ui/vakao-ui` 这个仓库，不要动组本身。**
> accessLevel=40 未必够删仓库（通常需 Owner / 组织管理员），执行时会先用 API 试，403 则回控制台确认。

### 1.3 云效私有制品仓库现存清单

仓库：`npm-registry`（repoId `npm-registry`，类型 `NPM`，可见性 `INTERNAL` 组织内可见）

| 制品                      | artifactId | 版本（versionId）                                    | 下载次数 | 处置                                    |
| ------------------------- | ---------- | ---------------------------------------------------- | -------- | --------------------------------------- |
| `@vakao/ui`               | 173596808  | 0.2.0(286721643)、0.1.0(286703665)                   | 0        | 保留（新库）                            |
| `@vakao-ui/scripts-utils` | 120700532  | 0.0.3(286340518)、0.0.2(280168483)、0.0.1(223507470) | 17       | **删除**（迁到 `@vakao/scripts-utils`） |
| `@vakao-ui/axios`         | 134432437  | 0.0.2(281561741)、0.0.1(241013115)                   | 10       | **删除**（迁到 `@vakao/axios`）         |
| `@vakao-ui/socket-system` | 124748619  | 0.0.2(281093170)、0.0.1(230017211)                   | 3        | **删除**（迁到 `@vakao/socket-system`） |
| `vakao-ui`                | 107862247  | 0.0.1(208281568)                                     | 2        | **删除**（旧组件库，已被新版取代）      |

> 注意：`@vakao/ui` 已经有 **0.1.0**（旧视觉）和 **0.2.0**（视觉重做）两个版本，`latest` 指向 0.2.0。
> 这一点直接影响第 3 节「永远 0.1.0」的落地方式。

### 1.4 引用旧包名的项目（逐文件逐行）

扫描范围：`/Users/woyuxiaji/Rouarn/AliyunCloud` 全目录，排除 `node_modules`、`dist`、`pnpm-lock.yaml`（锁文件另行列）。

#### ① `blog-reset-server`（服务端脚本，**非上线前端**）

| 文件                           | 行  | 内容                                                        |
| ------------------------------ | --- | ----------------------------------------------------------- |
| `package.json`                 | 75  | `"@vakao-ui/scripts-utils": "0.0.3"`（devDependencies）     |
| `scripts/deploy.js`            | 9   | `require('@vakao-ui/scripts-utils')`                        |
| `scripts/generate-resource.js` | 5   | 同上                                                        |
| `scripts/remove-spec-files.js` | 9   | 同上                                                        |
| `pnpm-workspace.yaml`          | 5   | `minimumReleaseAgeExclude: '@vakao-ui/scripts-utils@0.0.3'` |
| `pnpm-lock.yaml`               | —   | 需重装生成                                                  |

#### ② `blog-reset-versin`（前端）

| 文件                           | 行  | 内容                                                               |
| ------------------------------ | --- | ------------------------------------------------------------------ |
| `package.json`                 | 28  | `"@vakao-ui/axios": "^0.0.1"` ← **版本落后**（仓库最新 0.0.2）     |
| `src/service/request/index.ts` | 9   | `import { createVakaoAxios } from '@vakao-ui/axios'`               |
| `src/service/request/types.ts` | 2   | `import type { FlatRequestInstanceConfig } from '@vakao-ui/axios'` |
| `src/service/api/prefix.ts`    | 3   | 注释                                                               |
| `README.md`                    | 34  | 文档                                                               |
| `pnpm-lock.yaml`               | —   | 需重装生成                                                         |

#### ③ `frontend-template`（模板）

| 文件                                   | 行        | 内容                                                  |
| -------------------------------------- | --------- | ----------------------------------------------------- |
| `package.json`                         | 31        | `"@vakao-ui/axios": "^0.0.2"`                         |
| `package.json`                         | 58        | `"@vakao-ui/scripts-utils": "^0.0.3"`                 |
| `src/service/request/index.ts`         | 5         | `import { createClient } from '@vakao-ui/axios'`      |
| `src/service/request/index.ts`         | 10        | 注释                                                  |
| `src/service/request/error-message.ts` | 1         | `import type { RequestError } from '@vakao-ui/axios'` |
| `scripts/gen-api.ts`                   | 11        | `import { ... } from '@vakao-ui/scripts-utils'`       |
| `scripts/new-page.ts`                  | 28        | 同上                                                  |
| `pnpm-workspace.yaml`                  | 6-7       | `minimumReleaseAgeExclude` 两条                       |
| `README.md`                            | 5、16、27 | 文档                                                  |
| `pnpm-lock.yaml`                       | —         | 需重装生成                                            |

#### ④ `text-chat`（monorepo：backend / frontend / deploy）

| 文件                                             | 行     | 内容                                           |
| ------------------------------------------------ | ------ | ---------------------------------------------- |
| `packages/backend/package.json`                  | 15     | `"@vakao-ui/scripts-utils": "^0.0.3"`          |
| `packages/backend/package.json`                  | 16     | `"@vakao-ui/socket-system": "^0.0.2"`          |
| `packages/backend/src/app.js`                    | 18     | `from '@vakao-ui/scripts-utils'`               |
| `packages/backend/src/ChatServer.js`             | 8      | `from '@vakao-ui/socket-system'`               |
| `packages/backend/src/ChatServer.js`             | 3、189 | 注释 / JSDoc `import(...)`                     |
| `packages/frontend/package.json`                 | 15     | `"@vakao-ui/socket-system": "^0.0.2"`          |
| `packages/frontend/src/composables/useSocket.js` | 1      | `from '@vakao-ui/socket-system'`               |
| `packages/shared/src/events.js`                  | 4      | 注释                                           |
| `deploy/package.json`                            | 11-12  | scripts-utils `^0.0.2`、socket-system `^0.0.2` |
| `pnpm-workspace.yaml`                            | 7-8    | `minimumReleaseAgeExclude` 两条                |
| `README.md`                                      | 4      | 文档                                           |
| `pnpm-lock.yaml`                                 | —      | 需重装生成                                     |

#### ⑤ `vakao-static-hub`（**上线在跑：static.woyuxiaji.cn**）

| 文件                                               | 行   | 内容                                                           |
| -------------------------------------------------- | ---- | -------------------------------------------------------------- |
| `package.json`                                     | 25   | `"@vakao-ui/scripts-utils": "^0.0.3"`（devDependencies）       |
| `packages/client/package.json`                     | 15   | `"@vakao-ui/axios": "^0.0.2"`                                  |
| `packages/client/src/utils/http.ts`                | 1    | `import { createClient, RequestError } from '@vakao-ui/axios'` |
| `packages/client/src/utils/http.ts`                | 7    | 注释                                                           |
| `packages/client/src/api/shares.ts`                | 1    | `import { RequestError }`                                      |
| `packages/client/src/api/files.ts`                 | 16   | `import type { RequestOptions }`                               |
| `packages/client/src/api/app-update.ts`            | 13   | `import type { RequestOptions }`                               |
| `packages/client/src/views/shares/index.vue`       | 41   | `import { RequestError }`                                      |
| `packages/client/src/views/share-access/index.vue` | 17   | `import { RequestError }`                                      |
| `packages/client/src/stores/modules/category.ts`   | 2    | `import { RequestError }`                                      |
| `packages/client/src/stores/modules/category.ts`   | 34   | 注释                                                           |
| `packages/client/README.md`                        | 22   | 文档                                                           |
| `pnpm-workspace.yaml`                              | 9-10 | `minimumReleaseAgeExclude` 两条                                |
| `pnpm-lock.yaml`                                   | —    | 需重装生成                                                     |

#### ⑥ 仅文案 / 注释，非依赖（改不改都不影响构建）

| 项目                | 位置                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `vakao-studio`      | `content/projects/vakao-ui.md` 6/47/49/50/51；`app/pages/index.vue` 45/50/55/60；`app/components/project/ProjectVisual.vue` 243 |
| `vakao-platform`    | `apps/web/scripts/utils/console.ts` 2（已是「替代原 @vakao-ui/scripts-utils」说明）                                             |
| `electron-template` | `README.md` 18（「原 @vakao-ui/axios 在 npm 不存在」的旧说明，已过期）                                                          |
| `wails3-template`   | `docs/项目方案.md` 112（方案表格）                                                                                              |

#### ⑦ 无依赖、无需改名的

`vakao-hub`、`vakao-platform`、`vakao-rtc`、`vakao-studio`、`vakao-static-hub` 的服务端、`DianMo`、`simple-bookkeeping*`、`localSend*`、`nestjs-template` 等均未依赖这四个包。

### 1.5 新版库现状

| 项       | 值                                                                                              |
| -------- | ----------------------------------------------------------------------------------------------- |
| 路径     | `/Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui-next`                                             |
| 包名     | `@vakao/ui`（已与目标命名一致）                                                                 |
| 版本     | `0.2.0`（`latest`）                                                                             |
| 发布方式 | `pnpm publish`，`prepublishOnly: pnpm check`；版本由 Changesets 管理（`pnpm version-packages`） |
| registry | 全局 `~/.npmrc` → `https://packages.aliyun.com/676d377c721f4dc7be6ca65a/npm/npm-registry/`      |
| **git**  | **无任何远端（`git remote -v` 为空）、`main` 分支零提交、29 个未跟踪条目**                      |

### 1.6 目标命名规则（依据用户提供的云效截图）

云效制品列表里同时存在两代命名：

- 旧：`@vakao-ui/scripts-utils`、`@vakao-ui/axios`、`@vakao-ui/socket-system`、无 scope 的 `vakao-ui`
- 新：`@vakao/ui`

统一目标 —— **scope 恒为 `@vakao`，一段式包名，kebab-case**：

| 旧                        | 新                     |
| ------------------------- | ---------------------- |
| `vakao-ui`                | `@vakao/ui`（已完成）  |
| `@vakao-ui/scripts-utils` | `@vakao/scripts-utils` |
| `@vakao-ui/axios`         | `@vakao/axios`         |
| `@vakao-ui/socket-system` | `@vakao/socket-system` |

### 1.7 可用凭据（只记录路径，不记录内容）

| 用途                  | 文件                                                           | 核查结果                                                              |
| --------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------- |
| 云效 OpenAPI / codeup | `/Users/woyuxiaji/Documents/GlobalConfig/yx.token`（`pt-...`） | 可读；`GET /oapi/v1/codeup/.../repositories` 返回 200                 |
| GitHub                | `/Users/woyuxiaji/Documents/GlobalConfig/gh.token`             | 可读；`GET /repos/Rouarn/vakao-ui` 返回 200，`permissions.admin=true` |
| npm 发布              | `~/.npmrc` 中的 `_authToken`                                   | `npm ping` 正常（PONG）                                               |

> 本机未安装 `gh` CLI，GitHub 删除走 REST API（`curl`）。
> 云效制品仓库未提供本地 CLI，删除走 OpenAPI 或控制台。

---

## 2. 「永远 0.1.0」的硬约束与覆盖策略结论

### 2.1 实测结论（不是推测）

通过云效 OpenAPI 读取仓库描述符：

```
GET /oapi/v1/packages/organizations/676d377c721f4dc7be6ca65a/repositories/npm-registry
→ repoDescriptor.isOverwriteArtifact = "Y"
```

对照其他仓库：`flow_generic_repo`（通用）= `N`，两个 Maven 仓库 = `N`。

**结论：这个组织下的 npm 仓库当前是「允许覆盖」**，即推送相同包名 + 相同版本会**直接覆盖**老版本，不会被拒绝。
这一项随时可能在控制台被改，执行前应再查一次（同一 GET 请求即可，只读）。

### 2.2 两条发布路径

**路径 A：覆盖发布（当前策略允许）**

```bash
# 位置：对应包目录
pnpm build
npm publish --no-git-checks          # 同版本会被静默覆盖
```

- 优点：一条命令，版本号不变。
- 风险（**必须写进发布记录**）：
  - 已安装过该版本的机器不会感知更新（版本号没变，pnpm/npm 认为无需重装）；
  - 锁文件里的 `integrity` 与新 tarball 不匹配 → 下次 `pnpm install --frozen-lockfile` 直接报错；
  - 云效/CDN 若缓存了 tarball，短时间可能拿到旧内容；
  - 违反 npm 生态「版本不可变」共识，排查问题时无法靠版本号定位。

**路径 B：先删该版本，再发布**

```bash
# 1) 先删（控制台或 OpenAPI，见 5.6）
# 2) 再发
pnpm build && npm publish --no-git-checks
```

- 优点：语义干净，版本与内容一一对应。
- 风险：删除到重新发布之间有一个**空窗期**，此时任何 `pnpm install` 会 404；建议在无人构建的时段操作，且先准备好在同一分钟内重发的命令。

### 2.3 本次口径

1. **默认走路径 B**（先删再发），只有用户明确要求「必须保持同一版本号且不想删」时才用路径 A。
2. 三个改名后的包（`@vakao/axios`、`@vakao/scripts-utils`、`@vakao/socket-system`）是**全新包名，首次发布，不涉及覆盖**，不需要删。
3. `@vakao/ui` 的 0.1.0 **已经存在**，因此「固定 0.1.0」不需要重新发布就能满足，只需要决定 0.2.0 的去留（见 3.2）。

### 2.4 与「永远 0.1.0」并存的方式

- 版本号写死为 `0.1.0`，`package.json` 的 `version` 不再随 Changesets 自动升；
- 后续所有修复都以 0.1.0 覆盖发布（路径 A）或「删 0.1.0 → 重发 0.1.0」（路径 B）；
- Changesets 的 `version-packages` 在固定版本策略下**必须停用**，否则一次 `version-packages` 就会把版本推到 0.2.0/0.1.1。

---

## 3. 版本冲突（必须先拍板）

### 3.1 事实

| 版本                | 内容                                                 | 状态                      |
| ------------------- | ---------------------------------------------------- | ------------------------- |
| `@vakao/ui@0.1.0`   | 视觉重做**之前**的旧视觉（灰蓝 `#46A6C6` 一版）      | 已发布，registry 中可下载 |
| `@vakao/ui@0.2.0`   | 当前仓库内容（朱砂 `#C43A21`、令牌重定、文档站重做） | 已发布，`latest`          |
| 仓库 `package.json` | `0.2.0`                                              | 与 registry 一致          |

### 3.2 三种落地方式

| 方案          | 操作                                                                                              | 结果                         | 代价                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **A（推荐）** | 保留 0.2.0 作为当前内容，`latest` 不动；从今天起冻结版本，不升也不降                              | 语义正确：版本与内容一一对应 | 与「永远 0.1.0」字面不符                                                                                             |
| **B**         | 把 0.2.0 的内容以 0.1.0 覆盖发布（`isOverwriteArtifact=Y` 支持），`latest` 指回 0.1.0，删除 0.2.0 | 字面满足「永远 0.1.0」       | 0.1.0 的内容被静默替换；已装 0.1.0 的机器不会更新；需同步改 README / CHANGELOG / 文档站里所有 0.2.0 字样（约 19 处） |
| **C**         | 0.1.0 保持旧视觉不动，只冻结版本                                                                  | 无需改动                     | latest 仍是 0.2.0，实际用的是新版，等于没执行要求                                                                    |

> 如果选 B，受影响文案：`package.json:3`、`README.md:7`、`CHANGELOG.md:3`、`VISUAL-REVISION.md:1,120`、`src/tokens/brand.json:2`、`docs/DESIGN-TOKENS.md:24,37,144,178`、`docs/index.md:65,88`、`docs/guide/roadmap.md:5,25`、`docs/design/tokens.md:14,26,39,69,127`，以及已上线的文档站（需重新构建部署）。

---

## 4. 改名范围

### 4.1 三个库仓库（源头）

| 仓库                  | 文件                                               | 改动                                                                                                                     |
| --------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `vakao-axios`         | `package.json:2`                                   | `"name": "@vakao-ui/axios"` → `"@vakao/axios"`                                                                           |
|                       | `README.md:1,16,22`                                | 文档同步                                                                                                                 |
| `vakao-scripts-utils` | `package.json:2`                                   | → `"@vakao/scripts-utils"`                                                                                               |
|                       | `package.json:46,58,60,62`                         | keywords `vakao-ui`、`repository/homepage/bugs` 指向 `github.com/vakao-ui/scripts-utils`（**建议一并改为实际仓库地址**） |
|                       | `README.md:1,23,26,32,52,178,191,192`              | 文档同步                                                                                                                 |
| `vakao-socket-system` | `package.json:2`                                   | → `"@vakao/socket-system"`                                                                                               |
|                       | `src/index.ts:2,10`、`README.md:17,25,143,182,265` | 注释 / 文档同步                                                                                                          |

> 版本号**不变**（`@vakao/axios@0.0.2`、`@vakao/scripts-utils@0.0.3`、`@vakao/socket-system@0.0.2`），因为这是新包名的首次发布。
> 构建配置（rollup / tsup / tsc）里没有写死包名，无需改；`exports`、`main`、`types` 与包名无关，无需改。

### 4.2 五个消费项目

每个项目要改四类东西：

1. **`package.json`** 的 `dependencies` / `devDependencies` 键名（行号见 1.4）；
2. **源码 import**（行号见 1.4）；
3. **`pnpm-workspace.yaml` 的 `minimumReleaseAgeExclude`** —— 这条最容易漏：
   新包发布后会被 pnpm 的「最小发布年龄」策略挡住（默认 1440 分钟），必须把
   `@vakao-ui/axios@0.0.2` 改成 `@vakao/axios@0.0.2` 才能立刻安装。
   涉及：`blog-reset-server:5`、`frontend-template:6-7`、`text-chat:7-8`、`vakao-static-hub:9-10`。
4. **`pnpm-lock.yaml`** —— 不要手改，`pnpm install` 重新生成。

### 4.3 不需要改的

- 任何 `vite.config.ts` / `tsconfig` 的 alias、`resolver`、`unplugin` 配置：全仓库扫过，没有按包名做的别名；
- 旧 `vakao-ui` 仓库内的 `@vakao-ui/hooks|utils|types|components|docs`：该仓库整体删除，无需改名；
- 8080 端口/域名/静态资源路径：与包名无关。

### 4.4 是否需要重新安装

需要。改名后旧的 `node_modules/@vakao-ui/*` 不会被自动清掉，建议：

```bash
rm -rf node_modules packages/*/node_modules
pnpm install
```

---

## 5. 执行顺序

> 图例：🔁 可回滚 ｜ ⚠️ 有风险 ｜ ❌ 不可逆

### 5.0 预检（只读，必须全绿才继续）

```bash
# 位置：/Users/woyuxiaji/Rouarn/AliyunCloud
for d in vakao-ui vakao-axios vakao-scripts-utils vakao-socket-system; do
  echo "== $d"; git -C $d status --porcelain; git -C $d log --oneline -1
  git -C $d rev-list --count '@{u}..HEAD'
done
```

预期：4 个仓库 dirty=0、unpushed=0（当前实测全部满足）。

### 5.1 归档备份 🔁

```bash
mkdir -p ~/Backups
tar --exclude=node_modules --exclude=.git -czf ~/Backups/vakao-ui-$(date +%Y%m%d).tar.gz \
  -C /Users/woyuxiaji/Rouarn/AliyunCloud vakao-ui
```

- 位置：本机
- 影响：只读旧目录，不修改
- 回滚：删除归档即可
- 验收：`tar -tzf` 能列出文件，体积 > 500KB

### 5.2 给新版建仓并推送（**前置条件，不做则不要往下走**）⚠️

`vakao-ui-next` 当前零提交、零远端。方案建议：

```bash
cd /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui-next
git add -A && git commit -m "chore: 初始化 @vakao/ui 0.2.0"
# codeup 建仓后
git remote add origin git@codeup.aliyun.com:676d377c721f4dc7be6ca65a/vakao-ui/vakao-ui-next.git
git push -u origin main
# github 建仓后
git remote add github git@github.com:Rouarn/VakaoUI-next.git
git push github main
```

- 回滚：删除新仓库（新仓库无历史包袱，代价最低）
- 验收：两个 `git ls-remote` 都能看到 `refs/heads/main`
- **跳过本步的风险**：第 7 步删完远端后，新版代码只存在于本机磁盘，硬盘故障即全丢

### 5.3 三个库改名 🔁

见第 4.1 节，逐仓库改 `package.json` + README + 注释，然后：

```bash
cd /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-axios          && pnpm build && pnpm test
cd ../vakao-scripts-utils                                   && pnpm build && pnpm test
cd ../vakao-socket-system                                   && pnpm build && pnpm test
```

- 回滚：`git checkout -- .`（各仓库工作区干净，回滚零成本）
- 验收：`node -e "console.log(require('./package.json').name)"` 输出 `@vakao/xxx`

### 5.4 五个消费项目改名 + 重装 🔁

按 4.2 的四类改动逐个执行，然后：

```bash
# 每个项目
rm -rf node_modules packages/*/node_modules
pnpm install
pnpm build        # text-chat 用 pnpm -r build；blog-reset-server 无前端构建
```

- 回滚：`git checkout -- . && rm -rf pnpm-lock.yaml && git checkout -- pnpm-lock.yaml && pnpm install`
- 验收：见第 6 节清单

### 5.5 发布三个新包 ⚠️（可回滚：删版本）

```bash
cd /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-axios
pnpm build && npm publish --no-git-checks --access public

cd ../vakao-scripts-utils
pnpm publish --no-git-checks --access public        # prepublishOnly 会自动跑 lint/type/test/build

cd ../vakao-socket-system
pnpm publish --no-git-checks --access public
```

- 这是**新包名首次发布**，不涉及覆盖
- 回滚：删掉刚发布的版本（第 5.6 的 OpenAPI 或控制台）
- **必须在新包发布成功后再做 5.6**，否则消费项目会断供

### 5.6 删除旧制品 ⚠️（版本删除进回收站，可恢复；「彻底删除」❌ 不可逆）

顺序：**先删 `vakao-ui`，再删三个 `@vakao-ui/*`**（等 5.5 验证通过后）。

方式一：控制台（推荐，有二次确认和回收站）
`云效 → 制品仓库 → npm-registry → 包列表 → 选中包 → 选择版本 → 删除此版本 →（如需）回收站 → 彻底删除`

方式二：OpenAPI（已实测 token 可用）

```bash
YX=$(cat /Users/woyuxiaji/Documents/GlobalConfig/yx.token)
BASE="https://openapi-rdc.aliyuncs.com/oapi/v1/packages/organizations/676d377c721f4dc7be6ca65a/repositories/npm-registry/artifacts"

# 删除单个版本：vakao-ui@0.0.1
curl -X DELETE -H "x-yunxiao-token: $YX" \
  "$BASE/107862247/208281568?repoType=NPM"

# @vakao-ui/scripts-utils 0.0.1 / 0.0.2 / 0.0.3
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/120700532/223507470?repoType=NPM"
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/120700532/280168483?repoType=NPM"
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/120700532/286340518?repoType=NPM"

# @vakao-ui/axios 0.0.1 / 0.0.2
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/134432437/241013115?repoType=NPM"
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/134432437/281561741?repoType=NPM"

# @vakao-ui/socket-system 0.0.1 / 0.0.2
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/124748619/230017211?repoType=NPM"
curl -X DELETE -H "x-yunxiao-token: $YX" "$BASE/124748619/281093170?repoType=NPM"
```

- 执行前确认：5.5 的三个新包 `npm view` 均可拉到；所有消费项目已改用新包名
- 回滚：云效制品回收站可恢复（除非已「彻底删除」）
- 验收：`npm view @vakao-ui/axios` 返回 404

### 5.7 删除远端仓库 ❌

**GitHub（公开仓库，删除后无回收站）**

```bash
TOK=$(cat /Users/woyuxiaji/Documents/GlobalConfig/gh.token)
curl -X DELETE -H "Authorization: Bearer $TOK" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/Rouarn/vakao-ui        # 期望 204
```

**codeup**

```bash
YX=$(cat /Users/woyuxiaji/Documents/GlobalConfig/yx.token)
curl -X DELETE -H "x-yunxiao-token: $YX" \
  "https://openapi-rdc.aliyuncs.com/oapi/v1/codeup/organizations/676d377c721f4dc7be6ca65a/repositories/5586374"
```

- 执行前确认：① 本地无未提交改动（已核）；② 5.2 新版远端已推送成功；③ GitHub 那边已确认没有其他人的 fork / PR 在用
- 若 codeup 返回 403（accessLevel=40 可能不够）：到控制台 `代码管理 → 仓库 → 设置 → 删除仓库`，需要组织管理员操作
- 回滚：GitHub **不可恢复**；codeup 可能进回收站，也可能直接销毁 —— 按不可恢复对待
- 验收：`git ls-remote` 两个地址都返回 `Repository not found` / 403

### 5.8 删除本地目录 ❌

```bash
rm -rf /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui
```

- 执行前确认：5.1 归档存在且可解压；5.2 新版已推送
- 回滚：从 5.1 的 tar.gz 恢复（**注意：不含 `.git`**，历史只能在删远端前 clone 一份）
- 建议：在 5.7 之前额外执行一次 `git clone --mirror` 留档

```bash
git clone --mirror git@github.com:Rouarn/vakao-ui.git ~/Backups/VakaoUI.git
```

---

## 6. 上线影响

| 站点                                      | 依赖情况                                                        | 改名 / 删制品是否影响                                                                      |
| ----------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ui.woyuxiaji.cn`（文档站）               | 纯静态 `dist`，运行时**不含任何包名引用**                       | **不影响**，无需重新部署                                                                   |
| `static.woyuxiaji.cn`（vakao-static-hub） | client 依赖 `@vakao-ui/axios`，根依赖 `@vakao-ui/scripts-utils` | 已部署产物**不受影响**；**下次重新构建必须**先完成 5.4 改名 + `pnpm install`，否则构建失败 |
| `rtc.woyuxiaji.cn`（vakao-rtc）           | 只依赖 `@vakao-rtc/shared`（workspace）                         | **不影响**                                                                                 |

关键点：

1. 打包后的产物里没有 `@vakao-ui/...` 字符串（已被 Vite 打进 bundle），改名不会让线上页面 404 或报错。
2. 真正的风险在**构建期**：旧制品删除后，任何仍写着旧包名、且需要 `pnpm install` 的分支 / CI 任务都会 404。
3. `vakao-static-hub` 若在服务器上直接构建，同样需要先改代码再构建；若走本地构建 + 上传 `dist`，则先改代码、重装、重建，再部署。
4. 建议顺序：**改名并重新构建验证 → 发布新包 → 删旧制品 → 删仓库**，把断供窗口压到零。

---

## 7. 验收清单

| #   | 检查项           | 命令                                                                                             | 期望                                       |
| --- | ---------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| 1   | 新包可解析       | `npm view @vakao/axios version` / `@vakao/scripts-utils` / `@vakao/socket-system`                | 分别 `0.0.2` / `0.0.3` / `0.0.2`           |
| 2   | 新包可安装       | 临时目录 `pnpm add @vakao/axios`                                                                 | 退出码 0，`node_modules/@vakao/axios` 存在 |
| 3   | 旧制品已删       | `npm view @vakao-ui/axios` / `@vakao-ui/scripts-utils` / `@vakao-ui/socket-system` / `vakao-ui`  | 全部 404                                   |
| 4   | `@vakao/ui` 版本 | `npm view @vakao/ui versions`                                                                    | 与第 3 节拍板结果一致                      |
| 5   | 消费项目无旧引用 | `grep -rn "@vakao-ui/" <项目> --exclude-dir=node_modules --exclude=pnpm-lock.yaml`               | 0 命中                                     |
| 6   | 依赖类型检查     | 各项目 `pnpm typecheck`（`frontend-template` / `vakao-static-hub/client` / `blog-reset-versin`） | 通过                                       |
| 7   | 构建             | `frontend-template`、`vakao-static-hub`、`text-chat` 各自 `pnpm build`                           | 通过                                       |
| 8   | 自引用无残留     | 三个库仓库 `node -e "console.log(require('./package.json').name)"`                               | `@vakao/*`                                 |
| 9   | 锁文件已更新     | `grep -c "@vakao-ui/" */pnpm-lock.yaml`                                                          | 0                                          |
| 10  | 远端已删         | `git ls-remote` 旧 codeup / GitHub 地址                                                          | 均失败                                     |
| 11  | 本地已删         | `ls /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui`                                                | 不存在                                     |
| 12  | 新版有远端       | `git -C vakao-ui-next remote -v && git ls-remote origin`                                         | 有 `origin`，能看到 `main`                 |
| 13  | 文档站未受影响   | `curl -sI https://ui.woyuxiaji.cn/`                                                              | 200                                        |

---

## 8. 需要拍板的分歧点

### 分歧点 1：`@vakao/ui` 到底是 0.1.0 还是 0.2.0

- 现状：0.1.0（旧视觉）与 0.2.0（当前视觉）**都已发布**，`latest=0.2.0`。
- 选 **A（推荐）**：保住 0.2.0，从今天起冻结不升版 —— 版本与内容一致，不动线上文档。
- 选 **B**：用当前内容覆盖 0.1.0、删 0.2.0、`latest` 指回 0.1.0 —— 字面满足要求，但要同步改 19 处文案、重建文档站，且已装 0.1.0 的机器不会更新。
- 请回复 **A** 或 **B**。

### 分歧点 2：新版还没有远端，删旧仓前要不要先建仓

- 建议：先给 `vakao-ui-next` 建 codeup + GitHub 仓库并推送 `main`，再删旧的。
- 需要确认仓库名：codeup 用 `vakao-ui/vakao-ui-next`？GitHub 用 `Rouarn/VakaoUI-next`？还是沿用旧名（GitHub 删掉 `VakaoUI` 后重建同名仓库）？

### 分歧点 3：旧制品删到什么程度

- 选项 1：只删 `vakao-ui@0.0.1` + 三个 `@vakao-ui/*` 的**全部版本**（推荐，彻底清理）。
- 选项 2：保留 `@vakao-ui/*` 的历史版本一段时间（防止老分支构建中断），只删 `vakao-ui@0.0.1`。
- 另外：是否要「彻底删除」（清空回收站）？彻底删除后**不可恢复**。

### 分歧点 4：codeup 仓库删除权限

- 当前账号在该仓库是 `accessLevel=40`（Maintainer），可能不够删除。若 API 返回 403，需要你用组织管理员账号在控制台删，或给我一个有权限的 token。

---

## 附：本次核查用到的只读命令（可复现）

```bash
# 旧仓库远端与状态
git -C /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui remote -v
git -C /Users/woyuxiaji/Rouarn/AliyunCloud/vakao-ui status --porcelain

# 云效仓库策略
curl -s -H "x-yunxiao-token: $(cat /Users/woyuxiaji/Documents/GlobalConfig/yx.token)" \
  "https://openapi-rdc.aliyuncs.com/oapi/v1/packages/organizations/676d377c721f4dc7be6ca65a/repositories?perPage=50"

# 云效制品清单
curl -s -H "x-yunxiao-token: $(cat /Users/woyuxiaji/Documents/GlobalConfig/yx.token)" \
  "https://openapi-rdc.aliyuncs.com/oapi/v1/packages/organizations/676d377c721f4dc7be6ca65a/repositories/npm-registry/artifacts?repoType=NPM&perPage=100"

# codeup 仓库
curl -s -H "x-yunxiao-token: $(cat /Users/woyuxiaji/Documents/GlobalConfig/yx.token)" \
  "https://openapi-rdc.aliyuncs.com/oapi/v1/codeup/organizations/676d377c721f4dc7be6ca65a/repositories/5586374"

# GitHub 仓库
curl -s -H "Authorization: Bearer $(cat /Users/woyuxiaji/Documents/GlobalConfig/gh.token)" \
  https://api.github.com/repos/Rouarn/vakao-ui
```
