const { _Component } = require('./_Component');

_Component({
    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        mask: {
            type: Boolean,
            value: true
        },
        gravity: {
            type: String,
            value: 'center'
        },
        zIndex: {
            type: Number,
            value: 10
        },
        animDuration: {
            type: String,
            value: '0.2s'
        }
    },
    methods: {
        onTapMask(e) {
            this.triggerEvent('tapMask', {});
        }
    }
});

// 包 JS 入口（package.json 的 main）：导出共享基座，供需要基于同一基座二次封装的 JS 消费者使用。
// 作为组件被 usingComponents 加载时，WeChat 组件系统忽略 module.exports，仅消费上面的 _Component({...}) 注册。
module.exports = { _Component };
