import {knex} from "../../db/knex"
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
const jwt = require('jsonwebtoken')

const {httpCode, message} = errorMessages("4003")

async function authenticateCustomer(req: Request, res: Response, next: NextFunction) {
  try {

    const token = req.headers.authorization?.replace('Bearer ', '')
    // If there is no auth token respond unauthorized
    if (!token) throw {code: httpCode, message}

    // Verify token, if id is absent in it respond unauthorized
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT.id) throw {code: httpCode, message}

    // Find the customer with the id in received via token
    const foundCustomer = await knex('customer').select('id').where('id', decodedJWT.id)
    if (foundCustomer.length === 0) throw {code: "4004", message}

    const foundTokens = await knex('customer_token').select('token').where('customer_id', decodedJWT.id)
    const foundTokensArr = foundTokens.map((tokenObj: {token: string}) => tokenObj.token)

    if (!foundTokensArr.includes(token)) {
      throw {code: httpCode, message}
    } else {
      req.body.id = foundCustomer[0].id
      req.body.token = token
      next()
    }

  } catch (error: any) {
    console.log(error)
    res.status(error.code).send({Error: message})
  }
}


export {
  authenticateCustomer
}