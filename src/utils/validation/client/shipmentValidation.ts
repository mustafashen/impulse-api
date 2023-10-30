
import Ajv from "ajv";
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CreateShipmentSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    address_id: {type: "string"},
  },
  required: ["id", "address_id"],
}

const UpdateShipmentSchema = {
  type: "object",
  properties: {
    id: {type: "string", format: "uuid"},
    updates: {
      type: "object",
      properties: {
        carrier_name: {type: "string"},
        tracking_number: {type: "string"},
      }
    }
  },
  required: ["id"],
}


const validateCreateShipmentParams = ajv.compile(CreateShipmentSchema)
const validateUpdateShipmentParams = ajv.compile(UpdateShipmentSchema)

export {
  validateCreateShipmentParams,
  validateUpdateShipmentParams
}