function defaultArray(val) {
    return val || [];
}

function create(extra, factory = Component) {
    return function (options = {}) {
        options.externalClasses = defaultArray(extra.externalClasses).concat(defaultArray(options.externalClasses));
        options.behaviors = defaultArray(extra.behaviors).concat(defaultArray(options.behaviors));
        options.options = {
            ...extra.options,
            ...options.options
        }
        factory(options);
    }
}

const _Component = create({
    externalClasses: ['ui-class'],
    options: {
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^\$_/
    }
});

exports._Component = _Component;