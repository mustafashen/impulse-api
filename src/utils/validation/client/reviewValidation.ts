import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const ReviewByCustomerSchema = {
  type: "object",
  properties: {
    customer_id: {type: "string", format: "uuid"}
  },
  required: ['customer_id']
}

const ReviewByProductSchema = {
  type: "object",
  properties: {
    customer_id: {type: "string", format: "uuid"}
  },
  required: ['customer_id']
}

const ReviewCreateSchema = {
    type: "object",
    properties: {
      id: {type: "string", format: "uuid"},
      customer_id: {type: "string", format: "uuid"},
      product_id: {type: "string", format: "uuid"},
      rating: {type: "number", minimum: 1, maximum: 5},
      comment: {type: "string"}
    },
    required: ['id', 'customer_id', 'product_id', 'rating', 'comment']
}

const ReviewUpdateSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    updates: {
      type: "object",
      properties: {
        rating: {type: "number", minimum: 1, maximum: 5},
        comment: {type: "string"}
      }
    }
  },
  required: ['id', 'customer_id', 'product_id', 'rating', 'comment']
}

const ReviewDeleteSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"}
  },
  required: ['id']
}



const validateReviewCreateParams = ajv.compile(ReviewCreateSchema)
const validateReviewByCustomerParams = ajv.compile(ReviewByCustomerSchema)
const validateReviewByProductParams = ajv.compile(ReviewByProductSchema)
const validateReviewDeleteParams = ajv.compile(ReviewDeleteSchema)
const validateReviewUpdateParams = ajv.compile(ReviewUpdateSchema)

export {
    validateReviewCreateParams,
    validateReviewByCustomerParams,
    validateReviewByProductParams,
    validateReviewDeleteParams,
    validateReviewUpdateParams,
}