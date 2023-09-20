import express, {Request, Response} from "express"
import { authenticateAdmin } from "../../middlewares/staff/adminAuth"
import { StaffController } from "../../controllers/staff/staffController"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"

const staffRouter = express.Router()

staffRouter.post('/staffCreate', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) throw "6000" 
    const resData = await StaffController.postCreateStaff(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

staffRouter.post('/staffLogin',async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) throw "6000" 
    const resData = await StaffController.postLoginStaff(req.body)
    if (resData.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

export {
  staffRouter
}
// TODO:
// Staff login, so admin can get authentication token to do admin stuff like creating new staff
// Staff Authentication, for all staff ops
