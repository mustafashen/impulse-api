import { knex } from "../../db/knex";
import {Request, Response, NextFunction} from "express"
import { errorMessages } from "../../utils/responseMessages/errorsMessages"
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {httpCode, message} = errorMessages("4000")

async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer', '')
    if (!token) res.status(httpCode).send({Error: message})

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedJWT) res.status(httpCode).send({Error: message})

    const foundStaff = await knex('staff').select('id', 'tokens', 'password, isAdmin').where({'id': decodedJWT.id})
    if (foundStaff.length === 0) res.status(httpCode).send({Error: message})

    if (!foundStaff[0].isAdmin) res.status(httpCode).send({Error: message})

    const foundStaffToken = foundStaff[0].tokens
    if (!foundStaffToken.includes(token)) res.status(httpCode).send({Error: message})

    const foundStaffPassword = foundStaff[0].password
    const isMatch = await bcrypt.compare(foundStaffPassword, req.body.password)
    if (!isMatch) res.status(httpCode).send({Error: message})

  } catch (error) {
    res.status(401).send({Error: 'Error during authentication'})
  }
}

export {
  authenticateAdmin
}