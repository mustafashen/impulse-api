
interface ProductType { 
  id: string,
  name: string,
  price: number,
  stock: number,
  description: string,
  features: object,
  categoryName: string,
}

interface ProductUpdateType {
  id: string,
  updates?: {
    name: string,
    price: number,
    stock: number,
    description: string,
    features: object,
    categoryName: string,
  }
}

export {
  ProductType,
  ProductUpdateType
}