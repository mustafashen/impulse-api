import express, {Request, Response} from "express"
import { authenticateStaff } from "../../middlewares/cms/staffAuth_cms"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { initModel_cms } from "../../models/cms/initModel_cms"

const initRouter_cms = express.Router()

initRouter_cms.post('/model', async (req: Request, res: Response) => {
  try {
    const resData = await initModel_cms.initModel()
    if (resData.Error) throw resData.Error
    res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  initRouter_cms
}