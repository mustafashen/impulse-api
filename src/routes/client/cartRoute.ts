import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { CartController } from "../../controllers/client/cartController"
import { actionOwnerAuth } from "../../middlewares/client/actionOwnerAuth"

const cartRouter = express.Router()

// Cart items read
// Create cart
// Add cart item
// Delete cart item
// Update Cart items



cartRouter.post('/list', actionOwnerAuth, async (req: Request, res: Response) => {
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

cartRouter.post('/create', actionOwnerAuth, async (req: Request, res: Response) => {
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

cartRouter.post('/line-create', actionOwnerAuth, async (req: Request, res: Response) => {
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

cartRouter.delete('/line-delete', actionOwnerAuth, async (req: Request, res: Response) =>{
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

cartRouter.put('/line-update', actionOwnerAuth, async (req: Request, res: Response) =>{
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

cartRouter.get('/find-customer-cart', actionOwnerAuth, async (req: Request, res: Response) => {
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