import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { WishlistController } from "../../controllers/client/wishlistController"
import { authenticateCustomer } from "../../middlewares/client/customerAuth"

const wishlistRoute = express.Router()

wishlistRoute.post('/list', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await WishlistController.readWishlistLines(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(200).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }  
})

wishlistRoute.post('/create', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await WishlistController.createWishlist(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

wishlistRoute.post('/line-toggle', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await WishlistController.toggleWishlistLine(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  wishlistRoute
}