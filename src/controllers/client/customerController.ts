const { v4: uuidv4 } = require('uuid')
import { CustomerModel } from "../../models/client/customerModel"
const bcrypt = require('bcrypt')
import { CustomerType, CustomerUpdateType } from "../../types/CustomerTypes"
import { generateAuthToken } from "../../utils/auth/generateAuthToken"
import {
  validateCustomerLoginParams,
  validateCustomerLogoutParams,
  validateCustomerSignupParams,
  validateCustomerUpdateParams, } from "../../utils/validation/client/customerValidation"



const CustomerController = {
  postSignupCustomer: async (body: {customer: CustomerType}) => {
    try {
      const {customer} = body
      customer.id = uuidv4()
      const valid = validateCustomerSignupParams(customer)
      if (!valid) throw "4022"
 
      customer.password = await bcrypt.hash(customer.password, 10)
      const resData = await CustomerModel.createCustomer(customer)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log(error)
      return {Error: error}
    }
  },

  postLoginCustomer: async (body: {customer: {email: string, password: string}}) => {
    try {
      const {customer} = body
      const valid = validateCustomerLoginParams(customer)
      if (!valid) throw "4022"

      const searchResult = await CustomerModel.findCustomer({email: customer.email})
      if (searchResult?.Error) throw searchResult.error

      const isMatch = await bcrypt.compare(customer.password, searchResult[0].password)
      if (!isMatch) throw "4001"

      const token = await generateAuthToken(searchResult[0].id)
      CustomerModel.addNewAuthToken({customerId: searchResult[0].id, token, id: uuidv4()})
      return {token}
    } catch (error) {
      return {Error: error}
    }
  },

  deleteLogoutCustomer: async (body: {token: string, id: string}) => {
    try {
      const valid = validateCustomerLogoutParams(body)
      if (!valid) throw "4022"
      const resData = await CustomerModel.deleteAuthToken(body.id, body.token)
      if (resData?.Error) throw resData.Error
      
      return resData
    } catch (error) {
      return {Error: error}
    }
  },
  
  deleteAccountCustomer: async (body: {token: string, id: string, password: string}) => {
    try {
      const searchResult = await CustomerModel.findCustomer({id: body.id})
      if (searchResult?.Error) throw searchResult.Error
      
      const isMatch = await bcrypt.compare(body.password, searchResult[0].password)
      if (!isMatch) throw "4001"

      const resData = await CustomerModel.deleteCustomer(body.id)
      if (resData?.Error) throw resData.Error
      
      return resData
    } catch (error) {
      return {Error: error}
    }
  },

  updateCustomer: async (body: {id: string, customer: CustomerUpdateType}) => {
    try {
      if (!body.customer) throw "4000"
      const {customer} = body

      const valid = validateCustomerUpdateParams(customer)
      if (!valid) throw "4002"

      const searchResult = await CustomerModel.findCustomer({id: body.id})
      if (searchResult?.Error) throw searchResult.Error

      const isMatch = await bcrypt.compare(customer.password, searchResult[0].password)
      if (!isMatch) throw "4001"

      const resData = await CustomerModel.updateCustomer(body)
      if (resData?.Error) throw resData.Error
      return resData
    } catch (error) {
      console.log('updateCustomerController', error)
      return {Error: error}
    }
  }
}


export {
  CustomerController
}