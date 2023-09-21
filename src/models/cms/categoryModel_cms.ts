import { knex } from "../../db/knex";
import { CreateCategoryType } from "../../types/CategoryTypes";

const CategoryModel = {

  createCategory: async (category: CreateCategoryType) => {
    try {
      const res = await knex('category').insert(category)
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      console.log('createCategoryModel', error)
      if (error.code) return {Error: error.code}
      return {Error: error}
    }
  },

  deleteCategory: async (name: string) => {
    try {
      const res = await knex('category').where({name}).delete()
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      console.log('deleteCategoryModel', error)
      if(error.code) return {Error: error.code}
      return {Error: error}
    }
  }
}

export {CategoryModel}