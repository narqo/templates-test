#!/bin/sh

../node_modules/teya/teya test.teya > test.teya.compiled.js
../node_modules/.bin/uglifyjs -c -m --screw-ie8 test.teya.compiled.js -o test.teya.min.js


