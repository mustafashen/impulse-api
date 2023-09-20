import { CustomerController } from "../../controllers/client/customerController"
import express, {Request, Response} from "express"
import { authenticateCustomer } from "../../middlewares/client/auth"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"

const customerRouter = express.Router()

customerRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.postSignupCustomer(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.postLoginCustomer(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)

  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.delete("/logout", authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.deleteLogoutCustomer(req.body)
    if (resData?.Error) throw resData.Error
    res.send(resData)

  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.delete("/delete", authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.deleteAccountCustomer(req.body)
    if (resData?.Error) throw resData.Error
    res.send(resData)

  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.get("/", authenticateCustomer, async (req: Request, res: Response) => {
  try {
    // Query customer info; main info, cart, wishlist, orders etc.
    res.send({OK: 'Authorized'})
    
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})
 
export {customerRouter}