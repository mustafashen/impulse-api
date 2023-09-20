
// TODO: 
// use this route to create new categories
// for this there should be an authentication system [done]
// create staff account and authentication system [done]

import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
import { authenticateStaff } from "../../middlewares/cms/staffAuth_cms"
import { CategoryController } from "../../controllers/cms/categoryController_cms"

const categoryRouter_cms = express.Router()

categoryRouter_cms.post('/create', authenticateStaff, async (req: Request, res: Response) => {
  // create new category
  // category element suppose to have a parent element
  // if there is not its going to default to all
  try {
    const resData = await CategoryController.createCategoryController(req.body)
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