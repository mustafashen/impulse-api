import { StripeCheckoutLinesType } from "../../../types/StripeTypes";

const stripeSecretKey = process.env.STRIPE_SK
const stripe = require('stripe')(stripeSecretKey);

async function cartCheckout(line_items: StripeCheckoutLinesType) {
    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
    })

    return session
}

export {
    cartCheckout
}