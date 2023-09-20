import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const StaffCreateSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    email: {type: "string", format: "email"},
    password: {type: "string", format: "password"},
    name: {type: "string"},
    tokens: {type: "array"},
    isAdmin: {type: "boolean"}
  },
  required: ["id", "email", "password", "name", "tokens"]
}

const StaffLoginSchema = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    password: {type: "string", format: "password"}
  }
}

const validateCreateStaffParams = ajv.compile(StaffCreateSchema)
const validateLoginStaffParams = ajv.compile(StaffLoginSchema)

export {
  validateCreateStaffParams,
  validateLoginStaffParams
}