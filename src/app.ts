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
import { productRouter_cms } from './routes/cms/productRouter_cms'
import { productRouter } from './routes/client/productRoute'
import { addressRouter } from './routes/client/addressRoute'
import rateLimit from 'express-rate-limit'
import { cartRouter } from './routes/client/cartRoute'
import { wishlistRoute } from './routes/client/wishlistRoute'
import { reviewRouter } from './routes/client/reviewRoute'
import { stripeHooks } from './routes/hooks/stripe'
import { checkoutRouter } from './routes/client/checkoutRoute'
import bodyParser from 'body-parser'

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
  max: 100, // Max requests per hour
  message: 'Rate limit exceeded. Please try again later.',
})



const app = express()
app.use((req, res, next) => {
  const baseUrl = req.originalUrl.split('/')[1]
  if (`/${baseUrl}` === '/webhooks') {
    next()
  } else {
    bodyParser.json()(req, res, next);
  }
})
app.use(limiter)

app.use('/client/customer', customerRouter) 
app.use('/client/category', categoryRouter)
app.use('/client/product', productRouter)
app.use('/client/address', addressRouter)
app.use('/client/cart', cartRouter)
app.use('/client/wishlist', wishlistRoute)
app.use('/client/review', reviewRouter)
app.use('/client/checkout', checkoutRouter)

app.use('/cms/staff', staffRouter_cms)
app.use('/cms/category', categoryRouter_cms)
app.use('/cms/product', productRouter_cms)

app.use('/webhooks/stripe', stripeHooks)

export {
  app
}