
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)
ajv.addFormat("phone", /^[+][0-9]{12}$/)

const CostumerSignupSchema = {
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

const validateCostumerSignupParams = ajv.compile(CostumerSignupSchema)

export {
  validateCostumerSignupParams
}