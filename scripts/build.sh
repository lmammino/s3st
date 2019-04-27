#!/usr/bin/env bash

VERSION=$1
V=$(echo $VERSION | tr . _)
NODE_VERSION=12.0.0

for PLATFORM in "macos-x64" "linux-x64" "alpine-x64" "windows-x86"
do
  SUFFIX=$(echo $PLATFORM | cut -d'-' -f1)
  if [ "$SUFFIX" == "windows" ]
  then
    SUFFIX="${SUFFIX}.exe"
  fi
  DEST="build/s3st-${V}-${SUFFIX}"
  node_modules/.bin/nexe . -t ${PLATFORM}-${NODE_VERSION} -o ${DEST} --temp .nexe
  gzip ${DEST}
done
