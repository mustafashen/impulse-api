import { OrderModel } from "../../../models/client/orderModel"

const handleFulfillment = (session: {id: string}) => {
    OrderModel.updateStatusPaid(session.id)
}

export {
    handleFulfillment
}