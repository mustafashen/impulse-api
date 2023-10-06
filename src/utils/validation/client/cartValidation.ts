
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CartCreateSchema = {
  type: "object",
  properties: {
    customer_id: {type: "string", format: "uuid"},
    location: {type: "string"},
    id: {type: "string", format: "uuid"},
  },
  required: ['id']
}

const CartLinesReadSchema = {
  type: "object",
  properties: {
    cart_id: {type: "string", format: "uuid"},
  },
  required: ['cart_id']
}

const CartLineCreateSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    cart_id: {type: "string", format: "uuid"},
    product_id: {type: "string", format: "uuid"},
    quantity: {type: "number"}
  },
  required: ['id', 'cart_id', 'product_id']
}

const validateCartLinesReadParams = ajv.compile(CartLinesReadSchema)
const validateCartCreateParams = ajv.compile(CartCreateSchema)
export {
  validateCartLinesReadParams,
  validateCartCreateParams
}