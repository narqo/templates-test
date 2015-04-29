var bh = require('./test.bh'),
    config = require( '../config' ),
    priv = require('./test.priv'),
    N = config.N,
    data = config.data.mark;

console.time('bh');
for (var i = 0; i < N; i++) {
    var res = bh.apply(priv(data));
}
console.timeEnd('bh');

console.error(res);

