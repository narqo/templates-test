#!/bin/sh

cat lib/i-bem.bemhtml.js test.bemhtml.js | ../node_modules/.bin/bem-xjst > test.bemhtml.compiled.js
../node_modules/.bin/uglifyjs -c -m --screw-ie8 test.bemhtml.compiled.js -o test.bemhtml.min.js
