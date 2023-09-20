import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CustomerLoginSchema = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", format: "password"},
  },
  required: ["email", "password"]
}

const validateCustomerLoginParams = ajv.compile(CustomerLoginSchema)

export {
  validateCustomerLoginParams
}