import { knex } from "../../db/knex";


const CategoryModel = {

  findAllCategories: async () => {
    try {
      const res = await knex('category').select('*')
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

  findByParentCategory: async (parent_id: string) => {
    try {
      const res = await knex('category').select({parent_id})
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

}


export {
  CategoryModel
}