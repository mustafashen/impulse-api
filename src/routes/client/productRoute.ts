import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { ProductController } from "../../controllers/client/productController"

const productRouter = express.Router()

productRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const resData = await ProductController.getProducts()
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    console.log('route',error)
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  productRouter
}