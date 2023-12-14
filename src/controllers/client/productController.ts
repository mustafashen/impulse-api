import { ProductModel } from "../../models/client/productModel"

const ProductController = {
  getProducts: async () => {
    try {
      const resData = await ProductModel.findAllProducts()
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      return {Error: error}
    }
  },
  getProductsByCategory: async (body: {category: {category_id: string, orderBy: string, order: 'asc' | 'desc'}}) => {
    try {
      console.log(body)
      const {category} = body
      if (!category) throw "4000"
      
      const resData = await ProductModel.findProductByCategory(category)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      return {Error: error}
    }
  },
  getProductsById: async (body: {category: {id: string}}) => {
    try {
      const {category} = body
      if (!category) throw "4000"
      
      const resData = await ProductModel.findProductById(category.id)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      return {Error: error}
    }
  }
}

export {
  ProductController
}