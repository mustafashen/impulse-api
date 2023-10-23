import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { CategoryController } from "../../controllers/client/categoryController"

const categoryRouter = express.Router()

categoryRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const resData = await CategoryController.getCategories()
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    console.log('route',error)
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

categoryRouter.post('/parent', async (req: Request, res: Response) => {
  try {
    const resData = await CategoryController.getCategoryByParentId(req.body)
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
  categoryRouter
}