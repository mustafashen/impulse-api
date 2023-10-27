
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

const CartUpdateSchema = {
  type: "object",
  properties: {
    location: {type: "string"},
    address_id: {type: "string"},
    order_placed: {type: "boolean"},
  },
}

const CustomerCartFindSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    guest: {type: "boolean"}
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
  required: ['product_id', 'quantity', 'cart_id', 'id']
}

const CartLineDeleteSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    cart_id: {type: "string", format: "uuid"},
  },
  required: ['id', 'cart_id']
}

const CartLineUpdateSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    cart_id: {type: "string", format: "uuid"},
    updates: {
      type: "object",
      properties: {
        quantity: {type: "number"},
      }
    }
  },
  required: ['id']
}

const validateCartLinesReadParams = ajv.compile(CartLinesReadSchema)
const validateCartCreateParams = ajv.compile(CartCreateSchema)
const validateCartLineCreateParams = ajv.compile(CartLineCreateSchema)
const validateCartLineDeleteParams = ajv.compile(CartLineDeleteSchema)
const validateCartLineUpdateParams = ajv.compile(CartLineUpdateSchema)
const validateCustomerCartFindParams = ajv.compile(CustomerCartFindSchema)
const validateCartUpdateParams = ajv.compile(CartUpdateSchema)

export {
  validateCartLinesReadParams,
  validateCartCreateParams,
  validateCartLineCreateParams,
  validateCartLineDeleteParams,
  validateCartLineUpdateParams,
  validateCustomerCartFindParams,
  validateCartUpdateParams
}