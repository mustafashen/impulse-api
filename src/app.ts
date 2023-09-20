const config = ((env: any) => {
  if (env === 'test') {
    return './src/configs/.env.test'
  }
  return './src/configs/.env.dev'
})(process.env.NODE_ENV)

require('dotenv').config({ path: config })
import express from 'express'
import {customerRouter} from './routes/client/customerRoute'
import {categoryRouter} from './routes/client/categoryRoute'
import { staffRouter_cms } from './routes/cms/staffRoute_cms'

const app = express()
app.use(express.json())
app.use('/customer', customerRouter)
app.use('/category', categoryRouter)
app.use('/staff', staffRouter_cms)
export {
  app
}