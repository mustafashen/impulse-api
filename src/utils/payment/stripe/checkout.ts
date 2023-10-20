import { StripeCheckoutLinesType } from "../../../types/StripeTypes";

const stripeSecretKey = process.env.STRIPE_SK
const stripe = require('stripe')(stripeSecretKey);

async function cartCheckout(line_items: StripeCheckoutLinesType) {
    console.log('here',line_items)
    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            // Set proper success/cancel urls
            success_url: 'https://impulse-commerce.vercel.app/',
            cancel_url: 'https://impulse-commerce.vercel.app/',
        })
        return session

    } catch (error) {
        return {Error: error}
    }
}

export {
    cartCheckout
}