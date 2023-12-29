import { WishlistModel } from "../../models/client/wishlistModel"
import { validateWishlistCreateParams, validateWishlistLineCreateParams, validateWishlistReadLineSParams } from "../../utils/validation/client/wishlistValidation"
const { v4: uuidv4 } = require('uuid')

const WishlistController = {

  readWishlistLines: async (body: {wishlist: {id: string}, id: string}) => {
    try {
      const {wishlist} = body
      if (!wishlist) throw "4000"

      const valid = validateWishlistReadLineSParams(wishlist)
      if (!valid) throw "4022"

      const foundWishlist = await WishlistModel.findWishlist(wishlist.id)
      if (foundWishlist.Error) throw foundWishlist.Error
      else if (foundWishlist.length === 0) throw "4004"

      const wishlistCustomerId = foundWishlist[0].customer_id
      if (!wishlistCustomerId || wishlistCustomerId !== body.id) throw "4001"

      
      const wishlist_lines = await WishlistModel.readWishlistLines(wishlist.id)
      if (wishlist_lines?.Error) throw wishlist_lines.Error
      else if (wishlist_lines.length === 0) return wishlist_lines

      return wishlist_lines

    } catch (error: any) {
      return {Error: error}
    }
  },

  readWishlistLine: async (body: {wishlist_line: {id: string}, id: string}) => {
    try {
      const {wishlist_line} = body
      if (!wishlist_line) throw "4000"

      const valid = validateWishlistReadLineSParams(wishlist_line)
      if (!valid) throw "4022"
      
      const res = await WishlistModel.readWishlistLine(wishlist_line.id)
      if (res?.Error) throw res.Error

      return res

    } catch (error: any) {
      return {Error: error}
    }
  },

  createWishlist: async (body: {id: string, token?: string}) => {
    try {
      const customerWishlist = await WishlistModel.findCustomerWishlist(body.id)
      if (customerWishlist.length === 0) {
        const wishlistSchema = {
          id: uuidv4(),
          customer_id: body.id,
        }
        const valid = validateWishlistCreateParams(wishlistSchema)
        if (!valid) throw "4022"

        const resData = await WishlistModel.createWishlist(wishlistSchema)
        if (resData?.Error) throw resData.Error
        else if (resData.Warning) return resData
        return {wishlist_id: wishlistSchema.id}
      } else {
        return {wishlist_id: customerWishlist[0].id}
      } 
    } catch (error: any) {
      return {Error: error}
    }
  },

  toggleWishlistLine: async (body: {id: string, wishlist_line: WishlistLineType}) => {
    try {
      const {wishlist_line} = body
      if (!wishlist_line) throw "4000"

      const targetWishlist = await WishlistModel.findWishlist(wishlist_line.wishlist_id)
      if (targetWishlist.Error) throw targetWishlist.Error
      else if (targetWishlist.length === 0) throw "4004"
      else if (body.id !== targetWishlist[0].customer_id)
        throw "4003"
      

      wishlist_line.id = uuidv4()
      const valid = validateWishlistLineCreateParams(wishlist_line)
      if (!valid) throw "4022"
 

      const lineProduct = await WishlistModel.findWishlistProduct({
        product_id: wishlist_line.product_id,
        wishlist_id: wishlist_line.wishlist_id
      })
      if (lineProduct.Error) throw lineProduct.Error

      if (lineProduct.length > 0) {
      const resData = await WishlistModel.deleteWishlistLine(lineProduct[0].id)
      if (resData.Error) throw resData.Error
      return resData
      } else {
      const resData = await WishlistModel.createWishlistLine(wishlist_line)
      if (resData.Error) throw resData.Error
      return resData
      }
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },
}

export { 
  WishlistController
}