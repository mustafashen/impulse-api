import { bucketConnect } from "../../services/S3BucketConnection"
const { v4: uuidv4 } = require('uuid')
const { PutObjectCommand } = require("@aws-sdk/client-s3"); 


async function storeProductImage(files: any, body: {product: {id: string}}) {
  try {
    const s3 = bucketConnect()
    if (s3.Error) throw s3.Error

    const fileContent  = Buffer.from(files.img.data, 'binary')

    const params = {
      Bucket: `${process.env.S3_BUCKET}`,
      Key: "product/" + body.product.id + "/" + uuidv4() + ".jpg",
      Body: fileContent
    }
    console.log(params)
    const command = new PutObjectCommand(params)
    

    const resS3 = await s3.send(command)
    console.log(resS3)

    if (resS3['$metadata'].httpStatusCode === 200) return {Success: true}
    else throw "5000"

  } catch (error: any) {
    console.log(error)
    return {Error: error}
  }
}

export {
  storeProductImage
}