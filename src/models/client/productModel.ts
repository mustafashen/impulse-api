import { knex } from "../../db/knex";


const ProductModel = {
  findAllProducts: async () => {
    try {
      const res = await knex('product').select('*')
      console.log(res)
      if (res.length === 0 || res === 0) throw "4004"
      return res
    } catch (error: any) {
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },
  findProductById: async (id: string) => {
    try {
      const res = await knex('product').where({id})
      console.log(res)
      if (res.length === 0 || res === 0) throw "4004"
      return res
    } catch (error: any) {
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  },
  findProductByCategory: async (category: {category_id: string, orderBy: string, order: 'asc' | 'desc'}) => {
    try {
      const {category_id, orderBy, order} = category
      const res = await knex('product').orderBy(
        orderBy ? orderBy : 'id',
        order ? order : 'asc'
      ).where({category_id})
      console.log(res)
      if (res.length === 0 || res === 0) throw "4004"
      return res
    } catch (error: any) {
      if (error.code) {
        return {Error: error.code}
      }
      return {Error: error}
    }
  }
}


export {
  ProductModel
}