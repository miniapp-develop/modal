function defaultArray(val) {
    return val || [];
}

function create(extra, factory = Component) {
    return function (options = {}) {
        options.externalClasses = defaultArray(extra.externalClasses).concat(defaultArray(options.externalClasses));
        options.behaviors = defaultArray(extra.behaviors).concat(defaultArray(options.behaviors));
        options.options = Object.assign({}, extra.options || {}, options.options || {});
        factory(options);
    }
}

const _Component = create({
    externalClasses: ['ui-class', 'mini-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^\$_/,
        virtualHost: true
    }
});

exports._Component = _Component;