import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { authenticateAdmin } from "../../middlewares/cms/adminAuth_cms"

const initModel_cms = express.Router()

initModel_cms.post('/init-model', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    // const resData = await ProductController_cms.createProductController(req.body)
    // if (resData.Error) throw resData.Error
    // res.status(201).send(resData)
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  initModel_cms
}
