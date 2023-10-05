import { knex } from "../../db/knex";
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {httpCode, message} = errorMessages("4003")

async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const {staff} = req.body

    const token = req.headers.authorization?.replace('Bearer', '')
    if (!token) throw {code: httpCode, message}

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT) throw {code: httpCode, message}

    const foundAdmin = await knex('staff').select('*').where({'id': decodedJWT.id, 'isAdmin': true})
    if (foundAdmin.length === 0) throw {code: httpCode, message}
    
    if (!foundAdmin[0].isAdmin) throw {code: httpCode, message}

    const foundTokens = await knex('staff_token').select('token').where('staff_id', decodedJWT.id)
    const foundTokensArr = foundTokens.map((tokenObj: {token: string}) => tokenObj.token)

    if (!foundTokensArr.includes(token)) throw {code: httpCode, message}
    else {
      req.body.token = token
      req.body.id = decodedJWT.id
      next()
    }
  } catch (error: any) {
    console.log(error)
    res.status(error.code).send({Error: error.message})
  }
}

export {
  authenticateAdmin
}