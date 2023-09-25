import {knex} from "../../db/knex"
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
const jwt = require('jsonwebtoken')

const {httpCode, message} = errorMessages("4003")

async function authenticateCustomer(req: Request, res: Response, next: NextFunction) {
  try {

    const token = req.headers.authorization?.replace('Bearer ', '')
    // If there is no auth token respond unauthorized
    if (!token) {
      res.status(httpCode).send({Error: message})
    }
    // Verify token, if id is absent in it respond unauthorized
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT.id) res.status(httpCode).send({Error: message})

    // Find the customer with the id in received via token
    const foundCustomer = await knex('customer').select('id').where('id', decodedJWT.id)
    if (foundCustomer.length === 0) res.status(httpCode).send({Error: message})

    const foundTokens = await knex('customer_token').select('token').where('customer_id', decodedJWT.id)
    const foundTokensArr = foundTokens.map((tokenObj: {token: string}) => tokenObj.token)

    console.log(foundTokens)
    if (!foundTokensArr.includes(token)) {
      res.status(httpCode).send({Error: message})
    } else {
      req.body.id = foundCustomer[0].id
      req.body.token = token
      next()
    }

  } catch (error) {
    console.log(error)
    res.status(401).send({Error: 'Error during authentication'})
  }
}


export {
  authenticateCustomer
}