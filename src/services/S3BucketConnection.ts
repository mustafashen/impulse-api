const { S3Client } = require("@aws-sdk/client-s3"); 

function bucketConnect() {
  try {
    const credentials = {
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
      }
    }
    
    const client = new S3Client(credentials)
  
    return client
  } catch (error) {
    return {Error: error}
  }
}

export {
  bucketConnect
}