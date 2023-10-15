import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { actionOwnerAuth } from "../../middlewares/client/actionOwnerAuth"
import { WishlistController } from "../../controllers/client/wishlistController"

const wishlistRoute = express.Router()

wishlistRoute.get('/list', actionOwnerAuth, async (req: Request, res: Response) => {
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

wishlistRoute.post('/create', actionOwnerAuth, async (req: Request, res: Response) => {
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

wishlistRoute.post('/line-toggle', actionOwnerAuth, async (req: Request, res: Response) => {
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