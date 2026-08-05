# Changesets

本仓库用 [changesets](https://github.com/changesets/changesets) 管理版本与 CHANGELOG。

## 流程

1. 写完一批改动后，运行 `npm run changeset`，按提示选择语义类型（patch/minor/major）并填写变更摘要，会在 `.changeset/` 下生成一条 changeset 文件（提交到 git）。
2. 合并到 `master` 后，运行 `npm run version`：changeset 消费所有待处理 changeset，按语义类型升级 `package.json` 版本号、更新 `CHANGELOG.md`，并删除已消费的 changeset 文件。
3. 运行 `npm run release`（`changeset publish`）将新版本发布到 npm。

## 提交与发布约定

- 提交信息遵循约定式提交（Conventional Commits）：`type(scope): subject`，如 `feat(modal): add x`、`fix(modal): ...`、`docs(readme): ...`、`chore(tooling): ...`。由 commitlint 强制。
- `type` 影响 changeset 默认的语义类型推断；CHANGELOG 由 changeset 文件的摘要生成。
