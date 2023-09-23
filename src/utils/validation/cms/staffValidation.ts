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
  },
  required: ["email", "password"]
}

const StaffDeleteSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
  },
  required: ["id"]
}
const StaffLogoutSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
    id: {type: "string", format: "uuid"}
  },
  required: ["token", "id"]
}

const validateStaffLogoutParams = ajv.compile(StaffLogoutSchema)
const validateCreateStaffParams = ajv.compile(StaffCreateSchema)
const validateLoginStaffParams = ajv.compile(StaffLoginSchema)
const validateDeleteStaffParams = ajv.compile(StaffDeleteSchema)


export {
  validateCreateStaffParams,
  validateLoginStaffParams,
  validateDeleteStaffParams,
  validateStaffLogoutParams,
}