var assert = require('assert');
var fs = require('fs');
var jsup = require('../');

var src = fs.readFileSync(__dirname + '/stub.json', 'utf8');

exports.stub = function () {
    assert.equal(jsup(src).stringify(), src);
    
    assert.equal(
        jsup(src)
            .set([ 'a', 2 ], 'Three')
            .stringify()
        ,
        src.replace('"three"', '"Three"')
    );
    
    assert.equal(
        jsup(src)
            .set([ 'a', 2 ], 'Three')
            .set([ 'c' ], 'lul')
            .stringify()
        ,
        src.replace('three', 'Three').replace('444444', '"lul"')
    );
};

exports.get = function () {
    var js = jsup(src)
        .set([ 'a', 2 ], 3)
        .set([ 'c' ], 'lul')
    ;
    assert.equal(js.get([ 'a', 0 ]), 1);
    assert.equal(js.get([ 'a', 1 ]), 2);
    assert.equal(js.get([ 'a', 2 ]), 3);
    assert.deepEqual(js.get([ 'a' ]), [ 1, 2, 3 ]);
    
    assert.equal(js.get([ 'c' ]), 'lul');
    assert.ok(js.get([ 'd' ]) === null);
    
    assert.deepEqual(
        js.get([]),
        {
            a : [ 1, 2, 3 ],
            b : [ 3, 4, { c : [ 5, 6 ] } ],
            c : 'lul',
            d : null
        }
    );
    
    assert.deepEqual(
        js.get(),
        {
            a : [ 1, 2, 3 ],
            b : [ 3, 4, { c : [ 5, 6 ] } ],
            c : 'lul',
            d : null
        }
    );
};
