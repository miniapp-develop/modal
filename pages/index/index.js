Page({
    data: {
        gravity_list: ['center', 'left', 'top', 'right', 'bottom'],
        modal: {
            left: false,
            top: false,
            right: false,
            bottom: false,
            center: false
        }
    },
    _toggle(e) {
        const gravity = e.currentTarget.dataset.gravity;
        this.setData({
            modal: {
                ...this.data.modal,
                [gravity]: !this.data.modal[gravity]
            }
        });
    },
    handleToggle(e) {
        this._toggle(e);
    },
    handleClose(e) {
        this._toggle(e);
    }
});
