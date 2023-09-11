import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CustomerLoginSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "email"},
    password: {type: "string", format: "password"},
  }
}

const validateCustomerLoginParams = ajv.compile(CustomerLoginSchema)

export {
  validateCustomerLoginParams
}