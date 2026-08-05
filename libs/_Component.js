// 共享基座工厂：包装全局 Component()，注入模板统一约定的外部样式类与组件选项。
// 各组件通过 require('../_Component') 调用 _Component(opts)，无需重复声明 externalClasses/options。
function _Component(opts = {}) {
    opts.externalClasses = ['mini-class', 'ui-class'].concat(opts.externalClasses || []);
    opts.behaviors = [].concat(opts.behaviors || []);
    opts.options = Object.assign(
        {
            virtualHost: true,
            styleIsolation: 'isolated',
            multipleSlots: true,
            pureDataPattern: /^\$_/
        },
        opts.options || {}
    );
    return Component(opts);
}

module.exports = { _Component };
