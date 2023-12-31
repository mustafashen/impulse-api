import { knex } from "../../db/knex"


const CartModel = {
  findCart: async (cart_id: string) => {
    try {
      const res = await knex('cart').where({id: cart_id})
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
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  findCartLine: async (id: string) => {
    try {
      const res = await knex('cart_line').where({id})
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
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
      const res = await knex('cart').update(cart.updates).where({id: cart.id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
      const res = await knex('cart_line').delete().where({id: cart_line_id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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
        console.log('UPDATE', cart_line)
        const res = await knex('cart_line').update(cart_line.updates).where({id: cart_line.id})
        if (res.length === 0 || res === 0) return {Warning: "No changes made"}
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