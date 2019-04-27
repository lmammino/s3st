#!/usr/bin/env bash

VERSION=$1
V=$(echo $VERSION | tr . _)

for platform in "macos" "linux" "alpine" "win.exe"
do
  DEST="build/s3st-${V}-${platform}"
  node_modules/.bin/nexe . -t macos-x64-12.0.0 -o $DEST --temp .nexe
  gzip $DEST
done
