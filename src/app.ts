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
import { categoryRouter_cms } from './routes/cms/categoryRoute_cms'

const app = express()
app.use(express.json())
app.use('/client/customer', customerRouter)
app.use('/client/category', categoryRouter)

app.use('/cms/staff', staffRouter_cms)
app.use('/cms/category', categoryRouter_cms)

export {
  app
}