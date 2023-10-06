import { CartModel } from "../../models/client/cartModel"
import { validateCartCreateParams, validateCartLinesReadParams } from "../../utils/validation/client/cartValidation"
const { v4: uuidv4 } = require('uuid')


const CartController = {
  readCartLines: async (body: {cart: {cart_id: string}, guest: boolean, id: string}) => {
    try {
      const {cart_id} = body.cart
      if (!cart_id) throw "4000"
      
      const valid = validateCartLinesReadParams(body.cart)
      if (!valid) throw "4000"

      const foundCart = await CartModel.findCart(cart_id)
      if (foundCart.Error) throw foundCart.Error

      if (body.guest) {
        const cartLines = await CartModel.findAllCartLines(cart_id)
        if (cartLines.Error) throw cartLines.Error
        return cartLines

      } else {
        const cartCustomerId = foundCart.customer_id
        if (!cartCustomerId || cartCustomerId !== body.id) throw "4001"
        
        const cartLines = await CartModel.findAllCartLines(cart_id)
        if (cartLines.Error) throw cartLines.Error
      }

    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  createCart: async (body: {cart: {location?: string}, id?: string, token?: string, guest?: boolean}) => {
    try {
      if (body.guest) {
        const cartSchema = {
          id: uuidv4(),
          location: body.cart.location
        }
        const valid = validateCartCreateParams(cartSchema)
        if (!valid) throw "4000"
        
        const resData = await CartModel.createCart(cartSchema)
        if (resData.Error) throw resData.Error
        return resData

      } else if (body.id) {
        const customerCart = await CartModel.findCustomerCart(body.id)
        if (customerCart.noCartFound) {
          const cartSchema = {
            id: uuidv4(),
            customer_id: body.id,
            location: body.cart.location
          }
          const valid = validateCartCreateParams(cartSchema)
          if (!valid) throw "4000"

          const resData = await CartModel.createCart(cartSchema)
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
  },

  createCartLine: async (body: {cart_line: CartLineType}) => {
    try {
      const valid = validateCartCreateParams(body.cart_line)
      if (!valid) throw "4000"

      // check if product exist in the cart
      const foundCartLine = await CartModel.findCartProduct({
        product_id: body.cart_line.product_id,
        cart_id: body.cart_line.cart_id
      })
      if (foundCartLine.Error === "4004") {
        const resData = await CartModel.createCart(body.cart_line)
        if (resData.Error) throw resData.Error
        return resData
      } else {
        const cart_line = foundCartLine[0]
        const newQuantity = ++cart_line.quantity
        
        const resData = await CartModel.updateCartLine({
          cart_line_id: cart_line.id,
          updates: {
            quantity: newQuantity
          }
        })
        
        if (resData.Error) throw resData.Error
        return resData
      }
    } catch (error) {
      
    }
  },
}

export {
  CartController
}