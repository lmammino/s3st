# s3st

A command line utility that allows you to stream data from multiple S3 objects
directly into your terminal.

[![npm version](https://badge.fury.io/js/s3st.svg)](https://badge.fury.io/js/s3st)
[![CircleCI](https://circleci.com/gh/lmammino/s3st.svg?style=shield)](https://circleci.com/gh/lmammino/s3st)
[![Codecov coverage](https://codecov.io/gh/lmammino/s3st/branch/master/graph/badge.svg)](https://codecov.io/gh/lmammino/s3st)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Rationale

This utility is particularly useful when you are storing data in S3 and you want
to easily process the content of your S3 objects from your command line,
for instance if you are storing your CloudTrail logs in an S3 buckets and you
want to grep over them you can do something like this:

```bash
s3st mybucket AWSLogs/123456789/CloudTrail/eu-west-1/2019/01/17/ | jq . | grep "lambda"
```

By default the command line will be able to decompress most compressed files in
realtime (gzip, brotli and deflate).


## Install

With NPM (Requires Node v10+):

```bash
npm i -g s3st
```


## Usage

```bash
Usage: s3st [options] <bucket> [prefix]

Options:
  -v, --version            output the version number
  -D, --do-not-decompress  Do not try to decompress files automatically (gzip, deflate, brotli)
  -h, --help               output usage information
```

`bucket` represents the name of the bucket to iterate over
`prefix` is an optional argument that you can pass to select a subset of object
that match the given prefix.


## Automatic Decompression

The command will automatically try to decompress compressed files based on their
extension, as per the following mapping:

 - `.gz` or `.gzip`: decompress using gzip
 - `.zz` or `.deflate`: decompress using deflate
 - `.br` or `.brotli`: decompress using brotli (available only if using Node v11.7+)

If you want to disable this option you can specify the flag `--do-not-decompress`


## Programmatic usage

This package can also be used programmatically as per the following example:

```javascript
'use strict'

const createS3stStream = require('s3st')
const AWS = require('aws-sdk')

// creates an s3 client using the AWS SDK
const s3 = new AWS.S3()

const stream = createS3stStream(s3, 'mybucket', 'some-prefix')

stream.pipe(process.stdout) // attach the stream to standard output
```

`createS3stStream` exposes accepts the following arguments:

- `s3`: an s3 client instance from the AWS SDK or a compatible implementation
- `bucketName`: the name of the bucket
- `prefix` (optional): an object prefix to filter objects in the bucket
- `transform` (optional): a function that allows you to transform the content of
objects as they get streamed (useful for instance for decompression or decryption).

### Transform function

If you want to provide a custom transform function, it should respect the following
signature.

#### Arguments
 - `key` (string): the name of the current object (object key)

#### Return value
 - a `Transform` stream that manipulates the object

If you want to use the default decompression implementation available by the
default in the command line client, you can import that from [`s3st/src/transformers/decompress`](/src/transformers/decompress.js).


## Contributing

Everyone is very welcome to contribute to this project. You can contribute just by submitting bugs or
suggesting improvements by [opening an issue on GitHub](https://github.com/lmammino/s3st/issues).

You can also submit PRs as long as you adhere with the code standards and write tests for the proposed changes.

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
