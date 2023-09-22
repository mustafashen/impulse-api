import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { authenticateStaff } from "../../middlewares/cms/staffAuth_cms"
import { CategoryController } from "../../controllers/cms/categoryController_cms"
import { readSync } from "fs"

const categoryRouter_cms = express.Router()

categoryRouter_cms.post('/create', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await CategoryController.createCategoryController(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send({Success: true})
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

categoryRouter_cms.delete('/delete', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await CategoryController.deleteCategoryController(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send({Success: true})
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

categoryRouter_cms.put('/update', authenticateStaff, async (req: Request, res: Response) => {
  try {
    const resData = await CategoryController.updateCategoryController(req.body)
    if (resData?.Error) throw resData.Error
    res.status(201).send({Success: true})
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send(message)
  }
})

export {
  categoryRouter_cms
}