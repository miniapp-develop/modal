const {_Component} = require('./Component');

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
            value: "0.2s"
        }
    },
    methods: {
        onTapMask(e) {
            this.triggerEvent('tapMask', {});
        }
    }
});
