'use strict'

const S3ListBucketStream = require('s3-list-bucket-stream')
const S3ObjectContentStream = require('s3-object-content-stream')
const pumpify = require('pumpify')

const createS3stStream = (s3, bucketName, prefix = '', transformer = undefined) => {
  // create the instance for the list bucket stream
  const listBucketStream = new S3ListBucketStream(
    s3,
    bucketName,
    prefix
  )

  // create the instance for the object content stream
  const objectContentStream = new S3ObjectContentStream(
    s3,
    bucketName,
    transformer
  )

  return pumpify(listBucketStream, objectContentStream)
}

module.exports = createS3stStream
