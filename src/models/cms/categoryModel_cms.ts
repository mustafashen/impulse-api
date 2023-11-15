import { knex } from "../../db/knex";
import { CreateCategoryType, UpdateCategoryType} from "../../types/CategoryTypes";

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

  deleteCategory: async (id: string) => {
    try {
      const res = await knex('category').delete().where({id})
      if (res.length === 0 || res === 0) throw "4004"
      return {Success: true}
    } catch (error: any) {
      console.log('deleteCategoryModel', error)
      if(error.code) return {Error: error.code}
      return {Error: error}
    }
  },

  updateCategory: async (category: UpdateCategoryType) => {
    try {
      const res = await knex('category').update(category.updates).where({id: category.id})
      console.log(res)
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