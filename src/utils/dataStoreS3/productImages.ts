import { ByteBuffer } from "aws-sdk/clients/cloudtrail"
import { bucketConnect } from "../../services/S3BucketConnection"
const { v4: uuidv4 } = require('uuid')

const s3 = bucketConnect()

async function storeProductImage(files: any, body: {product: {id: string}}) {
  try {
    
    const fileContent  = Buffer.from(files.uploadedFileName.data, 'binary')

    const params = {
      Bucket: `${process.env.S3_PRODUCT_IMG_BUCKET_NAME}`,
      Key: "product" + "/" + body.product.id + "/" + uuidv4() + ".jpg",
      Body: fileContent
    }

    let resData;
    s3.upload(params, function(err: any, data: ByteBuffer) {
      if (err) {
          throw err;
      }
      resData = data
    })
    
    return {
      Success: true,
      response_data: resData
    }
  } catch (error: any) {
    return {Error: error}
  }
}

export {
  storeProductImage
}