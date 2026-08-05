# sample-modal-wechat

微信端示例工程，演示 `@mini-dev/modal` 组件。通过 `file:..` 本地依赖上层组件库包，验证"构建 npm"消费链路。

## 运行

1. 在本目录执行 `npm install`（把上层 `@mini-dev/modal` 经 `file:..` 装入 `node_modules/`）。
2. 用微信开发者工具打开**本目录**（AppID `wx132bb522ad967270`）。
3. 工具栏 → 工具 → 构建 npm：产物落到 `miniprogram_npm/@mini-dev/modal/`（`libs/` 被平铺到包根，故组件位于 `miniprogram_npm/@mini-dev/modal/modal/`）。
4. 模拟器中点击按钮切换 `center / left / top / right / bottom` 各 gravity，验证模态框动画与蒙层行为。

> 页面通过 `usingComponents` 以 `@mini-dev/modal/modal` 引用组件（npm 平铺后的子路径，注意不是 `@mini-dev/modal` 也不是 `@mini-dev/modal/libs/modal`）。
