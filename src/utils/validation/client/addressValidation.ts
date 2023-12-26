
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)
ajv.addFormat("phone", /^(\+\d{1,3})\d{10}$/)

const AddressSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid"},
    title: {type: "string"},
    state: {type: "string"},
    city: {type: "string"},
    district: {type: "string"},
    country: {type: "string"},
    zip_code: {type: "string"},
    address: {type: "string"},
    phone: {type: "string", format: "phone"},
    customer_id: {type: "string", format: "uuid"},
  },
  required: ["id", "city", "district", "country", "zip_code", "address", "phone", "customer_id"]
}

const AddressUpdateSchema = {
  type: "object",
  properties: {
    title: {type: "string"},
    state: {type: "string"},
    city: {type: "string"},
    district: {type: "string"},
    country: {type: "string"},
    zip_code: {type: "string"},
    address: {type: "string"},
    phone: {type: "string", format: "phone"},
    customer_id: {type: "string", format: "uuid"},
  },
}

const validateAddressCreateParams = ajv.compile(AddressSchema)
const validateAddressUpdateParams = ajv.compile(AddressUpdateSchema)
export {
  validateAddressCreateParams,
  validateAddressUpdateParams
}