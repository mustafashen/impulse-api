
interface ProductType { 
  id: string,
  name: string,
  price: number,
  stock: number,
  description: string,
  features: object,
  category_id: string,
}

interface ProductUpdateType {
  id: string,
  updates?: {
    name: string,
    price: number,
    stock: number,
    description: string,
    features: object,
    category_id: string,
  }
}

export {
  ProductType,
  ProductUpdateType
}