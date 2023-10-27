
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CreateCheckoutSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    customer_id: {type: "string", format: "uuid"},
    cart_id: {type: "string", format: "uuid"},
    status: {type: "string"},
    address_id: {type: "string"},
    total_amount: {type: "number"},
    checkout_id: {type: "string"}
  },
}


const validateCreateCheckoutParams = ajv.compile(CreateCheckoutSchema)
export {
  validateCreateCheckoutParams,
}