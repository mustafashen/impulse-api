
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)


const CartLinesReadSchema = {
  type: "object",
  properties: {
    cart_id: {type: "string", format: "uuid"},
  },
  required: ['cart_id']
}

const CartCreateSchema = {
  type: "object",
  properties: {
    customer_id: {type: "string", format: "uuid"},
    location: {type: "string"},
    id: {type: "string", format: "uuid"},
  },
  required: ['id']
}

const validateCartLinesReadParams = ajv.compile(CartLinesReadSchema)
const validateCartCreateParams = ajv.compile(CartCreateSchema)
export {
  validateCartLinesReadParams,
  validateCartCreateParams
}