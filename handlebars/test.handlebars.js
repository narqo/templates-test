var Handlebars = require( 'handlebars' );
require( './test.handlebars.compiled.js' );

Handlebars.registerPartial( 'link',
    '<a class="link" href="/page?id={{ id }}">{{ content }}</a>'
);

var config = require( '../config.js' );
var data = config.data;
var N = config.N;

console.time( 'handlebars' );
for ( var i = 0; i < N; i++ ) {
    var r = Handlebars.templates.test( data );
}
console.timeEnd( 'handlebars' );

console.log( r );

