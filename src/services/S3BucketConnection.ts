import AWS from 'aws-sdk'

function bucketConnect() {
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
  })
  const s3 = new AWS.S3()

  return s3
}

export {
  bucketConnect
}