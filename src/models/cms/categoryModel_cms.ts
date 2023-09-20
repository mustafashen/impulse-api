import { knex } from "../../db/knex";
import { CreateCategoryType } from "../../types/CategoryTypes";

const CategoryModel = {

  createCategory: async (category: CreateCategoryType) => {
    try {
      const resData = await knex('category').insert(category)
      if (resData.length === 0) throw "3000"
      return {Success: true}
    } catch (error: any) {
      console.log(error)
      if (error.code) return {Error: error.code}
      return {Error: error}
    }
  }
}

export {CategoryModel}