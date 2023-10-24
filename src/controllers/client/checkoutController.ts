import { CartModel } from "../../models/client/cartModel"
import { ProductModel } from "../../models/client/productModel"
import { cartCheckout } from "../../utils/payment/stripe/checkout"
import { validateCartLinesReadParams } from "../../utils/validation/client/cartValidation"

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
					const {name, price} = product[0]
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

			return session
    } catch (error: any) {
      return { Error: error }
    }
  },
}

export {
	CheckoutController
}