
// TODO: 
// use this route to create new categories
// for this there should be an authentication system [done]
// create staff account and authentication system [done]

import express, {Request, Response} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"

const categoryRouter_cms = express.Router()


export {
  categoryRouter_cms
}