import { CategoryModel } from "../../models/client/categoryModel"

const CategoryController = {
  getCategories: async () => {
    try {
      const resData = await CategoryModel.findAllCategories()
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      return {Error: error}
    }
  },

  getCategoryByParentId: async (body: {category: {id: string}}) => {
    try {
      const {category} = body
      const resData = await CategoryModel.findByParentCategory(category.id)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      return {Error: error}
    }
  }
}

export {
  CategoryController
}