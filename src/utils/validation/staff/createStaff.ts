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
  }
}

const validateCreateStaffParams = ajv.compile(StaffCreateSchema)

export {
  validateCreateStaffParams
}