'use strict'

const { extname } = require('path')
const { createGunzip, createDeflate, createBrotliDecompress } = require('zlib')
const { PassThrough } = require('readable-stream')

const decompress = (key) => {
  const extension = extname(key.toString())
  if (['.gz', '.gzip'].includes(extension)) {
    return createGunzip() // if the file is gzip return a transform stream to decompress it
  }

  if (['.zz', '.deflate'].includes(extension)) {
    return createDeflate() // if the file is deflate return a transform stream  to decompress it
  }

  if (createBrotliDecompress && ['.br', '.brotli'].includes(extension)) {
    return createBrotliDecompress() // if the file is brotli return a transform stream  to decompress it
  }

  // otherwise returns a passthrough stream (do not modify the content)
  return new PassThrough()
}

module.exports = decompress
