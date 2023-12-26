import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { AddressController } from "../../controllers/client/addressController"
import { authenticateCustomer } from "../../middlewares/client/customerAuth"

const addressRouter = express.Router()

addressRouter.post('/create', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await AddressController.postCreateAddress(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }  
})

addressRouter.post('/list', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await AddressController.listAddress(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }  
})

addressRouter.delete('/delete', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await AddressController.deleteAddress(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }  
})

addressRouter.delete('/update', authenticateCustomer, async (req: Request, res: Response) => {
  try {
    const resData = await AddressController.updateAddress(req.body)
    if (resData?.Error) throw resData.Error
    console.log(resData)
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }  
})

export {
  addressRouter
}