var bh = require('./test.bh'),
    config = require( '../config' ),
    priv = require('./test.priv'),
    N = config.N,
    data = config.data.mark;

console.time('bh');

for (var i = 0; i < N; i++) {
    try {
        var res = bh.apply(priv(data));

        //console.log(res);
    } catch (e) {
        return 'Execution error:\n' + e.stack;
    }
}

console.timeEnd('bh');
