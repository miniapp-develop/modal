# @mini-dev/modal

微信小程序自定义模态框组件。本仓库同时作为 `@mini-dev` 小程序 UI 组件库的**标准模板**：目录结构、共享基座、示例工程组织、工具链均可复用为新组件库的起点。

## 安装

```shell
npm install @mini-dev/modal
```

在页面/组件中引用（小程序"构建 npm"后，`libs/` 内容平铺到包根，组件位于包根 `index.*`）：

```json
{
    "usingComponents": {
        "modal": "@mini-dev/modal"
    }
}
```

## 使用

```html
<modal
    mask="{{false}}"
    visible="{{modal.center}}"
    gravity="center"
    z-index="{{200}}"
    anim-duration=".3s"
    bindtapMask="handleClose"
    mini-class="center-ui-class"
>
    <view class="content center">
        <view>没有蒙层，动画时长：0.3s</view>
        <button bind:tap="handleClose" data-gravity="center">关闭</button>
    </view>
</modal>
```

可选配置项：

- `visible:bool` — 控制模态框的显示与隐藏
- `mask:bool` — 是否显示蒙层，默认 `true`
- `gravity:string[left|right|bottom|top|center]` — 显示位置，默认 `center`
- `z-index:int` — 控制 z-index，默认 `10`
- `anim-duration:string` — 动画时长，默认 `0.2s`
- `bindtapMask:event` — 蒙层点击事件
- `mini-class:string` — 覆盖组件内部样式的外部样式类

> 说明：若 slot 中含原生组件，部分 iOS 上隐藏时样式会异常（如 `input` 无法 hidden），因此 center 采取隐藏到视界外的方式而非 `display:none`。示例参见 `sample-modal-wechat/pages/index/`。

## 模板结构

```
libs/                       # 组件源码（miniprogram:"libs" → 构建 npm 平铺到包根）
  _Component.js             # 共享基座工厂：注入 mini-class/ui-class 外部类 + 统一 options
  index.js                  # 首组件（= modal）注册；兼作包 main 入口
  index.json / index.wxml / index.wxss / i.wxs
  index.d.ts                # 首组件类型声明；兼作包 types 入口
  <name>/                   # 第二个组件起，每个一个子目录（见“多组件扩展”）
sample-modal-wechat/        # 平台示例工程，file:.. 本地依赖本包
package.json / tsconfig.json / .eslintrc.cjs / .prettierrc.json / commitlint.config.cjs / .changeset/ / .husky/
```

### 共享基座 `_Component`

`libs/_Component.js` 包装全局 `Component()`，为所有组件注入统一默认：外部样式类 `mini-class`、`ui-class`；`options`：`virtualHost`/`styleIsolation:'isolated'`/`multipleSlots`/`pureDataPattern:/^\$_/`。组件只声明自己的 `properties`/`methods`，options 与外部类由基座统一管理。

### 多组件扩展

**首组件（包的"署名"组件）放在 `libs/` 根**（即 `libs/index.*`），消费路径为 `@mini-dev/modal`——包名与根路径一致，存量依赖方零改动。**第二个组件起**放子目录：

1. 新建 `libs/<name>/`（如 `libs/toast/`），`index.js` 中 `const {_Component} = require('../_Component'); _Component({...})`。
2. 消费方引用子路径：`"<name>": "@mini-dev/modal/<name>"`（`libs/` 平铺到包根，故子路径无 `libs/` 前缀）。
3. 如需对外暴露 JS API，在 `libs/index.js` 末尾聚合导出。

### 各平台示例命名约定

组件库不跨平台；每个平台是独立仓库（从本模板实例化）。示例工程统一命名为 `sample-{组件名}-{平台}`：

- `sample-modal-wechat` — 微信
- `sample-modal-alipay` — 支付宝（独立仓库，组件源码按支付宝写法，如 `.sjs`）
- `sample-modal-douyin` — 抖音

示例通过 `"@mini-dev/<name>": "file:.."` 本地依赖上层组件包，再在各平台 IDE 中"构建 npm"消费。

## 工具链

| 命令                              | 作用                                    |
| --------------------------------- | --------------------------------------- |
| `npm run lint`                    | eslint 检查 `libs/`                     |
| `npm run format` / `format:check` | prettier 格式化 / 校验                  |
| `npm run typecheck`               | tsc 校验 `.d.ts`                        |
| `npm run changeset`               | 新增一条 changeset                      |
| `npm run version`                 | 消费 changeset，升版本 + 更新 CHANGELOG |
| `npm run release`                 | 发布到 npm                              |

- 提交信息遵循约定式提交（`type(scope): subject`），由 commitlint 强制。
- husky：`pre-commit` 跑 lint-staged（prettier + eslint），`commit-msg` 跑 commitlint。
- 类型声明基于 `miniprogram-api-typings`，组件 `.d.ts` 随包发布（`types` 字段）。

## Changelog

### 0.0.6

- 改造为标准小程序 UI 组件库模板：多组件就绪的 `libs/`、共享基座 `_Component`、独立示例工程、统一工具链。
- 组件引用路径调整为 `@mini-dev/modal/modal`（构建 npm 平铺后子路径）。

### 0.0.5

- 支持 `mini-class`
- 默认动画时长调整为 0.2s
- 增加 `virtualHost: true` 配置
