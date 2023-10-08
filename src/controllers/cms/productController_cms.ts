import { ProductModel_cms } from '../../models/cms/productModel_cms'
import {ProductType, ProductUpdateType} from '../../types/ProductTypes'
import { 
  validateCreateProductParams,
  validateDeleteProductParams,
  validateUpdateProductParams } 
  from '../../utils/validation/cms/productValidation'
const { v4: uuidv4 } = require('uuid')

const ProductController_cms = {
  createProductController: async (body: {product: ProductType}) => {
    try {
      if (!body.product) throw "4000"
      const {product} = body

      product.id = uuidv4()

      const valid = validateCreateProductParams(product)
      if (!valid) throw "4022"

      const resData = await ProductModel_cms.createProductModel(product)
      if (resData.Error) throw resData.Error
      return resData
    } catch (error: any) {
      console.log('createProductController', error)
      return {Error: error}
    }
  },

  deleteProductController: async (body: {product: {id: string}}) => {
    try {
      if (!body.product) throw "4000"
      const {product} = body

      const valid = validateDeleteProductParams(product)
      if (!valid) throw "4022"

      const resData = await ProductModel_cms.deleteProductModel(product.id)
      if (resData.Error) throw resData.Error
      return resData
    } catch (error: any) {
      console.log('createProductController', error)
      return {Error: error}
    }
  }, 

  updateProductController: async (body: {product: ProductUpdateType}) => {
    try {
      if (!body.product) throw "4000"
      const {product} = body

      const valid = validateUpdateProductParams(product)
      if (!valid) throw "4022"

      const resData = await ProductModel_cms.updateProductModel(product)
      if (resData.Error) throw resData.Error
      return resData
    } catch (error: any) {
      console.log('createProductController', error)
      return {Error: error}
    }
  }, 


}



export {
  ProductController_cms
}