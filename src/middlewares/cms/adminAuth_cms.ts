import { knex } from "../../db/knex";
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {httpCode, message} = errorMessages("4000")

async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const {staff} = req.body

    const token = req.headers.authorization?.replace('Bearer', '')
    if (!token) res.status(httpCode).send({Error: message})

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT) res.status(httpCode).send({Error: message})

    const foundAdmin = await knex('staff').select('*').where({'id': decodedJWT.id, 'isAdmin': true})
    if (foundAdmin.length === 0) res.status(httpCode).send({Error: message})
    
    if (!foundAdmin[0].isAdmin) res.status(httpCode).send({Error: message})

    const foundAdminToken = foundAdmin[0].tokens
    if (!foundAdminToken.includes(token)) res.status(httpCode).send({Error: message})
    else {
      req.body.token = token
      req.body.id = decodedJWT.id
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({Error: 'Error during authentication'})
  }
}

export {
  authenticateAdmin
}