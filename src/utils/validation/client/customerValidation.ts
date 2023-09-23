
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)
ajv.addFormat("phone", /^[+][0-9]{12}$/)

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
    address: {type: "string"},
    state: {type: "string"},
    city: {type: "string"},
    province: {type: "string"},
    country: {type: "string"},
    zip_code: {type: "string"},
    tokens: {type: "array"}
  },
  required: ["id", "name", "last_name", "birth_date", "email", "password", "phone", "gender", "address", "city", "province", "country", "zip_code"],
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
        address: {type: "string"},
        state: {type: "string"},
        city: {type: "string"},
        province: {type: "string"},
        country: {type: "string"},
        zip_code: {type: "string"},
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