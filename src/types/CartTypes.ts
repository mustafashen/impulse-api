
interface  CartLineType {
  id: string,
  cart_id: string,
  product_id: string,
  quantity: number,
}

interface  CartLineUpdateType {
  cart_line_id: string,
  updates: {
    quantity: number,
  }
}

interface CartType {
  id: string,
  customer_id?: string,
}

