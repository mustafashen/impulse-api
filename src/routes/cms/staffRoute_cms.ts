import express, {Request, Response} from "express"
import { authenticateAdmin } from "../../middlewares/cms/adminAuth_cms"
import { StaffController } from "../../controllers/cms/staffController_cms"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"

const staffRouter_cms = express.Router()

staffRouter_cms.post('/create', authenticateAdmin, async (req: Request, res: Response) => {
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

staffRouter_cms.post('/login',async (req: Request, res: Response) => {
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
  staffRouter_cms
}
// TODO:
// Staff login, so admin can get authentication token to do admin stuff like creating new staff
// Staff Authentication, for all staff ops
