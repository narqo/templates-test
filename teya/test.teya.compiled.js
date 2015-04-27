var no = require( 'nommon' );

var R = require( 'teya/lib/runtime.js' );
//  Exports from runtime.
var to_array = R.to_array;
var to_string = R.to_string;
var to_number = R.to_number;
var to_xml = R.to_xml;
var copy_attrs = R.copy_attrs;
var to_tagname = R.to_tagname;
var attrs = R.attrs;
var content_attrs = R.content_attrs;
var is_empty_tag = R.is_empty_tag;
var string_attr = R.string_attr;
var xml_attr = R.xml_attr;
var string_to_attrvalue = R.string_to_attrvalue;
var xml_to_attrvalue = R.xml_to_attrvalue;

var I = R.internal_funcs;

var M = {};
var T = M.templates = {};
var V = M.vars = {};





//  list: xml
function t_list( xr, x0, a0, ca, cr ) {
    var r0 = '';
    r0 += a0.close();
    r0 += '<ul';
    a0 = attrs( 'ul', {
        'class': string_attr( 'list' )
    } );
    a0.merge( ca );
    r0 += a0.close() + cr;
    r0 += '</ul>';
    return r0;
}
T[ 'list' ] = t_list;
//  list.item: xml
function t_list_item( xr, x0, a0, ca, cr ) {
    var r0 = '';
    r0 += a0.close();
    r0 += '<li';
    a0 = attrs( 'li', {
        'class': string_attr( 'list__item' )
    } );
    a0.merge( ca );
    r0 += a0.close() + cr;
    r0 += '</li>';
    return r0;
}
T[ 'list.item' ] = t_list_item;
//  link: xml
function t_link( xr, x0, a0, ca, cr ) {
    var r0 = '';
    r0 += a0.close();
    r0 += '<a';
    a0 = attrs( 'a', {
        'class': string_attr( 'link' )
    } );
    a0.merge( ca );
    r0 += a0.close() + cr;
    r0 += '</a>';
    return r0;
}
T[ 'link' ] = t_link;
//  page: xml
function t_page( xr, x0, a0, ca, cr ) {
    var r0 = '';
    r0 += a0.close();
    //  xml
    var r1 = '', a1 = content_attrs();
    var items0 = to_array( no.jpath( '.item', x0 ) );
    for ( var i0 = 0, l0 = items0.length; i0 < l0; i0++ ) {
        var x1 = items0[ i0 ];
        //  xml
        var r2 = '', a2 = content_attrs();
        if ( no.jpath( '.selected', x1 ) ) {
            a2.add_string( 'class', ' selected' );
        } 
        //  xml
        var r3 = '', a3 = content_attrs();
        a3.set_string( 'href', '/page?id=' + to_string( no.jpath( '.id', x1 ) ) );
        r3 += to_xml( no.jpath( '.text', x1 ) );
        r2 += t_link( xr, x1, a0, a3, r3 );
        r1 += t_list_item( xr, x1, a0, a2, r2 );
    }
    r0 += t_list( xr, x0, a0, a1, r1 );
    return r0;
}
T[ 'page' ] = t_page;

M.init = function( xr, x0 ) {
}

M.run = function( xr, id ) {
    var x0 = xr;
    M.init( xr, x0 );

    var a0 = attrs();
    return T[ id ]( xr, x0, a0 );
};

module.exports = M;
