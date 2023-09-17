import express, {Request, Response} from "express"
import { authenticateAdmin } from "../../middlewares/staff/adminAuth"
import { StaffController } from "../../controllers/staff/staffController"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"

const staffRouter = express.Router()

staffRouter.post('/createStaff', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const resData = await StaffController.postCreateStaff(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

// TODO:
// Staff login
// Staff Authentication
