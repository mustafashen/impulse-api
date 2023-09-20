import { CategoryModel } from "../../models/cms/categoryModel_cms"
import { CreateCategoryType } from "../../types/CategoryTypes"
import { validateCreateCategoryParams } from "../../utils/validation/cms/categoryValidation"
const { v4: uuidv4 } = require('uuid')


const CategoryController = {
  createCategoryController: async (body: {category: CreateCategoryType}) => {
    try {
      if (!body.category) throw "6000"
      const {category} = body
      category.id = uuidv4()

      const valid = validateCreateCategoryParams(category)
      if (!valid) throw "2000"

      const resData = await CategoryModel.createCategory(category)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log(error)
     return {Error: error} 
    }
  }
}

export {
  CategoryController
}