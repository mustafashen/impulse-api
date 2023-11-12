
interface  CartLineType {
  id: string,
  cart_id: string,
  product_id: string,
  quantity: number,
}

interface  CartLineUpdateType {
  id: string
  cart_line: {
    id: string,
    cart_id: string,
    updates: {
      quantity: number,
    }
  }
}

interface CartType {
  id: string,
  customer_id?: string,
  location?: string,
}

interface CartUpdateType {
  id: string,
  updates: {
    location?: string,
    address_id?: string,
    order_placed?: boolean
  }
}

