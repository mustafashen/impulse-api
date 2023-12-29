import { CartModel } from "../../models/client/cartModel"
import { validateCartCreateParams, validateCartLineCreateParams, validateCartLineDeleteParams, validateCartLineReadParams, validateCartLinesReadParams, validateCartUpdateParams, validateCustomerCartFindParams } from "../../utils/validation/client/cartValidation"
const { v4: uuidv4 } = require('uuid')


const CartController = {
  readCartLines: async (body: {cart: {cart_id: string}, id: string}) => {
    try {
      const {cart_id} = body.cart
      if (!cart_id) throw "4000"
      
      const valid = validateCartLinesReadParams(body.cart)
      if (!valid) throw "4000"

      const foundCart = await CartModel.findCart(cart_id)
      if (foundCart.Error) throw foundCart.Error
      else if (foundCart.length === 0) throw "4004"

      const cartCustomerId = foundCart[0].customer_id
      if (!cartCustomerId || cartCustomerId !== body.id) throw "4001"
      
      const cartLines = await CartModel.findAllCartLines(cart_id)
      if (cartLines.Error) throw cartLines.Error

      return cartLines
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  createCart: async (body: {cart: {location?: string}, id: string, token?: string}) => {
    try {
      const customerCart = await CartModel.findCustomerCart(body.id)
      if (customerCart.length === 0) {
        const cartSchema: {id: string, customer_id: string, location?: string} = {
          id: uuidv4(),
          customer_id: body.id,
        }
        if (body.cart.location) cartSchema.location = body.cart.location
        
        const valid = validateCartCreateParams(cartSchema)
        if (!valid) throw "4022"

        const resData = await CartModel.createCart(cartSchema)
        if (resData.Error) throw resData.Error
        else if (resData.Warning) return resData
        return {cart_id: cartSchema.id}
      
      } else {
        return {cart_id: customerCart[0].id}
      }

    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  },

  updateCart: async (body: {cart: CartUpdateType, id: string, token?: string}) => {
    try {
        const cartUpdateSchema = body.cart.updates
        
        const valid = validateCartUpdateParams(cartUpdateSchema)
        if (!valid) throw "4022"
        
        const customerCart = await CartModel.findCustomerCart(body.id)
        if (customerCart.length === 0) throw "4004"
        else if (customerCart[0].customer_id !== body.id) throw "4001"

        const resData = await CartModel.updateCart(body.cart)
        if (resData.Error) throw resData.Error
        return resData

    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  },

  createCartLine: async (body: {id?: string, location?: string, cart_line: CartLineType}) => {
    try {
     const {cart_line} = body
     if (!cart_line) throw "4000"

    // search for the cart
    // If not found throw 4004
    const targetCart = await CartModel.findCart(cart_line.cart_id)
    if (targetCart.Error) throw targetCart.Error
    else if (targetCart.length === 0) throw "4004"
    // We check if the action owner's id matches the customer id of the cart
    else if (body.id !== targetCart[0].customer_id)
      throw "4001"
      
    // If it is exist
    // create an id for cart
    // set quantity
    // run validation checks for cart_line
    cart_line.id = uuidv4()
    cart_line.quantity = cart_line.quantity ? cart_line.quantity : 1
    const valid = validateCartLineCreateParams(cart_line)
    if (!valid) throw "4022"

    // check if cart line for the product id exists for the same cart
    const lineProduct = await CartModel.findCartProduct({
      product_id: cart_line.product_id,
      cart_id: cart_line.cart_id
    })
    if (lineProduct.Error) throw lineProduct.Error
    // if it does just update the quantity and return
    if (lineProduct.length > 0) {
      const resData = await CartModel.updateCartLine({
        id: lineProduct[0].id,
        updates: {
          quantity: lineProduct[0].quantity + cart_line.quantity
        }
      })
      if (resData.Error) throw resData.Error
      return resData
    } else {
    // otherwise;
    // Call create line model to create cart line
    // check for errors
     const resData = await CartModel.createCartLine(cart_line)
     if (resData.Error) throw resData.Error
     return resData
    }

    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },
  deleteCartLine: async (body: {id: string, cart_line: {id: string, cart_id: string}}) => {
    try {
      const {cart_line} = body
      if (!cart_line) throw "4000"
      
      const valid = validateCartLineDeleteParams(cart_line)
      if (!valid) throw "4022"

      const foundCart = await CartModel.findCart(cart_line.cart_id)
      if (foundCart.Error) throw foundCart.Error
      else if (foundCart.length === 0) throw "4004"
      else if (body.id !== foundCart[0].customer_id)
        throw "4001"
      
      const resData = await CartModel.deleteCartLine(cart_line.id)
      if (resData.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  updateCartLine: async (body: CartLineUpdateType) => {
    try {
      const {cart_line} = body
      if (!cart_line) throw "4000"

      const valid = validateCartLineDeleteParams(cart_line)
      if (!valid) throw "4022"

      const foundCart = await CartModel.findCart(cart_line.cart_id)
      if (foundCart.Error) throw foundCart.Error
      else if (foundCart.length === 0) throw "4004"
      else if (body.id !== foundCart[0].customer_id)
        throw "4001"
      
      if (cart_line.updates.quantity === 0) {
        const resData = await CartModel.deleteCartLine(cart_line.id)
        if (resData.Error) throw resData.Error
        return resData
      } else {
        const resData = await CartModel.updateCartLine(cart_line)
        if (resData.Error) throw resData.Error
        return resData
      }
    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  },

  findCustomerCart: async (body: {id: string}) => {
    try {
      const {id} = body
      if (!id) throw "4000"

      const valid = validateCustomerCartFindParams(body)
      if (!valid) throw "4022"

      const resData = await CartModel.findCustomerCart(id)
      if (resData.Error) throw resData.Error
      else if (resData.length === 0) throw "4004"
      return resData
    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  },

  readCartLine: async (body: {id: string, cart_line: {id: string}}) => {
    try {
      const {cart_line} = body
      if (!cart_line) throw "4000"
      
      const valid = validateCartLineReadParams(body.cart_line)
      if (!valid) throw "4000"
      
      const cartLine = await CartModel.findCartLine(cart_line.id)
      if (cartLine.Error) throw cartLine.Error
      
      return cartLine
    } catch (error: any) {
      console.log(error)
      return {Error: error}
    }
  },
}

export {
  CartController
}