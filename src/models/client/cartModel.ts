import { knex } from "../../db/knex"


const CartModel = {
  findCart: async (cart_id: string) => {
    try {
      const res = await knex('cart').where({id: cart_id})
      if (res.length === 0 || res === 0) throw "4004" 
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  findCustomerCart: async (customer_id: string) => {
    try {
      const res = await knex('cart').where({customer_id})
      if (res.length === 0 || res === 0) return {noCartFound: true}
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  findAllCartLines: async (cart_id: string) => {
    try {
      const res = await knex('cart_line').where({cart_id})
      if (res.length === 0 || res === 0) throw "4004" 
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  createCart: async (cart: CartType) => {
    try {
      const res = await knex('cart').insert(cart)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },


  updateCart: async (cart: CartUpdateType) => {
    try {
      const res = await knex('cart').where({id: cart.id}).update(cart.updates)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  createCartLine: async (cart_line: CartLineType) => {
    try {
      const res = await knex('cart_line').insert(cart_line)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteCartLine: async (cart_line_id: string) => {
    try {
      const res = await knex('cart_line').where({id: cart_line_id}).delete()
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },
  
  updateCartLine: async (cart_line: {id: string, updates: {quantity: number}}) => {
      try {
        const res = await knex('cart_line').where({id: cart_line.id}).update(cart_line.updates)
        if (res.length === 0 || res === 0) throw "4004"
        return {Success: true}
      } catch (error: any) {
        if(error.code) {
          return {Error: error.code}
        }
        return {Error: error}
      }
  },

  findCartProduct: async (lineInfo: {product_id: string, cart_id: string}) => {
    try {
      console.log(lineInfo)
      const res = await knex('cart_line').where(lineInfo)
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  }


}

export {
  CartModel
}