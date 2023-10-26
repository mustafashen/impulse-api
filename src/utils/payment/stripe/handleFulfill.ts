import { OrderModel } from "../../../models/client/orderModel"

const handleFulfillment = (session: {id: string}) => {
    OrderModel.updatePaymentStatus(session.id)
}

export {
    handleFulfillment
}