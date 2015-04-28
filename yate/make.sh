#!/bin/sh

../node_modules/.bin/yate test.yate > test.yate.compiled.js
../node_modules/.bin/uglifyjs -c -m --screw-ie8 test.yate.compiled.js -o test.yate.min.js

