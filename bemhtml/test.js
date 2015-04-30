var bemhmtl = require('./test.bemhtml.compiled.js'),
    config = require( '../config' ),
    priv = require('./test.priv.js'),
    N = config.N,
    data = config.data.mark;

console.time('bemhmtl');
for (var i = 0; i < N; i++) {
    var res = bemhmtl.apply(priv(data));
}
console.timeEnd('bemhmtl');

console.error(res);

