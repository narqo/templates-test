#!/bin/sh

run()
{
  cd $1
  ./run.sh 2> /dev/null
  cd ..
}

for engine in yate teya bh bemhtml; do
  echo run $engine...
  run $engine
done
