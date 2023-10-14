import { WishlistModel } from "../../models/client/wishlistModel"
import { validateWishlistCreateParams, validateWishlistLineCreateParams, validateWishlistReadLineSParams } from "../../utils/validation/client/wishlistValidation"
const { v4: uuidv4 } = require('uuid')

const WishlistController = {

  readWishlistLines: async (body: {wishlist: {id: string}, guest?: boolean, id: string}) => {
    try {
      const {wishlist} = body
      if (!wishlist) throw "4000"

      const valid = validateWishlistReadLineSParams(wishlist)
      if (!valid) throw "4022"

      const foundWishlist = await WishlistModel.readWishlistLines(wishlist.id)
      if (foundWishlist?.Error) throw foundWishlist.Error

      if (body.guest) {
        const wishlistLines = await WishlistModel.readWishlistLines(wishlist.id)
        if (wishlistLines?.Error) throw wishlistLines.Error
        return wishlistLines
      } else {
        const wishlistCustomerId = foundWishlist.customer_id
        if (!wishlistCustomerId || wishlistCustomerId !== body.id) throw "4001"
        
        const wishlistLines = await WishlistModel.readWishlistLines(wishlist.id)
        if (wishlistLines.Error) throw wishlistLines.Error
      }
    } catch (error: any) {
      return {Error: error}
    }
  },

  createWishlist: async (body: {wishlist: {}, id?: string, token?: string, guest?: boolean}) => {
    try {
      if (body.guest) {
        const wishlistSchema = {
          id: uuidv4(),
        }
        const valid = validateWishlistCreateParams(wishlistSchema)
        if (!valid) throw "4022"

        const resData = await WishlistModel.createWishlist(wishlistSchema)
        if (resData.Error) throw resData.Error
        return resData
      } else if (body.id) {
        const customerWishlist = await WishlistModel.findCustomerWishlist(body.id)
        if (customerWishlist.noWishListFound) {
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
      } else throw "5000"
    } catch (error: any) {
      return {Error: error}
    }
  },

  toggleWishlistLine: async (body: {id: string, wishlist_line: WishlistLineType}) => {
    try {
      const {wishlist_line} = body
      if (!wishlist_line || wishlist_line.wishlist_id) throw "4000"
 
     // search for the cart
     // If not found throw 4004
     const targetWishlist = await WishlistModel.findWishlist(wishlist_line.wishlist_id)
     if (targetWishlist.Error) throw targetWishlist.Error
 
     // We check if the action owner's id matches the customer id of the cart
     if (targetWishlist.Error) throw targetWishlist.Error
     else if (body.id !== targetWishlist[0].customer_id)
       throw "4003"
       
     // If it is exist
     // create an id for cart
     // set quantity
     // run validation checks for cart_line
     wishlist_line.id = uuidv4()
     const valid = validateWishlistLineCreateParams(wishlist_line)
     if (!valid) throw "4022"
 
     // check if cart line for the product id exists for the same cart
     const lineProduct = await WishlistModel.findWishlistProduct({
       product_id: wishlist_line.product_id,
       wishlist_id: wishlist_line.wishlist_id
     })
     if (lineProduct.Error) throw lineProduct.Error
     // if it does just update the quantity and return
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