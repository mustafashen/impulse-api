import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { authenticateAdmin } from "../../middlewares/cms/adminAuth_cms"
import { initModel_cms } from "../../models/cms/initModel_cms"

const initRoute_cms = express.Router()

initRoute_cms.post('/init-model', authenticateAdmin, async (req: Request, res: Response) => {
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
  initRoute_cms
}
