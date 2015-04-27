var jade = require( 'jade' );

var config = require( '../config.js' );
var data = config.data;
var N = config.N;

var compiled = jade.compileFile( './test.jade', { compileDebug: false } );

console.time( 'jade' );
for ( var i = 0; i < N; i++ ) {
    var r = compiled( { data: data, title: 'Hello' } );
}
console.timeEnd( 'jade' );

console.log( r );

