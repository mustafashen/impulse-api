require('dotenv').config({ path: './src/configs/.env' })
import express from 'express'
import {customerRouter} from './routes/client/customerRoute'

const app = express()
app.use(express.json())
app.use('/customer', customerRouter)

export {
  app
}