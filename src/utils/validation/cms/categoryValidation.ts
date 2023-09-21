import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)


const CategoryCreateSchema = {
  type: "object",
  properties: {
    id: {type: "string"},
    name: {type: "string"},
    parentId: {type: "string"}
  },
  required: ["id", "name"]
}

const CategoryDeleteSchema = {
  type: "object",
  properties: {
    name: {type: "string"}
  },
  required: ["name"]
}

const validateCreateCategoryParams = ajv.compile(CategoryCreateSchema)
const validateCategoryDeleteParams = ajv.compile(CategoryDeleteSchema)

export {
  validateCreateCategoryParams,
  validateCategoryDeleteParams
}