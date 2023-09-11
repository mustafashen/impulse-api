import {knex} from "../../db/knex"
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
var jwt = require('jsonwebtoken')

const {httpCode, message} = errorMessages("4000")

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
    const foundCustomer = await knex('customer').select('id', 'tokens').where('id', decodedJWT.id)
    const foundCustomersTokens = foundCustomer[0].tokens
    
    // If no customer found, if token doesn't exist respond unauthorized
    // Otherwise add the id and token to request body and proceed
    if (foundCustomer.length === 0) { 
      res.status(httpCode).send({Error: message})
    } else if (!foundCustomersTokens.includes(token)) {
      res.status(httpCode).send({Error: message})
    } else {
      req.body.id = foundCustomer[0].id
      req.body.token = token
      next()
    }

  } catch (error) {
    res.status(401).send({Error: 'Error during authentication'})
  }
}


export {
  authenticateCustomer
}