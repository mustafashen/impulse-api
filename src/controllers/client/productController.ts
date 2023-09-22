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
  }
}

export {
  ProductController
}