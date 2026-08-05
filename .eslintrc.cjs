/*
 * Eslint config — 小程序组件库
 * 组件源码为 CJS，使用微信小程序全局（Component/Behavior/wx 等）。
 */
module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    env: {
        es2022: true,
        browser: true,
        node: true
    },
    globals: {
        wx: true,
        App: true,
        Page: true,
        Component: true,
        Behavior: true,
        getCurrentPages: true,
        getApp: true,
        requirePlugin: true,
        requireMiniProgram: true
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'commonjs'
    },
    rules: {
        'no-unused-vars': ['warn', { args: 'none' }],
        'no-empty': 'off'
    },
    ignorePatterns: ['node_modules', 'miniprogram_npm', 'sample-*/node_modules', 'sample-*/miniprogram_npm']
};
