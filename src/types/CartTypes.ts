
interface  CartLineType {
  id: string,
  cart_id: string,
  product_id: string,
  quantity: number,
}

interface  CartLineUpdateType {
  id: string
  guest: boolean,
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

