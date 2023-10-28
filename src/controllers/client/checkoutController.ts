import { CartModel } from "../../models/client/cartModel"
import { OrderModel } from "../../models/client/orderModel"
import { ProductModel } from "../../models/client/productModel"
import { cartCheckout } from "../../utils/payment/stripe/checkout"
import { validateCartLinesReadParams } from "../../utils/validation/client/cartValidation"
import { validateCreateCheckoutParams } from "../../utils/validation/client/checkoutValidation"
const { v4: uuidv4 } = require('uuid')

const CheckoutController = {
  createCartCheckout: async (body: {cart: {cart_id: string}}) => {
    try {
			const { cart } = body
			if (!cart) throw "4000"

			const valid = validateCartLinesReadParams(cart)
			if (!valid) throw "4022"

			const cart_lines = await CartModel.findAllCartLines(cart.cart_id)
			if (cart_lines.Error) throw cart_lines.Error

			const line_items = await Promise.all(
				cart_lines.map(async (cart_line: CartLineType) => {
					const product = await ProductModel.findProductById(cart_line.product_id)
					if(product.Error) throw product.Error
					const {name, price, stock} = product[0]
					if (stock < cart_line.quantity) throw "5000"
					return {
						price_data: {
							currency: "usd",
							product_data: { 
								name: name,
							},
							unit_amount: price * 100,
						},
						quantity: cart_line.quantity
					}
				})
			)
			
			//@ts-ignore
			const session = await cartCheckout(line_items)
			if (session.Error) throw session.Error
			
			const foundCart = await CartModel.findCart(cart.cart_id)
			if (foundCart.Error) throw foundCart.Error
			const targetCart = foundCart[0]
			
			const newCheckout: CreateOrderType = {
				id: uuidv4(),
				customer_id: targetCart.customer_id,
				cart_id: targetCart.id,
				status: "pending",
				address_id: targetCart.address_id,
				total_amount: session.amount_total,
				checkout_id: session.id,
			}

			const checkoutValid =  validateCreateCheckoutParams(newCheckout)
			if (!checkoutValid) throw "4022"

			const order = await OrderModel.createOrder(newCheckout)
			if (order.Error) throw order.Error
			return {checkout_url: session.url}
    } catch (error: any) {
      return { Error: error }
    }
  },
}

export {
	CheckoutController
}