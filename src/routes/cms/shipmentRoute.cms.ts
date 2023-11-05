import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { authenticateStaff } from "../../middlewares/cms/staffAuth_cms"
import { ShipmentController } from "../../controllers/cms/shipmentController_cms"

const shipmentRouter_cms = express.Router()

shipmentRouter_cms.put('/add', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await ShipmentController.addShipment(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log('error')
    res.status(httpCode).send({Error: message})
  }
})

export {
  shipmentRouter_cms
}