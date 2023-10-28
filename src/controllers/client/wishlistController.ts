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

      const foundWishlist = await WishlistModel.readWishlistLines(wishlist.id)
      if (foundWishlist?.Error) throw foundWishlist.Error

      const wishlistCustomerId = foundWishlist[0].customer_id
      if (!wishlistCustomerId || wishlistCustomerId !== body.id) throw "4001"
      
      const wishlistLines = await WishlistModel.readWishlistLines(wishlist.id)
      if (wishlistLines.Error) throw wishlistLines.Error

    } catch (error: any) {
      return {Error: error}
    }
  },

  createWishlist: async (body: {wishlist: {}, id: string, token?: string}) => {
    try {
      const customerWishlist = await WishlistModel.findCustomerWishlist(body.id)
      if (customerWishlist.noWishlistFound) {
        const wishlistSchema = {
          id: uuidv4(),
          customer_id: body.id,
        }
        const valid = validateWishlistCreateParams(wishlistSchema)
        if (!valid) throw "4022"

        const resData = await WishlistModel.createWishlist(wishlistSchema)
        if (resData?.Error) throw resData.Error
        return resData
      } else {
        return customerWishlist
      } 
    } catch (error: any) {
      return {Error: error}
    }
  },

  toggleWishlistLine: async (body: {id: string, wishlist_line: WishlistLineType}) => {
    try {
      const {wishlist_line} = body
      console.log(body)
      if (!wishlist_line) throw "4000"
      console.log('here')
     const targetWishlist = await WishlistModel.findWishlist(wishlist_line.wishlist_id)
     if (targetWishlist.Error) throw targetWishlist.Error
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