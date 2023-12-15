import { knex } from "../../db/knex";


const CategoryModel = {

  findAllCategories: async () => {
    try {
      const res = await knex('category').select('*')
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