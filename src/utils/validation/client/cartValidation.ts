
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)


const CartLinesReadSchema = {
  type: "object",
  properties: {
    cart_id: {type: "string", format: "uuid"},
    id: {type: "string", format: "uuid"},
    guest: {type: "boolean"},
  },
  required: ['cart_id']
}

const validateCartLinesReadParams = ajv.compile(CartLinesReadSchema)

export {
  validateCartLinesReadParams,
}