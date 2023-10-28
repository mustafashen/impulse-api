import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { CartController } from "../../controllers/client/cartController"
import { authenticateCustomer } from "../../middlewares/client/customerAuth"

const cartRouter = express.Router()

cartRouter.post('/list', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CartController.readCartLines(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    console.log('route',error)
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

cartRouter.post('/create', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CartController.createCart(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

cartRouter.post('/update', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CartController.updateCart(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

cartRouter.post('/line-create', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CartController.createCartLine(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

cartRouter.delete('/line-delete', authenticateCustomer, async (req: Request, res: Response) =>{
  try {
    const resData = await CartController.deleteCartLine(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(204).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

cartRouter.put('/line-update', authenticateCustomer, async (req: Request, res: Response) =>{
  try {
    const resData = await CartController.updateCartLine(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

cartRouter.get('/find-customer-cart', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CartController.findCustomerCart(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  cartRouter
}