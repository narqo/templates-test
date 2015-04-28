var bh = new (require('bh').BH);

bh.setOptions({
    jsAttrName: 'data-bem',
    jsAttrScheme: 'json'
});

// ------------------------------ select

bh.match('select', function(ctx, json) {
    if(!ctx.mod('mode')) throw Error('Can\'t build select without mode modifier');

    function containsVal(val) {
        return isValDef &&
            (isModeCheck?
            json.val.indexOf(val) > -1 :
            json.val === val);
    }

    function iterateOptions(content) {
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
    }

    var isValDef = typeof json.val !== 'undefined',
        isModeCheck = ctx.mod('mode') === 'check',
        firstOption, checkedOptions = [];

    iterateOptions(json.options);

    ctx
        .js({
            name : json.name,
            optionsMaxHeight : json.optionsMaxHeight
        })
        .tParam('select', json)
        .tParam('firstOption', firstOption)
        .tParam('checkedOptions', checkedOptions)
        .content([
            { elem : 'button' },
            {
                block : 'popup',
                mods : { target : 'anchor', theme : ctx.mod('theme'), autoclosable : true },
                directions : ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
                content : { block : json.block, mods : ctx.mods(), elem : 'menu' }
            }
        ]);
});

bh.match('select__button', function(ctx, json) {
    var mods = json.mods,
        select = ctx.tParam('select'),
        checkedOptions = ctx.tParam('checkedOptions');

    return {
        block : 'button',
        mix : { block : json.block, elem : json.elem },
        mods : {
            size : mods.size,
            theme : mods.theme,
            view : mods.view,
            focused : mods.focused,
            disabled : mods.disabled,
            checked : mods.mode !== 'radio' && !!checkedOptions.length
        },
        id : select.id,
        tabIndex : select.tabIndex,
        content : [
            ctx.content(),
            { block : 'icon', mix : { block : 'select', elem : 'tick' } }
        ]
    };
});

bh.match('select__control', function(ctx, json) {
    ctx
        .tag('input')
        .attrs({
            type : 'hidden',
            name : ctx.tParam('select').name,
            value : json.val,
            disabled : json.blockMods.disabled? 'disabled' : undefined
        });
});

bh.match('select__menu', function(ctx, json) {
    var mods = ctx.mods(),
        select = ctx.tParam('select'),
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

    return {
        block : 'menu',
        mix : { block : json.block, elem : json.elem },
        mods : {
            size : mods.size,
            theme : mods.theme,
            disabled : mods.disabled,
            mode : mods.mode
        },
        val : select.val,
        attrs : { tabindex : null },
        content : select.options.map(function(optionOrGroup) {
            return optionOrGroup.group?
            {
                elem : 'group',
                mods : { 'has-title' : !!optionOrGroup.title },
                title : optionOrGroup.title,
                content : optionOrGroup.group.map(optionToMenuItem)
            } :
                optionToMenuItem(optionOrGroup);
        })
    };
});

// ------------------------------ popup

bh.match('popup', function(ctx, json) {
    ctx.js({
        mainOffset : json.mainOffset,
        secondaryOffset : json.secondaryOffset,
        viewportOffset : json.viewportOffset,
        directions : json.directions,
        zIndexGroupLevel : json.zIndexGroupLevel
    });
});

// ------------------------------ button

bh.match('button', function(ctx, json) {
    var modType = ctx.mod('type'),
        isRealButton = !modType || modType === 'submit';

    ctx
        .tParam('_button', json)
        .tag(json.tag || 'button')
        .js(true)
        .attrs({
            role : 'button',
            tabindex : json.tabIndex,
            id : json.id,
            type : isRealButton? modType || 'button' : undefined,
            name : json.name,
            value : json.val,
            title : json.title
        })
        .mix({ elem : 'control' }); // NOTE: satisfy interface of `control`

    isRealButton &&
    ctx.mod('disabled') &&
    ctx.attr('disabled', 'disabled');

    var content = ctx.content();
    if(typeof content === 'undefined') {
        content = [json.icon];
        'text' in json && content.push({ elem : 'text', content : json.text });
        ctx.content(content);
    }
});

bh.match('button__text', function(ctx) {
    ctx.tag('span');
});

// ------------------------------ menu

bh.match('menu', function(ctx, json) {
    var menuMods = {
        theme : ctx.mod('theme'),
        disabled : ctx.mod('disabled')
    };

    ctx
        .js(true)
        .tParam('menuMods', menuMods)
        .mix({ elem : 'control' });

    var attrs = { role : 'menu' };
    ctx.mod('disabled') || (attrs.tabindex = 0);
    ctx.attrs(attrs);

    var firstItem,
        checkedItems = [];

    if(json.content) {
        var isValDef = typeof json.val !== 'undefined',
            isModeCheck = ctx.mod('mode') === 'check',
            containsVal = function(val) {
                return isValDef &&
                    (isModeCheck?
                    json.val.indexOf(val) > -1 :
                    json.val === val);
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

        if(!Array.isArray(json.content)) throw Error('menu: content must be an array of the menu items');

        iterateItems(json.content);
    }

    ctx
        .tParam('firstItem', firstItem)
        .tParam('checkedItems', checkedItems);
});

bh.match('menu_focused', function(ctx) {
    var js = ctx.extend(ctx.js() || {}, { live : false });
    ctx.js(js);
});

bh.match('menu_mode_radio', function(ctx) {
    ctx.applyBase();
    var firstItem = ctx.tParam('firstItem');
    if(firstItem && !ctx.tParam('checkedItems').length) {
        (firstItem.mods = firstItem.mods || {}).checked = true;
    }
});

bh.match('menu__group', function(ctx, json) {
    ctx.attr('role', 'group');

    var title = json.title;
    if(typeof title !== 'undefined') {
        ctx
            .attr('aria-label', title, true)
            .content([
                { elem : 'group-title', content : title },
                ctx.content()
            ], true);
    }
});

module.exports = bh;
