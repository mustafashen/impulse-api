import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const createProductSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    price: { type: "number" },
    stock: { type: "number" },
    description: { type: "string" },
    features: { type: "object" },
    category_id: { type: "string", format: "uuid" },
  },
  required: ["id", "name", "price", "stock", "description", "categoryName"]
}

const updateProductSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    updates: {
      type: "object",
      properties: {
        name: { type: "string" },
        price: { type: "number" },
        stock: { type: "number" },
        description: { type: "string" },
        features: { type: "object" },
        category_id: { type: "string", format: "uuid" },
      }
    }
  },
  required: ["id"]
}

const deleteProductSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" }
  },
  required: ["id"]
}



const validateCreateProductParams = ajv.compile(createProductSchema)
const validateDeleteProductParams = ajv.compile(deleteProductSchema)
const validateUpdateProductParams = ajv.compile(updateProductSchema)

export {
  validateCreateProductParams,
  validateDeleteProductParams,
  validateUpdateProductParams
}