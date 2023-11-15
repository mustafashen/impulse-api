import { CategoryModel } from "../../models/cms/categoryModel_cms"
import { CreateCategoryType, UpdateCategoryType } from "../../types/CategoryTypes"
import { 
  validateCreateCategoryParams, 
  validateCategoryDeleteParams, 
  validateCategoryUpdateParams } from "../../utils/validation/cms/categoryValidation"
const { v4: uuidv4 } = require('uuid')


const CategoryController = {
  createCategoryController: async (body: {category: CreateCategoryType}) => {
    try {
      if (!body.category) throw "4000"
      const {category} = body
      category.id = uuidv4()

      const valid = validateCreateCategoryParams(category)
      if (!valid) throw "4022"

      const resData = await CategoryModel.createCategory(category)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log('createCategoryController',error)
     return {Error: error} 
    }
  },

  deleteCategoryController: async (body: {category: {id: string}}) => {
    try {
      if (!body.category) throw "4000"
      const {category} = body
    
      const valid = validateCategoryDeleteParams(category)
      if (!valid) throw "4022"

      const resData = await CategoryModel.deleteCategory(category.id)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log('deleteCategoryController', error)
      return {Error: error}
    }
  },

  updateCategoryController: async (body: {category: UpdateCategoryType}) => {
    try {
      if (!body.category) throw "4000"
      const {category} = body

      console.log(category)
      const valid = validateCategoryUpdateParams(category)
      console.log(valid)
      if (!valid) throw "4022"

      const resData = await CategoryModel.updateCategory(category)
      if (resData?.Error) throw resData.Error

      return resData
    } catch (error) {
      console.log('updateCategoryController', error)
      return {Error: error}
    }
  },
}

export {
  CategoryController
}