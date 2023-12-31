import { CustomerController } from "../../controllers/client/customerController"
import express, {Request, Response} from "express"
import { authenticateCustomer } from "../../middlewares/client/customerAuth"
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

customerRouter.put("/update", authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.updateCustomer(req.body)
    if (resData?.Error) throw resData.Error
    res.send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.post("/name", async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.getCustomerName(req.body)
    if (resData?.Error) throw resData.Error
    res.send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.post("/info", authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await CustomerController.getCustomerInfo(req.body)
    if (resData?.Error) throw resData.Error
    res.send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

customerRouter.get("/activate", async (req: Request, res: Response) =>{
  try {
    //@ts-ignore
    const resData = await CustomerController.activateCustomer(req.query.token)
    if (resData?.Error) throw resData.Error
    res.send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

export {customerRouter}