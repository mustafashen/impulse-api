import express, {Request, Response} from "express"
import { authenticateAdmin } from "../../middlewares/cms/adminAuth_cms"
import { StaffController } from "../../controllers/cms/staffController_cms"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { authenticateStaff } from "../../middlewares/cms/staffAuth_cms"

const staffRouter_cms = express.Router()

staffRouter_cms.post('/create', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const resData = await StaffController.postCreateStaff(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

staffRouter_cms.post('/login', async (req: Request, res: Response) => {
  try {
    const resData = await StaffController.postLoginStaff(req.body)
    if (resData.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

staffRouter_cms.delete("/logout", authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await StaffController.deleteLogoutStaff(req.body)
    if (resData?.Error) throw resData.Error
    res.send(resData)

  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    console.log(httpCode, message)
    res.status(httpCode).send({Error: message})
  }
})

staffRouter_cms.delete('/delete', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const resData = await StaffController.deleteAccountStaff(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

staffRouter_cms.put('/update', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const resData = await StaffController.updateAccountStaff(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
})

export {
  staffRouter_cms
}
