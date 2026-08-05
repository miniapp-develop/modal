# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@mini-dev/modal` 是微信小程序自定义模态框组件，发布到 npm。本仓库同时作为 `@mini-dev` 小程序 UI 组件库的**标准模板**：多组件就绪的 `libs/` 结构、共享基座 `_Component`、独立平台示例工程、统一工具链。组件库**不跨平台**——每个平台是独立仓库，从本模板实例化而来；本仓库 = 微信端。

## 仓库结构

```
libs/                       # 组件源码（package.json miniprogram:"libs"）
  _Component.js             # 共享基座工厂（所有组件的 options/外部类都在这里管）
  index.js                  # 首组件（= modal）注册；兼作包 main 入口
  index.json / index.wxml / index.wxss / i.wxs
  index.d.ts                # 首组件类型声明；兼作包 types 入口
  <name>/                   # 第二个组件起，每个一个子目录
sample-modal-wechat/        # 微信示例工程，file:.. 本地依赖本包
package.json / tsconfig.json / .eslintrc.cjs / .prettierrc.json / commitlint.config.cjs / .changeset/ / .husky/
```

根目录是**纯 npm 包**（不再自带 demo）。示例在独立的 `sample-{name}-{platform}/` 工程，通过 `"@mini-dev/<name>": "file:.."` 本地依赖本包，再在各平台 IDE 走"构建 npm"消费。

## 常用命令

- `npm run lint` — eslint 检查 `libs/`
- `npm run format` / `npm run format:check` — prettier 格式化 / 校验
- `npm run typecheck` — `tsc --noEmit` 校验 `.d.ts`
- `npm run changeset` / `version` / `release` — changeset 增量 / 升版本 / 发布
- 示例运行：`cd sample-modal-wechat && npm install`，用微信开发者工具（AppID `wx132bb522ad967270`）打开该目录 → 工具-构建 npm → 模拟器看效果。

## 架构要点

### 共享基座 `libs/_Component.js`

`_Component` 包装全局 `Component()`，为每个组件注入统一默认，**组件的 options 与外部样式类都在这里管，不要在组件 `index.js` 里重复声明**：

- `externalClasses`：注入 `mini-class`、`ui-class`
- `options`：`virtualHost: true`（不渲染 host 节点，`mini-class` 直接落到 `.modal` view）、`styleIsolation: 'isolated'`、`multipleSlots: true`、`pureDataPattern: /^\$_/`（`this.data._*` 为纯数据，不进入视图）
- 返回 `Component(opts)`，便于组合

组件 `index.js` 只写 `const {_Component} = require('./_Component'); _Component({ properties, methods })`（首组件在 `libs/` 根）；子目录组件写 `require('../_Component')`。

### 多组件与"构建 npm"平铺（关键）

微信"构建 npm"会把 `miniprogram` 字段目录（`libs/`）的**内容平铺**到 `miniprogram_npm/<pkg>/` 根，`libs/` 这层目录被剥离。因此：

- `libs/index.*` → `miniprogram_npm/@mini-dev/modal/index.*`（首组件在包根）
- `libs/_Component.js` → `miniprogram_npm/@mini-dev/modal/_Component.js`
- `libs/index.js` 里的 `require('./_Component')` 平铺后仍成立（两者都在包根）
- **首组件消费路径**：`usingComponents` 写 **`@mini-dev/modal`**（根，包名一致，存量依赖方零改动）
- **新增组件**：放 `libs/<name>/`，消费方写 `@mini-dev/modal/<name>`（`libs/` 被平铺，子路径无 `libs/` 前缀）；其 `index.js` 用 `require('../_Component')` 引基座

### modal 组件本身（`libs/index.*`，首组件在根）

- `index.js` — 注册 `visible`/`mask`/`gravity`/`zIndex`/`animDuration` 属性，`onTapMask` 方法 `triggerEvent('tapMask')`（对外 `bindtapMask`）
- `index.wxml` — `.mask` view（`wx:if="{{mask}}"`）+ `.modal` view（按 `gravity` 定位），两者靠 `{{visible ? 'show' : ''}}` 切动画；`mini-class`/`ui-class` 落在 `.modal` 上
- `i.wxs` — 计算 inline style；**`gravity` 决定动画机制**：`center` 用 CSS `animation`（淡入），其余用 CSS `transition`（`translate3d` 滑入）
- `index.wxss` — 动画定义；center 藏到视界外（而非 `display:none`），避免 slot 内原生组件（如 `input`）在 iOS 上隐藏态样式异常

### 类型声明

`libs/index.d.ts` 声明首组件属性/事件类型，依赖 `miniprogram-api-typings`（`WechatMiniprogram` 命名空间），兼作包 `types` 入口。`tsconfig.json` 校验 `.d.ts`。

## 约定

- 组件 options 与外部样式类只在 `libs/_Component.js` 声明，组件 `index.js` 不重复。
- 提交信息遵循**约定式提交** `type(scope): subject`（`feat(modal): ...`、`fix(modal): ...`、`docs(readme): ...`、`chore(tooling): ...`），由 commitlint 强制；husky `pre-commit` 跑 lint-staged，`commit-msg` 跑 commitlint。
- 版本与 CHANGELOG 由 changeset 流程驱动（`npm run changeset` → `npm run version` → `npm run release`），不再手工 version commit。
- 发布包只含 `libs/`（`package.json` 的 `files: ["libs"]` 白名单）；示例与配置不进发布包。
- README 是公共组件 API 的事实来源，改属性/事件需同步 README 的"可选配置项"。
- 新平台（alipay/douyin）是独立仓库，不在此仓库建示例；命名约定 `sample-{name}-{platform}`，见 README。

## 兄弟项目参考

共享基座形状参考 `minidev-ui-states-view/libs/_Component.js`；多组件聚合参考 `minidev-ui-states-view/libs/index.js`；示例的"构建 npm + miniprogram_npm"形态参考 `minidev-combo-sample`；TS/typings 参考 `minidev-combo-sample/tsconfig.json`。
