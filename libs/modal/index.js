const {_Component} = require('../index');

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
        }
    },
    methods: {
        onTapMask(e) {
            console.log(this.data);
            this.triggerEvent('tapMask', {});
        }
    }
});
