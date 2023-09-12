import {Request, Response, NextFunction} from "express"

const mockCustomerAuth = async (req: Request, res: Response, next: NextFunction) => {
  req.body.id = 1
  req.body.token = "some token"
  console.log('here')
  next()
}

export {
  mockCustomerAuth
}