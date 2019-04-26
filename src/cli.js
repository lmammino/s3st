#!/usr/bin/env node

'use strict'

const AWS = require('aws-sdk')
const program = require('commander')
const { pipeline } = require('readable-stream')
const createS3stStream = require('./')
const decompress = require('./transformers/decompress')
const pkg = require('../package.json')

program
  .version(pkg.version, '-v, --version')
  .option('-D, --do-not-decompress', 'Do not try to decompress files automatically (gzip, deflate, brotli)')
  .usage('[options] <bucket> [prefix]')
  .parse(process.argv)

const [bucket, prefix] = program.args

if (!bucket) {
  console.error('Error: expected "bucket" argument. Run with --help for more details on usage')
  process.exit(1)
}

const transform = program.doNotDecompress ? undefined : decompress

const s3 = new AWS.S3()
const stream = createS3stStream(s3, bucket, prefix || '', transform)

pipeline(
  stream,
  process.stdout,
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  }
)
