const config = ((env: any) => {
  if (env === 'test') {
    return './src/configs/.env.test'
  }
  return './src/configs/.env.dev'
})(process.env.NODE_ENV)

require('dotenv').config({ path: config })
import express from 'express'
import {customerRouter} from './routes/customer/customerRoute'
import {categoryRouter} from './routes/customer/categoryRoute'
import { staffRouter } from './routes/staff/staffRoute'

const app = express()
app.use(express.json())
app.use('/customer', customerRouter)
app.use('/category', categoryRouter)
app.use('/staff', staffRouter)
export {
  app
}