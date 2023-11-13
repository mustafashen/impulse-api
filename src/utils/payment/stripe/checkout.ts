import { StripeCheckoutLinesType } from "../../../types/StripeTypes";
import { stripe } from "./stripe";

async function cartCheckout(line_items: StripeCheckoutLinesType) {
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