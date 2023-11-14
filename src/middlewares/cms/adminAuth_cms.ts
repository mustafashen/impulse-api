import { knex } from "../../db/knex";
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const {staff} = req.body

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) throw "4003"

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT) throw "4003"
    
    const foundAdmin = await knex('staff').select('*').where({'id': decodedJWT.id, 'isAdmin': true})
    if (foundAdmin.length === 0) throw "4003"
    if (!foundAdmin[0].isAdmin) throw "4003"

    const foundTokens = await knex('staff_token').select('token').where('staff_id', decodedJWT.id)
    const foundTokensArr = foundTokens.map((tokenObj: {token: string}) => tokenObj.token)

    console.log(foundTokensArr, [token])
    if (!foundTokensArr.includes(token)) throw "4003"
    else {
      req.body.token = token
      req.body.id = decodedJWT.id
      next()
    }
  } catch (error: any) {
    const {httpCode, message} = errorMessages(error)
    res.status(httpCode).send({Error: message})
  }
}

export {
  authenticateAdmin
}