import Ajv from "ajv"

const ajv = new Ajv()

const CustomerLogoutSchema = {
  type: "object",
  properties: {
    token: { type: "string" }
  },
  required: ["token"]
}

const validateCustomerLogoutParams = ajv.compile(CustomerLogoutSchema)

export {
  validateCustomerLogoutParams
}