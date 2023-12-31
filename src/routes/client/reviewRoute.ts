import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { ReviewController } from "../../controllers/client/reviewController"
import { authenticateCustomer } from "../../middlewares/client/customerAuth"

const reviewRouter = express.Router()

reviewRouter.post('/customer-reviews', async (req: Request, res: Response) => {
    try {
      console.log('req',req.body)
      const resData = await ReviewController.getReviewByCustomer(req.body)
      if (resData?.Error) throw resData.Error
      console.log(resData)
      res.status(200).send(resData)
    } catch (error: any) {
      console.log('route',error)
      const {httpCode, message} = errorMessages(error)
      res.status(httpCode).send(message)
    }
})

reviewRouter.post('/product-reviews', async (req: Request, res: Response) => {
    try {
      const resData = await ReviewController.getReviewByProduct(req.body)
      if (resData?.Error) throw resData.Error
      console.log(resData)
      res.status(200).send(resData)
    } catch (error: any) {
      console.log('route',error)
      const {httpCode, message} = errorMessages(error)
      res.status(httpCode).send(message)
    }
})

reviewRouter.post('/create', authenticateCustomer, async (req: Request, res: Response) => {
    try {
      const resData = await ReviewController.createReview(req.body)
      if (resData?.Error) throw resData.Error
      console.log(resData)
      res.status(201).send(resData)
    } catch (error: any) {
      console.log('route',error)
      const {httpCode, message} = errorMessages(error)
      res.status(httpCode).send(message)
    }
})

reviewRouter.put('/update', authenticateCustomer, async (req: Request, res: Response) => {
    try {
      const resData = await ReviewController.updateReview(req.body)
      if (resData?.Error) throw resData.Error
      console.log(resData)
      res.status(200).send(resData)
    } catch (error: any) {
      console.log('route',error)
      const {httpCode, message} = errorMessages(error)
      res.status(httpCode).send(message)
    }
})

reviewRouter.delete('/delete', authenticateCustomer, async (req: Request, res: Response) => {
    try {
      const resData = await ReviewController.deleteReview(req.body)
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
    reviewRouter
}
