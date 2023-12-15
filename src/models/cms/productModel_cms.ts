import { knex } from '../../db/knex'
import {ProductType, ProductUpdateType} from '../../types/ProductTypes'

const ProductModel_cms = {
  createProductModel: async (product: ProductType) => {
    try {
      const res = await knex('product')
        .insert({
          id: product.id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          description: product.description,
          features: product.features,
          category_id: product.category_id
        })
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
      return {Success: true}
    } catch (error: any) {
      console.log('createProductModel', error)
      if(error.code) return {Error: error.code}
      return {Error: error}
    }    
  },

  updateProductModel: async (product: ProductUpdateType) => {
    try {
      if (!product.updates) throw "4000"
      const {updates} = product
      
      const res = await knex('product')
        .update({
          name: updates?.name,
          price: updates?.price,
          stock: updates?.stock,
          description: updates?.description,
          features: updates?.features,
          category_id: updates?.category_id
        })
        .where({id: product.id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
      return {Success: true}
    } catch (error: any) {
      console.log('createProductModel', error)
      if(error.code) return {Error: error.code}
      return {Error: error}
    }    
  },

  deleteProductModel: async (id: string) => {
    try {
      const res = await knex('product')
        .delete()
        .where({id})
      if (res.length === 0 || res === 0) return {Warning: "No changes made"}
      return {Success: true}
    } catch (error: any) {
      console.log('createProductModel', error)
      if(error.code) return {Error: error.code}
      return {Error: error}
    }    
  }
}

export {
  ProductModel_cms
}