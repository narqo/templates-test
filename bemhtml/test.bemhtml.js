// ------------------------------ select
block('select')(
    def().match(!this._select)(function() { // TODO: check BEM-XJST for proper applyNext
        if(!this.mods.mode) throw Error('Can\'t build select without mode modifier');

        var ctx = this.ctx,
            isValDef = typeof ctx.val !== 'undefined',
            isModeCheck = this.mods.mode === 'check',
            firstOption, checkedOptions = [],
            containsVal = function(val) {
                return isValDef &&
                    (isModeCheck?
                        ctx.val.indexOf(val) > -1 :
                        ctx.val === val);
            },
            iterateOptions = function(content) {
                var i = 0, option;
                while(option = content[i++]) {
                    if(option.group) {
                        iterateOptions(option.group);
                    } else {
                        firstOption || (firstOption = option);
                        if(containsVal(option.val)) {
                            option.checked = true;
                            checkedOptions.push(option);
                        }
                    }
                }
            };

        iterateOptions(ctx.options);

        applyNext({
            _select : this.ctx,
            _checkedOptions : checkedOptions,
            _firstOption : firstOption
        });
    }),

    js()(function() {
        var ctx = this.ctx;
        return {
            name : ctx.name,
            optionsMaxHeight : ctx.optionsMaxHeight
        };
    }),

    content()(function() {
        return [
            { elem : 'button' },
            {
                block : 'popup',
                mods : { target : 'anchor', theme : this.mods.theme, autoclosable : true },
                directions : ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
                content : { block : this.block, mods : this.mods, elem : 'menu' }
            }
        ];
    })
);

block('select').elem('button')(
    def()(function() {
        var mods = this.mods;
        applyCtx({
            block : 'button',
            mix : { block : this.block, elem : this.elem },
            mods : {
                size : mods.size,
                theme : mods.theme,
                view : mods.view,
                focused : mods.focused,
                disabled : mods.disabled,
                checked : mods.mode !== 'radio' && !!this._checkedOptions.length
            },
            id : this._select.id,
            tabIndex : this._select.tabIndex,
            content : [
                apply('content'),
                { block : 'icon', mix : { block : 'select', elem : 'tick' } }
            ]
        });
    })
);

block('select').elem('control')(
    tag()('input'),
    attrs()(function() {
        return {
            type : 'hidden',
            name : this._select.name,
            value : this.ctx.val,
            disabled : this.mods.disabled? 'disabled' : undefined
        };
    })
);

block('select').elem('menu')(
    def()(function() {
        var mods = this.mods,
            optionToMenuItem = function(option) {
                var res = {
                        block : 'menu-item',
                        mods : { disabled : mods.disabled || option.disabled },
                        val : option.val,
                        js : { checkedText : option.checkedText },
                        content : option.text
                    };

                if(option.icon) {
                    res.js.text = option.text;
                    res.content = [
                        option.icon,
                        res.content
                    ];
                }

                return res;
            };

        applyCtx({
            block : 'menu',
            mix : { block : this.block, elem : this.elem },
            mods : {
                size : mods.size,
                theme : mods.theme,
                disabled : mods.disabled,
                mode : mods.mode
            },
            val : this._select.val,
            attrs : { tabindex : undefined },
            content : this._select.options.map(function(optionOrGroup) {
                return optionOrGroup.group?
                    {
                        elem : 'group',
                        mods : { 'has-title' : !!optionOrGroup.title },
                        title : optionOrGroup.title,
                        content : optionOrGroup.group.map(optionToMenuItem)
                    } :
                    optionToMenuItem(optionOrGroup);
            })
        });
    })
);

// ------------------------------ popup

block('popup')(
    js()(function() {
        var ctx = this.ctx;
        return {
            mainOffset : ctx.mainOffset,
            secondaryOffset : ctx.secondaryOffset,
            viewportOffset : ctx.viewportOffset,
            directions : ctx.directions,
            zIndexGroupLevel : ctx.zIndexGroupLevel
        };
    })
);

// ------------------------------ button

block('button')(
    tag()(function() {
        return this.ctx.tag || 'button';
    }),

    js()(true),

    // NOTE: mix below is to satisfy interface of `control`
    mix()({ elem : 'control' }),

    attrs()(
        // Common attributes
        function() {
            var ctx = this.ctx;

            return {
                role : 'button',
                tabindex : ctx.tabIndex,
                id : ctx.id,
                title : ctx.title
            };
        },

        // Attributes for button variant
        match(function() { return !this.mods.type || this.mods.type === 'submit'; })(function() {
            var ctx = this.ctx,
                attrs = {
                    type : this.mods.type || 'button',
                    name : ctx.name,
                    value : ctx.val
                };

            this.mods.disabled && (attrs.disabled = 'disabled');

            return this.extend(applyNext(), attrs);
        })
    ),

    content()(
        function() {
            var ctx = this.ctx,
                content = [ctx.icon];
            // NOTE: wasn't moved to separate template for optimization
            'text' in ctx && content.push({ elem : 'text', content : ctx.text });
            return content;
        },
        match(function() { return typeof this.ctx.content !== 'undefined'; })(function() {
            return this.ctx.content;
        })
    )
);

block('button').elem('text').tag()('span');

// ------------------------------ menu

block('menu')(
    def()(function() {
        var ctx = this.ctx,
            mods = this.mods,
            firstItem,
            checkedItems = [];

        if(ctx.content) {
            var isValDef = typeof ctx.val !== 'undefined',
                containsVal = function(val) {
                    return isValDef &&
                        (mods.mode === 'check'?
                            ctx.val.indexOf(val) > -1 :
                            ctx.val === val);
                },
                iterateItems = function(content) {
                    var i = 0, itemOrGroup;
                    while(itemOrGroup = content[i++]) {
                        if(itemOrGroup.block === 'menu-item') {
                            firstItem || (firstItem = itemOrGroup);
                            if(containsVal(itemOrGroup.val)) {
                                (itemOrGroup.mods = itemOrGroup.mods || {}).checked = true;
                                checkedItems.push(itemOrGroup);
                            }
                        } else { // menu__group
                            iterateItems(itemOrGroup.content);
                        }
                    }
                };

            if(!this.isArray(ctx.content)) throw Error('menu: content must be an array of the menu items');

            iterateItems(ctx.content);
        }

        this._firstItem = firstItem;
        this._checkedItems = checkedItems;

        applyNext({
            _menuMods : {
                theme : mods.theme,
                disabled : mods.disabled
            }
        });
    }),
    attrs()(function() {
        var attrs = { role : 'menu' };
        this.mods.disabled || (attrs.tabindex = 0);
        return attrs;
    }),
    js()(true),
    mix()([{ elem : 'control' }])
);

block('menu').mod('focused', true).js()(function() {
    return this.extend(applyNext(), { live : false });
});

block('menu')
    .mod('mode', 'radio')
    .match(this._firstItem && this._checkedItems && !this._checkedItems.length)(
        def()(function() {
            (this._firstItem.mods = this._firstItem.mods || {}).checked = true;
            applyNext();
        }));

block('menu').elem('group')(
    attrs()({ role : 'group' }),
    match(function() { return typeof this.ctx.title !== 'undefined'; })(
        attrs()(function() {
            return this.extend(applyNext(), { 'aria-label' : this.ctx.title });
        }),
        content()(function() {
            return [
                { elem : 'group-title', content : this.ctx.title },
                applyNext()
            ];
        })
    )
);
