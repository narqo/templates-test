/**
 * @param data {Array}
 * @returns {BEMJSON}
 */
module.exports = function(data) {
    return {
        block: 'select',
        name: 'search[mark][]',
        val: 0,
        text: 'Марка: любая',
        optionsMaxHeight: 292,
        mods: {
            size: 's',
            mode: 'radio',
            theme: 'islands',
            width: 'mmm',
            role: 'mark'
        },
        options: data.map(function(mark) {
            return {
                val: mark.id,
                text: mark.name
            };
        })
    };
};
