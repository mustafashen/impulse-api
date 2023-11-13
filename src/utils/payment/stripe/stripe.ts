const stripeSecretKey = process.env.STRIPE_SK
const stripe = require('stripe')(stripeSecretKey);

export {
  stripe
}