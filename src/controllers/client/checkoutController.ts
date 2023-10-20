import { CartModel } from "../../models/client/cartModel"
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

			// convert cart_line object into line_item form in stripe api
			const session = await cartCheckout(cart_lines)
			if (session.Error) throw session.Error

			return session
    } catch (error: any) {
      console.log(error)
      return { Error: error }
    }
  },
}

export {
	CheckoutController
}