import express, {Request, Response} from "express"

const stripeSecretKey = process.env.STRIPE_SK
const stripe = require('stripe')(stripeSecretKey)
const endPointSecret = process.env.STRIPE_ES

const stripeHooks = express.Router()

stripeHooks.post("/fulfill", async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const sig = req.headers['stripe-signature']
    
        await stripe.webhooks.constructEvent(payload, sig, endPointSecret)
        res.status(200).send({Success: true})
    } catch (error: any) {
        return res.status(400).send(`Error at "fulfill" webhook: ${error.message}`)
    }
})

export {
    stripeHooks 
}