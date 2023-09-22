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
  }
}


export {
  ProductModel
}