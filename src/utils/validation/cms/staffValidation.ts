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
    isAdmin: {type: "boolean"}
  },
  required: ["id", "email", "password", "name"]
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

const StaffUpdateSchema = {
  type: "object",
  properties: {
    id: {type: "string"},
    updates: {
      type: "object",
      properties: {
        email: {type: "string", format: "email"},
        password: {type: "string", format: "password"},
        name: {type: "string"},
        tokens: {type: "array"},
        isAdmin: {type: "boolean"}
      }
    }
  },
  required: ["id"]
}

const validateStaffLogoutParams = ajv.compile(StaffLogoutSchema)
const validateCreateStaffParams = ajv.compile(StaffCreateSchema)
const validateLoginStaffParams = ajv.compile(StaffLoginSchema)
const validateDeleteStaffParams = ajv.compile(StaffDeleteSchema)
const validateStaffUpdateParams = ajv.compile(StaffUpdateSchema)

export {
  validateCreateStaffParams,
  validateLoginStaffParams,
  validateDeleteStaffParams,
  validateStaffLogoutParams,
  validateStaffUpdateParams
}