import express, {Request, Response} from "express"
import { authenticateStaff } from "../../middlewares/cms/staffAuth_cms"
import { ProductController_cms } from "../../controllers/cms/productController_cms"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { storeProductImage } from "../../utils/dataStoreS3/productImages"

const productRouter_cms = express.Router()

productRouter_cms.post('/create', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await ProductController_cms.createProductController(req.body)
    if (resData.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

productRouter_cms.delete('/delete', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await ProductController_cms.deleteProductController(req.body)
    if (resData.Error) throw resData.Error
    res.status(200).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

productRouter_cms.put('/update', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await ProductController_cms.updateProductController(req.body)
    if (resData.Error) throw resData.Error
    res.status(200).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

productRouter_cms.post('/upload-image', async (req: any, res: Response) => {
  try {
    const resData = await storeProductImage(req.files, {product: {id: req.body.product_id}})
    if (resData.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  productRouter_cms
}