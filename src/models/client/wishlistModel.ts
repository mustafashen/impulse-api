import { knex } from "../../db/knex"

const WishlistModel = {
  findWishlist: async (wishlist_id: string) => {
    try {
      const res = await knex('wishlist').where({id: wishlist_id})
      if (res.length === 0 || res === 0) throw "4004"
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },
  readWishlistLines: async (wishlist_id: string) => {
    try {
      const res = await knex('wishlist_line').where({wishlist_id})
      if (res.length === 0 || res === 0) throw "4004" 
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  createWishlist: async (wishlist: WishlistType) => {
    try {
      const res = await knex('wishlist').insert(wishlist)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  createWishlistLine: async (wishlist_line: WishlistLineType) => {
    try {
      const res = await knex('wishlist_line').insert(wishlist_line)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  deleteWishlistLine: async (wishlist_line_id: string) => {
    try {
      const res = await knex('wishlist_line').where({id: wishlist_line_id}).delete()
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  findCustomerWishlist: async (wishlist_id: string) => {
    try {
      const res = await knex('wishlist').where({id: wishlist_id})
      if (res.length === 0 || res === 0) return {noWishlistFound: true}
      return res
    } catch (error: any) {
      if(error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },

  findWishlistProduct: async (lineInfo: {product_id: string, wishlist_id: string}) => {
    try {
      const res = await knex('wishlist_line').where(lineInfo)
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
  WishlistModel
}