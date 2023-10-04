import { CartModel } from "../../models/client/cartModel"
import { validateCartLinesReadParams } from "../../utils/validation/client/cartValidation"
const { v4: uuidv4 } = require('uuid')


const CartController = {
  readCartLines: async (body: {cart_id: string, guest: boolean, id: string}) => {
    try {
      if (!body.cart_id) throw "4000"
      
      const valid = validateCartLinesReadParams(body)
      if (!valid) throw "4004"

      const foundCart = await CartModel.findCart(body.cart_id)
      if (foundCart.Error) throw foundCart.Error

      // check if user is guest
      // if it is, just return cart
      if (body.guest) {

        const cartLines = await CartModel.findAllCartLines(body.cart_id)
        if (cartLines.Error) throw cartLines.Error

        return cartLines
      } else {
      // if not,
      // check if the cart belong to the user
      // if it is,
      // return the cart items
        
        const cartCustomerId = foundCart.customer_id
        if (!cartCustomerId || cartCustomerId !== body.id) throw "4001"
        
        const cartLines = await CartModel.findAllCartLines(body.cart_id)
        if (cartLines.Error) throw cartLines.Error
      }

    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  createCart: async (body: {id?: string, token?: string, guest?: boolean}) => {
    try {
      // check if user is guest
      // if it is, 
      // create cart with no customer id
      // if it is not,
      // check if the customer has a cart
      // create a new cart with customer id

      if (body.guest) {
        const resData = await CartModel.createCart({
          id: uuidv4(),
        })
        if (resData.Error) throw resData.Error
        return resData
      } else if (body.id) {
        const customerCart = await CartModel.findCustomerCart(body.id)
        if (customerCart.noCartFound) {
          const resData = await CartModel.createCart({
            id: uuidv4(),
            customer_id: body.id
          })
          if (resData.Error) throw resData.Error
          return resData
        } else {
          return customerCart
        }
      } else throw "5000"

    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  }
}

export {
  CartController
}