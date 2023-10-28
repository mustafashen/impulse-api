
interface WishlistType {
  id: string,
  customer_id: string,
}

interface WishlistLineType {
  id: string,
  product_id: string,
  wishlist_id: string
}