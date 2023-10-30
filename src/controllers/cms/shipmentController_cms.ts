import { OrderModel } from "../../models/client/orderModel"
import { ShipmentModel } from "../../models/cms/shipmentModel"
import { validateUpdateShipmentParams } from "../../utils/validation/client/shipmentValidation"

const ShipmentController = {

  addShipment: async (body: {shipment: UpdateShipmentType}) => {
    try {
      const {shipment} = body
      if (!shipment.id) throw "4000"

      const valid = validateUpdateShipmentParams(shipment)
      if (!valid) throw "4022"

      const resData = await ShipmentModel.addShipment(shipment)
      if (resData.Error) throw resData.Error

      // After shipment info successfully added, we update the order status to 'shipped'
      const orderStateRes = await OrderModel.updateStatusShipped(shipment.id)
      if (orderStateRes.Error) throw orderStateRes.Error

      return resData

    } catch (error: any) {
      console.log(error)
      return { Error: error }
    }
  }
}

export {
  ShipmentController
}