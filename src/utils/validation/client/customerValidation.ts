
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)
ajv.addFormat("phone", /^(\+\d{1,3})\d{10}$/)

const CustomerSignupSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    name: {type: "string"},
    last_name: {type: "string"},
    birth_date: {type: "string", format: "date"},
    email: {type: "string", format: "email"},
    password: {type: "string", format: "password"},
    phone: {type: "string", format: "phone"},
    gender: {type: "string"},
    is_active: {type: "boolean"},
  },
  required: ["id", "name", "last_name", "email", "password"],
}

const CustomerLoginSchema = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", format: "password"},
  },
  required: ["email", "password"]
}
const CustomerLogoutSchema = {
  type: "object",
  properties: {
    token: { type: "string" }
  },
  required: ["token"]
}

const CustomerUpdateSchema = {
  type: "object",
  properties: {
    password: { type: "string", format: "password"},
    updates: { 
      type: "object",
      properties: {
        name: {type: "string"},
        last_name: {type: "string"},
        birth_date: {type: "string", format: "date"},
        email: {type: "string", format: "email"},
        password: {type: "string", format: "password"},
        phone: {type: "string", format: "phone"},
        gender: {type: "string"},
        is_active: {type: "boolean"},
      }
    }
  },
  required: ["password"]
}

const validateCustomerUpdateParams = ajv.compile(CustomerUpdateSchema)
const validateCustomerLogoutParams = ajv.compile(CustomerLogoutSchema)
const validateCustomerLoginParams = ajv.compile(CustomerLoginSchema)
const validateCustomerSignupParams = ajv.compile(CustomerSignupSchema)

export {
  validateCustomerSignupParams,
  validateCustomerLogoutParams,
  validateCustomerLoginParams,
  validateCustomerUpdateParams
}