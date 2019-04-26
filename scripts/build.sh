#!/usr/bin/env bash

node_modules/.bin/nexe . -t macos-x64-12.0.0 -o build/s3st-macos --temp .nexe
node_modules/.bin/nexe . -t linux-x64-12.0.0 -o build/s3st-linux --temp .nexe
node_modules/.bin/nexe . -t alpine-x64-12.0.0 -o build/s3st-alpine --temp .nexe
node_modules/.bin/nexe . -t windows-x86-12.0.0 -o build/s3st-win.exe --temp .nexe
