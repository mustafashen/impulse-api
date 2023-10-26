import bodyParser from "body-parser"
import express, {Request, Response} from "express"
import { handleFulfillment } from "../../utils/payment/stripe/handleFulfill"

const stripeSecretKey = process.env.STRIPE_SK
const stripe = require('stripe')(stripeSecretKey)
const endPointSecret = process.env.STRIPE_ES

const stripeHooks = express.Router()

stripeHooks.post("/fulfill", bodyParser.raw({type: 'application/json'}), async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const sig = req.headers['stripe-signature']

        const event = await stripe.webhooks.constructEvent(payload, sig, endPointSecret)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            handleFulfillment(session)
        }
        res.json({received: true})
    } catch (error: any) {
        console.log(error)
        return res.status(400).send(`Error at "fulfill" webhook: ${error.message}`)
    }
})


export {
    stripeHooks 
}