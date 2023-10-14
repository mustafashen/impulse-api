import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const WishlistSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    customer_id: {type: "string", format: "uuid"}
  },
  required: ['id']
}

const WishlistLineSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    wishlist_id: {type: "string", format: "uuid"},
    product_id: {type: "string", format: "uuid"}
  },
  required: ['id', 'wishlist_id', 'product_id']
}

const WishlistReadLineSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
  },
  required: ['id']
}

const validateWishlistCreateParams = ajv.compile(WishlistSchema)
const validateWishlistLineCreateParams = ajv.compile(WishlistLineSchema)
const validateWishlistReadLineSParams = ajv.compile(WishlistReadLineSchema)

export {
  validateWishlistCreateParams,
  validateWishlistLineCreateParams,
  validateWishlistReadLineSParams
}