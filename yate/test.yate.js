var yr = require( 'yate/lib/runtime.js' );

require( './test.yate.min.js' );

var config = require( '../config.js' );
var data = config.data;
var N = config.N;

console.time( 'yate' );
for ( var i = 0; i < N; i++ ) {
    var r = yr.run( 'main', data );
}
console.timeEnd( 'yate' );

console.error( r );

