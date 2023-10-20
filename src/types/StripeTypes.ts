
interface StripeCheckoutLinesType {
    price_data: {
      currency: string,
      product_data: {
        name: string,
      },
      unit_amount: number,
    },
    quantity: number,
}[]

interface StripeCheckoutType {
    line_items: StripeCheckoutLinesType,
    mode: 'payment',
    success_url: string,
    cancel_url: string,
}

export {
    StripeCheckoutLinesType,
    StripeCheckoutType
}