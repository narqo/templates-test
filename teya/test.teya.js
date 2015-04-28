var template = require( './test.teya.compiled.js' );

var config = require( '../config.js' );
var data = config.data;
var N = config.N;

console.time( 'teya' );
for ( var i = 0; i < N; i++ ) {
    var r = template.run( data, 'page' );
}
console.timeEnd( 'teya' );

console.error( r );

