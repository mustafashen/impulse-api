interface CreateOrderType {
    id: string,
    status: "pending" | "paid" | "shipped" | "complete",
    cart_id: string,
    customer_id: string,
    checkout_id: string,
    total_amount: number
}