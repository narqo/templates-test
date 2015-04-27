var yr = yr || require('yate/lib/runtime.js');

(function() {

    var cmpNN = yr.cmpNN;
    var cmpSN = yr.cmpSN;
    var nodeset2xml = yr.nodeset2xml;
    var nodeset2boolean = yr.nodeset2boolean;
    var nodeset2attrvalue = yr.nodeset2attrvalue;
    var nodeset2scalar = yr.nodeset2scalar;
    var scalar2attrvalue = yr.scalar2attrvalue;
    var xml2attrvalue = yr.xml2attrvalue;
    var scalar2xml = yr.scalar2xml;
    var xml2scalar = yr.xml2scalar;
    var simpleScalar = yr.simpleScalar;
    var simpleBoolean = yr.simpleBoolean;
    var selectNametest = yr.selectNametest;
    var closeAttrs = yr.closeAttrs;

    var M = new yr.Module();

    var j0 = [ ];

    var j2 = [ 0, 'item' ];

    var j3 = [ 0, 'selected' ];

    var j4 = [ 1, 0 ];

    var j5 = [ 0, 'id' ];

    var j6 = [ 0, 'text' ];

    // match /
    M.t0 = function t0(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        var j1 = [ ];

        r0 += m.a(m, 0, [ c0.doc.root ], 'list', a0)

        return r0;
    };
    M.t0.j = 1;
    M.t0.a = 1;

    // match / : list
    M.t1 = function t1(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<ul";
        a0.a = {
            'class': new yr.scalarAttr("list")
        };
        a0.s = 'ul';
        r0 += m.a(m, 0, selectNametest('item', c0, []), '', a0)
        r0 += closeAttrs(a0);
        r0 += "</ul>";

        return r0;
    };
    M.t1.j = 1;
    M.t1.a = 1;

    // match .item
    M.t2 = function t2(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<li";
        a0.a = {
            'class': new yr.scalarAttr("list__item")
        };
        a0.s = 'li';
        if (simpleBoolean('selected', c0)) {
            var tmp0 = a0.a[ "class" ];
            if (tmp0) {
                a0.a[ "class" ] = tmp0.addscalar(" selected");
            } else {
                a0.a[ "class" ] = new yr.scalarAttr(" selected");
            }
        }
        r0 += m.a(m, 0, m.s(j4, c0), 'link', a0)
        r0 += closeAttrs(a0);
        r0 += "</li>";

        return r0;
    };
    M.t2.j = j2;
    M.t2.a = 0;

    // match .item : link
    M.t3 = function t3(m, c0, i0, l0, a0) {
        var r0 = '';
        var current = [ c0 ];

        r0 += closeAttrs(a0);
        r0 += "<a class=\"" + "link" + "\" href=\"" + "/page?id=" + nodeset2attrvalue( ( selectNametest('id', c0, []) ) ) + "\">";
        r0 += nodeset2xml( selectNametest('text', c0, []) );
        r0 += "</a>";

        return r0;
    };
    M.t3.j = j2;
    M.t3.a = 0;

    M.matcher = {
        "": {
            "": [
                "t0"
            ],
            "item": [
                "t2"
            ]
        },
        "list": {
            "": [
                "t1"
            ]
        },
        "link": {
            "item": [
                "t3"
            ]
        }
    };
    M.imports = [];

    yr.register('main', M);

})();
