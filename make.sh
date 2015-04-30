#!/bin/sh

for engine in yate teya bh bemhtml; do
  echo make $engine
  cd $engine
  [ -x "make.sh" ] && ( ./make.sh )
  cd ..
done
