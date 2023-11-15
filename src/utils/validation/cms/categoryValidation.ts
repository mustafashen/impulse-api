import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)


const CategoryCreateSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    name: {type: "string"},
    parent_id: {type: "string", format: "uuid"}
  },
  required: ["id", "name"]
}

const CategoryDeleteSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"}
  },
  required: ["id"]
}

const CategoryUpdateSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    updates: {type: "object", properties: {
      name: {type: "string"},
      parent_id: {type: "string", format: "uuid"}
    }}
  },
  required: ["id", "updates"]
}

const validateCreateCategoryParams = ajv.compile(CategoryCreateSchema)
const validateCategoryDeleteParams = ajv.compile(CategoryDeleteSchema)
const validateCategoryUpdateParams = ajv.compile(CategoryUpdateSchema)

export {
  validateCreateCategoryParams,
  validateCategoryDeleteParams,
  validateCategoryUpdateParams,
}