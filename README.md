# @mini-dev/modal

微信小程序自定义模态框组件，支持 `center` / `left` / `right` / `top` / `bottom` 五种定位、可选蒙层、动画时长可配。

> 本仓库同时作为 `@mini-dev` 小程序 UI 组件库的**标准模板**：目录结构、共享基座、示例工程组织、工具链均可复用为新组件库的起点。若要以此新建组件库，见 [6. 作为模板使用](#6-作为模板使用) 与 [7. 开发与工具链](#7-开发与工具链)。

## 1. 安装

```shell
npm install @mini-dev/modal
```

## 2. 快速上手

### 2.1 构建 npm

在小程序源码工程的 `package.json` 中依赖本包后，用**微信开发者工具**打开该工程，菜单 **工具 → 构建 npm**。构建后 `libs/` 内容平铺到 `miniprogram_npm/@mini-dev/modal/` 根，组件即位于 `index.*`。

### 2.2 声明组件

在页面或自定义组件的 `.json` 中注册：

```json
{
    "usingComponents": {
        "modal": "@mini-dev/modal"
    }
}
```

### 2.3 基础用法

页面 `index.js`：

```js
Page({
    data: { visible: false },
    open() {
        this.setData({ visible: true });
    },
    close() {
        this.setData({ visible: false });
    }
});
```

页面 `index.wxml`：

```html
<modal visible="{{visible}}" gravity="center" bindtapMask="close">
    <view class="content">模态框内容</view>
    <button bind:tap="close">关闭</button>
</modal>
```

## 3. API 参考

### 3.1 属性

| 属性            | 类型    | 默认值   | 说明                                                          |
| --------------- | ------- | -------- | ------------------------------------------------------------- |
| `visible`       | Boolean | `false`  | 控制模态框的显示与隐藏                                        |
| `mask`          | Boolean | `true`   | 是否显示蒙层                                                  |
| `gravity`       | String  | `center` | 定位方向，可选 `center` / `left` / `right` / `top` / `bottom` |
| `z-index`       | Number  | `10`     | 层级                                                          |
| `anim-duration` | String  | `0.2s`   | 动画时长                                                      |
| `mini-class`    | String  | —        | 外部样式类，覆盖组件内部样式                                  |

### 3.2 事件

| 事件          | 触发时机                     |
| ------------- | ---------------------------- |
| `bindtapMask` | 蒙层被点击时触发，常用于关闭 |

### 3.3 插槽

默认插槽承载模态框内容。基座默认启用 `multipleSlots`，需要多插槽时按小程序 `<slot name="xxx" />` 约定使用。

> iOS 注意：若 slot 内含原生组件（如 `input`），部分 iOS 在隐藏时样式异常，因此 `center` 采用移出视界外而非 `display:none`。

## 4. 使用示例

### 4.1 居中 + 蒙层（默认）

```html
<modal visible="{{center}}" gravity="center" bindtapMask="close">
    <view>居中模态框</view>
</modal>
```

### 4.2 无蒙层 + 自定义动画

```html
<modal mask="{{false}}" visible="{{center}}" gravity="center" anim-duration=".3s" mini-class="center-ui-class">
    <view>没有蒙层，动画时长 0.3s</view>
</modal>
```

### 4.3 底部弹出

```html
<modal visible="{{bottom}}" gravity="bottom" bindtapMask="close">
    <view>底部弹出</view>
</modal>
```

## 5. 平台示例工程

本仓库为微信端，`sample-modal-wechat/` 是可运行的微信示例，通过 `file:..` 本地依赖本包：

```shell
cd sample-modal-wechat
npm install
```

用微信开发者工具打开 `sample-modal-wechat/` 目录（AppID 见 `project.config.json`），**工具 → 构建 npm** 后在模拟器查看效果。

## 6. 作为模板使用

本节面向"以此仓库为模板新建组件库"的使用者。

### 6.1 目录结构

```
libs/                       # 组件源码（miniprogram:"libs" → 构建 npm 平铺到包根）
  _Component.js             # 共享基座工厂：注入 mini-class/ui-class 外部类 + 统一 options
  index.js                  # 首组件（= modal）注册；兼作包 main 入口
  index.json / index.wxml / index.wxss / i.wxs
  index.d.ts                # 首组件类型声明；兼作包 types 入口
  <name>/                   # 第二个组件起，每个一个子目录（见 6.3 多组件扩展）
sample-modal-wechat/        # 平台示例工程，file:.. 本地依赖本包
package.json / tsconfig.json / .eslintrc.cjs / .prettierrc.json / commitlint.config.cjs / .changeset/ / .husky/
```

### 6.2 共享基座 `_Component`

`libs/_Component.js` 包装全局 `Component()`，为所有组件注入统一默认：外部样式类 `mini-class`、`ui-class`；`options`：`virtualHost` / `styleIsolation:'isolated'` / `multipleSlots` / `pureDataPattern:/^\$_/`。组件只声明自己的 `properties` / `methods`，`options` 与外部类由基座统一管理，**不要在组件 `index.js` 里重复声明**。

### 6.3 多组件扩展

**首组件（包的"署名"组件）放在 `libs/` 根**（即 `libs/index.*`），消费路径为 `@mini-dev/modal`——包名与根路径一致，存量依赖方零改动。**第二个组件起**放子目录：

1. 新建 `libs/<name>/`（如 `libs/toast/`），`index.js` 中 `const {_Component} = require('../_Component'); _Component({...})`。
2. 消费方引用子路径：`"<name>": "@mini-dev/modal/<name>"`（`libs/` 平铺到包根，故子路径无 `libs/` 前缀）。
3. 如需对外暴露 JS API，在 `libs/index.js` 末尾聚合导出。

### 6.4 各平台示例命名约定

组件库不跨平台；每个平台是独立仓库（从本模板实例化）。示例工程统一命名为 `sample-{组件名}-{平台}`：

- `sample-modal-wechat` — 微信
- `sample-modal-alipay` — 支付宝（独立仓库，组件源码按支付宝写法，如 `.sjs`）
- `sample-modal-douyin` — 抖音

示例通过 `"@mini-dev/<name>": "file:.."` 本地依赖上层组件包，再在各平台 IDE 中"构建 npm"消费。

## 7. 开发与工具链

| 命令                              | 作用                                    |
| --------------------------------- | --------------------------------------- |
| `npm run lint`                    | eslint 检查 `libs/`                     |
| `npm run format` / `format:check` | prettier 格式化 / 校验                  |
| `npm run typecheck`               | tsc 校验 `.d.ts`                        |
| `npm run changeset`               | 新增一条 changeset                      |
| `npm run version`                 | 消费 changeset，升版本 + 更新 CHANGELOG |
| `npm run release`                 | 发布到 npm                              |

- 提交信息遵循**约定式提交** `type(scope): subject`（如 `feat(modal): ...` / `fix(modal): ...` / `docs(readme): ...`），由 commitlint 强制。
- husky：`pre-commit` 跑 lint-staged（prettier + eslint），`commit-msg` 跑 commitlint。
- 类型声明基于 `miniprogram-api-typings`，组件 `.d.ts` 随包发布（`package.json` 的 `types` 字段）。

## 8. Changelog

### 0.0.6

- 改造为标准小程序 UI 组件库模板：多组件就绪的 `libs/` 结构、共享基座 `_Component`、独立示例工程 `sample-modal-wechat/`、统一工具链（eslint / prettier / commitlint + husky / changeset / TS 类型声明）。
- 仓库地址迁移至 https://github.com/xesam/minidev-ui-modal 。
- 组件消费路径保持 `@mini-dev/modal`（根路径，存量依赖方零改动）。

### 0.0.5

- 支持 `mini-class`
- 默认动画时长调整为 0.2s
- 增加 `virtualHost: true` 配置
